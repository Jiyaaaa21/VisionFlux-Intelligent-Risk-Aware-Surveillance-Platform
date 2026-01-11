import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import { useGlobalState } from '../../context/GlobalStateContext';
import { formatTimestamp, formatRiskScore } from '../../utils/constants';

const ActiveAlertsList = () => {
  const { state, actions } = useGlobalState();

  // Get active alerts (most recent first)
  const activeAlerts = state.alerts
    .filter(a => a.status === 'active')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10); // Show last 10 alerts

  const handleAlertClick = (alert) => {
    actions.openCameraModal(alert.cameraId);
  };

  if (activeAlerts.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-8 h-8 text-slate-600" />
          <p className="text-slate-500 text-sm font-medium">No active alerts</p>
          <p className="text-slate-600 text-xs">System monitoring normally</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
      {activeAlerts.map(alert => {
        const camera = state.cameras.find(c => c.id === alert.cameraId);
        const zone = state.zones.find(z => z.id === alert.zoneId);

        return (
          <div
            key={alert.id}
            onClick={() => handleAlertClick(alert)}
            className="bg-red-950/30 border border-red-900/50 rounded-lg p-3 cursor-pointer hover:bg-red-900/40 transition-all duration-200 hover:border-red-800 group"
          >
            <div className="flex items-start gap-2">
              {/* Alert Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" />
              </div>

              {/* Alert Content */}
              <div className="flex-1 min-w-0">
                {/* Camera ID and Zone */}
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-bold text-red-200 group-hover:text-red-100">
                    {alert.cameraId}
                  </h4>
                  {zone && (
                    <span className="text-xs text-red-400/70 font-medium">
                      {zone.name}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-red-300/90 mb-2 leading-relaxed">
                  {alert.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-3 text-xs">
                  {/* Timestamp */}
                  <div className="flex items-center gap-1 text-red-400/70">
                    <Clock className="w-3 h-3" />
                    <span className="font-mono">
                      {formatTimestamp(alert.timestamp)}
                    </span>
                  </div>

                  {/* Risk Score */}
                  <div className="flex items-center gap-1">
                    <span className="text-red-400/70">Risk:</span>
                    <span className="text-red-300 font-bold font-mono">
                      {formatRiskScore(alert.riskScore)}
                    </span>
                  </div>

                  {/* Confidence */}
                  <div className="flex items-center gap-1">
                    <span className="text-red-400/70">Conf:</span>
                    <span className="text-red-300 font-mono">
                      {(alert.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Pulse Indicator */}
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveAlertsList;