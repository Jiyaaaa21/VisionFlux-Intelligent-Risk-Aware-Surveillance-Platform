import React from 'react';
import { Clock, Filter, X } from 'lucide-react';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-full p-6 mb-6">
          <Filter className="w-12 h-12 text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-300 mb-2">No Events Match Your Filters</h3>
        <p className="text-slate-400 text-center mb-6 max-w-md">
          Try adjusting your search criteria or clearing filters to see more events.
        </p>
        <button
          onClick={onClearFilters}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <X className="w-5 h-5" />
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-full p-6 mb-6">
        <Clock className="w-12 h-12 text-slate-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-300 mb-2">No Events Yet</h3>
      <p className="text-slate-400 text-center max-w-md mb-6">
        The timeline will populate as system events occur. Risk changes, alerts, and system decisions will appear here.
      </p>
      
      {/* Sample Event Preview */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 max-w-md">
        <p className="text-xs text-slate-500 mb-2 font-semibold">SAMPLE EVENT STRUCTURE:</p>
        <div className="text-xs text-slate-400 space-y-1 font-mono">
          <div>• <span className="text-blue-400">Timestamp</span> - When the event occurred</div>
          <div>• <span className="text-amber-400">System Action</span> - What decision was made</div>
          <div>• <span className="text-green-400">Explanation</span> - Why it happened</div>
          <div>• <span className="text-red-400">Consequences</span> - What changed as a result</div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;