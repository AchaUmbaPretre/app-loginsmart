import React, { useEffect, useState } from "react";
import carburantService from "../../../../../services/carburant.service";
import { ResponsiveBar } from "@nivo/bar";

const CarburantTabDetailSiteChart = ({ selectedVehicles }) => {
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [vehicleKeys, setVehicleKeys] = useState([]);

    // Fonction pour formater la date en "Mois-Année" (ex: "déc-2024")
    const formatMonthYear = (month, year) => {
        const date = new Date(year, month - 1); // mois commence à 0 en JS
        return date.toLocaleString("fr-FR", { month: "short", year: "numeric" });
    };

    // Fonction pour transformer les données de carburant
    const transformCarburantData = (carburantData) => {
        return carburantData.reduce((acc, item) => {
            const monthKey = formatMonthYear(item.mois, item.annee);
            let monthData = acc.find((data) => data.mois === monthKey);

            if (!monthData) {
                monthData = { mois: monthKey };
                acc.push(monthData);
            }

            const vehicleKey = item.immatriculation;
            monthData[vehicleKey] = (monthData[vehicleKey] || 0) + item.total_litres;

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

            // Extraction unique des clés des véhicules (exclut 'mois')
            const extractedVehicleKeys = [...new Set(transformedData.flatMap(item => Object.keys(item).filter(key => key !== "mois")))];
            setVehicleKeys(extractedVehicleKeys);
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedVehicles && selectedVehicles.length > 0) {
            fetchCarburantData();
        }
    }, [selectedVehicles]);

    if (loading) {
        return <div>Chargement des données...</div>;
    }

    // Génération de couleurs dynamiques pour chaque véhicule
    const getVehicleColors = () => {
        return vehicleKeys.reduce((acc, key, index) => {
            acc[key] = `hsl(${(index * 75) % 360}, 65%, 50%)`;
            return acc;
        }, {});
    };

    return (
        <>
            <div className="carburantTabDetailSite">
                <div style={{ height: 450 }}>
                    <ResponsiveBar
                        data={chartData}
                        keys={vehicleKeys}
                        indexBy="mois"
                        margin={{ top: 50, right: 130, bottom: 60, left: 70 }}
                        padding={0.3}
                        colors={({ id }) => getVehicleColors()[id]}
                        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -25,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            legend: "Consommation (L)",
                            legendPosition: "middle",
                            legendOffset: -50,
                        }}
                        enableLabel={true}
                        labelSkipWidth={14}
                        labelSkipHeight={14}
                        labelTextColor={{ from: "color", modifiers: [["darker", 2.4]] }}
                        theme={{
                            axis: {
                                ticks: {
                                    text: {
                                        fontSize: 14,
                                        fill: "#555",
                                    },
                                },
                            },
                            legends: {
                                text: {
                                    fontSize: 13,
                                    fill: "#333",
                                },
                            },
                        }}
                        legends={[
                            {
                                dataFrom: "keys",
                                anchor: "top",
                                direction: "row",
                                justify: false,
                                translateY: -40,
                                itemsSpacing: 5,
                                itemWidth: 120,
                                itemHeight: 20,
                                itemDirection: "left-to-right",
                                symbolSize: 15,
                                symbolShape: "circle",
                                effects: [
                                    {
                                        on: "hover",
                                        style: {
                                            itemOpacity: 1,
                                            itemTextColor: "#000",
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

export default CarburantTabDetailSiteChart;
