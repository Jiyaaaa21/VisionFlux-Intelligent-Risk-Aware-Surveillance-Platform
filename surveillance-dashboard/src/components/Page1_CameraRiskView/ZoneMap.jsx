import React, { useState } from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import { getColorFromStatus } from '../../utils/constants';

const ZoneMap = () => {
  const { state, actions } = useGlobalState();
  const [hoveredZone, setHoveredZone] = useState(null);
  const [hoveredCamera, setHoveredCamera] = useState(null);

  const getZoneColor = (zoneId) => {
    const zone = state.zones.find(z => z.id === zoneId);
    if (!zone) return '#10b981';
    return getColorFromStatus(zone.status);
  };

  const getCameraColor = (cameraId) => {
    const camera = state.cameras.find(c => c.id === cameraId);
    if (!camera) return '#10b981';
    return getColorFromStatus(camera.status);
  };

  const getHeatmapOpacity = (zoneId) => {
    const zone = state.zones.find(z => z.id === zoneId);
    if (!zone) return 0.1;
    return Math.min(zone.aggregatedRisk * 0.7, 0.6);
  };

  const handleZoneClick = (zoneId) => {
    actions.selectZone(zoneId);
  };

  const handleCameraClick = (cameraId, e) => {
    e.stopPropagation();
    actions.openCameraModal(cameraId);
  };

  return (
    <div className="relative">
      <svg 
        width="100%" 
        height="240" 
        viewBox="0 0 320 240" 
        className="bg-slate-900 rounded-lg border border-slate-800"
      >
        {/* Radial gradients for heat map effect */}
        <defs>
          <radialGradient id="heatA" cx="50%" cy="50%">
            <stop 
              offset="0%" 
              stopColor={getZoneColor('ZONE_A')} 
              stopOpacity={getHeatmapOpacity('ZONE_A')} 
            />
            <stop 
              offset="100%" 
              stopColor={getZoneColor('ZONE_A')} 
              stopOpacity="0" 
            />
          </radialGradient>
          
          <radialGradient id="heatB" cx="50%" cy="50%">
            <stop 
              offset="0%" 
              stopColor={getZoneColor('ZONE_B')} 
              stopOpacity={getHeatmapOpacity('ZONE_B')} 
            />
            <stop 
              offset="100%" 
              stopColor={getZoneColor('ZONE_B')} 
              stopOpacity="0" 
            />
          </radialGradient>
          
          <radialGradient id="heatC" cx="50%" cy="50%">
            <stop 
              offset="0%" 
              stopColor={getZoneColor('ZONE_C')} 
              stopOpacity={getHeatmapOpacity('ZONE_C')} 
            />
            <stop 
              offset="100%" 
              stopColor={getZoneColor('ZONE_C')} 
              stopOpacity="0" 
            />
          </radialGradient>

          {/* Glow filter for high-risk zones */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Base map - dark blue teal background */}
        <rect width="320" height="240" fill="#0a1929"/>
        
        {/* Realistic curved street network */}
        <path d="M 0 60 Q 80 55 160 60 T 320 60" stroke="#1e3a52" strokeWidth="3" fill="none"/>
        <path d="M 0 120 Q 100 115 200 120 T 320 120" stroke="#1e3a52" strokeWidth="4" fill="none"/>
        <path d="M 0 180 Q 90 185 180 180 T 320 180" stroke="#1e3a52" strokeWidth="3" fill="none"/>
        
        <path d="M 80 0 Q 85 80 80 160 T 80 240" stroke="#1e3a52" strokeWidth="2" fill="none"/>
        <path d="M 160 0 Q 155 100 160 200 T 160 240" stroke="#1e3a52" strokeWidth="3" fill="none"/>
        <path d="M 240 0 Q 245 90 240 180 T 240 240" stroke="#1e3a52" strokeWidth="2" fill="none"/>
        
        {/* Building blocks */}
        <rect x="20" y="15" width="40" height="30" fill="#162b3d" opacity="0.6" rx="2"/>
        <rect x="100" y="20" width="50" height="25" fill="#162b3d" opacity="0.6" rx="2"/>
        <rect x="200" y="10" width="45" height="35" fill="#162b3d" opacity="0.6" rx="2"/>
        
        <rect x="30" y="75" width="35" height="30" fill="#162b3d" opacity="0.6" rx="2"/>
        <rect x="180" y="70" width="50" height="35" fill="#162b3d" opacity="0.6" rx="2"/>
        
        <rect x="25" y="135" width="40" height="30" fill="#162b3d" opacity="0.6" rx="2"/>
        <rect x="110" y="140" width="45" height="25" fill="#162b3d" opacity="0.6" rx="2"/>
        <rect x="210" y="135" width="50" height="30" fill="#162b3d" opacity="0.6" rx="2"/>
        
        <rect x="40" y="195" width="40" height="30" fill="#162b3d" opacity="0.6" rx="2"/>
        <rect x="150" y="200" width="45" height="25" fill="#162b3d" opacity="0.6" rx="2"/>
        <rect x="250" y="195" width="40" height="30" fill="#162b3d" opacity="0.6" rx="2"/>
        
        {/* Heat map overlays - Zone A (North) */}
        <ellipse
          cx="160"
          cy="40"
          rx="100"
          ry="50"
          fill="url(#heatA)"
          className="cursor-pointer transition-all duration-300 zone-interactive"
          onClick={() => handleZoneClick('ZONE_A')}
          onMouseEnter={() => setHoveredZone('ZONE_A')}
          onMouseLeave={() => setHoveredZone(null)}
          style={{ 
            opacity: hoveredZone === 'ZONE_A' ? 1 : 0.85,
            filter: state.ui.selectedZone === 'ZONE_A' ? 'brightness(1.3)' : 'brightness(1)'
          }}
        />
        
        {/* Heat map overlays - Zone B (Central) */}
        <ellipse
          cx="150"
          cy="120"
          rx="110"
          ry="45"
          fill="url(#heatB)"
          className="cursor-pointer transition-all duration-300 zone-interactive"
          onClick={() => handleZoneClick('ZONE_B')}
          onMouseEnter={() => setHoveredZone('ZONE_B')}
          onMouseLeave={() => setHoveredZone(null)}
          style={{ 
            opacity: hoveredZone === 'ZONE_B' ? 1 : 0.85,
            filter: state.ui.selectedZone === 'ZONE_B' ? 'brightness(1.3)' : 'brightness(1)'
          }}
        />
        
        {/* Heat map overlays - Zone C (South) */}
        <ellipse
          cx="160"
          cy="200"
          rx="105"
          ry="40"
          fill="url(#heatC)"
          className="cursor-pointer transition-all duration-300 zone-interactive"
          onClick={() => handleZoneClick('ZONE_C')}
          onMouseEnter={() => setHoveredZone('ZONE_C')}
          onMouseLeave={() => setHoveredZone(null)}
          style={{ 
            opacity: hoveredZone === 'ZONE_C' ? 1 : 0.85,
            filter: state.ui.selectedZone === 'ZONE_C' ? 'brightness(1.3)' : 'brightness(1)'
          }}
        />

        {/* Additional heat intensity layers for high-risk zones */}
        {state.zones.map(zone => {
          if (zone.aggregatedRisk < 0.40) return null;
          
          const positions = {
            'ZONE_A': { cx: 160, cy: 40 },
            'ZONE_B': { cx: 150, cy: 120 },
            'ZONE_C': { cx: 160, cy: 200 }
          };
          
          const pos = positions[zone.id];
          if (!pos) return null;
          
          return (
            <g key={`heat-${zone.id}`}>
              {/* Outer pulse ring */}
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r="40"
                fill={getZoneColor(zone.id)}
                opacity={zone.aggregatedRisk * 0.3}
                className="animate-pulse"
              />
              {/* Inner pulse ring */}
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r="25"
                fill={getZoneColor(zone.id)}
                opacity={zone.aggregatedRisk * 0.5}
                className="animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
            </g>
          );
        })}
        
        {/* Camera Markers */}
        {state.cameras.map(camera => {
          const adjustedPos = {
            x: (camera.position.x / 300) * 320,
            y: (camera.position.y / 360) * 240
          };
          
          const isHighlighted = state.ui.highlightedCameras.includes(camera.id);
          const cameraColor = getCameraColor(camera.id);
          const isHighRisk = camera.status === 'high_risk';
          
          return (
            <g
              key={camera.id}
              className="cursor-pointer"
              style={{ pointerEvents: 'all' }}
              onMouseEnter={() => setHoveredCamera(camera.id)}
              onMouseLeave={() => setHoveredCamera(null)}
            >
              {/* Glow effect for high-risk cameras */}
              {isHighRisk && (
                <circle
                  cx={adjustedPos.x}
                  cy={adjustedPos.y}
                  r="16"
                  fill={cameraColor}
                  fillOpacity="0.4"
                  className="animate-pulse"
                  filter="url(#glow)"
                  style={{ pointerEvents: 'none' }}
                />
              )}

              {/* Highlight effect for selected zone cameras */}
              {isHighlighted && (
                <>
                  <circle
                    cx={adjustedPos.x}
                    cy={adjustedPos.y}
                    r="14"
                    fill={cameraColor}
                    fillOpacity="0.3"
                    className="animate-pulse"
                    style={{ pointerEvents: 'none' }}
                  />
                  <circle
                    cx={adjustedPos.x}
                    cy={adjustedPos.y}
                    r="18"
                    fill="none"
                    stroke={cameraColor}
                    strokeWidth="2"
                    strokeOpacity="0.5"
                    className="animate-ping"
                    style={{ pointerEvents: 'none' }}
                  />
                </>
              )}
              
              {/* Main camera marker with click handler */}
              <circle
                cx={adjustedPos.x}
                cy={adjustedPos.y}
                r={hoveredCamera === camera.id ? "10" : "8"}
                fill={cameraColor}
                fillOpacity="0.9"
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-200"
                onClick={(e) => handleCameraClick(camera.id, e)}
                style={{ cursor: 'pointer' }}
              />
              
              {/* Camera number - pointer-events-none to not block clicks */}
              <text
                x={adjustedPos.x}
                y={adjustedPos.y}
                textAnchor="middle"
                dy="3"
                fill="#fff"
                fontSize="8"
                fontWeight="bold"
                style={{ pointerEvents: 'none' }}
              >
                {camera.id.split('_')[1]}
              </text>
            </g>
          );
        })}
        
        {/* Zone boundary lines - subtle dashed lines */}
        <line 
          x1="0" 
          y1="80" 
          x2="320" 
          y2="80" 
          stroke="#2a4a5c" 
          strokeWidth="1" 
          strokeDasharray="4,4" 
          opacity="0.3"
        />
        <line 
          x1="0" 
          y1="160" 
          x2="320" 
          y2="160" 
          stroke="#2a4a5c" 
          strokeWidth="1" 
          strokeDasharray="4,4" 
          opacity="0.3"
        />

        {/* Zone Labels */}
        <text 
          x="160" 
          y="25" 
          textAnchor="middle" 
          fill="#94a3b8" 
          fontSize="10" 
          fontWeight="600"
          opacity="0.7"
          style={{ pointerEvents: 'none' }}
        >
          ZONE A - NORTH
        </text>
        <text 
          x="150" 
          y="105" 
          textAnchor="middle" 
          fill="#94a3b8" 
          fontSize="10" 
          fontWeight="600"
          opacity="0.7"
          style={{ pointerEvents: 'none' }}
        >
          ZONE B - CENTRAL
        </text>
        <text 
          x="160" 
          y="185" 
          textAnchor="middle" 
          fill="#94a3b8" 
          fontSize="10" 
          fontWeight="600"
          opacity="0.7"
          style={{ pointerEvents: 'none' }}
        >
          ZONE C - SOUTH
        </text>
      </svg>
      
      {/* Zone Hover Tooltip */}
      {hoveredZone && (
        <div className="absolute top-1 right-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs shadow-lg pointer-events-none z-10">
          <p className="text-slate-300 font-semibold text-xs">
            {state.zones.find(z => z.id === hoveredZone)?.name}
          </p>
          <p className="text-slate-400 text-xs">
            Risk: {state.zones.find(z => z.id === hoveredZone)?.aggregatedRisk.toFixed(2)}
          </p>
          <p className="text-slate-500 text-xs">
            {state.zones.find(z => z.id === hoveredZone)?.cameraIds.length} cameras
          </p>
        </div>
      )}
      
      {/* Camera Hover Tooltip */}
      {hoveredCamera && (
        <div className="absolute bottom-1 left-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs shadow-lg pointer-events-none z-10">
          <p className="text-slate-300 font-semibold text-xs">
            {hoveredCamera}
          </p>
          <p className="text-slate-400 text-xs">
            Risk: {state.cameras.find(c => c.id === hoveredCamera)?.riskScore.toFixed(2)}
          </p>
          <p className="text-slate-500 text-xs">
            Click to view details
          </p>
        </div>
      )}
    </div>
  );
};

export default ZoneMap;