import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Line } from 'react-chartjs-2';
import '../../styles/modals.css';

export function StudentModal({ student, onClose }) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  if (!student) return null;

  const historyData = {
    labels: ['Asmt 1', 'Asmt 2', 'Asmt 3', 'Asmt 4', 'Final'],
    datasets: [
      {
        label: 'Score History',
        data: student.history,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const historyOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { min: 0, max: 100 } }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-4" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Avatar src={student.avatar} alt={student.name} size="lg" />
            <div>
              <h2 className="text-xl font-bold m-0 text-primary">{student.name}</h2>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>ID: {student.id}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>•</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Section {student.section}</span>
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Performance Overview</h3>
            <Badge variant={student.risk.toLowerCase()}>{student.risk} Risk</Badge>
          </div>
          
          <div className="stat-grid">
            <div className="stat-box">
              <div className="stat-label">Current Score</div>
              <div className="stat-value">{student.score}%</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Attendance</div>
              <div className="stat-value">{student.attendance}%</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Class Rank</div>
              <div className="stat-value">#{student.rank}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Participation</div>
              <div className="stat-value">{student.participation}/100</div>
            </div>
          </div>

          <div style={{ marginTop: '32px' }}>
            <h3 style={{ marginBottom: '16px' }}>Score Progression</h3>
            <div style={{ height: '250px', width: '100%', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--glass-border)' }}>
               <Line data={historyData} options={historyOptions} />
            </div>
          </div>
          
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ marginBottom: '8px' }}>Faculty Notes</h3>
            <textarea 
              className="input" 
              style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
              placeholder="Add observation notes for this student..."
              defaultValue={student.risk === 'High' ? "Requires immediate intervention regarding attendance." : ""}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={onClose}>Save Notes</button>
        </div>
      </div>
    </div>
  );
}
