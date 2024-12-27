import { Breadcrumb, Button, Input, Modal, Space, Table } from 'antd';
import { PlusCircleOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ControleTechForm from './controleTechForm/ControleTechForm';
import maintenanceService from '../../../services/maintenance.service';
import TypeService from '../../../services/type.service';
import vehiculeService from '../../../services/vehicule.service';

const ControleTechnique = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () =>{
      try {
        setLoading(true);
        const [controleData ] = await Promise.all([
          maintenanceService.getControle()
              ])

        setData(controleData);
      } catch (error) {
        console.log(error)
      }
    }

  useEffect(()=> {
    fetchData()
  }, [])

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
          title: 'Immatriculation',
          dataIndex: 'immatricule',
        },
        {
          title: 'Marque',
          dataIndex: 'marque'
        },
        {
          title: 'Date controle',
          dataIndex: 'date_entree'
        },
        {
          title: 'Date validité',
          dataIndex: 'date_sortie'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Categorie',
            dataIndex: 'categorie'
        },
        {
            title: 'Chauffeur',
            dataIndex: 'fournisseur'
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
                <h2 className="chauffeur_h2">LISTE DES CONTROLES TECHNIQUES</h2>
                <Breadcrumb
                    separator=">"
                    items={[
                        { title: 'Accueil', href: '/' },
                        { title: 'Consommation', href: '/consommation_carburant' },
                        { title: 'Recherche globale', href: '/gestion' },
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
                    Nouveau controle
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
            <ControleTechForm closeModal={() => setModalType(null)} fetchData={fetchData}/>
        </Modal>
    </div>
  );
};

export default ControleTechnique;
