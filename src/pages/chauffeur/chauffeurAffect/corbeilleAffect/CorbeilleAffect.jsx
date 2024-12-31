import { Breadcrumb, Button, Input, Modal, Space, Table, Tag, Tooltip } from 'antd';
import { HomeOutlined,EditOutlined,DeleteOutlined,PlusOutlined, CalendarOutlined,AppstoreAddOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ChauffeurAffect from '../ChauffeurAffect';
import affectationService from '../../../../services/affectation.service';
import moment from 'moment';

const CorbeilleAffect = () => {
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const closeAllModals = () => {
    setModalType(null);
  };

  const openModal = (type) => {
    closeAllModals();
    setModalType(type);
  };

    const fetchData = async () => {
        try {
            setLoading(true);

            const [affectationData] = await Promise.all([
                affectationService.getAffectationHistorique()
            ]);

            setData(affectationData);
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { 
      title: '#', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record, index) => (
        <span style={{ fontWeight: 'bold' }}>{index + 1}</span>
      ),
      width: "5%", 
    },
    {
      title: 'Chauffeur',
      dataIndex: 'nom_chauffeur',
      render: (text, record) => (
        <div>
          <span style={{ color: '#1890ff' }}>{`${record.prenom_chauffeur}`}</span> - <span style={{ fontWeight: 'bold' }}>{record.nom_chauffeur}</span>
        </div>
      ),
    },
    {
      title: 'Nom site',
      dataIndex: 'nom_site',
      render: (text) => (
        <div>
          <span style={{ color: '#52c41a', fontStyle: 'italic' }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'commentaire',
      render: (text) => (
        <div>
          <span style={{ fontStyle: 'italic' }}>{text}</span>
        </div>
      ),
    },
    {
        title: "Type d'action",
        dataIndex: 'type_action',
        render: (text) => {
          let icon;
          let color;
    
          switch (text) {
            case 'ajout':
              icon = <PlusOutlined />;
              color = 'green';
              break;
            case 'modification':
              icon = <EditOutlined />;
              color = 'blue';
              break;
            case 'suppression':
              icon = <DeleteOutlined />;
              color = 'red';
              break;
            default:
              icon = null;
              color = 'default';
          }
    
          return (
            <Tag color={color} icon={icon}>
              {text}
            </Tag>
          );
        },
      },
    {
      title: "Date d'affectation",
      dataIndex: 'created_at',
      render: (text) => (
        <Tooltip title="Date d'affectation">
          <div>
            <CalendarOutlined style={{ color: '#fa8c16', marginRight: 8 }} /> 
            <span>{moment(text).format('DD-MM-yyyy')}</span>
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Créé par',
      dataIndex: 'affectation',
      render: (text, record) => (
        <div>
          <span style={{ color: '#722ed1' }}>{record.prenom}</span> - <span style={{ fontWeight: 'bold' }}>{record.nom}</span>
        </div>
      ),
    }
  ];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <div className="chauffeur">
        <div className="chauffeur_top">
            <div className="chauffeur_top_left">
                <h2 className="chauffeur_h2">Liste des historiques d'affectation</h2>
                <Breadcrumb separator=">" className="chauffeur_breadcrumb">
                  <Breadcrumb.Item href="/">
                      <HomeOutlined style={{ marginRight: '8px' }} />
                      Accueil
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href='liste_affectation'>
                      <AppstoreAddOutlined style={{ marginRight: '8px' }} />
                      Affectation
                  </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="chauffeur_top_right">
                <Space size="middle">
                <Input
                    placeholder="Rechercher..."
                    prefix={<SearchOutlined />}
                    className="chauffeur_search"
                />
                <Button icon={<FilterOutlined />} className="chauffeur_filter">
                    Filtres
                </Button>
                </Space>
            </div>
        </div>
        <div className="chauffeur_bottom">
            <Table 
                columns={columns} 
                dataSource={data} 
                onChange={onChange} 
                loading={loading}
                bordered
            />
        </div>
        <Modal
          title=""
          visible={modalType === 'add'}
          onCancel={closeAllModals}
          footer={null}
          width={1023}
          centered
        >
          <ChauffeurAffect fetchData={fetchData} closeModal={()=>setModalType(null)} />
        </Modal>
    </div>
  );
};

export default CorbeilleAffect;
