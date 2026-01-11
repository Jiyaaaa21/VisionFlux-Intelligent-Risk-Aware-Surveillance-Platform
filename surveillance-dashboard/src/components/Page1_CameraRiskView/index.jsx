import React from 'react';
import Header from '../shared/Header';
import SimulationControls from '../shared/SimulationControls';
import ZoneMap from './ZoneMap';
import SystemGauges from './SystemGauges';
import ZoneStatusList from './ZoneStatusList';
import ActiveAlertsList from './ActiveAlertsList';
import CameraGrid from './CameraGrid';
import CameraModal from './CameraModal';
import { useGlobalState } from '../../context/GlobalStateContext';

const Page1_CameraRiskView = () => {
  const { state } = useGlobalState();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col relative">
      {/* Mode Watermark */}
      {state.system.mode === 'SIMULATION' && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
          <p className="text-9xl font-black text-blue-500 transform -rotate-45">
            SIMULATION MODE
          </p>
        </div>
      )}

      {/* Header */}
      <Header currentPage="Camera Risk View" />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Left Panel - Reduced width, tighter spacing */}
        <aside className="w-80 bg-slate-900 border-r border-slate-800 overflow-y-auto flex-shrink-0">
          <div className="p-3 space-y-3">
            <section>
              <h3 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Zone Overview
              </h3>
              <ZoneMap />
            </section>

            <section>
              <h3 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                System Status
              </h3>
              <SystemGauges />
            </section>

            <section>
              <h3 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Zone Status
              </h3>
              <ZoneStatusList />
            </section>

            <section>
              <h3 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Active Alerts
              </h3>
              <ActiveAlertsList />
            </section>
          </div>
        </aside>

        {/* Right Panel - More space for cameras */}
        <main className="flex-1 p-4 overflow-y-auto bg-slate-950">
          <CameraGrid />
        </main>
      </div>

      {state.ui.modalCamera && <CameraModal />}
      <SimulationControls />
    </div>
  );
};

export default Page1_CameraRiskView;