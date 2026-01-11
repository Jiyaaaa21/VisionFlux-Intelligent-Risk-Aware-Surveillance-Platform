// ============================================================================
// COLOR CONSTANTS
// ============================================================================

export const COLORS = {
  // Background colors
  BG_DARKEST: '#0a0e1a',
  BG_DARK: '#151b2e',
  BG_PANEL: '#1a2332',
  BG_CARD: '#1e293b',
  
  // Text colors
  TEXT_PRIMARY: '#e2e8f0',
  TEXT_SECONDARY: '#94a3b8',
  TEXT_MUTED: '#64748b',
  
  // Border colors
  BORDER_DEFAULT: '#1e293b',
  BORDER_LIGHT: '#334155',
  
  // Status colors
  STATUS_NORMAL: '#10b981',
  STATUS_SUSPICIOUS: '#f59e0b',
  STATUS_CRITICAL: '#ef4444',
  
  // Fusion-specific colors
  FUSION_LOW: '#10b981',       // Green
  FUSION_ELEVATED: '#f59e0b',  // Yellow/Orange
  FUSION_HIGH: '#fb923c',      // Orange
  FUSION_CRITICAL: '#ef4444',  // Red
  
  // Map colors
  MAP_BASE: '#0a1929',
  MAP_STREET: '#1e3a52',
  MAP_BUILDING: '#162b3d',
  
  // Accent colors
  ACCENT_BLUE: '#3b82f6',
  ACCENT_BLUE_LIGHT: '#60a5fa',
};

// ============================================================================
// RISK THRESHOLDS
// ============================================================================

export const RISK_THRESHOLDS = {
  NORMAL: 0.40,        // Below 0.40 = normal
  SUSPICIOUS: 0.70,    // 0.40 - 0.69 = suspicious
  CRITICAL: 0.70,      // 0.70+ = critical/high_risk
};

// Fusion-specific thresholds
export const FUSION_THRESHOLDS = {
  LOW: 0.30,           // < 0.30 = LOW
  ELEVATED: 0.50,      // 0.30 - 0.49 = ELEVATED
  HIGH: 0.70,          // 0.50 - 0.69 = HIGH
  CRITICAL: 0.70,      // >= 0.70 = CRITICAL
};

// ============================================================================
// SYSTEM CONFIGURATION
// ============================================================================

export const SYSTEM_CONFIG = {
  SNAPSHOT_REFRESH_RATE: 5000,
  ALERT_CONFIRMATION_FRAMES: 3,
  SIMULATION_DURATION: 60,
  SIMULATION_PAUSE_DURATION: 10000,
  TOTAL_CAMERAS: 15,
  TOTAL_ZONES: 3,
  
  // Fusion parameters
  TEMPORAL_BOOST: 0.15,           // Boost per persistent frame
  TEMPORAL_THRESHOLD: 3,          // Frames needed for boost
  WEAPON_ACTIVITY_MULTIPLIER: 1.2, // Boost when both signals present
};

// ============================================================================
// CAMERA INITIAL DATA - 15 CAMERAS WITH CRIME CAMERAS AT HIGH RISK
// ============================================================================

