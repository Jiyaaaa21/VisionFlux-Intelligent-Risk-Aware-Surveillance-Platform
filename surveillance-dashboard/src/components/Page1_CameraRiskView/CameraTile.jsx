import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import { 
  calculateFusedRisk, 
  getFusionColor, 
  getFusionReason,
  formatRiskScore, 
  formatConfidence,
  getVideoSource // NEW: Import video mapping utility
} from '../../utils/constants';
import { Activity, Wifi, WifiOff, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

const CameraTile = ({ camera }) => {
  const { state, actions } = useGlobalState();
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  
  const isHighlighted = state.ui.highlightedCameras.includes(camera.id);

  // Get video source for this camera
  const videoSource = useMemo(() => getVideoSource(camera.id), [camera.id]);

  // Calculate fused risk
  const fusedRisk = useMemo(() => {
    return calculateFusedRisk(
      camera.riskScore,
      camera.weaponSignal,
      camera.consecutiveHighRiskFrames
    );
  }, [camera.riskScore, camera.weaponSignal, camera.consecutiveHighRiskFrames]);

  const fusionColor = getFusionColor(fusedRisk.level);
  const fusionReason = getFusionReason(fusedRisk, camera.weaponSignal);

  // Calculate trend
  const riskTrend = useMemo(() => {
    if (camera.consecutiveHighRiskFrames > 2) return 'rising';
    if (camera.riskScore < 0.2 && camera.consecutiveHighRiskFrames === 0) return 'falling';
    if (camera.riskScore >= 0.4 && camera.riskScore < 0.7) return 'stable-elevated';
    return 'stable';
  }, [camera.riskScore, camera.consecutiveHighRiskFrames]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      setVideoError(false);
    };

    const handleError = () => {
      console.error(`Failed to load video for ${camera.id}: ${videoSource}`);
      setVideoError(true);
      setVideoLoaded(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [videoSource, camera.id]);

  const getTimeSinceUpdate = () => {
    const seconds = Math.floor((new Date() - new Date(camera.lastUpdated)) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  const handleClick = (e) => {
    e.stopPropagation();
    actions.openCameraModal(camera.id);
  };

  const isStreaming = camera.status !== 'offline';
  const streamDelay = Math.floor((new Date() - new Date(camera.lastUpdated)) / 1000);
  const isDelayed = streamDelay > 10;

  // Get trend icon
  const getTrendIcon = () => {
    switch (riskTrend) {
      case 'rising':
        return <TrendingUp className="w-3 h-3 text-red-400" />;
      case 'falling':
        return <TrendingDown className="w-3 h-3 text-green-400" />;
      case 'stable-elevated':
        return <Minus className="w-3 h-3 text-yellow-400" />;
      default:
        return <Minus className="w-3 h-3 text-slate-500" />;
    }
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer camera-tile group"
      style={{
        border: `2px solid ${fusionColor}`,
        boxShadow: isHighlighted ? `0 0 20px ${fusionColor}` : 'none',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* ========================================
          VIDEO BACKGROUND LAYER (Z-INDEX 0)
      ======================================== */}
      <div className="relative aspect-video bg-slate-950">
        {/* Video Element - Base Layer */}
        {videoSource && !videoError ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={videoSource}
            autoPlay
            loop
            muted
            playsInline
            style={{ 
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        ) : null}

        {/* Fallback: Loading or Error State */}
        {(!videoLoaded || videoError) && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
            {videoError ? (
              <div className="flex flex-col items-center gap-2 text-slate-600">
                <AlertCircle className="w-8 h-8" />
                <span className="text-xs">Feed Unavailable</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-600">
                <div className="w-8 h-8 border-2 border-slate-700 border-t-slate-500 rounded-full animate-spin" />
                <span className="text-xs">Loading Feed...</span>
              </div>
            )}
          </div>
        )}

        {/* Gradient Overlays for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none z-[1]" />

        {/* ========================================
            OVERLAY LAYERS (Z-INDEX 10+)
        ======================================== */}

        {/* Top Overlays */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2 z-10">
          {/* Camera ID Badge */}
          <div className="bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold text-white shadow-lg">
            {camera.id}
          </div>

          {/* Fused Risk Badge - NEW */}
          <div className="flex items-center gap-1.5">
            {/* Streaming Status */}
            <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-1.5 py-1 rounded shadow-lg">
              {isStreaming ? (
                <Wifi className={`w-3 h-3 ${isDelayed ? 'text-yellow-400' : 'text-green-400'}`} />
              ) : (
                <WifiOff className="w-3 h-3 text-red-400" />
              )}
            </div>

            {/* Fusion Risk Badge */}
            <div 
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold backdrop-blur-sm shadow-lg ${
                fusedRisk.level !== 'LOW' ? 'animate-pulse' : ''
              }`}
              style={{
                backgroundColor: `${fusionColor}40`,
                color: fusionColor,
                border: `1px solid ${fusionColor}80`
              }}
            >
              {fusedRisk.level}
            </div>
          </div>
        </div>

        {/* Signal Indicators Row - NEW */}
        <div className="absolute top-11 left-2 right-2 flex items-center gap-2 z-10">
          {/* Activity Signal */}
          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs shadow-lg">
            <span className="text-slate-400">🏃</span>
            <span className="text-slate-200 font-mono font-bold">
              {formatRiskScore(camera.riskScore)}
            </span>
          </div>

          {/* Weapon Signal */}
          {camera.weaponSignal.detected && (
            <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs shadow-lg">
              <span className="text-red-400">🔫</span>
              <span className="text-red-300 font-mono font-bold">
                {formatRiskScore(camera.weaponSignal.confidence)}
              </span>
              {camera.weaponSignal.boundingBoxCount > 0 && (
                <span className="text-red-400">×{camera.weaponSignal.boundingBoxCount}</span>
              )}
            </div>
          )}

          {/* Persistence Indicator */}
          {camera.consecutiveHighRiskFrames > 0 && (
            <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs shadow-lg">
              <Activity className="w-3 h-3 text-yellow-400" />
              <span className="text-yellow-400 font-bold">
                {camera.consecutiveHighRiskFrames}x
              </span>
            </div>
          )}
        </div>

        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm px-2 py-1.5 z-10">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              {getTrendIcon()}
              {getTimeSinceUpdate()} ago
            </span>
            <span 
              className="font-semibold"
              style={{ color: fusionColor }}
            >
              {fusionReason}
            </span>
          </div>
        </div>

        {/* Hover Overlay - Fusion Breakdown */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center text-white transition-opacity duration-200 z-30">
            <div className="text-center space-y-2.5 px-6 w-full max-w-[90%]">
              {/* Fused Risk Score */}
              <div>
                <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider font-medium">Fused Risk</p>
                <p className="text-3xl font-bold mb-0.5" style={{ color: fusionColor }}>
                  {fusedRisk.level}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">Score: {formatRiskScore(fusedRisk.score)}</p>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-slate-600/60 mx-auto my-2" />

              {/* Signal Breakdown */}
              <div className="space-y-2 w-full">
                {/* Activity Signal Bar */}
                <div>
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <span className="text-slate-400 font-medium">Activity Risk</span>
                    <span className="text-slate-100 font-mono font-semibold">{formatRiskScore(camera.riskScore)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${camera.riskScore * 100}%` }}
                    />
                  </div>
                </div>

                {/* Weapon Signal Bar */}
                <div>
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <span className="text-slate-400 font-medium">Weapon Signal</span>
                    <span className="text-slate-100 font-mono font-semibold">
                      {camera.weaponSignal.detected 
                        ? formatRiskScore(camera.weaponSignal.confidence)
                        : '0.00'
                      }
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500 transition-all"
                      style={{ width: `${camera.weaponSignal.confidence * 100}%` }}
                    />
                  </div>
                </div>

                {/* Persistence Info */}
                {camera.consecutiveHighRiskFrames > 0 && (
                  <div className="flex justify-between items-center text-[10px] pt-0.5">
                    <span className="text-slate-400 font-medium">Persistence</span>
                    <span className="text-yellow-400 font-semibold">
                      {camera.consecutiveHighRiskFrames} frames
                    </span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-slate-600/60 mx-auto my-2" />

              {/* Additional Info */}
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Primary Signal</span>
                  <span className="text-slate-100 capitalize font-semibold">{fusedRisk.primarySignal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Zone</span>
                  <span className="text-slate-100 font-semibold">
                    {state.zones.find(z => z.id === camera.zone)?.name || camera.zone}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-slate-600/60 mx-auto my-2" />

              {/* Click hint */}
              <p className="text-[9px] text-slate-500 font-medium">Click to view full analysis</p>
            </div>
          </div>
        )}

        {/* Grid Pattern Overlay (Optional - Removed to show video clearly) */}
        {/* You can keep this if you want a subtle CCTV grid effect over video */}
        {/* <div className="absolute inset-0 pointer-events-none z-[2]">
          <svg width="100%" height="100%" className="opacity-5">
            <defs>
              <pattern id={`grid-${camera.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${camera.id})`} />
          </svg>
        </div> */}
      </div>

      {/* Critical Risk Pulse Effect */}
      {fusedRisk.level === 'CRITICAL' && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none z-5"
          style={{
            boxShadow: `inset 0 0 30px ${fusionColor}40`,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      )}

      {/* Fusion Level Indicator Line - Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 z-20">
        <div 
          className="h-full transition-all"
          style={{
            backgroundColor: fusionColor,
            boxShadow: `0 0 8px ${fusionColor}`
          }}
        />
      </div>
    </div>
  );
};

export default CameraTile;