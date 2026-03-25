import React from 'react';
import { Users, AlertTriangle, CalendarCheck, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { ScoreBarChart } from '../components/charts/ScoreBarChart';
import { RiskDoughnutChart } from '../components/charts/RiskDoughnutChart';
import { AttendanceScatterChart } from '../components/charts/AttendanceScatterChart';
import { TrendChart } from '../components/charts/TrendChart';
import { InsightsPanel } from '../components/common/InsightsPanel';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { mockStudents, getDashboardStats } from '../utils/mockData';
import '../styles/pages.css';

export function Dashboard() {
  const stats = getDashboardStats(mockStudents);
  const highRiskStudents = mockStudents.filter(s => s.risk === 'High').slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Monitor student performance metrics and identify at-risk individuals.</p>
        </div>
      </div>

      <div className="kpi-grid">
        <Card className="kpi-card">
          <div className="kpi-icon blue"><Users size={24} /></div>
          <div className="kpi-content">
            <span className="kpi-label">Total Students</span>
            <span className="kpi-value">{stats.totalStudents}</span>
          </div>
        </Card>
        
        <Card className="kpi-card">
          <div className="kpi-icon red"><AlertTriangle size={24} /></div>
          <div className="kpi-content">
            <span className="kpi-label">High Risk</span>
            <span className="kpi-value">{stats.highRiskCount}</span>
          </div>
        </Card>
        
        <Card className="kpi-card">
          <div className="kpi-icon green"><CalendarCheck size={24} /></div>
          <div className="kpi-content">
            <span className="kpi-label">Avg. Attendance</span>
            <span className="kpi-value">{stats.averageAttendance}%</span>
          </div>
        </Card>
        
        <Card className="kpi-card">
          <div className="kpi-icon purple"><TrendingUp size={24} /></div>
          <div className="kpi-content">
            <span className="kpi-label">Pass Rate</span>
            <span className="kpi-value">{stats.passRate}%</span>
          </div>
        </Card>
      </div>

      {/* AI Insights Engine output */}
      <InsightsPanel students={mockStudents} />

      <div className="dashboard-grid">
        <div className="col-span-12">
          <TrendChart students={mockStudents} />
        </div>

        <Card className="col-span-8 chart-card flex flex-col pt-4">
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent style={{ position: 'relative', height: '100%', paddingBottom: '16px' }}>
            <ScoreBarChart students={mockStudents} />
          </CardContent>
        </Card>

        <Card className="col-span-4 chart-card">
          <CardHeader>
            <CardTitle>Risk Breakdown</CardTitle>
          </CardHeader>
          <CardContent style={{ position: 'relative', height: '100%', paddingBottom: '16px' }}>
            <RiskDoughnutChart students={mockStudents} />
          </CardContent>
        </Card>
        
        <Card className="col-span-6 chart-card">
          <CardHeader>
            <CardTitle>Attendance vs Score Correlation</CardTitle>
          </CardHeader>
          <CardContent style={{ position: 'relative', height: '100%', paddingBottom: '16px' }}>
            <AttendanceScatterChart students={mockStudents} />
          </CardContent>
        </Card>
        
        <Card className="col-span-6" style={{ height: '350px', overflowY: 'auto' }}>
          <CardHeader style={{ position: 'sticky', top: 0, backgroundColor: 'var(--glass-bg)', zIndex: 10, padding: '16px 16px 0 16px' }}>
            <CardTitle>High Risk Priority List</CardTitle>
          </CardHeader>
          <CardContent style={{ padding: '0 16px 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {highRiskStudents.map(student => (
                <div key={student.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Avatar src={student.avatar} size="sm" />
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{student.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.id}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--status-danger)', fontWeight: 600 }}>{student.score}% Score</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{student.attendance}% Att.</div>
                  </div>
                </div>
              ))}
              {highRiskStudents.length === 0 && (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No high risk students found.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
