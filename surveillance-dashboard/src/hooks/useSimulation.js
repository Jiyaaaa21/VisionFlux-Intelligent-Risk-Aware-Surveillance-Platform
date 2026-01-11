import { useState, useEffect, useRef, useCallback } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { SYSTEM_CONFIG, SCENARIO_TIMELINE } from '../utils/constants';

// ============================================================================
// CRIME CAMERA CONFIGURATION
// ============================================================================

const CRIME_CAMERAS = {
  'CAM_03': { baseRisk: 0.78, weaponConfidence: 0.72, weaponCount: 2, variation: 0.05 },  // Robbery
  'CAM_06': { baseRisk: 0.65, weaponConfidence: 0.0, weaponCount: 0, variation: 0.04 },   // Stealing
  'CAM_09': { baseRisk: 0.82, weaponConfidence: 0.68, weaponCount: 1, variation: 0.06 },  // Fighting
  'CAM_12': { baseRisk: 0.85, weaponConfidence: 0.81, weaponCount: 1, variation: 0.05 },  // Robbery
  'CAM_14': { baseRisk: 0.58, weaponConfidence: 0.0, weaponCount: 0, variation: 0.03 },   // Accident
  'CAM_15': { baseRisk: 0.92, weaponConfidence: 0.88, weaponCount: 1, variation: 0.04 },  // Explosion
};

// ============================================================================
// SIMULATION ENGINE HOOK
// ============================================================================

