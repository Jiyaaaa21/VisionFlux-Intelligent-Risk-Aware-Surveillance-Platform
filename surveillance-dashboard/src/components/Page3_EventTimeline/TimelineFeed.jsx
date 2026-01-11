import React from 'react';
import TimelineEventCard from './TimelineEventCard';
import EmptyState from './EmptyState';
import { groupEventsByDate } from '../../utils/timelineHelpers';

const TimelineFeed = ({ events, isLoading, hasFilters, onClearFilters, onCameraClick, onZoneClick }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading timeline events...</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return <EmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} />;
  }

  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="space-y-8">
      {Object.entries(groupedEvents).map(([dateLabel, dateEvents]) => (
        <div key={dateLabel} className="relative">
          {/* Date Header */}
          <div className="sticky top-[180px] z-10 mb-4">
            <div className="inline-block bg-slate-900 border border-slate-700 rounded-full px-4 py-1.5">
              <span className="text-sm font-semibold text-slate-300">{dateLabel}</span>
            </div>
          </div>

          {/* Timeline Line */}
          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-800"></div>

          {/* Events */}
          <div className="space-y-4 ml-14">
            {dateEvents.map((event, idx) => (
              <div key={event.id} className="relative animate-fadeIn">
                {/* Timeline Dot */}
                <div className="absolute -left-[3.25rem] top-6 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-600 shadow-lg shadow-blue-600/50"></div>
                
                <TimelineEventCard 
                  event={event} 
                  onCameraClick={onCameraClick}
                  onZoneClick={onZoneClick}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineFeed;