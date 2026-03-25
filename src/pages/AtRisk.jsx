import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { mockStudents } from '../utils/mockData';
import '../styles/pages.css';

export function AtRisk() {
  const highRisk = mockStudents.filter(s => s.risk === 'High').sort((a, b) => a.score - b.score);
  const mediumRisk = mockStudents.filter(s => s.risk === 'Medium').sort((a, b) => a.score - b.score);

  const StudentCard = ({ student, isHighRisk }) => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '16px', 
      background: 'rgba(0,0,0,0.2)', 
      border: `1px solid ${isHighRisk ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`, 
      borderRadius: 'var(--border-radius-md)',
      borderLeft: `4px solid ${isHighRisk ? 'var(--status-danger)' : 'var(--status-warning)'}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Avatar src={student.avatar} size="md" />
        <div>
          <div style={{ fontWeight: 600, fontSize: '1rem' }}>{student.name}</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{student.id}</span>
            <Badge variant="section">{student.section}</Badge>
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '24px', textAlign: 'right' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Score</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: student.score < 50 ? 'var(--status-danger)' : 'var(--text-primary)' }}>{student.score}%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Attendance</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: student.attendance < 75 ? 'var(--status-danger)' : 'var(--text-primary)' }}>{student.attendance}%</div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">At-Risk Interventions</h1>
          <p className="page-subtitle">Prioritized list of students requiring academic support.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="col-span-12" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <Card style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <CardHeader style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '16px', borderBottom: '1px solid rgba(239, 68, 68, 0.1)' }}>
              <CardTitle style={{ color: 'var(--status-danger)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: 'var(--status-danger)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.875rem' }}>{highRisk.length}</span>
                High Risk Priority
              </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {highRisk.map(student => (
                <StudentCard key={student.id} student={student} isHighRisk={true} />
              ))}
              {highRisk.length === 0 && <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No high risk students.</div>}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12">
          <Card style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <CardHeader style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '16px', borderBottom: '1px solid rgba(245, 158, 11, 0.1)' }}>
              <CardTitle style={{ color: 'var(--status-warning)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: 'var(--status-warning)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.875rem' }}>{mediumRisk.length}</span>
                Medium Risk Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mediumRisk.map(student => (
                <StudentCard key={student.id} student={student} isHighRisk={false} />
              ))}
              {mediumRisk.length === 0 && <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No medium risk students.</div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
