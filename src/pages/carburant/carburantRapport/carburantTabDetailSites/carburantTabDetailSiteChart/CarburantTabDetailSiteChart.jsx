import React, { useEffect, useState } from 'react';
import carburantService from '../../../../../services/carburant.service';
import { ResponsiveBar } from '@nivo/bar';

const CarburantTabDetailSiteChart = ({ selectedVehicles }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [vehicleKeyss, setVehicleKeyss] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const carburantData = await carburantService.getCarburantRapportDetailSiteSelect(selectedVehicles);
    
            const transformedData = carburantData.reduce((acc, item) => {
                const moisKey = `${item.mois}-${item.annee}`;
                let monthData = acc.find(data => data.mois === moisKey);
                if (!monthData) {
                    monthData = { mois: moisKey };
                    acc.push(monthData);
                }
    
                const vehicleKey = `${item.immatriculation}`;
                if (!monthData[vehicleKey]) {
                    monthData[vehicleKey] = item.total_litres;
                } else {
                    monthData[vehicleKey] += item.total_litres;  
                }
    
                return acc;
            }, []);
    
            setData(transformedData);
    
            // Extraire les clés des véhicules (en excluant 'mois')
            const vehicleKeys = transformedData.flatMap(item => Object.keys(item).filter(key => key !== 'mois'));
    
            setVehicleKeyss(vehicleKeys)

            // Afficher les clés des véhicules dans la console pour déboguer
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    
    useEffect(() => {
        fetchData();
    }, [selectedVehicles]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const vehicleColors = data.length
        ? Object.keys(data[0]).filter(key => key !== 'mois').reduce((acc, key, index) => {
            acc[key] = `hsl(${(index * 50) % 360}, 70%, 50%)`; // Example color generation
            return acc;
        }, {})
        : {};


    return (
        <div style={{ height: 400 }}>
            <ResponsiveBar
                data={data}
                keys={data.length ? vehicleKeyss : []}  // Utilisation de vehicleKeys définis précédemment
                indexBy="mois"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={({ id }) => vehicleColors[id]}  // Mapping des couleurs par véhicule
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
                legends={[{
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
                }]}
            />

        </div>
    );
};

export default CarburantTabDetailSiteChart;
