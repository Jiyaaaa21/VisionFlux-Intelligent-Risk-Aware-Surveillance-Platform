import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../shared/Header';
import SimulationControls from '../shared/SimulationControls';
import TimelineSummaryCards from './TimelineSummaryCards';
import TimelineFilters from './TimelineFilters';
import TimelineFeed from './TimelineFeed';
import { useGlobalState } from '../../context/GlobalStateContext';
import { 
  eventMatchesSearch, 
  eventMatchesType, 
  calculateTimelineStats 
} from '../../utils/timelineHelpers';

const Page3_EventTimeline = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();
  
  // Filter State
  const [searchText, setSearchText] = useState('');
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Clear all filters
  const handleClearFilters = () => {
    setSearchText('');
    setSelectedCamera(null);
    setSelectedZone(null);
    setSelectedEventType('all');
  };

  // Check if filters are active
  const hasActiveFilters = searchText || selectedCamera || selectedZone || selectedEventType !== 'all';

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = state.eventTimeline.filter(event => {
      // Search filter
      if (searchText && !eventMatchesSearch(event, searchText)) {
        return false;
      }
      
      // Camera filter
      if (selectedCamera && event.cameraId !== selectedCamera) {
        return false;
      }
      
      // Zone filter
      if (selectedZone) {
        const zone = state.zones.find(z => z.id === selectedZone);
        if (zone && event.zoneId !== zone.name) {
          return false;
        }
      }
      
      // Event type filter
      if (!eventMatchesType(event, selectedEventType)) {
        return false;
      }
      
      return true;
    });
    
    // Sort
    return filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [state.eventTimeline, searchText, selectedCamera, selectedZone, selectedEventType, sortOrder, state.zones]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    return calculateTimelineStats(filteredEvents);
  }, [filteredEvents]);

  // Handle navigation to camera/zone
  const handleCameraClick = (cameraId) => {
    navigate('/cameras');
    // Could add additional logic to highlight camera
  };

  const handleZoneClick = (zoneId) => {
    navigate('/areas');
    // Could add additional logic to select zone
  };

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
      <Header currentPage="Event Timeline" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-600/30">
                <svg 
                  className="w-8 h-8 text-blue-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-100">
                  Event Intelligence Timeline
                </h1>
                <p className="text-slate-400 mt-1">
                  Explainability and audit layer for system decisions
                </p>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <TimelineSummaryCards
            totalEvents={summaryStats.totalEvents}
            activeAlerts={summaryStats.activeAlerts}
            riskChangeEvents={summaryStats.riskChangeEvents}
            systemEvents={summaryStats.systemEvents}
          />

          {/* Filters */}
          <TimelineFilters
            searchText={searchText}
            onSearchChange={setSearchText}
            cameras={state.cameras}
            selectedCamera={selectedCamera}
            onCameraChange={setSelectedCamera}
            zones={state.zones}
            selectedZone={selectedZone}
            onZoneChange={setSelectedZone}
            selectedEventType={selectedEventType}
            onEventTypeChange={setSelectedEventType}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onClearFilters={handleClearFilters}
          />

          {/* Timeline Feed */}
          <TimelineFeed
            events={filteredEvents}
            isLoading={false}
            hasFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
            onCameraClick={handleCameraClick}
            onZoneClick={handleZoneClick}
          />
        </div>
      </main>

      {/* Simulation Controls */}
      <SimulationControls />
    </div>
  );
};

export default Page3_EventTimeline;