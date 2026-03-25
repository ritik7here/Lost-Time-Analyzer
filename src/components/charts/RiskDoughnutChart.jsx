import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../../utils/chartConfig';

export function RiskDoughnutChart({ students }) {
  let high = 0, medium = 0, low = 0;
  
  students.forEach(s => {
    if (s.risk === 'High') high++;
    else if (s.risk === 'Medium') medium++;
    else low++;
  });

  const data = {
    labels: ['High Risk', 'Medium Risk', 'Low Risk'],
    datasets: [
      {
        data: [high, medium, low],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)', // danger
          'rgba(245, 158, 11, 0.8)', // warning
          'rgba(16, 185, 129, 0.8)', // success
        ],
        hoverBackgroundColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 0,
        cutout: '75%',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 20, usePointStyle: true, boxWidth: 8 }
      }
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Doughnut data={data} options={options} />
      <div style={{ 
        position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', 
        textAlign: 'center', pointerEvents: 'none' 
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{students.length}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total</div>
      </div>
    </div>
  );
}
