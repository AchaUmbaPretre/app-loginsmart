import { Breadcrumb, Button, Input, Modal, Space, Table, Popconfirm, Tooltip } from 'antd';
import { PlusCircleOutlined, SearchOutlined,EyeOutlined,DeleteOutlined, EditOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ControleTechForm from './controleTechForm/ControleTechForm';
import maintenanceService from '../../../services/maintenance.service';

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
          dataIndex: 'immatriculation',
        },
        {
          title: 'Marque',
          dataIndex: 'nom_marque'
        },
        {
          title: 'Date controle',
          dataIndex: 'date_controle'
        },
        {
          title: 'Date validité',
          dataIndex: 'date_validite'
        },
        {
            title: 'Description',
            dataIndex: 'commentaire'
        },
        {
            title: 'Categorie',
            dataIndex: 'categorie'
        },
        {
            title: 'Chauffeur',
            dataIndex: 'nom_chauffeur'
        },
        {
            title: 'Fournisseur',
            dataIndex: 'nom_fournisseur'
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          width: '15%',
          render: (text, record) => (
            <Space size="middle" style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              {/* Détail Button */}
              <Tooltip title="Détail" placement="top">
                <Button
                  icon={<EyeOutlined />}
                  style={{
                    color: '#fff',
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Détail"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#40a9ff'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#1890ff'}
                  onClick={() => {
                    // Logique d'affichage du détail à ajouter ici
                    console.log('Afficher les détails pour', record);
                  }}
                />
              </Tooltip>
      
              {/* Modifier Button */}
              <Tooltip title="Modifier" placement="top">
                <Button
                  icon={<EditOutlined />}
                  style={{
                    color: '#fff',
                    backgroundColor: '#52c41a',
                    borderColor: '#52c41a',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label="Modifier"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#45b22d'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#52c41a'}
                />
              </Tooltip>
      
              {/* Supprimer Button */}
              <Tooltip title="Supprimer" placement="top">
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer ce client ?"
                  okText="Oui"
                  cancelText="Non"
                  onConfirm={() => {
                    // Logique de suppression à ajouter ici
                  }}
                >
                  <Button
                    icon={<DeleteOutlined />}
                    style={{
                      color: '#fff',
                      backgroundColor: '#ff4d4f',
                      borderColor: '#ff4d4f',
                      transition: 'all 0.3s ease',
                    }}
                    aria-label="Supprimer"
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#e10000'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4d4f'}
                  />
                </Popconfirm>
              </Tooltip>
            </Space>
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
