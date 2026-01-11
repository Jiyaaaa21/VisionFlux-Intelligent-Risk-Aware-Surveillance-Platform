import React, { useState } from 'react';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  Download,
  AlertTriangle,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { useGlobalState } from '../../context/GlobalStateContext';
import useSimulation from '../../hooks/useSimulation';

const SimulationControls = () => {
  const { state, actions } = useGlobalState();
  const simulation = useSimulation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(null);

  const handleOverrideAction = (action, actionName) => {
    setShowConfirmation({ action, actionName });
  };

  const executeOverride = () => {
    if (showConfirmation) {
      showConfirmation.action();
      setShowConfirmation(null);
    }
  };

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl w-80 z-40">
        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-750 transition-colors rounded-t-lg"
          onClick={toggleExpanded}
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <p className="text-xs text-slate-300 font-semibold">
              SIMULATION CONTROL
            </p>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          )}
        </div>

        {isExpanded && (
          <div className="border-t border-slate-700 p-3 space-y-3">
            <button
              onClick={() => simulation.toggleRunning()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-xs font-semibold"
            >
              {simulation.isRunning ? 'Pause' : 'Resume'}
            </button>

            <button
              onClick={() => actions.downloadLogs()}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded text-xs font-semibold"
            >
              <Download className="w-3 h-3 inline mr-2" />
              Download Logs
            </button>
          </div>
        )}
      </div>

      {showConfirmation && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1100]"
          onClick={() => setShowConfirmation(null)}
        >
          <div
            className="bg-slate-800 border-2 border-red-600 rounded-lg p-6 max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-100 mb-3">
              Confirm Override
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              {showConfirmation.actionName}
            </p>
            <div className="flex gap-2">
              <button
                onClick={executeOverride}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-semibold"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmation(null)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimulationControls;
