import { Breadcrumb, Button, Input, Modal, Space, Table } from 'antd';
import { PlusCircleOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import './chauffeur.scss';
import { useState } from 'react';
import ChauffeurForm from './chauffeurForm/ChauffeurForm';

const Chauffeur = ({ onAddChauffeur }) => {
  const [modalType, setModalType] = useState(null);

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
          title: 'Matricule',
          dataIndex: 'matricule',
        },
        {
          title: 'Nom',
          dataIndex: 'nom'
        },
        {
          title: 'Prenom',
          dataIndex: 'prenom'
        },
        {
          title: 'Telephone',
          dataIndex: 'telephone'
        },
        {
          title: 'Fonction',
          dataIndex: 'fonction'
        },
        {
          title: 'Affectation',
          dataIndex: 'affectation'
        },
        {
          title: 'Conges',
          dataIndex: 'Conges'
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
                <h2 className="chauffeur_h2">Liste des chauffeurs</h2>
                <Breadcrumb
                    separator=">"
                    items={[
                        { title: 'Accueil', href: '/' },
                        { title: 'Gestion', href: '/gestion' },
                        { title: 'Chauffeurs' },
                    ]}
                    className="chauffeur_breadcrumb"
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
                    Nouveau chauffeur
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
          width={1023}
          centered
        >
          <ChauffeurForm/>
        </Modal>
    </div>
  );
};

export default Chauffeur;
