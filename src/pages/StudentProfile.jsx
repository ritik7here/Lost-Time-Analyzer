import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { mockStudents } from '../utils/mockData';
import { commonOptions } from '../utils/chartConfig';

export function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const student = useMemo(() => mockStudents.find(s => s.id === id) || mockStudents[0], [id]);

  const [note, setNote] = useState('');
  const [simulatedScore, setSimulatedScore] = useState(student.score);
  const [simulatedAttendance, setSimulatedAttendance] = useState(student.attendance);

  useEffect(() => {
    // Reset simulation when student changes
    setSimulatedScore(student.score);
    setSimulatedAttendance(student.attendance);
  }, [student]);

  const saveNote = () => {
    if (!note.trim()) return;
    addToast('Note saved successfully to the database (mock).', 'success');
    setNote('');
  };

  const chartData = {
    labels: ['Term 1', 'Term 2', 'Term 3', 'Current Term'],
    datasets: [{
      label: 'Performance Score',
      data: student.history,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointRadius: 4,
    }]
  };

  const chartOpts = {
    ...commonOptions,
    scales: {
      y: { min: 0, max: 100, ticks: { color: 'rgba(255,255,255,0.7)' } },
      x: { ticks: { color: 'rgba(255,255,255,0.7)' } }
    }
  };

  const renderProgressionIcon = () => {
    if (student.progressionType === 'improving') return <TrendingUp size={24} color="var(--status-success)" />;
    if (student.progressionType === 'declining') return <TrendingDown size={24} color="var(--status-danger)" />;
    return <Minus size={24} color="var(--text-muted)" />;
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <button
        onClick={() => navigate('/students')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '24px', fontWeight: 500 }}
      >
        <ArrowLeft size={16} /> Back to Directory
      </button>

      {/* Header Profile Section */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <Avatar src={student.avatar} size="xl" />
            <div style={{ flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '2.5rem', color: 'var(--text-primary)' }}>{student.name}</h1>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'flex-start' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>ID: {student.id}</span>
                <Badge variant="section">Section {student.section}</Badge>
                <Badge variant={student.risk.toLowerCase()}>{student.risk} Risk</Badge>
              </div>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '8px', background: 'var(--bg-primary)', padding: '16px', borderRadius: '12px', minWidth: '150px' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>Global Rank</div>
              <div style={{ fontSize: '2rem', color: 'var(--accent-primary)', fontWeight: 700 }}>#{student.rank}</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>

        {/* Core Metrics & Chart */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <dt style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>Current Score</dt>
                <dd style={{ color: 'var(--status-success)', fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>{student.score}%</dd>
              </div>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                {renderProgressionIcon()}
              </div>
            </Card>
            <Card style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <dt style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '4px' }}>Term Attendance</dt>
                <dd style={{ color: student.attendance < 75 ? 'var(--status-danger)' : 'var(--accent-primary)', fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>{student.attendance}%</dd>
              </div>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                <Edit3 size={24} color="var(--text-muted)" />
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>4-Term Performance History</CardTitle>
            </CardHeader>
            <CardContent style={{ height: '300px' }}>
              <Line data={chartData} options={chartOpts} />
            </CardContent>
          </Card>

          {/* Achievements Base */}
          <Card>
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={18} color="var(--status-warning)" /> Logged Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {student.achievements && student.achievements.length > 0 ? (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {student.achievements.map((ach, i) => (
                    <div key={i} style={{ padding: '8px 16px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: 'var(--status-warning)', borderRadius: '20px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award size={14} /> {ach}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>No achievements logged yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Interactions */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* What-If Simulator */}
          <Card style={{ border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)' }}>
            <CardHeader>
              <CardTitle>What-If Predictor Engine</CardTitle>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, marginTop: '4px' }}>Adjust sliders to simulate future standing.</p>
            </CardHeader>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <label>Hypothetical Attendance</label>
                  <span style={{ fontWeight: 600 }}>{simulatedAttendance}%</span>
                </div>
                <input
                  type="range" min="0" max="100"
                  value={simulatedAttendance}
                  onChange={(e) => {
                    const att = Number(e.target.value);
                    setSimulatedAttendance(att);
                    // Mock calculation: 0.5 correlation
                    const diff = att - student.attendance;
                    setSimulatedScore(Math.min(100, Math.max(0, student.score + Math.round(diff * 0.4))));
                  }}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                />
              </div>

              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Projected Score</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: simulatedScore > student.score ? 'var(--status-success)' : simulatedScore < student.score ? 'var(--status-danger)' : 'var(--text-primary)' }}>
                  {simulatedScore}%
                </div>
                <div style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-muted)' }}>
                  {simulatedScore >= 50 && simulatedAttendance >= 60 ? 'Will remain Low Risk' : 'Will enter High Risk bracket'}
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Notes Input */}
          <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <CardHeader>
              <CardTitle>Faculty Notes</CardTitle>
            </CardHeader>
            <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <textarea
                placeholder="Log an intervention, meeting notes, etc..."
                value={note}
                onChange={e => setNote(e.target.value)}
                style={{
                  flex: 1, minHeight: '120px', resize: 'vertical', width: '100%',
                  background: 'var(--bg-primary)', border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)', padding: '12px', borderRadius: 'var(--border-radius-sm)',
                  fontFamily: 'inherit', fontSize: '0.875rem'
                }}
              />
              <Button onClick={saveNote} style={{ width: '100%' }}>Add Observation Record</Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
