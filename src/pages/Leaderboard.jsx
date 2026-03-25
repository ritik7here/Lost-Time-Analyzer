import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { mockStudents } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';
import '../styles/pages.css';

export function Leaderboard() {
  const { user } = useAuth();
  const topStudents = [...mockStudents].sort((a, b) => a.rank - b.rank).slice(0, 10);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy size={24} color="#fbbf24" />; // Gold
    if (rank === 2) return <Medal size={24} color="#94a3b8" />; // Silver
    if (rank === 3) return <Medal size={24} color="#b45309" />; // Bronze
    return <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-muted)', width: '24px', textAlign: 'center' }}>{rank}</span>;
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Top Performers</h1>
          <p className="page-subtitle">Recognizing the top 10 students by overall academic score.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star color="var(--status-warning)" /> Leaderboard Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {topStudents.map((student, idx) => {
              const isCurrentUser = user && student.name === user.name;
              
              return (
                <div 
                  key={student.id}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '16px', 
                    borderBottom: idx !== topStudents.length - 1 ? '1px solid var(--glass-border)' : 'none',
                    background: isCurrentUser ? 'rgba(59, 130, 246, 0.15)' : (idx < 3 ? 'rgba(255,255,255,0.03)' : 'transparent'),
                    borderLeft: isCurrentUser ? '4px solid var(--accent-primary)' : '4px solid transparent',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = isCurrentUser ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)'}
                  onMouseOut={e => e.currentTarget.style.background = isCurrentUser ? 'rgba(59, 130, 246, 0.15)' : (idx < 3 ? 'rgba(255,255,255,0.03)' : 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '40px', display: 'flex', justifyContent: 'center' }}>
                      {getRankIcon(student.rank)}
                    </div>
                    <Avatar src={student.avatar} size="md" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '1rem', color: isCurrentUser ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                        {student.name} {isCurrentUser && '(You)'}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{student.id} • Section {student.section}</div>
                    </div>
                  </div>
                
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{student.score}%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Final Score</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
