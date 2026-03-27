import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Filter, TrendingDown, Star, AlertCircle } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Input, Select } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { mockStudents } from '../utils/mockData';
import '../styles/pages.css';

export function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [sectionFilter, setSectionFilter] = useState('All');
  const [minScore, setMinScore] = useState(0);
  const [quickFilter, setQuickFilter] = useState('All'); // 'All', 'Top Performers', 'At Risk', 'Low Attendance'

  const { addToast } = useToast();
  const navigate = useNavigate();

  // Filter logic
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRisk = riskFilter === 'All' || s.risk === riskFilter;
      const matchSection = sectionFilter === 'All' || s.section === sectionFilter;
      const matchScore = s.score >= minScore;

      let matchQuick = true;
      if (quickFilter === 'Top Performers') matchQuick = s.score >= 85;
      if (quickFilter === 'At Risk') matchQuick = s.risk === 'High';
      if (quickFilter === 'Low Attendance') matchQuick = s.attendance < 70;

      return matchSearch && matchRisk && matchSection && matchScore && matchQuick;
    });
  }, [searchTerm, riskFilter, sectionFilter, minScore, quickFilter]);

  const exportCSV = () => {
    try {
      const headers = ['ID', 'Name', 'Section', 'Score', 'Attendance', 'Risk', 'Achievements'];
      const rows = filteredStudents.map(s => {
        const ach = s.achievements ? s.achievements.join(' | ') : '';
        return `${s.id},"${s.name}",${s.section},${s.score},${s.attendance},${s.risk},"${ach}"`;
      });

      const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `student_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast(`Successfully exported ${filteredStudents.length} records.`, 'success');
    } catch {
      addToast('Failed to export CSV.', 'error');
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Student Directory</h1>
          <p className="page-subtitle">Advanced filtering and direct robust profiles.</p>
        </div>
        <Button onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', padding: '12px 24px' }}>
          <Download size={20} /> Export Report
        </Button>
      </div>

      {/* Quick Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
        <button
          onClick={() => setQuickFilter('All')}
          className={`btn-outline ${quickFilter === 'All' ? 'active-filter' : ''}`}
          style={{ padding: '6px 16px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 500, border: '1px solid var(--glass-border)', background: quickFilter === 'All' ? 'var(--accent-primary)' : 'transparent', color: quickFilter === 'All' ? '#fff' : 'var(--text-secondary)', cursor: 'pointer' }}
        >
          All Students
        </button>
        <button
          onClick={() => setQuickFilter('Top Performers')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 16px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 500, border: '1px solid var(--glass-border)', background: quickFilter === 'Top Performers' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: quickFilter === 'Top Performers' ? 'var(--status-success)' : 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <Star size={18} /> Top Performers
        </button>
        <button
          onClick={() => setQuickFilter('At Risk')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 16px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 500, border: '1px solid var(--glass-border)', background: quickFilter === 'At Risk' ? 'rgba(239, 68, 68, 0.2)' : 'transparent', color: quickFilter === 'At Risk' ? 'var(--status-danger)' : 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <AlertCircle size={18} /> At Risk
        </button>
        <button
          onClick={() => setQuickFilter('Low Attendance')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 16px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 500, border: '1px solid var(--glass-border)', background: quickFilter === 'Low Attendance' ? 'rgba(245, 158, 11, 0.2)' : 'transparent', color: quickFilter === 'Low Attendance' ? 'var(--status-warning)' : 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <TrendingDown size={18} /> Low Attendance
        </button>
      </div>

      <div className="filters-bar" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--glass-border)' }}>
        <div style={{ flex: '1 1 200px' }}>
          <Input
            label="Search Student"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ width: '140px' }}>
          <Select
            label="Risk Level"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            options={[
              { value: 'All', label: 'All Risks' },
              { value: 'High', label: 'High' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Low', label: 'Low' },
            ]}
          />
        </div>

        <div style={{ width: '120px' }}>
          <Select
            label="Section"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            options={[
              { value: 'All', label: 'All Sections' },
              { value: 'A', label: 'Section A' },
              { value: 'B', label: 'Section B' },
              { value: 'C', label: 'Section C' },
            ]}
          />
        </div>

        <div style={{ width: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '8px' }}>Min Score: {minScore}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
          />
        </div>
      </div>

      <Card>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table className="data-table" style={{ width: '100%', minWidth: '1000px' }}>
            <thead>
              <tr>
                <th style={{ paddingLeft: '32px' }}>Student</th>
                <th style={{ padding: '24px 32px' }}>Section</th>
                <th style={{ padding: '24px 32px', textAlign: 'center' }}>Rank</th>
                <th style={{ padding: '24px 32px', textAlign: 'center' }}>Score</th>
                <th style={{ padding: '24px 32px' }}>Attendance</th>
                <th style={{ padding: '24px 32px', textAlign: 'center' }}>Risk</th>
                <th style={{ padding: '24px 32px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td style={{ paddingLeft: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Avatar src={student.avatar} size="sm" />
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{student.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 32px' }}><Badge variant="section">{student.section}</Badge></td>
                  <td style={{ padding: '16px 32px', textAlign: 'center' }}>#{student.rank}</td>
                  <td style={{ padding: '16px 32px', textAlign: 'center', fontWeight: 600, color: 'var(--text-primary)' }}>{student.score}%</td>
                  <td style={{ padding: '16px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
                      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                        <div style={{
                          height: '100%', borderRadius: '3px', width: `${Math.min(100, student.attendance)}%`,
                          background: student.attendance < 75 ? 'var(--status-danger)' : 'var(--status-success)'
                        }}></div>
                      </div>
                      <span style={{ fontSize: '0.875rem' }}>{student.attendance}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 32px', textAlign: 'center' }}><Badge variant={student.risk.toLowerCase()}>{student.risk}</Badge></td>
                  <td style={{ padding: '16px 32px', textAlign: 'center' }}>
                    <button
                      onClick={() => navigate(`/student/${student.id}`)}
                      style={{ background: 'transparent', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500, transition: 'all 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
                      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
