import React from 'react';
import './staticTop.scss';
import { Line } from 'react-chartjs-2';
import { MoreOutlined } from '@ant-design/icons';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

const StaticTop = () => {
  const cardData = [
    {
      title: 'Users',
      value: '26K',
      change: '-12.4%',
      changeType: 'down',
      color: '#6C63FF',
      chartData: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      title: 'Income',
      value: '$6,200',
      change: '40.9%',
      changeType: 'up',
      color: '#2196F3',
      chartData: [75, 69, 90, 91, 66, 65, 50],
    },
    {
      title: 'Conversion Rate',
      value: '2.49%',
      change: '84.7%',
      changeType: 'up',
      color: '#FFC107',
      chartData: [50, 45, 60, 80, 70, 90, 100],
    },
    {
      title: 'Sessions',
      value: '44K',
      change: '-23.6%',
      changeType: 'down',
      color: '#F44336',
      chartData: [85, 70, 75, 90, 80, 65, 60],
    },
  ];

  const renderChart = (data, color) => ({
    labels: Array(data.length).fill(''),
    datasets: [
      {
        data,
        fill: false,
        borderColor: color,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  });

  return (
    <div className="dashboard">
      {cardData.map((card, index) => (
        <div className="dashboard-card" key={index} style={{ background: card.color }}>
          <div className="dashboard-card-header">
            <h2>{card.value}</h2>
            <MoreOutlined />
          </div>
          <p className="dashboard-card-title">{card.title}</p>
          <p className={`dashboard-card-change ${card.changeType}`}>
            {card.change}
          </p>
          <div className="dashboard-card-chart">
            <Line data={renderChart(card.chartData, '#fff')} options={{ plugins: { legend: false }, scales: { x: { display: false }, y: { display: false } } }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaticTop;
