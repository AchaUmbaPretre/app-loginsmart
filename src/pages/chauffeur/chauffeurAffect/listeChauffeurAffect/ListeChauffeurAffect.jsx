import { Breadcrumb, Button, Input, Modal, Space, Table, Tooltip } from 'antd';
import { PlusCircleOutlined,HomeOutlined,CalendarOutlined,AppstoreAddOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ChauffeurAffect from '../ChauffeurAffect';
import affectationService from '../../../../services/affectation.service';
import moment from 'moment';

const ListeChauffeurAffect = () => {
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
                affectationService.getAffectation()
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

  const handleAdd = ( idBatiment) =>{
    openModal('add', idBatiment)
  }


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
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle" style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
        </Space>
      )
    }
  ];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <div className="chauffeur">
        <div className="chauffeur_top">
            <div className="chauffeur_top_left">
                <h2 className="chauffeur_h2">Liste d'affectations</h2>
                <Breadcrumb separator=">" className="chauffeur_breadcrumb">
                  <Breadcrumb.Item href="/">
                      <HomeOutlined style={{ marginRight: '8px' }} />
                      Accueil
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="/conge">
                      <CalendarOutlined style={{ marginRight: '8px' }} />
                      Congé
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
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
                <Button
                    className="chauffeur_btn"
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={handleAdd}
                >
                    Nouvel affectation
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

export default ListeChauffeurAffect;
