import React from 'react'; 
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PiaChart = () => {
  // Données
  const data = {
    labels: ['Users', 'Income', 'Conversion Rate', 'Sessions'], // Titres des sections
    datasets: [
      {
        label: 'Statistics Overview',
        data: [26000, 6200, 2.49, 44000], // Valeurs
        backgroundColor: [
          '#6C63FF', // Users
          '#2196F3', // Income
          '#FFC107', // Conversion Rate
          '#F44336', // Sessions
        ],
        borderColor: [
          '#6C63FF', 
          '#2196F3', 
          '#FFC107', 
          '#F44336',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%', border: '1px solid #ececec', borderRadius: '10px', padding: '10px', background:'#fff' }}>
      <Doughnut data={data} />
    </div>
  );
};

export default PiaChart;
