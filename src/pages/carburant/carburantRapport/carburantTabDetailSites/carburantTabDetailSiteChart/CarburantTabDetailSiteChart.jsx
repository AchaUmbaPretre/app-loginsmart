import React, { useEffect, useState } from 'react';
import carburantService from '../../../../../services/carburant.service';
import { ResponsiveBar } from '@nivo/bar';

const CarburantTabDetailSiteChart = ({ selectedVehicles }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const carburantData = await carburantService.getCarburantRapportDetailSiteSelect(selectedVehicles);
            
            // Transforming the data to ensure each vehicle's data is properly separated
            const transformedData = carburantData.reduce((acc, item) => {
                const moisKey = `${item.mois}-${item.annee}`;
                let monthData = acc.find(data => data.mois === moisKey);
                if (!monthData) {
                    monthData = { mois: moisKey };
                    acc.push(monthData);
                }
    
                const vehicleKey = `${item.immatriculation} (${item.nom_marque})`;
                monthData[vehicleKey] = item.total_litres;
    
                return acc;
            }, []);
            
            setData(transformedData);
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

    // Create a color map for vehicle matricules to ensure each vehicle has a distinct color
    const vehicleColors = data.length
        ? Object.keys(data[0]).filter(key => key !== 'mois').reduce((acc, key, index) => {
            acc[key] = `hsl(${(index * 50) % 360}, 70%, 50%)`; // Example color generation
            return acc;
        }, {})
        : {};

    // Titles for the vehicles with corresponding colors
    const vehicleTitles = data.length
        ? Object.keys(data[0]).filter(key => key !== 'mois').map(key => {
            return (
                <div key={key} style={{ display: 'inline-block', margin: '5px', color: vehicleColors[key] }}>
                    {key}
                </div>
            );
        })
        : [];

    return (
        <div style={{ height: 400 }}>
            <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap' }}>
                {vehicleTitles} {/* Display matricules with their colors above the chart */}
            </div>
            <ResponsiveBar
                data={data}
                keys={data.length ? Object.keys(data[0]).filter(key => key !== 'mois') : []}  // Toutes les clés sauf "mois"
                indexBy="mois"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={({ id }) => vehicleColors[id]} // Use the color map for each vehicle
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
            />
        </div>
    );
};

export default CarburantTabDetailSiteChart;
