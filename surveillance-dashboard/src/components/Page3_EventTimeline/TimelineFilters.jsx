import React from 'react';
import { Search, Camera, MapPin, Filter, X, ArrowUpDown } from 'lucide-react';

const TimelineFilters = ({
  searchText,
  onSearchChange,
  cameras,
  selectedCamera,
  onCameraChange,
  zones,
  selectedZone,
  onZoneChange,
  selectedEventType,
  onEventTypeChange,
  sortOrder,
  onSortChange,
  onClearFilters
}) => {
  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'risk_change', label: 'Risk Changes' },
    { value: 'alert', label: 'Alert Activity' },
    { value: 'system', label: 'System Events' },
    { value: 'zone', label: 'Zone Updates' }
  ];

  const hasActiveFilters = searchText || selectedCamera || selectedZone || selectedEventType !== 'all';
  const activeFilterCount = [searchText, selectedCamera, selectedZone, selectedEventType !== 'all'].filter(Boolean).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-6 sticky top-0 z-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-300">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>

        {/* Camera Filter */}
        <div className="relative">
          <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedCamera || ''}
            onChange={(e) => onCameraChange(e.target.value || null)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-8 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-600 transition-colors appearance-none cursor-pointer"
          >
            <option value="">All Cameras</option>
            {cameras.map(camera => (
              <option key={camera.id} value={camera.id}>
                {camera.id}
              </option>
            ))}
          </select>
        </div>

        {/* Zone Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedZone || ''}
            onChange={(e) => onZoneChange(e.target.value || null)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-8 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-600 transition-colors appearance-none cursor-pointer"
          >
            <option value="">All Zones</option>
            {zones.map(zone => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>

        {/* Event Type Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedEventType}
            onChange={(e) => onEventTypeChange(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-8 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-600 transition-colors appearance-none cursor-pointer"
          >
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort Order */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800">
        <ArrowUpDown className="w-4 h-4 text-slate-400" />
        <span className="text-xs text-slate-400">Sort:</span>
        <button
          onClick={() => onSortChange('newest')}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            sortOrder === 'newest'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Newest First
        </button>
        <button
          onClick={() => onSortChange('oldest')}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            sortOrder === 'oldest'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Oldest First
        </button>
      </div>
    </div>
  );
};

export default TimelineFilters;