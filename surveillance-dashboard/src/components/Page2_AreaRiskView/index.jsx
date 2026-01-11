import React, { useState, useEffect, useRef } from 'react';
import Header from '../shared/Header';
import SimulationControls from '../shared/SimulationControls';
import { useGlobalState } from '../../context/GlobalStateContext';
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  Zap,
  Shield,
  Clock,
  Target,
  Layers,
  ArrowRight,
  Radio,
  Eye
} from 'lucide-react';

// ============================================================================
// ANIMATED PARTICLES BACKGROUND
// ============================================================================

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1
    }));

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 25, 41, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.fill();

        // Draw connections
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

// ============================================================================
// INTERACTIVE ZONE RISK HEATMAP
// ============================================================================

const ZoneRiskHeatmap = () => {
  const { state, actions } = useGlobalState();
  const [hoveredCell, setHoveredCell] = useState(null);
  const [animateWave, setAnimateWave] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateWave(prev => (prev + 1) % 30);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const getRiskIntensity = (risk) => Math.floor(risk * 10);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-5 hover:border-blue-500/50 transition-all group relative overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Scan line effect */}
      <div 
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
        style={{
          top: `${(animateWave / 30) * 100}%`,
          transition: 'top 0.15s linear'
        }}
      />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-400 animate-pulse" />
          Zone Risk Heat Matrix
          <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
            Live
          </span>
        </h3>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-500 rounded shadow-lg shadow-green-500/50" />
            <span className="text-slate-400">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-amber-500 rounded shadow-lg shadow-amber-500/50" />
            <span className="text-slate-400">Med</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded shadow-lg shadow-red-500/50" />
            <span className="text-slate-400">High</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5 relative z-10">
        {state.zones.map((zone, zoneIdx) => (
          <React.Fragment key={zone.id}>
            {Array.from({ length: 10 }).map((_, idx) => {
              const cellId = `${zoneIdx}-${idx}`;
              const intensity = getRiskIntensity(zone.aggregatedRisk);
              const isActive = idx < intensity;
              const isHovered = hoveredCell === cellId;
              
              let color = '#1e293b';
              let glowColor = 'rgba(30, 41, 59, 0)';
              
              if (isActive) {
                if (zone.aggregatedRisk >= 0.70) {
                  color = '#ef4444';
                  glowColor = 'rgba(239, 68, 68, 0.5)';
                } else if (zone.aggregatedRisk >= 0.40) {
                  color = '#f59e0b';
                  glowColor = 'rgba(245, 158, 11, 0.5)';
                } else {
                  color = '#10b981';
                  glowColor = 'rgba(16, 185, 129, 0.5)';
                }
              }

              return (
                <div
                  key={cellId}
                  className="aspect-square rounded-sm cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: color,
                    opacity: isActive ? (isHovered ? 1 : 0.8) : 0.2,
                    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: isHovered ? `0 0 20px ${glowColor}` : 'none',
                    zIndex: isHovered ? 10 : 1
                  }}
                  onMouseEnter={() => setHoveredCell(cellId)}
                  onMouseLeave={() => setHoveredCell(null)}
                  onClick={() => actions.selectZone(zone.id)}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-between mt-4 relative z-10">
        {state.zones.map((zone, idx) => (
          <button
            key={zone.id}
            onClick={() => actions.selectZone(zone.id)}
            className={`text-center px-3 py-2 rounded transition-all ${
              state.ui.selectedZone === zone.id
                ? 'bg-blue-500/20 border border-blue-500/50'
                : 'hover:bg-slate-800 border border-transparent'
            }`}
          >
            <p className="font-semibold text-slate-300 text-xs">{zone.name.split(' ')[0]}</p>
            <p className="text-lg font-bold text-slate-100">{zone.aggregatedRisk.toFixed(2)}</p>
            <p className="text-xs text-slate-500">{zone.cameraIds.length} cams</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// ENHANCED 3D ZONE VISUALIZATION
// ============================================================================

const Zone3DVisualization = () => {
  const { state, actions } = useGlobalState();
  const [selectedZone, setSelectedZone] = useState(null);

  const getZoneHeight = (risk) => 60 + (risk * 140);

  const getZoneColor = (risk) => {
    if (risk >= 0.70) return { 
      base: '#ef4444', 
      glow: '#ef444480',
      gradient: 'from-red-600 to-red-500' 
    };
    if (risk >= 0.40) return { 
      base: '#f59e0b', 
      glow: '#f59e0b80',
      gradient: 'from-amber-600 to-amber-500'
    };
    return { 
      base: '#10b981', 
      glow: '#10b98180',
      gradient: 'from-green-600 to-green-500'
    };
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-5 hover:border-blue-500/50 transition-all group relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            animation: 'grid-slide 20s linear infinite'
          }}
        />
      </div>

      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2 relative z-10">
        <Layers className="w-4 h-4 text-blue-400 animate-pulse" />
        3D Risk Levels
        <Radio className="w-3 h-3 text-green-400 animate-ping ml-auto" />
      </h3>

      <div className="relative h-72 flex items-end justify-around gap-6 px-8">
        {state.zones.map((zone, idx) => {
          const height = getZoneHeight(zone.aggregatedRisk);
          const colors = getZoneColor(zone.aggregatedRisk);
          const isSelected = selectedZone === zone.id || state.ui.selectedZone === zone.id;
          
          return (
            <div
              key={zone.id}
              className="relative flex-1 cursor-pointer group/bar"
              onClick={() => {
                setSelectedZone(zone.id);
                actions.selectZone(zone.id);
              }}
              onMouseEnter={() => setSelectedZone(zone.id)}
              onMouseLeave={() => setSelectedZone(null)}
            >
              {/* Hover glow */}
              {isSelected && (
                <div 
                  className="absolute -inset-2 rounded-lg animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* 3D Bar */}
              <div
                className={`relative w-full rounded-t-xl transition-all duration-700 overflow-hidden ${
                  isSelected ? 'scale-105' : 'scale-100'
                }`}
                style={{
                  height: `${height}px`,
                  background: `linear-gradient(to top, ${colors.base}, ${colors.base}dd, ${colors.base}bb)`,
                  boxShadow: `
                    0 0 30px ${colors.glow},
                    inset 0 -20px 30px rgba(0,0,0,0.4),
                    inset 0 2px 10px rgba(255,255,255,0.2)
                  `,
                  transform: 'perspective(600px) rotateX(5deg)',
                }}
              >
                {/* Animated shine */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'linear-gradient(135deg, transparent 40%, white 50%, transparent 60%)',
                    backgroundSize: '200% 200%',
                    animation: 'shine-move 3s infinite'
                  }}
                />

                {/* Scan lines */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                    animation: 'scan-move 2s linear infinite'
                  }}
                />
                
                {/* Value display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                  <div className="text-4xl font-bold mb-2 drop-shadow-lg">
                    {zone.aggregatedRisk.toFixed(2)}
                  </div>
                  <div className="text-xs opacity-90 uppercase tracking-wider">Risk Level</div>
                  <div className="mt-3 flex items-center gap-1 text-xs opacity-75">
                    <Eye className="w-3 h-3" />
                    {zone.cameraIds.length} active
                  </div>
                </div>

                {/* Pulse rings */}
                <div className="absolute inset-0 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                  <div 
                    className="absolute inset-0 border-2 rounded-t-xl"
                    style={{ 
                      borderColor: colors.base,
                      animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
                    }}
                  />
                </div>
              </div>

              {/* Base platform with glow */}
              <div 
                className="h-3 bg-slate-800 border-2 rounded-b-lg transition-all"
                style={{
                  borderColor: isSelected ? colors.base : '#475569',
                  boxShadow: isSelected ? `0 0 20px ${colors.glow}` : 'none'
                }}
              />

              {/* Zone info */}
              <div className="text-center mt-3 space-y-1">
                <p className="text-sm font-bold text-slate-200">{zone.name}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <span>{zone.cameraIds.length} cameras</span>
                  <span>•</span>
                  <span className={`font-semibold ${
                    zone.status === 'high_risk' ? 'text-red-400' :
                    zone.status === 'suspicious' ? 'text-amber-400' : 'text-green-400'
                  }`}>
                    {zone.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes shine-move {
          0% { background-position: 200% 200%; }
          100% { background-position: -200% -200%; }
        }
        @keyframes scan-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        @keyframes grid-slide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ENHANCED SYSTEM KPIS
// ============================================================================

const SystemKPIs = () => {
  const { state, actions } = useGlobalState();
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    {
      icon: Shield,
      label: 'Active Zones',
      value: state.zones.filter(z => z.status !== 'normal').length,
      total: state.zones.length,
      color: 'text-blue-400',
      bg: 'bg-blue-900/20',
      border: 'border-blue-800/50',
      accentColor: '#3b82f6'
    },
    {
      icon: AlertTriangle,
      label: 'High Risk Cameras',
      value: state.cameras.filter(c => c.status === 'high_risk').length,
      total: state.cameras.length,
      color: 'text-red-400',
      bg: 'bg-red-900/20',
      border: 'border-red-800/50',
      accentColor: '#ef4444'
    },
    {
      icon: Activity,
      label: 'Active Alerts',
      value: state.system.activeAlerts,
      total: state.alerts.length,
      color: 'text-amber-400',
      bg: 'bg-amber-900/20',
      border: 'border-amber-800/50',
      accentColor: '#f59e0b'
    },
    {
      icon: Zap,
      label: 'Avg System Risk',
      value: (state.cameras.reduce((sum, c) => sum + c.riskScore, 0) / state.cameras.length).toFixed(2),
      total: '1.00',
      color: 'text-green-400',
      bg: 'bg-green-900/20',
      border: 'border-green-800/50',
      accentColor: '#10b981'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        const isPulsing = pulseIndex === idx;
        
        return (
          <div
            key={idx}
            className={`${kpi.bg} border ${kpi.border} rounded-lg p-4 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1`}
            style={{
              boxShadow: isPulsing ? `0 0 30px ${kpi.accentColor}40` : 'none'
            }}
          >
            {/* Animated gradient background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${kpi.accentColor}10 0%, transparent 100%)`
              }}
            />

            {/* Scan line */}
            <div 
              className="absolute inset-x-0 h-px opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${kpi.accentColor}, transparent)`,
                animation: 'scan-horizontal 2s linear infinite'
              }}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <Icon className={`w-10 h-10 ${kpi.color} transition-transform group-hover:scale-110`} />
                  {isPulsing && (
                    <div 
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ backgroundColor: kpi.accentColor, opacity: 0.3 }}
                    />
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div 
                    className={`w-2 h-2 rounded-full ${kpi.color.replace('text', 'bg')} animate-pulse`}
                    style={{ boxShadow: `0 0 10px ${kpi.accentColor}` }}
                  />
                  <ArrowRight className={`w-3 h-3 ${kpi.color} opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1`} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-slate-100 transition-all group-hover:text-5xl">
                    {kpi.value}
                  </p>
                  <span className="text-xl text-slate-500">/{kpi.total}</span>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  {kpi.label}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000"
                  style={{
                    width: `${(parseFloat(kpi.value) / parseFloat(kpi.total)) * 100}%`,
                    backgroundColor: kpi.accentColor
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        @keyframes scan-horizontal {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ENHANCED RISK PERSISTENCE TIMELINE
// ============================================================================

const RiskPersistenceTimeline = () => {
  const { state } = useGlobalState();
  const [expandedZone, setExpandedZone] = useState(null);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-5 hover:border-blue-500/50 transition-all relative overflow-hidden">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
        Risk Persistence Timeline
      </h3>

      <div className="space-y-4">
        {state.zones.map(zone => {
          const isExpanded = expandedZone === zone.id;
          
          return (
            <div 
              key={zone.id} 
              className="space-y-2 cursor-pointer"
              onClick={() => setExpandedZone(isExpanded ? null : zone.id)}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-2">
                  {zone.name}
                  <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </span>
                <span className="text-slate-500 font-mono">{zone.aggregatedRisk.toFixed(2)}</span>
              </div>
              
              <div className="relative h-10 bg-slate-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Animated risk bar */}
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-700"
                  style={{
                    width: `${(zone.aggregatedRisk * 100)}%`,
                    background: zone.aggregatedRisk >= 0.70 
                      ? 'linear-gradient(90deg, #ef4444, #dc2626, #ef4444)'
                      : zone.aggregatedRisk >= 0.40
                      ? 'linear-gradient(90deg, #f59e0b, #d97706, #f59e0b)'
                      : 'linear-gradient(90deg, #10b981, #059669, #10b981)',
                    backgroundSize: '200% 100%',
                    animation: 'gradient-shift 3s ease infinite'
                  }}
                />
                
                {/* Pulse effect */}
                {zone.aggregatedRisk > 0.40 && (
                  <div 
                    className="absolute inset-y-0 right-0 w-2 animate-pulse"
                    style={{
                      background: zone.aggregatedRisk >= 0.70 ? '#ef4444' : '#f59e0b',
                      boxShadow: `0 0 15px ${zone.aggregatedRisk >= 0.70 ? '#ef4444' : '#f59e0b'}`
                    }}
                  />
                )}

                {/* Camera count overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xs font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {zone.cameraIds.length} cameras • {((zone.aggregatedRisk * 100).toFixed(0))}% risk
                  </span>
                </div>

                {/* Scan line effect */}
                {isExpanded && (
                  <div 
                    className="absolute inset-y-0 left-0 w-1 bg-white/50"
                    style={{
                      animation: 'scan-bar 2s linear infinite'
                    }}
                  />
                )}
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-2 p-3 bg-slate-900/50 rounded border border-slate-700 space-y-2 animate-fadeIn">
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-slate-500">Status</p>
                      <p className={`font-semibold ${
                        zone.status === 'high_risk' ? 'text-red-400' :
                        zone.status === 'suspicious' ? 'text-amber-400' : 'text-green-400'
                      }`}>
                        {zone.status.replace('_', ' ').toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Cameras</p>
                      <p className="font-semibold text-slate-300">{zone.cameraIds.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Zone ID</p>
                      <p className="font-semibold text-slate-300 font-mono">{zone.id}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes scan-bar {
          0% { left: 0; }
          100% { left: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ENHANCED EVENT TABLE
// ============================================================================

const EventAggregationTable = () => {
  const { state } = useGlobalState();
  const [filter, setFilter] = useState('all');

  const recentEvents = state.eventTimeline
    .filter(e => filter === 'all' || e.entityType === filter)
    .slice(0, 10);

  const getEventColor = (action) => {
    if (action.includes('Alert Generated')) return { text: 'text-red-400', bg: 'bg-red-900/20', icon: AlertTriangle };
    if (action.includes('Alert Resolved')) return { text: 'text-green-400', bg: 'bg-green-900/20', icon: Shield };
    if (action.includes('Risk')) return { text: 'text-amber-400', bg: 'bg-amber-900/20', icon: TrendingUp };
    return { text: 'text-blue-400', bg: 'bg-blue-900/20', icon: Activity };
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-5 hover:border-blue-500/50 transition-all relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
          Recent System Events
          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
            {recentEvents.length}
          </span>
        </h3>

        {/* Filter buttons */}
        <div className="flex gap-1">
          {['all', 'alert', 'camera', 'zone'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
            className={`px-2 py-1 text-xs rounded transition-all ${
            filter === f
              ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  </div>

  <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
    {recentEvents.length === 0 ? (
      <div className="text-center py-12 text-slate-500">
        <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">No events recorded yet</p>
        <p className="text-xs text-slate-600 mt-1">Events will appear here as they occur</p>
      </div>
    ) : (
      recentEvents.map((event, idx) => {
        const eventStyle = getEventColor(event.systemAction);
        const EventIcon = eventStyle.icon;
        
        return (
          <div
            key={event.id}
            className={`${eventStyle.bg} rounded-lg p-3 border border-slate-700/50 hover:border-slate-600 transition-all group hover:scale-[1.02] cursor-pointer`}
            style={{
              animation: `slideIn 0.3s ease-out ${idx * 0.05}s both`
            }}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded ${eventStyle.bg} border border-slate-700`}>
                <EventIcon className={`w-4 h-4 ${eventStyle.text}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${eventStyle.text} mb-1 flex items-center gap-2`}>
                  {event.systemAction}
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-xs text-slate-400 truncate">{event.details}</p>
              </div>
              
              <div className="text-right flex-shrink-0 space-y-1">
                <p className="text-xs text-slate-400 font-mono">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </p>
                <span className={`inline-block px-2 py-0.5 ${eventStyle.bg} ${eventStyle.text} text-xs rounded border border-current/30`}>
                  {event.entityType}
                </span>
              </div>
            </div>
          </div>
        );
      })
    )}
  </div>

  <style jsx>{`
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}</style>
</div>

);
};
// ============================================================================
// MAIN PAGE 2 COMPONENT
// ============================================================================
const Page2_AreaRiskView = () => {
const { state } = useGlobalState();
return (
<div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col relative overflow-hidden">
{/* Particle Background */}
<div className="fixed inset-0 z-0">
<ParticleBackground />
</div>

{/* Mode Watermark */}
  {state.system.mode === 'SIMULATION' && (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
      <p className="text-9xl font-black text-blue-500 transform -rotate-45">
        SIMULATION MODE
      </p>
    </div>
  )}

  <Header currentPage="Area Risk View" />

  {/* Main Content */}
  <div className="flex-1 p-6 overflow-y-auto relative z-10">
    <div className="max-w-[1800px] mx-auto space-y-6">
      {/* KPIs Section */}
      <SystemKPIs />

      {/* Main Visualizations Row */}
      <div className="grid grid-cols-2 gap-6">
        <Zone3DVisualization />
        <ZoneRiskHeatmap />
      </div>

      {/* Timeline and Events Row */}
      <div className="grid grid-cols-2 gap-6">
        <RiskPersistenceTimeline />
        <EventAggregationTable />
      </div>
    </div>
  </div>

  <SimulationControls />
</div>
);
};
export default Page2_AreaRiskView;