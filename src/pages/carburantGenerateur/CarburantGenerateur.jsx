import { Breadcrumb, Button, Input, Modal, Space, Table } from 'antd';
import { PlusCircleOutlined, SearchOutlined,HomeOutlined,CarOutlined, FilterOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CarburantGenerateurForm from './carburantGenerateurForm/CarburantGenerateurForm';

const CarburantGenerateur = () => {
  const [modalType, setModalType] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scroll = { x: 400 };


  const closeAllModals = () => {
    setModalType(null);
  };

  const openModal = (type) => {
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
            render: (text, record, index) => index + 1, 
            width: "3%" 
          },
        {
          title: 'Code',
          dataIndex: 'code',
        },
        {
          title: 'Groupe',
          dataIndex: 'groupe',
          sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
          },
        },
        {
          title: 'Modele',
          dataIndex: 'math',
          sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
          },
        },
        {
          title: 'Date',
          dataIndex: 'date',
          sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
          },
        },
        {
            title: 'Index',
            dataIndex: 'Index',
            sorter: {
              compare: (a, b) => a.english - b.english,
              multiple: 1,
            },
        },
        {
            title: 'Quantité',
            dataIndex: 'quantité',
            sorter: {
              compare: (a, b) => a.english - b.english,
              multiple: 1,
            },
        },
        {
            title: 'Carburant',
            dataIndex: 'carburant',
            sorter: {
              compare: (a, b) => a.english - b.english,
              multiple: 1,
            },
        },
        {
            title: 'Agent',
            dataIndex: 'agent'
        },
        {
            title: 'Utilisateur',
            dataIndex: 'utilisateur'
        },
        {
            title: 'Actions',
            dataIndex: 'actions'
        }
      ];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <div className="chauffeur">
        <div className="chauffeur_top">
            <div className="chauffeur_top_left">
                <h2 className="chauffeur_h2">LISTE DE TOUS LES PRÉLÈVEMENTS</h2>
                <Breadcrumb
                    separator=">"
                    items={[
                        { title: <><HomeOutlined /> Accueil</>, href: "/" },
                        { title: <><CarOutlined /> Véhicule</>, href: "/vehicule" },
                        { title: <>Générateur</> },
                    ]}
                    className="custom-breadcrumb"
                />
            </div>
            <div className="chauffeur_top_right">
                <Space size="middle">
                <Input
                    placeholder="Rechercher un chauffeur"
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
                    Nouveau génerateur
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
            <CarburantGenerateurForm/>
        </Modal>
    </div>
  );
};

export default CarburantGenerateur;
