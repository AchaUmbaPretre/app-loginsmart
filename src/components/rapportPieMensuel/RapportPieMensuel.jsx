import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './rapportPieMensuel.scss'
import carburantService from '../../services/carburant.service';
ChartJS.register(ArcElement, Tooltip, Legend);

const RapportPieMensuel = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    try {
        setLoading(true);
        const reparationData = await carburantService.getReparationConsommation()
        setDatas(reparationData);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: ['Diesel', 'Essence'],
    datasets: [
      {
        label: 'Consommation',
        data: [60, 40],
        backgroundColor: ['#1a73e8', 'rgb(255, 99, 132)'],
        hoverOffset: 4,
      },
    ],
  };

  // Options pour le Doughnut Chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position de la légende
      },
      title: {
        display: true,
        text: 'Répartition de la Consommation Mensuelle', // Titre du diagramme
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return `${context.label}: ${percentage}`;
          },
        },
      },
    },
  };

  return (
    <div className="rapportPieMensuel">
      <div className="chart-container">
        <div className="chart">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default RapportPieMensuel;
