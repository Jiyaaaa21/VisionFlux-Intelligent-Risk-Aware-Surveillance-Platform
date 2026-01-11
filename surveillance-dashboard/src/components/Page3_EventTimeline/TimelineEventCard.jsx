import React from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  Info,
  Camera,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { formatRelativeTime } from '../../utils/timelineHelpers';

const TimelineEventCard = ({ event, onCameraClick, onZoneClick }) => {
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-red-950/30',
          borderColor: 'border-red-900/50',
          textColor: 'text-red-300',
          iconColor: 'text-red-500',
          badgeBg: 'bg-red-900',
          badgeText: 'text-red-200'
        };
      case 'warning':
        return {
          icon: Info,
          bgColor: 'bg-amber-950/30',
          borderColor: 'border-amber-900/50',
          textColor: 'text-amber-300',
          iconColor: 'text-amber-500',
          badgeBg: 'bg-amber-900',
          badgeText: 'text-amber-200'
        };
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-950/30',
          borderColor: 'border-green-900/50',
          textColor: 'text-green-300',
          iconColor: 'text-green-500',
          badgeBg: 'bg-green-900',
          badgeText: 'text-green-200'
        };
      default: // info
        return {
          icon: Info,
          bgColor: 'bg-blue-950/30',
          borderColor: 'border-blue-900/50',
          textColor: 'text-blue-300',
          iconColor: 'text-blue-500',
          badgeBg: 'bg-blue-900',
          badgeText: 'text-blue-200'
        };
    }
  };

  const config = getSeverityConfig(event.severity);
  const Icon = config.icon;

  const formatRiskChange = (riskDelta) => {
    if (!riskDelta) return null;
    
    const change = ((riskDelta.to - riskDelta.from) / riskDelta.from * 100).toFixed(0);
    const isIncrease = riskDelta.direction === 'increase';
    
    return (
      <div className="flex items-center gap-2 text-sm mt-2 p-2 bg-slate-900/50 rounded">
        {isIncrease ? (
          <TrendingUp className="w-4 h-4 text-red-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-green-500" />
        )}
        <span className="text-slate-400">Risk Change:</span>
        <span className="font-mono text-slate-300">
          {riskDelta.from.toFixed(2)}
        </span>
        <ArrowRight className="w-3 h-3 text-slate-500" />
        <span className="font-mono text-slate-300">
          {riskDelta.to.toFixed(2)}
        </span>
        <span className={isIncrease ? 'text-red-400' : 'text-green-400'}>
          ({isIncrease ? '+' : ''}{change}%)
        </span>
      </div>
    );
  };

  return (
    <div 
      className={`${config.bgColor} border ${config.borderColor} rounded-lg p-4 transition-all duration-200 hover:shadow-lg hover:border-opacity-75`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
          <span className="text-xs text-slate-400 font-mono">
            {formatRelativeTime(event.timestamp)}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded font-semibold uppercase ${config.badgeBg} ${config.badgeText}`}>
          {event.severity}
        </span>
      </div>

      {/* Title & Context */}
      <div className="mb-2">
        <h4 className={`text-base font-bold ${config.textColor} mb-1`}>
          {event.systemAction}
        </h4>
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
          {event.cameraId && (
            <>
              <button
                onClick={() => onCameraClick && onCameraClick(event.cameraId)}
                className="flex items-center gap-1 hover:text-blue-400 transition-colors"
              >
                <Camera className="w-3 h-3" />
                {event.cameraId}
              </button>
              {event.zoneId && <span>•</span>}
            </>
          )}
          {event.zoneId && (
            <button
              onClick={() => onZoneClick && onZoneClick(event.zoneId)}
              className="flex items-center gap-1 hover:text-blue-400 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              {event.zoneId}
            </button>
          )}
        </div>
      </div>

      {/* Explanation */}
      <p className="text-sm text-slate-300 leading-relaxed mb-3">
        {event.explanation}
      </p>

      {/* Risk Delta */}
      {event.riskDelta && formatRiskChange(event.riskDelta)}

      {/* Consequences */}
      {event.consequences && event.consequences.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-800">
          <p className="text-xs text-slate-400 font-semibold mb-2">Actions Taken:</p>
          <ul className="space-y-1">
            {event.consequences.map((consequence, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className={`${config.textColor} mt-0.5`}>•</span>
                <span>{consequence}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimelineEventCard;