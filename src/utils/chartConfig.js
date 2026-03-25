import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Set global defaults for dark theme
ChartJS.defaults.color = '#94a3b8'; // text-secondary
ChartJS.defaults.font.family = "'Inter', system-ui, -apple-system, sans-serif";
ChartJS.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.05)';
ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 17, 26, 0.9)';
ChartJS.defaults.plugins.tooltip.titleColor = '#f0f2f5';
ChartJS.defaults.plugins.tooltip.bodyColor = '#94a3b8';
ChartJS.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.08)';
ChartJS.defaults.plugins.tooltip.borderWidth = 1;
ChartJS.defaults.plugins.tooltip.padding = 12;
ChartJS.defaults.plugins.tooltip.cornerRadius = 8;

export const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true
    }
  }
};