const useSimulation = () => {
  const { state, actions } = useGlobalState();
  const [isRunning, setIsRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  // ============================================================================
  // INTERPOLATION HELPER
  // ============================================================================
  
  const lerp = (start, end, progress) => {
    return start + (end - start) * Math.min(Math.max(progress, 0), 1);
  };

  // ============================================================================
  // GET CAMERA RISK AT CURRENT TIME
  // ============================================================================
  
  const getCameraRisk = useCallback((cameraId, time) => {
    // Check if this is a crime camera
    const crimeConfig = CRIME_CAMERAS[cameraId];
    if (crimeConfig) {
      // Crime cameras maintain high risk with small variations
      const variation = Math.sin(time / 8) * crimeConfig.variation;
      const risk = Math.max(0.5, Math.min(0.95, crimeConfig.baseRisk + variation));
      return risk;
    }

    // Check for scenario timeline (dynamic escalation cameras)
    const scenario = SCENARIO_TIMELINE[cameraId];
    if (scenario) {
      const { START_TIME, PEAK_TIME, START_RISK, PEAK_RISK, NORMALIZE_TIME } = scenario;

      if (time < START_TIME) {
        return START_RISK;
      }

      if (time >= START_TIME && time < PEAK_TIME) {
        const duration = PEAK_TIME - START_TIME;
        const progress = (time - START_TIME) / duration;
        return lerp(START_RISK, PEAK_RISK, progress);
      }

      if (time >= PEAK_TIME && time < PEAK_TIME + 5) {
        return PEAK_RISK;
      }

      if (time >= PEAK_TIME + 5 && time < NORMALIZE_TIME) {
        const duration = NORMALIZE_TIME - (PEAK_TIME + 5);
        const progress = (time - (PEAK_TIME + 5)) / duration;
        return lerp(PEAK_RISK, START_RISK, progress);
      }

      return START_RISK;
    }

    // Normal cameras have small natural variations
    const baseCamera = state.cameras.find(c => c.id === cameraId);
    const baseRisk = baseCamera ? baseCamera.riskScore : 0.15;
    const variation = Math.sin(time / 10) * 0.02;
    return Math.max(0.1, Math.min(0.25, baseRisk + variation));
  }, [state.cameras]);

  // ============================================================================
  // GET WEAPON SIGNAL FOR CAMERA
  // ============================================================================
  
  const getWeaponSignal = useCallback((cameraId, time) => {
    const crimeConfig = CRIME_CAMERAS[cameraId];
    
    if (crimeConfig && crimeConfig.weaponConfidence > 0) {
      // Add slight variation to weapon confidence
      const variation = Math.sin(time / 12) * 0.03;
      const confidence = Math.max(0.5, Math.min(0.95, crimeConfig.weaponConfidence + variation));
      
      return {
        detected: true,
        confidence: confidence,
        boundingBoxCount: crimeConfig.weaponCount
      };
    }

    // Check scenario timeline for weapon activation
    const scenario = SCENARIO_TIMELINE[cameraId];
    if (scenario && scenario.WEAPON_START && time >= scenario.WEAPON_START) {
      return {
        detected: true,
        confidence: scenario.WEAPON_CONFIDENCE || 0.70,
        boundingBoxCount: 1
      };
    }

    return {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    };
  }, []);

  // ============================================================================
  // UPDATE SIMULATION STATE
  // ============================================================================
  
  const updateSimulation = useCallback(() => {
    const time = elapsedTime;

    // Update camera risks and weapon signals
    state.cameras.forEach(camera => {
      const newRisk = getCameraRisk(camera.id, time);
      const newWeaponSignal = getWeaponSignal(camera.id, time);
      const confidence = 0.88 + Math.random() * 0.08; // 0.88-0.96

      // Update risk if there's a meaningful change
      if (Math.abs(newRisk - camera.riskScore) > 0.01) {
        actions.updateCameraRisk(camera.id, newRisk, confidence);
      }

      // Update weapon signal if it changed
      const weaponChanged = 
        newWeaponSignal.detected !== camera.weaponSignal.detected ||
        Math.abs(newWeaponSignal.confidence - camera.weaponSignal.confidence) > 0.01;

      if (weaponChanged) {
        actions.updateWeaponSignal(camera.id, newWeaponSignal);
      }
    });

    // Update zone risks (aggregate from cameras)
    state.zones.forEach(zone => {
      const zoneCameras = state.cameras.filter(c => zone.cameraIds.includes(c.id));
      const avgRisk = zoneCameras.reduce((sum, cam) => sum + cam.riskScore, 0) / zoneCameras.length;
      
      if (Math.abs(avgRisk - zone.aggregatedRisk) > 0.01) {
        actions.updateZoneRisk(zone.id, avgRisk);
      }
    });

    // Check for alert generation (3 consecutive high-risk frames)
    state.cameras.forEach(camera => {
      if (camera.consecutiveHighRiskFrames >= SYSTEM_CONFIG.ALERT_CONFIRMATION_FRAMES) {
        const existingAlert = state.alerts.find(
          a => a.cameraId === camera.id && a.status === 'active'
        );
        
        if (!existingAlert) {
          // Generate appropriate alert description based on camera
          let description = 'High-risk activity detected';
          const crimeConfig = CRIME_CAMERAS[camera.id];
          
          if (crimeConfig) {
            if (camera.id === 'CAM_03' || camera.id === 'CAM_12') {
              description = 'Robbery in progress - Weapon detected';
            } else if (camera.id === 'CAM_06') {
              description = 'Theft incident - Suspicious activity';
            } else if (camera.id === 'CAM_09') {
              description = 'Physical altercation - Weapon detected';
            } else if (camera.id === 'CAM_14') {
              description = 'Traffic accident - Emergency response needed';
            } else if (camera.id === 'CAM_15') {
              description = 'CRITICAL: Explosion detected - Evacuate area';
            }
          }
          
          actions.generateAlert(
            camera.id,
            camera.riskScore,
            camera.confidence,
            description
          );
        }
      }
    });

    // Check for alert resolution (risk normalized)
    state.alerts
      .filter(a => a.status === 'active')
      .forEach(alert => {
        const camera = state.cameras.find(c => c.id === alert.cameraId);
        // Crime cameras don't auto-resolve (they maintain high risk)
        if (camera && camera.riskScore < 0.40 && !CRIME_CAMERAS[camera.id]) {
          actions.resolveAlert(alert.id);
        }
      });

    // Auto-open modal for highest risk camera
    const highRiskCameras = state.cameras.filter(c => c.riskScore >= 0.70);

    if (highRiskCameras.length > 0) {
      const highestRiskCamera = highRiskCameras.reduce((prev, current) =>
        current.riskScore > prev.riskScore ? current : prev
      );
  
      const currentModalCamera = state.cameras.find(c => c.id === state.ui.modalCamera);
      const shouldAutoOpen = !state.ui.modalCamera || 
        (currentModalCamera && currentModalCamera.riskScore < 0.70 && 
          highestRiskCamera.id !== state.ui.modalCamera);
  
      if (shouldAutoOpen) {
        actions.openCameraModal(highestRiskCamera.id);
      }
    } else if (state.ui.modalCamera) {
      const currentModalCamera = state.cameras.find(c => c.id === state.ui.modalCamera);
      // Only close if not a crime camera and risk dropped
      if (currentModalCamera && currentModalCamera.riskScore < 0.40 && !CRIME_CAMERAS[currentModalCamera.id]) {
        actions.closeCameraModal();
      }
    }

  }, [elapsedTime, state.cameras, state.zones, state.alerts, state.ui.modalCamera, actions, getCameraRisk, getWeaponSignal]);

  // ============================================================================
  // MAIN SIMULATION LOOP
  // ============================================================================
  
  useEffect(() => {
    if (!isRunning) return;

    const interval = SYSTEM_CONFIG.SNAPSHOT_REFRESH_RATE / speed;

    intervalRef.current = setInterval(() => {
      setElapsedTime(prev => {
        const next = prev + 5; // 5 second intervals
        
        // Loop logic: pause at 60s, then reset after 10 seconds
        if (next >= SYSTEM_CONFIG.SIMULATION_DURATION) {
          setIsRunning(false);
          
          pauseTimeoutRef.current = setTimeout(() => {
            setElapsedTime(0);
            actions.resetState();
            setIsRunning(true);
          }, SYSTEM_CONFIG.SIMULATION_PAUSE_DURATION);
          
          return SYSTEM_CONFIG.SIMULATION_DURATION;
        }
        
        return next;
      });
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isRunning, speed, actions]);

  // ============================================================================
  // UPDATE SIMULATION WHEN TIME CHANGES
  // ============================================================================
  
  useEffect(() => {
    if (isRunning && elapsedTime < SYSTEM_CONFIG.SIMULATION_DURATION) {
      updateSimulation();
    }
  }, [elapsedTime, isRunning, updateSimulation]);

  // ============================================================================
  // CONTROL FUNCTIONS
  // ============================================================================
  
  const toggleRunning = () => {
    setIsRunning(prev => !prev);
  };

  const reset = () => {
    setElapsedTime(0);
    actions.resetState();
    setIsRunning(true);
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const resume = () => {
    setIsRunning(true);
  };

  const changeSpeed = (newSpeed) => {
    setSpeed(newSpeed);
  };

  // ============================================================================
  // RETURN VALUES
  // ============================================================================
  
  return {
    isRunning,
    elapsedTime,
    speed,
    progress: (elapsedTime / SYSTEM_CONFIG.SIMULATION_DURATION) * 100,
    toggleRunning,
    reset,
    pause,
    resume,
    setSpeed: changeSpeed
  };
};

export default useSimulation;