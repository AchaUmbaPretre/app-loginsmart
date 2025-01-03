import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Enregistrement des composants de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Données
const data = {
    labels: ["Plane", "Helicopter", "Boat", "Train", "Subway", "Bus"],
    datasets: [
        {
            type: "bar", // Barres empilées
            label: "Japan - Bar",
            data: [200, 100, 300, 500, 400, 600],
            backgroundColor: "#6C63FF",
            stack: "Stack 1", // Groupe empilé
            borderWidth: 1,
        },
        {
            type: "bar", // Barres empilées
            label: "France - Bar",
            data: [400, 300, 500, 200, 300, 400],
            backgroundColor: "#FF9800",
            stack: "Stack 1", // Groupe empilé
            borderWidth: 1,
        },
        {
            type: "line", // Ligne
            label: "Japan - Line",
            data: [250, 120, 350, 550, 420, 650],
            borderColor: "#4CAF50",
            borderWidth: 2,
            tension: 0.4, // Courbe adoucie
            fill: false, // Pas de remplissage pour la ligne
        },
        {
            type: "line", // Ligne
            label: "France - Line",
            data: [450, 320, 550, 220, 330, 450],
            borderColor: "red",
            borderWidth: 2,
            tension: 0.4,
            fill: false,
        },
    ],
};

// Options
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
/*         title: {
            display: true,
             text: "Stacked Bar & Line Chart",
            color: "#333333",
            font: {
                size: 20,
                weight: "bold",
            },
            padding: {
                top: 10,
                bottom: 30,
            },
        }, */
        legend: {
            position: "top",
            labels: {
                color: "#4B5563",
                font: {
                    size: 14,
                },
            },
        },
        tooltip: {
            backgroundColor: "#FFFFFF",
            titleColor: "#111827",
            bodyColor: "#1F2937",
            borderWidth: 1,
            borderColor: "#E5E7EB",
        },
    },
    scales: {
        x: {
            stacked: true, // Activer les barres empilées
            ticks: {
                color: "#6B7280",
                font: {
                    size: 12,
                },
            },
            grid: {
                display: false,
            },
        },
        y: {
            stacked: true, // Activer les barres empilées
            ticks: {
                color: "#6B7280",
                font: {
                    size: 12,
                },
                stepSize: 100,
            },
            grid: {
                color: "#E5E7EB",
            },
        },
    },
};

const ChartHome = () => {
    return (
        <div style={{ height: "100%", width: "100%", padding: "10px" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ChartHome;
