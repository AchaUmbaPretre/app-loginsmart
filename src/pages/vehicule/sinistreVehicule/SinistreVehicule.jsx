import { Breadcrumb, Button, Input, Modal, Space, Table } from 'antd';
import { PlusCircleOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useState } from 'react';
import SinistreVehiculeForm from './sinistreVehiculeForm/SinistreVehiculeForm';

const SinistreVehicule = ({ onAddChauffeur }) => {
    const [modalType, setModalType] = useState(null);

    const closeAllModals = () => {
        setModalType(null);
      };
    
      const openModal = (type, idVehicule = '') => {
        closeAllModals();
        setModalType(type);
      };
    
      const handleAdd = (idVehicule) =>{
        openModal('add', idVehicule )
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
          title: 'N°',
          dataIndex: 'numero',
        },
        {
          title: 'Immatriculation',
          dataIndex: 'immatriculation'
        },
        {
          title: 'Date',
          dataIndex: 'date'
        },
        {
            title: 'Date',
            dataIndex: 'date'
        },
        {
            title: 'Lieu',
            dataIndex: 'lieu'
        },
        {
            title: 'Chauffeur',
            dataIndex: 'chauffeur'
        },
        {
            title: 'Commentaire',
            dataIndex: 'commentaire'
        },
        {
            title: 'Suivi',
            dataIndex: 'suivi'
        },
        {
            title: 'Actions',
            dataIndex: 'actions'
        }
      ];

      const data = [];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      }; 

  return (
    <div className="chauffeur">
        <div className="chauffeur_top">
            <div className="chauffeur_top_left">
                <h2 className="chauffeur_h2">LISTE DES SINISTRES</h2>
                <Breadcrumb
                    separator=">"
                    items={[
                        { title: 'Accueil', href: '/' },
                        { title: 'Gestion', href: '/gestion' },
                        { title: 'Sinistre' },
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
                    Nouveau sinistre
                </Button>
                </Space>
            </div>
        </div>
        <div className="chauffeur_bottom">
            <Table 
                columns={columns} 
                dataSource={data} 
                onChange={onChange} 
                bordered
            />
        </div>
        <Modal
          title=""
          visible={modalType === 'add'}
          onCancel={closeAllModals}
          footer={null}
          width={1000}
          centered
        >
          <SinistreVehiculeForm/>
        </Modal>
    </div>
  );
};

export default SinistreVehicule;
