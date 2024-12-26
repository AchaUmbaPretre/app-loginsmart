import { Breadcrumb, Button, Input, Modal, Space, Table } from 'antd';
import { PlusCircleOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useState } from 'react';
import FournisseurForm from './fournisseurForm/FournisseurForm';

const Fournisseur = () => {
  const [modalType, setModalType] = useState(null);
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
            render: (text, record, index) => index + 1, 
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
          dataIndex: 'email'
        },
        {
          title: 'Telephone',
          dataIndex: 'telephone'
        },
        {
          title: 'Actions',
          dataIndex: 'actions'
        },
      ];

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
              dataSource={[]} 
              onChange={onChange} 
              scroll={scroll}
              bordered
              size="small"
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
