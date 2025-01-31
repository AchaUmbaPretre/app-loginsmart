import { Breadcrumb, Button, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import { PlusCircleOutlined, SearchOutlined,EditOutlined,DeleteOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import FournisseurForm from './fournisseurForm/FournisseurForm';
import TypeService from '../../services/type.service';

const Fournisseur = () => {
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const scroll = { x: 400 };

  const closeAllModals = () => {
    setModalType(null);
  };

  const openModal = (type, idBatiment = '') => {
    closeAllModals();
    setModalType(type);
  };

  const handleAdd = ( idBatiment) =>{
    openModal('add', idBatiment)
  }

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
          width: "3%" 
        },
        {
          title: 'Nom',
          dataIndex: 'nom',
        },
        {
          title: 'Ville',
          dataIndex: 'ville',
        },
        {
          title: 'Adresse',
          dataIndex: 'adresse'
        },
        {
          title: 'Email',
          dataIndex: 'mail'
        },
        {
          title: 'Telephone',
          dataIndex: 'tel'
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          width: '10%',
          render: (text, record) => (
            <Space size="middle">
              <Tooltip title="Modifier">
                <Button
                  icon={<EditOutlined />}
                  style={{
                    color: '#fff',
                    backgroundColor: '#52c41a',
                    borderColor: '#52c41a',
                  }}
                  aria-label="Modifier"
                />
              </Tooltip>
              <Tooltip title="Supprimer">
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer ce fournisseur ?"
                  okText="Oui"
                  cancelText="Non"
                >
                  <Button
                    icon={<DeleteOutlined />}
                    style={{
                      color: '#fff',
                      backgroundColor: '#ff4d4f',
                      borderColor: '#ff4d4f',
                    }}
                    aria-label="Supprimer"
                  />
                </Popconfirm>
              </Tooltip>
            </Space>
          ),
        },
      ];

      useEffect(()=> {
        const fetchData = async () =>{
          try {
            setLoading(true);
            const [fournisseurData] = await Promise.all([
              TypeService.getFournisseur()
            ])
    
            setData(fournisseurData)
    
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false)
          }
        }
        fetchData()
      }, [])

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <div className="chauffeur">
        <div className="chauffeur_top">
            <div className="chauffeur_top_left">
                <h2 className="chauffeur_h2">Liste des fournisseurs</h2>
                <Breadcrumb
                separator=">"
                items={[
                    { title: 'Accueil', href: '/' },
                    { title: 'Gestion', href: '/gestion' },
                    { title: 'Fournisseur' },
                ]}
                className="chauffeur_breadcrumb"
                />
            </div>
            <div className="chauffeur_top_right">
                <Space size="middle">
                <Input
                    placeholder="Rechercher un véhicule..."
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
                    Nouveau fournisseur
                </Button>
                </Space>
            </div>
        </div>
        <div className="chauffeur_bottom">
            <Table 
              columns={columns} 
              dataSource={data} 
              onChange={onChange} 
              scroll={scroll}
              bordered
              size="small"
              loading={loading}
              rowClassName={(record, index) => (index % 2 === 0 ? 'odd-row' : 'even-row')}
            />
        </div>
        <Modal
          title=""
          visible={modalType === 'add'}
          onCancel={closeAllModals}
          footer={null}
          width={900}
          centered
        >
          <FournisseurForm/>
        </Modal>
    </div>
  );
};

export default Fournisseur;
