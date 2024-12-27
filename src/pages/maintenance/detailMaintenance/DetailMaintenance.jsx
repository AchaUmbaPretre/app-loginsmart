import React, { useEffect, useState } from 'react';
import { Spin, Alert, Card, Descriptions, Divider, Tag, Row, Col } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import maintenanceService from '../../../services/maintenance.service';

const DetailMaintenance = ({ idReparation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [reparation, setReparation] = useState([]);

  const etatMaintenanceMapping = {
    1: 'Terminé',
    2: 'En cours',
    3: 'Réclamation',
    4: 'Évaluation',
    5: 'Terminé (R)',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await maintenanceService.getReparationOne(idReparation);

        const responseSuivi = await maintenanceService.getSuiviOneReparation(idReparation) ;
        setReparation(responseSuivi)
        setData(response[0]);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des données.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [idReparation]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Erreur" description={error} type="error" showIcon />;
  }

  const etatText = etatMaintenanceMapping[data?.id_etat_maintenance] || 'Inconnu';

  return (
    <Card
      title="Détails de la Réparation"
      bordered={false}
      style={{
        maxWidth: 900,
        margin: '20px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      {data ? (
        <>
          <Row gutter={[16, 16]} justify="space-between">
            <Col span={24}>
              <Descriptions
                bordered
                column={1}
                size="middle"
                style={{
                  fontSize: '16px',
                  marginBottom: '20px',
                  color: '#555',
                  fontWeight: 'bold',
                }}
              >
                <Descriptions.Item label="Immatriculation">
                  <Tag color="geekblue">{data.immatriculation}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Marque">
                  {data.nom_marque}
                </Descriptions.Item>
                <Descriptions.Item label="Type de réparation">
                  <Tag color="cyan">{data.type_rep}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Fournisseur">{data.fournisseur}</Descriptions.Item>
                <Descriptions.Item label="Description">
                  <div>{data.description}</div>
                </Descriptions.Item>
                <Descriptions.Item label="Coût">
                  <Tag color="green">{data.cout} $</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Montant">
                  <Tag color="volcano">{data.montant} $</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Date de réparation">
                  <div>
                    <CalendarOutlined style={{ marginRight: '5px' }} />
                    {new Date(data.date_reparation).toLocaleString()}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="État de maintenance">
                  <div>
                    {etatText}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Commentaire">
                  <div>{data.commentaire || 'Aucun commentaire'}</div>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>

          <Divider />

          <Row justify="center">
            <Col span={12}>
              <Card
                title="Informations Complémentaires"
                bordered={false}
                style={{
                  backgroundColor: '#f7f7f7',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                }}
              >
                <p>Les détails ci-dessus concernent la réparation du véhicule mentionné. Vous pouvez consulter les informations supplémentaires à tout moment.</p>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Alert message="Aucune donnée disponible" type="warning" showIcon />
      )}
    </Card>
  );
};

export default DetailMaintenance;
