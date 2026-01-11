import React from 'react';
import Header from '../shared/Header';
import SimulationControls from '../shared/SimulationControls';
import { useGlobalState } from '../../context/GlobalStateContext';
import { Shield, Activity, Server, Download, CheckCircle } from 'lucide-react';

const Page4_SystemHealth = () => {
  const { state, actions } = useGlobalState();

  // Calculate system uptime (mock)
  const uptimeMinutes = Math.floor((Date.now() - new Date(state.system.lastUpdate).getTime()) / 60000);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <Header currentPage="System Health" />

      {/* Main Content */}
      <div className="h-[calc(100vh-60px)] p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2">
              System Health & Readiness
            </h1>
            <p className="text-lg text-slate-400">
              Infrastructure reliability and operational status
            </p>
          </div>

          {/* System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Cameras Online */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-green-500" />
                <p className="text-sm text-slate-400 font-semibold">Cameras Online</p>
              </div>
              <p className="text-3xl font-bold text-slate-100">
                {state.cameras.filter(c => c.status !== 'offline').length}/9
              </p>
              <p className="text-xs text-green-400 mt-1">All operational</p>
            </div>

            {/* Active Alerts */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-slate-400 font-semibold">Active Alerts</p>
              </div>
              <p className="text-3xl font-bold text-slate-100">
                {state.system.activeAlerts}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {state.system.activeAlerts === 0 ? 'No alerts' : 'Monitoring'}
              </p>
            </div>

            {/* System Mode */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-slate-400 font-semibold">System Mode</p>
              </div>
              <p className="text-2xl font-bold text-slate-100">
                {state.system.mode}
              </p>
              <p className="text-xs text-blue-400 mt-1">Running</p>
            </div>

            {/* Health Status */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-500" />
                <p className="text-sm text-slate-400 font-semibold">Health Status</p>
              </div>
              <p className="text-2xl font-bold text-green-400">
                {state.system.healthStatus}
              </p>
              <p className="text-xs text-slate-400 mt-1">All systems go</p>
            </div>
          </div>

          {/* Logs Download Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-slate-200">System Logs Export</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Download complete system logs in CSV format for audit and analysis purposes.
                  Logs include all risk changes, alerts, zone updates, and system events.
                </p>
                
                {/* Log Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500">Total Log Entries</p>
                    <p className="text-lg font-bold text-slate-200 font-mono">{state.logs.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Timeline Events</p>
                    <p className="text-lg font-bold text-slate-200 font-mono">{state.eventTimeline.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Total Alerts</p>
                    <p className="text-lg font-bold text-slate-200 font-mono">{state.alerts.length}</p>
                  </div>
                </div>

                <button
                  onClick={actions.downloadLogs}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-900/50 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Download Logs CSV
                </button>
              </div>
            </div>
          </div>

          {/* System Configuration */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">System Configuration</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between p-3 bg-slate-800 rounded">
                <span className="text-slate-400">Snapshot Refresh Rate:</span>
                <span className="text-slate-200 font-semibold font-mono">{state.system.snapshotRefreshRate / 1000}s</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-800 rounded">
                <span className="text-slate-400">Total Cameras:</span>
                <span className="text-slate-200 font-semibold font-mono">9</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-800 rounded">
                <span className="text-slate-400">Total Zones:</span>
                <span className="text-slate-200 font-semibold font-mono">3</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-800 rounded">
                <span className="text-slate-400">Alert Threshold:</span>
                <span className="text-slate-200 font-semibold font-mono">3 frames</span>
              </div>
            </div>
          </div>

          {/* Placeholder Features */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Additional Features (Coming Soon)</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <span>Camera connectivity monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <span>Processing latency metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <span>System resource utilization (CPU, Memory, Network)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <span>Heartbeat monitoring and failover status</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                <span>Historical uptime statistics</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-800 mt-4">
              <p className="text-sm text-slate-500 italic">
                This page demonstrates infrastructure-grade reliability monitoring
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-8 text-center">
            <span className="inline-block px-4 py-2 bg-green-900/30 border border-green-800/50 rounded-lg text-sm font-semibold text-green-300">
              Page 4 of 4 - Operational
            </span>
          </div>
        </div>
      </div>

      {/* Simulation Controls */}
      <SimulationControls />
    </div>
  );
};

export default Page4_SystemHealth;