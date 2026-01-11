import React, { useEffect } from 'react';
import { X, Camera, MapPin, Activity, TrendingUp } from 'lucide-react';
import { useGlobalState } from '../../context/GlobalStateContext';
import {
  getColorFromStatus,
  formatRiskScore,
  formatConfidence,
  formatTimestamp
} from '../../utils/constants';

const CameraModal = () => {
  const { state, actions } = useGlobalState();

  const camera = state.cameras.find(c => c.id === state.ui.modalCamera);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        actions.closeCameraModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [actions]);

  if (!camera) return null;

  const zone = state.zones.find(z => z.id === camera.zone);
  const statusColor = getColorFromStatus(camera.status);

  const cameraAlerts = state.alerts.filter(a => a.cameraId === camera.id);
  const activeAlert = cameraAlerts.find(a => a.status === 'active');

  const riskHistory = [
    camera.riskScore - 0.20,
    camera.riskScore - 0.15,
    camera.riskScore - 0.10,
    camera.riskScore - 0.05,
    camera.riskScore
  ].map(r => Math.max(0.1, Math.min(1.0, r)));

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      actions.closeCameraModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-start justify-between z-10">
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${statusColor}20` }}
            >
              <Camera className="w-6 h-6" style={{ color: statusColor }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-100">{camera.id}</h2>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <p className="text-slate-400">{zone?.name || camera.zone}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={actions.closeCameraModal}
            className="text-slate-400 hover:text-slate-200 transition-colors p-2 hover:bg-slate-800 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <p className="text-3xl font-bold" style={{ color: statusColor }}>
              {formatRiskScore(camera.riskScore)}
            </p>
            <p className="text-slate-300">
              Confidence: {formatConfidence(camera.confidence)}
            </p>
          </div>

          {activeAlert && (
            <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4">
              <p className="text-red-300 font-bold">ACTIVE ALERT</p>
              <p className="text-red-400 text-sm">{activeAlert.description}</p>
              <p className="text-red-400/70 text-xs font-mono">
                Generated at {formatTimestamp(activeAlert.timestamp)}
              </p>
            </div>
          )}

          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              Risk Trend (Last 5 Snapshots)
            </h3>
            <div className="flex items-end gap-2 h-32">
              {riskHistory.map((risk, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${risk * 100}%`,
                    backgroundColor: statusColor
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 px-6 py-4">
          <button
            type="button"
            onClick={actions.closeCameraModal}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
