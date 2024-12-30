import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined,FileTextOutlined ,ToolOutlined,ShopOutlined,SyncOutlined,CheckCircleOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Spin,Badge, Tooltip, Alert, Card, Descriptions, Divider, Tag, Row, Col, Table } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import maintenanceService from '../../../services/maintenance.service';
import moment from 'moment';

const DetailMaintenance = ({ idReparation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [reparation, setReparation] = useState([]);
  const scroll = { x: 400 };

  const etatMaintenanceMapping = {
    1: 'Terminé',
    2: 'En cours',
    3: 'Réclamation',
    4: 'Évaluation',
    5: 'Terminé (R)',
  };

  const columns = [
    { 
      title: '#', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record, index) => (
        <Tooltip title={`Ligne ${index + 1}`}>
          <Tag color="blue">{index + 1}</Tag>
        </Tooltip>
      ),
      width: "5%" 
    },
    {
      title: 'Type tache',
      dataIndex: 'type_tache',
      render: (text) => (
        <span>
          <ToolOutlined style={{ marginRight: 8, color: '#d46b08' }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Date suivie',
      dataIndex: 'created_at',
      render: (text) => (
        <span>
          <CalendarOutlined style={{ marginRight: 8, color: '#13c2c2' }} />
          {moment(text).format('DD-MM-yyyy')}
        </span>
      ),
    },
    {
      title: 'Pièce',
      dataIndex: 'nom_piece',
      render: (text) => (
        <span>
          <ToolOutlined style={{ marginRight: 8, color: '#000' }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Déscription',
      dataIndex: 'description',
      render: (text) => (
        <span>
          <FileTextOutlined style={{ marginRight: 8, color: '#000' }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Etat',
      dataIndex: 'id_etat',
      render: (id_etat_maintenance) => {
        if (id_etat_maintenance === 1) {
          return (
            <Badge
              color="green"
              text={
                <span>
                  <CheckCircleOutlined style={{ color: 'green', marginRight: 8 }} />
                  Terminé
                </span>
              }
            />
          );
        }
        if (id_etat_maintenance === 2) {
          return (
            <Badge
              color="blue"
              text={
                <span>
                  <SyncOutlined spin style={{ color: 'blue', marginRight: 8 }} />
                  En cours
                </span>
              }
            />
          );
        }
        return null;
      },
    },
    {
      title: 'Montant',
      dataIndex: 'cout',
      render: (text) => (
        <span>
          {text} $
        </span>
      ),
    }
  ];

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

          <div>
          <Card
            title="Détails des suivis"
            bordered={false}
            style={{
                maxWidth: 1000,
                margin: '20px auto',
                borderRadius: '8px',
                backgroundColor: '#fff',
            }}
            >
                <div className="chauffeur_bottom">
                    <Table
                        columns={columns} 
                        dataSource={reparation} 
                        bordered 
                        size="small"
                        scroll={scroll}
                    />
                </div>
            </Card>
          </div>
        </>
      ) : (
        <Alert message="Aucune donnée disponible" type="warning" showIcon />
      )}
    </Card>
    
  );
};

export default DetailMaintenance;
