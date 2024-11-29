import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Enregistrement des composants de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: ["Plane", "Helicopter", "Boat", "Train", "Subway", "Bus"],
    datasets: [
        {
            label: "Japan",
            data: [200, 100, 300, 500, 400, 600],
            borderColor: "#4CAF50",
            backgroundColor: "rgba(248, 113, 113, 0.2)", // Remplissage
            tension: 0.4, // Adoucit les courbes
            borderWidth: 2,
            fill: true,
        },
        {
            label: "France",
            data: [400, 300, 500, 200, 300, 400],
            borderColor: "#FF9800",
            backgroundColor: "rgba(59, 130, 246, 0.2)", // Remplissage
            tension: 0.4,
            borderWidth: 2,
            fill: true,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: "Transportation Usage Statistics", // Titre principal
            color: "#333333", // Couleur du titre
            font: {
                size: 20,
                weight: "bold",
            },
            padding: {
                top: 10,
                bottom: 30, // Ajoute un espace sous le titre
            },
        },
        legend: {
            position: "top",
            labels: {
                color: "#4B5563", // Couleur de la légende
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
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartHome;
