import React, { useEffect, useState } from 'react';
import carburantService from '../../../../../services/carburant.service';
import { ResponsiveBar } from '@nivo/bar';

const CarburantTabDetailSiteChart = ({ selectedVehicles }) => {
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [vehicleKeys, setVehicleKeys] = useState([]);

    // Fonction pour transformer les données de carburant
    const transformCarburantData = (carburantData) => {
        return carburantData.reduce((acc, item) => {
            const monthKey = `${item.mois}-${item.annee}`;
            let monthData = acc.find(data => data.mois === monthKey);
            
            if (!monthData) {
                monthData = { mois: monthKey };
                acc.push(monthData);
            }

            const vehicleKey = `${item.immatriculation}`;
            monthData[vehicleKey] = monthData[vehicleKey] 
                ? monthData[vehicleKey] + item.total_litres 
                : item.total_litres;

            return acc;
        }, []);
    };

    // Fonction pour récupérer et transformer les données
    const fetchCarburantData = async () => {
        setLoading(true);
        try {
            const carburantData = await carburantService.getCarburantRapportDetailSiteSelect(selectedVehicles);
            const transformedData = transformCarburantData(carburantData);
            setChartData(transformedData);

            // Extraction des clés des véhicules (en excluant 'mois')
            const extractedVehicleKeys = transformedData.flatMap(item =>
                Object.keys(item).filter(key => key !== 'mois')
            );
            setVehicleKeys(extractedVehicleKeys);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        } finally {
            setLoading(false);
        }
    };

    // Utiliser useEffect pour charger les données au changement de selectedVehicles
    useEffect(() => {
        if (selectedVehicles && selectedVehicles.length > 0) {
            fetchCarburantData();
        }
    }, [selectedVehicles]);

    // Si les données sont en cours de chargement
    if (loading) {
        return <div>Chargement des données...</div>;
    }

    // Définir les couleurs des véhicules dynamiquement
    const getVehicleColors = () => {
        return chartData.length
            ? Object.keys(chartData[0]).filter(key => key !== 'mois').reduce((acc, key, index) => {
                acc[key] = `hsl(${(index * 50) % 360}, 70%, 50%)`;
                return acc;
            }, {})
            : {};
    };

    // Configuration du graphique avec Nivo ResponsiveBar
    return (
        <div style={{ height: 400 }}>
            <ResponsiveBar
                data={chartData}
                keys={vehicleKeys}
                indexBy="mois"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={({ id }) => getVehicleColors()[id]} // Utilisation des couleurs dynamiques
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Mois',
                    legendPosition: 'middle',
                    legendOffset: -36,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Consommation (litres)',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: '#777777',
                                strokeWidth: 1,
                            },
                        },
                    },
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'top',
                        direction: 'row',
                        justify: false,
                        translateY: -40,
                        itemsSpacing: 0,
                        itemWidth: 150,
                        itemHeight: 15,
                        itemDirection: 'left-to-right',
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                        labels: {
                            color: "#4B5563",
                            font: {
                                size: 14,
                            },
                        },
                    },
                ]}
            />
        </div>
    );
};

export default CarburantTabDetailSiteChart;