export const INITIAL_CAMERAS = [
  // ZONE A - North Sector (5 cameras)
  {
    id: 'CAM_01',
    name: 'Camera 01',
    zone: 'ZONE_A',
    riskScore: 0.15,
    confidence: 0.92,
    status: 'normal',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_01',
    position: { x: 120, y: 60 },
    weaponSignal: {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },
  {
    id: 'CAM_02',
    name: 'Camera 02',
    zone: 'ZONE_A',
    riskScore: 0.12,
    confidence: 0.91,
    status: 'normal',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_02',
    position: { x: 180, y: 50 },
    weaponSignal: {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },
  // CAM_03 - CRIME CAMERA (Robbery)
  {
    id: 'CAM_03',
    name: 'Camera 03',
    zone: 'ZONE_A',
    riskScore: 0.78,  // HIGH RISK
    confidence: 0.89,
    status: 'high_risk',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_03',
    position: { x: 240, y: 70 },
    weaponSignal: {
      detected: true,    // WEAPON DETECTED
      confidence: 0.72,
      boundingBoxCount: 2
    }
  },
  {
    id: 'CAM_04',
    name: 'Camera 04',
    zone: 'ZONE_A',
    riskScore: 0.14,
    confidence: 0.90,
    status: 'normal',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_04',
    position: { x: 150, y: 100 },
    weaponSignal: {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },
  {
    id: 'CAM_05',
    name: 'Camera 05',
    zone: 'ZONE_A',
    riskScore: 0.16,
    confidence: 0.88,
    status: 'normal',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_05',
    position: { x: 210, y: 90 },
    weaponSignal: {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },

  // ZONE B - Central Sector (5 cameras)
  // CAM_06 - CRIME CAMERA (Stealing)
  {
    id: 'CAM_06',
    name: 'Camera 06',
    zone: 'ZONE_B',
    riskScore: 0.65,  // HIGH RISK
    confidence: 0.93,
    status: 'suspicious',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_06',
    position: { x: 130, y: 180 },
    weaponSignal: {
      detected: false,   // No weapon in stealing scenario
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },
  {
    id: 'CAM_07',
    name: 'Camera 07',
    zone: 'ZONE_B',
    riskScore: 0.14,
    confidence: 0.90,
    status: 'normal',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_07',
    position: { x: 180, y: 190 },
    weaponSignal: {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },
  {
    id: 'CAM_08',
    name: 'Camera 08',
    zone: 'ZONE_B',
    riskScore: 0.16,
    confidence: 0.88,
    status: 'normal',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_08',
    position: { x: 230, y: 200 },
    weaponSignal: {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },
  // CAM_09 - CRIME CAMERA (Fighting)
  {
    id: 'CAM_09',
    name: 'Camera 09',
    zone: 'ZONE_B',
    riskScore: 0.82,  // CRITICAL RISK
    confidence: 0.92,
    status: 'high_risk',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_09',
    position: { x: 160, y: 220 },
    weaponSignal: {
      detected: true,    // WEAPON DETECTED (potential knife)
      confidence: 0.68,
      boundingBoxCount: 1
    }
  },
  {
    id: 'CAM_10',
    name: 'Camera 10',
    zone: 'ZONE_B',
    riskScore: 0.17,
    confidence: 0.87,
    status: 'normal',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_10',
    position: { x: 200, y: 210 },
    weaponSignal: {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },

  // ZONE C - South Sector (5 cameras)
  {
    id: 'CAM_11',
    name: 'Camera 11',
    zone: 'ZONE_C',
    riskScore: 0.13,
    confidence: 0.94,
    status: 'normal',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_11',
    position: { x: 140, y: 290 },
    weaponSignal: {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },
  // CAM_12 - CRIME CAMERA (Robbery)
  {
    id: 'CAM_12',
    name: 'Camera 12',
    zone: 'ZONE_C',
    riskScore: 0.85,  // CRITICAL RISK
    confidence: 0.87,
    status: 'high_risk',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_12',
    position: { x: 180, y: 300 },
    weaponSignal: {
      detected: true,    // WEAPON DETECTED
      confidence: 0.81,
      boundingBoxCount: 1
    }
  },
  {
    id: 'CAM_13',
    name: 'Camera 13',
    zone: 'ZONE_C',
    riskScore: 0.19,
    confidence: 0.86,
    status: 'normal',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_13',
    position: { x: 220, y: 310 },
    weaponSignal: {
      detected: false,
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },
  // CAM_14 - CRIME CAMERA (Accident)
  {
    id: 'CAM_14',
    name: 'Camera 14',
    zone: 'ZONE_C',
    riskScore: 0.58,  // ELEVATED RISK
    confidence: 0.91,
    status: 'suspicious',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_14',
    position: { x: 160, y: 330 },
    weaponSignal: {
      detected: false,   // No weapon in accident
      confidence: 0.0,
      boundingBoxCount: 0
    }
  },
  // CAM_15 - CRIME CAMERA (Explosion)
  {
    id: 'CAM_15',
    name: 'Camera 15',
    zone: 'ZONE_C',
    riskScore: 0.92,  // CRITICAL RISK
    confidence: 0.89,
    status: 'high_risk',
    imagePlaceholder: 'https://via.placeholder.com/640x360/1a1a2e/ffffff?text=CAM_15',
    position: { x: 200, y: 320 },
    weaponSignal: {
      detected: true,    // Explosive device detected
      confidence: 0.88,
      boundingBoxCount: 1
    }
  }
];

// ============================================================================
// ZONE INITIAL DATA
// ============================================================================

export const INITIAL_ZONES = [
  {
    id: 'ZONE_A',
    name: 'North Sector',
    cameraIds: ['CAM_01', 'CAM_02', 'CAM_03', 'CAM_04', 'CAM_05'],
    aggregatedRisk: 0.15,
    status: 'normal'
  },
  {
    id: 'ZONE_B',
    name: 'Central Sector',
    cameraIds: ['CAM_06', 'CAM_07', 'CAM_08', 'CAM_09', 'CAM_10'],
    aggregatedRisk: 0.15,
    status: 'normal'
  },
  {
    id: 'ZONE_C',
    name: 'South Sector',
    cameraIds: ['CAM_11', 'CAM_12', 'CAM_13', 'CAM_14', 'CAM_15'],
    aggregatedRisk: 0.16,
    status: 'normal'
  }
];

// ============================================================================
// VIDEO FEED MAPPING - 15 CAMERAS
// ============================================================================

/**
 * Maps camera IDs to their video sources
 * Proportion: ~2-3 normal videos per 1 incident video (60/40 ratio)
 * Videos autoplay, loop, muted - simulate live CCTV feeds
 */
export const CAMERA_VIDEO_SOURCES = [
  // Normal activity cameras (9 cameras - 60%)
  { id: 'CAM_01', video: 'normal1.mp4', category: 'normal' },
  { id: 'CAM_02', video: 'normal2.mp4', category: 'normal' },
  { id: 'CAM_04', video: 'normal3.mp4', category: 'normal' },
  { id: 'CAM_05', video: 'normal4.mp4', category: 'normal' },
  { id: 'CAM_07', video: 'normal5.mp4', category: 'normal' },
  { id: 'CAM_08', video: 'normal6.mp4', category: 'normal' },
  { id: 'CAM_10', video: 'normal7.mp4', category: 'normal' },
  { id: 'CAM_11', video: 'normal8.mp4', category: 'normal' },
  { id: 'CAM_13', video: 'normal9.mp4', category: 'normal' },
  
  // Incident cameras (6 cameras - 40%)
  { id: 'CAM_03', video: 'robbery_01.mp4', category: 'incident' },
  { id: 'CAM_06', video: 'stealing_01.mp4', category: 'incident' },
  { id: 'CAM_09', video: 'fighting_01.mp4', category: 'incident' },
  { id: 'CAM_12', video: 'robbery_02.mp4', category: 'incident' },
  { id: 'CAM_14', video: 'accident_01.mp4', category: 'incident' },
  { id: 'CAM_15', video: 'explosion_01.mp4', category: 'incident' },
];

/**
 * Get video source for a camera ID
 * @param {string} cameraId - Camera ID (e.g., 'CAM_01')
 * @returns {string|null} - Video filename or null if not found
 */
export const getVideoSource = (cameraId) => {
  const mapping = CAMERA_VIDEO_SOURCES.find(cam => cam.id === cameraId);
  return mapping ? `/videos/${mapping.video}` : null;
};

/**
 * Get video category for a camera ID
 * @param {string} cameraId - Camera ID
 * @returns {string} - 'normal' or 'incident'
 */
export const getVideoCategory = (cameraId) => {
  const mapping = CAMERA_VIDEO_SOURCES.find(cam => cam.id === cameraId);
  return mapping ? mapping.category : 'normal';
};

// ============================================================================
// RISK FUSION UTILITIES
// ============================================================================

/**
 * Calculate fused risk from activity and weapon signals
 */
export const calculateFusedRisk = (activityRisk, weaponSignal, consecutiveFrames = 0) => {
  let fusedScore = 0;
  let primarySignal = 'activity';
  
  const weaponDetected = weaponSignal.detected && weaponSignal.confidence > 0.5;
  
  // Contextual fusion
  if (weaponDetected && activityRisk > 0.3) {
    // Both signals present - multiplicative boost
    fusedScore = Math.max(activityRisk, weaponSignal.confidence) * SYSTEM_CONFIG.WEAPON_ACTIVITY_MULTIPLIER;
    primarySignal = 'both';
  } else if (weaponDetected) {
    // Weapon only
    fusedScore = weaponSignal.confidence * 0.9;
    primarySignal = 'weapon';
  } else {
    // Activity only
    fusedScore = activityRisk;
    primarySignal = 'activity';
  }
  
  // Temporal persistence boost
  if (consecutiveFrames >= SYSTEM_CONFIG.TEMPORAL_THRESHOLD) {
    fusedScore += SYSTEM_CONFIG.TEMPORAL_BOOST;
  }
  
  // Cap at 1.0
  fusedScore = Math.min(fusedScore, 1.0);
  
  // Determine fusion level
  let level = 'LOW';
  if (fusedScore >= FUSION_THRESHOLDS.CRITICAL) level = 'CRITICAL';
  else if (fusedScore >= FUSION_THRESHOLDS.HIGH) level = 'HIGH';
  else if (fusedScore >= FUSION_THRESHOLDS.ELEVATED) level = 'ELEVATED';
  
  return {
    level,
    score: fusedScore,
    primarySignal,
    confidence: Math.max(weaponSignal.confidence, activityRisk)
  };
};

/**
 * Get color for fusion level
 */
export const getFusionColor = (level) => {
  switch (level) {
    case 'CRITICAL': return COLORS.FUSION_CRITICAL;
    case 'HIGH': return COLORS.FUSION_HIGH;
    case 'ELEVATED': return COLORS.FUSION_ELEVATED;
    case 'LOW':
    default: return COLORS.FUSION_LOW;
  }
};

/**
 * Get micro-reason text for fusion
 */
export const getFusionReason = (fusedRisk, weaponSignal) => {
  const { level, primarySignal } = fusedRisk;
  
  if (level === 'LOW') return 'Monitoring';
  
  if (primarySignal === 'both') return '⚠ Activity + Weapon';
  if (primarySignal === 'weapon') return '🔫 Threat Indicators';
  if (primarySignal === 'activity') return '⚡ Activity Elevated';
  
  return 'Risk Elevated';
};

// ============================================================================
// SIMULATION SCENARIO TIMELINE
// ============================================================================

export const SCENARIO_TIMELINE = {
  // CAM_06 escalation (was CAM_04)
  CAM_06: {
    START_TIME: 10,
    PEAK_TIME: 25,
    START_RISK: 0.15,
    PEAK_RISK: 0.85,
    NORMALIZE_TIME: 45,
    WEAPON_START: 15,      // Weapon detection starts
    WEAPON_CONFIDENCE: 0.72,
  },
  
  // CAM_07 escalation (was CAM_05)
  CAM_07: {
    START_TIME: 12,
    PEAK_TIME: 27,
    START_RISK: 0.14,
    PEAK_RISK: 0.80,
    NORMALIZE_TIME: 45,
    WEAPON_START: 18,
    WEAPON_CONFIDENCE: 0.68,
  },
  
  // CAM_08 mild escalation (was CAM_06)
  CAM_08: {
    START_TIME: 15,
    PEAK_TIME: 22,
    START_RISK: 0.16,
    PEAK_RISK: 0.45,
    NORMALIZE_TIME: 30,
  }
};

// ============================================================================
// STATUS MAPPING (Legacy - still used in some components)
// ============================================================================

export const getStatusFromRisk = (riskScore) => {
  if (riskScore >= RISK_THRESHOLDS.CRITICAL) return 'high_risk';
  if (riskScore >= RISK_THRESHOLDS.NORMAL) return 'suspicious';
  return 'normal';
};

export const getColorFromStatus = (status) => {
  switch (status) {
    case 'high_risk':
      return COLORS.STATUS_CRITICAL;
    case 'suspicious':
      return COLORS.STATUS_SUSPICIOUS;
    case 'normal':
    default:
      return COLORS.STATUS_NORMAL;
  }
};

export const getColorFromRisk = (riskScore) => {
  const status = getStatusFromRisk(riskScore);
  return getColorFromStatus(status);
};

// ============================================================================
// FORMATTER UTILITIES
// ============================================================================

export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatRiskScore = (score) => {
  return score.toFixed(2);
};

export const formatConfidence = (confidence) => {
  return `${(confidence * 100).toFixed(0)}%`;
};

export const getTimeSince = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};