import React from 'react';
import { Radar } from 'react-chartjs-2';
import '../../utils/chartConfig';

export function StudentRadarChart({ students }) {
  if (!students || students.length === 0) return null;

  // Colors for up to 4 students
  const colors = [
    { bg: 'rgba(59, 130, 246, 0.2)', border: 'rgba(59, 130, 246, 1)' }, // Blue
    { bg: 'rgba(16, 185, 129, 0.2)', border: 'rgba(16, 185, 129, 1)' }, // Green
    { bg: 'rgba(245, 158, 11, 0.2)', border: 'rgba(245, 158, 11, 1)' }, // Yellow
    { bg: 'rgba(239, 68, 68, 0.2)', border: 'rgba(239, 68, 68, 1)' }    // Red
  ];

  const datasets = students.map((s, i) => ({
    label: s.name,
    data: [s.score, s.attendance, s.participation, 100 - (s.rank/50)*100], // Normalized metrics
    backgroundColor: colors[i % colors.length].bg,
    borderColor: colors[i % colors.length].border,
    pointBackgroundColor: colors[i % colors.length].border,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: colors[i % colors.length].border,
  }));

  const data = {
    labels: ['Score', 'Attendance', 'Participation', 'Relative Rank'],
    datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#94a3b8', font: { size: 12 } },
        ticks: { display: false, min: 0, max: 100 }
      }
    },
    plugins: {
      legend: { position: 'top', labels: { color: '#f0f2f5' } }
    }
  };

  return <Radar data={data} options={options} />;
}
