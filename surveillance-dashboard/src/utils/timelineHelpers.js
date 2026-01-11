// ============================================================================
// EXPLANATION GENERATORS
// ============================================================================

export const generateRiskExplanation = (oldRisk, newRisk, status, frames) => {
  if (status === 'high_risk') {
    return `Camera detected sustained suspicious activity over ${frames} consecutive frames (${frames * 2} seconds). Pattern analysis indicates potential security concern requiring immediate attention.`;
  }
  
  if (status === 'normal') {
    return `Risk level normalized after ${frames} frames of normal activity. No further suspicious patterns detected.`;
  }
  
  if (status === 'suspicious') {
    return `Camera identified unusual behavior patterns. Risk level elevated to suspicious status for enhanced monitoring.`;
  }
  
  const change = ((newRisk - oldRisk) / oldRisk * 100).toFixed(0);
  const direction = newRisk > oldRisk ? 'increased' : 'decreased';
  
  return `Risk level ${direction} by ${Math.abs(change)}% based on detected activity patterns.`;
};

export const generateConsequences = (status, cameraId, zoneName) => {
  const consequences = [];
  
  if (status === 'high_risk') {
    consequences.push('Alert monitoring activated');
    consequences.push(`Zone "${zoneName}" status elevated to high risk`);
    consequences.push('Security personnel notified for review');
  } else if (status === 'suspicious') {
    consequences.push('Enhanced monitoring enabled');
    consequences.push(`Zone "${zoneName}" marked for increased surveillance`);
  } else if (status === 'normal') {
    consequences.push('Camera returned to normal monitoring mode');
    consequences.push('Alert status cleared');
  }
  
  return consequences;
};

export const generateAlertExplanation = (description, riskScore) => {
  return `High-risk threshold exceeded with sustained suspicious activity. ${description}`;
};

export const generateAlertConsequences = (cameraId, zoneName) => {
  return [
    `Alert notification sent to security team`,
    `Camera ${cameraId} flagged for immediate review`,
    `Zone "${zoneName}" monitoring priority elevated`,
    `Event logged for audit trail`
  ];
};

// ============================================================================
// TIME FORMATTING
// ============================================================================

export const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins === 1) return '1 min ago';
  if (diffMins < 60) return `${diffMins} mins ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return then.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: then.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};

export const formatAbsoluteTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// ============================================================================
// EVENT GROUPING
// ============================================================================

export const groupEventsByDate = (events) => {
  const groups = {};
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  
  events.forEach(event => {
    const eventDate = new Date(event.timestamp).toDateString();
    let label;
    
    if (eventDate === today) {
      label = 'Today';
    } else if (eventDate === yesterday) {
      label = 'Yesterday';
    } else {
      label = new Date(event.timestamp).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
    
    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(event);
  });
  
  return groups;
};

// ============================================================================
// FILTERING & SEARCHING
// ============================================================================

export const eventMatchesSearch = (event, searchText) => {
  if (!searchText) return true;
  
  const searchLower = searchText.toLowerCase();
  return (
    event.systemAction?.toLowerCase().includes(searchLower) ||
    event.explanation?.toLowerCase().includes(searchLower) ||
    event.entityId?.toLowerCase().includes(searchLower) ||
    event.cameraId?.toLowerCase().includes(searchLower) ||
    event.zoneId?.toLowerCase().includes(searchLower) ||
    event.consequences?.some(c => c.toLowerCase().includes(searchLower))
  );
};

export const eventMatchesType = (event, eventType) => {
  if (eventType === 'all') return true;
  
  const typeMap = {
    'risk_change': ['escalation', 'normalization', 'risk_increase', 'risk_decrease', 'risk_change'],
    'alert': ['alert_generated', 'alert_resolved', 'alert'],
    'system': ['system_mode_change', 'system_status_change', 'system'],
    'zone': ['zone_risk_change', 'zone_escalation', 'zone']
  };
  
  const matchTypes = typeMap[eventType] || [];
  return matchTypes.some(type => 
    event.eventType === type || 
    event.entityType === type
  );
};

// ============================================================================
// STATISTICS
// ============================================================================

export const calculateTimelineStats = (events) => {
  const stats = {
    totalEvents: events.length,
    activeAlerts: 0,
    riskChangeEvents: 0,
    systemEvents: 0
  };
  
  events.forEach(event => {
    // Count risk change events
    if (eventMatchesType(event, 'risk_change')) {
      stats.riskChangeEvents++;
    }
    
    // Count active alerts
    if (event.eventType === 'alert_generated' || event.severity === 'critical') {
      stats.activeAlerts++;
    }
    
    // Count system events
    if (eventMatchesType(event, 'system')) {
      stats.systemEvents++;
    }
  });
  
  return stats;
};

// ============================================================================
// EVENT CREATION HELPERS
// ============================================================================

export const createTimelineEvent = ({
  entityType,
  entityId,
  eventType,
  systemAction,
  explanation,
  cameraId = null,
  zoneId = null,
  riskDelta = null,
  severity = 'info',
  consequences = []
}) => {
  return {
    id: `EVT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    entityType,
    entityId,
    eventType,
    systemAction,
    explanation,
    cameraId,
    zoneId,
    riskDelta,
    severity,
    consequences
  };
};