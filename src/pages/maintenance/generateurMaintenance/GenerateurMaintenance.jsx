import { Breadcrumb, Button, Input, Modal, Space, Table } from 'antd';
import { PlusCircleOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useState } from 'react';
import GenerateurMaintenanceForm from './generateurMaintenanceForm/GenerateurMaintenanceForm';

const GenerateurMaintenance = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [idVehicule, setIdVehicule] = useState('');
    const [loading, setLoading] = useState(false);
    const scroll = { x: 400 };
    
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

    const handFilter = () => {
        setFilterVisible(!filterVisible)
      }

    const handleFilterChange = () => {

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
          title: 'Groupe',
          dataIndex: 'groupe',
        },
        {
          title: 'Date debut',
          dataIndex: 'date_debut'
        },
        {
          title: 'Date fin',
          dataIndex: 'date_fin'
        },
        {
            title: 'Nbre Jour',
            dataIndex: 'nbre_jour'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Fournisseur',
            dataIndex: 'fournisseur'
        },
        {
            title: 'Etat',
            dataIndex: 'etat'
        },
        {
            title: 'Suivie',
            dataIndex: 'suivie'
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
                <h2 className="chauffeur_h2">LISTE DES RÉPARATIONS ET ENTRETIENS</h2>
                <Breadcrumb
                    separator=">"
                    items={[
                        { title: 'Accueil', href: '/' },
                        { title: 'Consommation', href: '/consommation_carburant' },
                        { title: 'Carburant' },
                    ]}
                    className="chauffeur_breadcrumb"
                />
            </div>
            <div className="chauffeur_top_right">
                <Space size="middle">
                <Input
                    placeholder="Rechercher..."
                    prefix={<SearchOutlined />}
                    className="chauffeur_search"
                />
                <Button icon={<FilterOutlined />} onClick={handFilter} className="chauffeur_filter">
                    Filtres
                </Button>
                <Button
                    className="chauffeur_btn"
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={handleAdd}
                >
                    Nouvelle réparation
                </Button>
                </Space>
            </div>
        </div>
{/*         {filterVisible && <FilterCarburant onFilter={handleFilterChange}/>}
 */}        <div className="chauffeur_bottom">
            <Table 
                columns={columns} 
                dataSource={data} 
                onChange={onChange} 
                loading={loading}
                size="small" 
                scroll={scroll}
            />
        </div>
        <Modal
          title=""
          visible={modalType === 'add'}
          onCancel={closeAllModals}
          footer={null}
          width={1025}
          centered
        >
            <GenerateurMaintenanceForm/>
        </Modal>
    </div>
  );
};

export default GenerateurMaintenance;
