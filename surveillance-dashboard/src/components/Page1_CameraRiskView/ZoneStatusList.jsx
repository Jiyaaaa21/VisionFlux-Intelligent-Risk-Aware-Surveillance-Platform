import React from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import { getColorFromStatus, formatRiskScore } from '../../utils/constants';

const ZoneStatusList = () => {
  const { state, actions } = useGlobalState();

  const handleZoneClick = (zoneId) => {
    actions.selectZone(zoneId);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'high_risk':
        return 'High Risk';
      case 'suspicious':
        return 'Suspicious';
      case 'normal':
      default:
        return 'Normal';
    }
  };

  return (
    <div className="space-y-2">
      {state.zones.map(zone => {
        const isSelected = state.ui.selectedZone === zone.id;
        const statusColor = getColorFromStatus(zone.status);

        return (
          <div
            key={zone.id}
            onClick={() => handleZoneClick(zone.id)}
            className={`bg-slate-800 rounded-lg p-3 cursor-pointer transition-all duration-200 ${
              isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:bg-slate-750'
            }`}
            style={{
              borderLeft: `4px solid ${statusColor}`
            }}
          >
            <div className="flex justify-between items-start">
              {/* Left: Zone Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm text-slate-200">
                    {zone.name}
                  </h4>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: statusColor }}
                  />
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {zone.id}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {zone.cameraIds.length} camera{zone.cameraIds.length > 1 ? 's' : ''}
                </p>
              </div>

              {/* Right: Risk Score and Status */}
              <div className="text-right">
                <p className="text-lg font-bold text-slate-200 font-mono">
                  {formatRiskScore(zone.aggregatedRisk)}
                </p>
                <p
                  className="text-xs font-semibold capitalize mt-1"
                  style={{ color: statusColor }}
                >
                  {getStatusText(zone.status)}
                </p>
              </div>
            </div>

            {/* Camera IDs */}
            {isSelected && (
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-500 mb-1">Cameras:</p>
                <div className="flex flex-wrap gap-1">
                  {zone.cameraIds.map(camId => {
                    const camera = state.cameras.find(c => c.id === camId);
                    const camColor = camera ? getColorFromStatus(camera.status) : '#64748b';
                    
                    return (
                      <span
                        key={camId}
                        className="px-2 py-1 rounded text-xs font-semibold bg-slate-900"
                        style={{ color: camColor }}
                      >
                        {camId}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ZoneStatusList;