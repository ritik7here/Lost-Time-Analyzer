import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../utils/chartConfig';

export function ScoreBarChart({ students }) {
  // grouping scores into ranges: <50, 50-60, 60-70, 70-80, 80-90, 90-100
  const ranges = { '<50': 0, '50-59': 0, '60-69': 0, '70-79': 0, '80-89': 0, '90-100': 0 };
  
  students.forEach(s => {
    if (s.score < 50) ranges['<50']++;
    else if (s.score < 60) ranges['50-59']++;
    else if (s.score < 70) ranges['60-69']++;
    else if (s.score < 80) ranges['70-79']++;
    else if (s.score < 90) ranges['80-89']++;
    else ranges['90-100']++;
  });

  const data = {
    labels: Object.keys(ranges),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(ranges),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } }
    }
  };

  return <Bar data={data} options={options} />;
}
