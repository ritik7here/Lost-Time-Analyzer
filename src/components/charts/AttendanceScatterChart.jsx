import React from 'react';
import { Scatter } from 'react-chartjs-2';
import '../../utils/chartConfig';

export function AttendanceScatterChart({ students }) {
  const data = {
    datasets: [
      {
        label: 'Students',
        data: students.map(s => ({
          x: s.attendance,
          y: s.score,
          student: s
        })),
        backgroundColor: (context) => {
          const student = context.raw?.student;
          if (!student) return 'rgba(59, 130, 246, 0.6)';
          if (student.risk === 'High') return 'rgba(239, 68, 68, 0.8)';
          if (student.risk === 'Medium') return 'rgba(245, 158, 11, 0.8)';
          return 'rgba(16, 185, 129, 0.6)';
        },
        borderColor: 'transparent',
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const s = ctx.raw.student;
            return `${s.name} - Score: ${s.score}%, Att: ${s.attendance}%`;
          }
        }
      }
    },
    scales: {
      x: { 
        title: { display: true, text: 'Attendance (%)' },
        min: 0, max: 100 
      },
      y: { 
        title: { display: true, text: 'Score (%)' },
        min: 0, max: 100 
      }
    }
  };

  return <Scatter data={data} options={options} />;
}
