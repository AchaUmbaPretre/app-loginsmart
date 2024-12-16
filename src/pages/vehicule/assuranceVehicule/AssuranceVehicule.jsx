import { Breadcrumb, Button, Input, Modal, Space, Table } from 'antd';
import { PlusCircleOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AssuranceForm from './assuranceForm/AssuranceForm';

const AssuranceVehicule = ({ onAddChauffeur }) => {
    const [modalType, setModalType] = useState(null);

    const closeAllModals = () => {
      setModalType(null);
    };
  
    const openModal = (type, idBatiment = '') => {
      closeAllModals();
      setModalType(type);
    };
  
    const handleAdd = () =>{
      openModal('add')
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
          title: 'Immatricule',
          dataIndex: 'immatricule',
        },
        {
          title: 'Marque',
          dataIndex: 'marque'
        },
        {
          title: 'Modele',
          dataIndex: 'modele'
        },
        {
            title: 'Agence',
            dataIndex: 'agence'
        },
        {
            title: 'Carte verte',
            dataIndex: 'carte_verte'
        },
        {
            title: 'N° Police',
            dataIndex: 'carte_verte'
        },
        {
            title: 'Garantie',
            dataIndex: 'garantie'
        },
        {
            title: 'Date debut',
            dataIndex: 'date_debut'
        },
        {
            title: 'Date Fin',
            dataIndex: 'date_fin'
        },
        {
            title: ' Fin Etat Carte Verte',
            dataIndex: 'date_fin'
        },
        {
            title: 'Actions',
            dataIndex: 'actions'
        },
      ];
      const data = [];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      }; 

  return (
    <div className="chauffeur">
        <div className="chauffeur_top">
            <div className="chauffeur_top_left">
                <h2 className="chauffeur_h2">LISTE DES ASSURANCES</h2>
                <Breadcrumb
                separator=">"
                items={[
                    { title: 'Accueil', href: '/' },
                    { title: 'Gestion', href: '/gestion' },
                    { title: 'Personnel' },
                ]}
                className="chauffeur_breadcrumb"
                />
            </div>
            <div className="chauffeur_top_right">
                <Space size="middle">
                <Input
                    placeholder="Rechercher un personnel"
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
                    Nouvel assurancne
                </Button>
                </Space>
            </div>
        </div>
        <div className="chauffeur_bottom">
            <Table 
                columns={columns} 
                dataSource={data} 
                onChange={onChange} 
            />
        </div>
        <Modal
          title=""
          visible={modalType === 'add'}
          onCancel={closeAllModals}
          footer={null}
          width={1045}
          centered
        >
          <AssuranceForm/>
        </Modal>
    </div>
  );
};

export default AssuranceVehicule;
