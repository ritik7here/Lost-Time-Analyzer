import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { StudentRadarChart } from '../components/charts/StudentRadarChart';
import { mockStudents } from '../utils/mockData';
import '../styles/pages.css';

export function Compare() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedStudents = mockStudents.filter(s => selectedIds.includes(s.id));

  const searchResults = searchTerm.length > 1
    ? mockStudents.filter(s =>
      (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !selectedIds.includes(s.id)
    ).slice(0, 5)
    : [];

  const addStudent = (id) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
      setSearchTerm('');
    }
  };

  const removeStudent = (id) => {
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Compare Students</h1>
          <p className="page-subtitle">Select up to 4 students for side-by-side multi-metric comparison.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexDirection: 'column' }}>
        {/* Selection Area */}
        <Card>
          <CardContent style={{ padding: 'var(--spacing-md)' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px', marginBottom: 'var(--spacing-md)' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder={selectedIds.length >= 4 ? "Maximum students selected" : "Search student to add..."}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  disabled={selectedIds.length >= 4}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 36px',
                    borderRadius: '12px',
                    border: '1px solid var(--border, #334155)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border, #334155)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.02)'; }}
                />
              </div>

              {searchResults.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)', zIndex: 10, marginTop: '4px', boxShadow: 'var(--glass-shadow)' }}>
                  {searchResults.map(s => (
                    <div
                      key={s.id}
                      onClick={() => addStudent(s.id)}
                      style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderBottom: '1px solid var(--glass-border)' }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Avatar src={s.avatar} size="sm" />
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{s.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.id}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {selectedStudents.map(student => (
                <div key={student.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: 'var(--border-radius-sm)' }}>
                  <Avatar src={student.avatar} size="md" />
                  <div>
                    <div style={{ fontWeight: 500 }}>{student.name}</div>
                    <Badge variant={student.risk.toLowerCase()} style={{ marginTop: '4px' }}>{student.risk}</Badge>
                  </div>
                  <button onClick={() => removeStudent(student.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: 'auto', padding: '4px' }}>
                    <X size={16} />
                  </button>
                </div>
              ))}
              {selectedStudents.length === 0 && (
                <div style={{ color: 'var(--text-muted)', padding: '12px 0' }}>No students selected yet. Use the search bar to add someone.</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Charts and Compare Area */}
        {selectedStudents.length > 0 && (
          <div className="dashboard-grid" style={{ marginTop: '0' }}>
            <Card className="col-span-6 chart-card">
              <CardHeader>
                <CardTitle>Multi-Metric Comparison</CardTitle>
              </CardHeader>
              <CardContent style={{ position: 'relative', height: '100%', paddingBottom: '16px' }}>
                <StudentRadarChart students={selectedStudents} />
              </CardContent>
            </Card>

            <Card className="col-span-6" style={{ height: '350px', overflowY: 'auto' }}>
              <CardHeader>
                <CardTitle>Detailed Stats Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      {selectedStudents.map(s => <th key={s.id}>{s.name}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Score</td>
                      {selectedStudents.map(s => <td key={s.id} style={{ color: s.score < 50 ? 'var(--status-danger)' : 'var(--text-primary)' }}>{s.score}%</td>)}
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Attendance</td>
                      {selectedStudents.map(s => <td key={s.id}>{s.attendance}%</td>)}
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Participation</td>
                      {selectedStudents.map(s => <td key={s.id}>{s.participation}/100</td>)}
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>Class Rank</td>
                      {selectedStudents.map(s => <td key={s.id}>#{s.rank}</td>)}
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 500 }}>History Avg</td>
                      {selectedStudents.map(s => {
                        const avg = Math.round(s.history.reduce((a, b) => a + b, 0) / s.history.length);
                        return <td key={s.id}>{avg}%</td>;
                      })}
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
