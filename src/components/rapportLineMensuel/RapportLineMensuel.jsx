import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RapportLineMensuel = () => {
  // Données du diagramme
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Mois de l'année
    datasets: [
      {
        label: 'Diesel',
        data: [50, 70, 60, 90, 100, 120, 110, 130, 125, 140, 150, 160], // Données pour le diesel
        backgroundColor: '#1a73e8', // Couleur des barres pour le diesel
        borderColor: '#1a73e8',
        borderWidth: 1,
      },
      {
        label: 'Essence',
        data: [40, 60, 55, 80, 95, 100, 105, 115, 120, 135, 145, 150], // Données pour l'essence
        backgroundColor: 'rgb(255, 99, 132)', // Couleur des barres pour l'essence
        borderColor: '#fbbc04',
        borderWidth: 1,
      },
    ],
  };

  // Options du diagramme
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position de la légende
      },
      title: {
        display: true,
        text: 'Consommation Mensuelle: Diesel vs Essence', // Titre du diagramme
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Supprime les lignes de la grille horizontale
        },
      },
      y: {
        grid: {
          color: '#e0e0e0', // Couleur des lignes de la grille verticale
        },
      },
    },
  };

  return (
    <div className="RapportLineMensuel">
      <Bar data={data} options={options} />
    </div>
  );
};

export default RapportLineMensuel;
