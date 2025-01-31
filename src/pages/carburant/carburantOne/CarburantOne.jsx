import React, { useEffect, useState } from "react";
import { Card, Descriptions, Spin, Alert } from "antd";
import carburantService from "../../../services/carburant.service";

const CarburantOne = ({ idPlein }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(data)

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const carburantData = await carburantService.getCarburantOne(idPlein);
      setData(carburantData[0]);
    } catch (err) {
      setError("Erreur lors du chargement des données.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idPlein]);

  return (
    <div className="carburant-container">
      {loading ? (
        <Spin tip="Chargement..." size="large" />
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <Card title={`Détails du plein #${data?.id_plein}`} bordered>
          <Descriptions column={2} layout="vertical" bordered>
            <Descriptions.Item label="Date">
              {new Date(data.date_plein).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Immatriculation">
              {data.immatriculation}
            </Descriptions.Item>
            <Descriptions.Item label="Modèle">
              {data.modele} ({data.nom_marque})
            </Descriptions.Item>
            <Descriptions.Item label="Type de carburant">
              {data.nom_type_carburant}
            </Descriptions.Item>
            <Descriptions.Item label="Quantité (L)">
              {data.qte_plein}
            </Descriptions.Item>
            <Descriptions.Item label="Kilométrage">
              {data.kilometrage} km
            </Descriptions.Item>
            <Descriptions.Item label="Chauffeur">
              {data.nom_chauffeur}
            </Descriptions.Item>
            <Descriptions.Item label="Observation">
              {data.observation || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
};

export default CarburantOne;
