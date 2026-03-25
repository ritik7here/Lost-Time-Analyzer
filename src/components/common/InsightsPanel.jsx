import React, { useMemo } from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent } from './Card';
import { evaluateAIInsights } from '../../utils/mockData';

export function InsightsPanel({ students }) {
  const insights = useMemo(() => evaluateAIInsights(students), [students]);

  const getStyle = (type) => {
    switch(type) {
      case 'danger': return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--status-danger)', icon: <AlertTriangle size={18} /> };
      case 'warning': return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--status-warning)', icon: <AlertTriangle size={18} /> };
      case 'success': return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--status-success)', icon: <CheckCircle size={18} /> };
      default: return { bg: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', icon: <Info size={18} /> };
    }
  };

  if (!insights || insights.length === 0) return null;

  return (
    <Card className="insights-panel" style={{ marginBottom: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)' }}>
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--glass-border)' }}>
        <Lightbulb size={20} color="var(--accent-primary)" />
        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>AI Insights & Recommendations</h3>
      </div>
      <CardContent style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {insights.map((insight, idx) => {
          const style = getStyle(insight.type);
          return (
            <div key={idx} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              background: style.bg, 
              padding: '12px 16px', 
              borderRadius: 'var(--border-radius-md)',
              borderLeft: `4px solid ${style.color}`
            }}>
              <span style={{ color: style.color }}>{style.icon}</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {insight.message}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
