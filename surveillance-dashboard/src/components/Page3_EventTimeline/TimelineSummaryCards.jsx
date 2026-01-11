import React from 'react';
import { Clock, AlertTriangle, TrendingUp, Activity } from 'lucide-react';

const TimelineSummaryCards = ({ totalEvents, activeAlerts, riskChangeEvents, systemEvents }) => {
  const cards = [
    {
      icon: Clock,
      label: 'Total Events',
      value: totalEvents,
      color: 'blue',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-700',
      textColor: 'text-blue-400'
    },
    {
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: activeAlerts,
      color: 'red',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-700',
      textColor: 'text-red-400'
    },
    {
      icon: TrendingUp,
      label: 'Risk Changes',
      value: riskChangeEvents,
      color: 'amber',
      bgColor: 'bg-amber-900/20',
      borderColor: 'border-amber-700',
      textColor: 'text-amber-400'
    },
    {
      icon: Activity,
      label: 'System Events',
      value: systemEvents,
      color: 'green',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-700',
      textColor: 'text-green-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`${card.bgColor} border ${card.borderColor} rounded-lg p-4 transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 ${card.textColor}`} />
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {card.label}
              </span>
            </div>
            <div className={`text-3xl font-bold ${card.textColor}`}>
              {card.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineSummaryCards;