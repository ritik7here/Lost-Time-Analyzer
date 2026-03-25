import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import { commonOptions } from '../../utils/chartConfig';

export function TrendChart({ students }) {
  const chartData = useMemo(() => {
    // Calculate average score per term across all students
    const termAverages = [0, 0, 0, 0];
    
    if (students && students.length > 0) {
      students.forEach(s => {
        termAverages[0] += s.history[0];
        termAverages[1] += s.history[1];
        termAverages[2] += s.history[2];
        termAverages[3] += s.history[3];
      });
      
      for (let i = 0; i < 4; i++) {
        termAverages[i] = Math.round(termAverages[i] / students.length);
      }
    }

    return {
      labels: ['Term 1', 'Term 2', 'Term 3', 'Current Term'],
      datasets: [
        {
          label: 'Cohort Average Score',
          data: termAverages,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(59, 130, 246)',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
  }, [students]);

  const options = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: false,
        min: 40,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: { color: 'rgba(203, 213, 225, 0.7)' }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(203, 213, 225, 0.7)' }
      }
    },
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            return `Avg Score: ${context.parsed.y}%`;
          }
        }
      }
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
      </CardHeader>
      <CardContent style={{ height: '280px' }}>
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}
