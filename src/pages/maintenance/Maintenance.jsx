import { Badge, Breadcrumb, Button,Menu, Input, Modal,Dropdown, Popconfirm,Tag, Space, Table, Tooltip } from 'antd';
import { PlusCircleOutlined,EyeOutlined,MoreOutlined,FileTextOutlined,CarOutlined,CalendarOutlined,ToolOutlined,ShopOutlined,SyncOutlined,CheckCircleOutlined,DeleteOutlined,EditOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Maintenance_form from './maintenance_form/Maintenance_form';
import maintenanceService from '../../services/maintenance.service';
import moment from 'moment';
import SuiviMaintenance from './suiviMaintenance/SuiviMaintenance';
import SuivieMaintenantOne from './suiviMaintenance/suivieMaintenantOne/SuivieMaintenantOne';

const Maintenance = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [idReparation, setIdReparation] = useState('');
    const scroll = { x: 400 };

      const fetchData = async () =>{
        try {
          setLoading(true);
          const [maintenantData] = await Promise.all([
            maintenanceService.getMaintenance()
          ])
  
          setData(maintenantData)
  
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
  
    const openModal = (type, id_reparation = '') => {
      closeAllModals();
      setModalType(type);
      setIdReparation(id_reparation)
    };
  
    const handleAdd = (id_reparation) =>{
      openModal('add', id_reparation )
    }


    const handleSuivi = (id_reparation) =>{
      openModal('suivi', id_reparation )
    }

    const handleListeSuivi = (id_reparation) =>{
      openModal('liste_suivi', id_reparation )
    }

    const handFilter = () => {
        setFilterVisible(!filterVisible)
      }

      const menu = (record) => (
        <>
          <Menu>
            <Menu.Item key="listeSuivi" icon={<ToolOutlined style={{ color: '#d46b08' }} />} onClick={() =>handleListeSuivi(record)}>
              Liste des suivi
            </Menu.Item>
            <Menu.Item key="edit" icon={<ToolOutlined style={{ color: '#d46b08' }} />} onClick={() =>handleSuivi(record)}>
              Faire un suivi
            </Menu.Item>
          </Menu>          
        </>
      );

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
        width: "5%" 
      },
      {
        title: 'Immatriculation',
        dataIndex: 'immatriculation',
        render: (text) => (
          <span>
            <CarOutlined style={{ marginRight: 5, color: '#1890ff' }} />
            {text}
          </span>
        ),
      },
      {
        title: 'Marque',
        dataIndex: 'nom_marque',
        render: (text) => (
          <span>
            <CarOutlined style={{ marginRight: 5, color: '#722ed1' }} />
            {text}
          </span>
        ),
      },
      {
        title: 'Date réparation',
        dataIndex: 'date_reparation',
        render: (text) => (
          <span>
            <CalendarOutlined style={{ marginRight: 8, color: '#13c2c2' }} />
            {moment(text).format('DD-MM-yyyy')}
          </span>
        ),
      },
      {
        title: 'Type Réparation',
        dataIndex: 'type_rep',
        render: (text) => (
          <span>
            <ToolOutlined style={{ marginRight: 8, color: '#d46b08' }} />
            {text}
          </span>
        ),
      },
      {
        title: 'Fournisseur',
        dataIndex: 'fournisseur',
        render: (text) => (
          <span>
            <ShopOutlined style={{ marginRight: 8, color: '#52c41a' }} />
            {text}
          </span>
        ),
      },
      {
        title: 'Etat',
        dataIndex: 'id_etat_maintenance',
        render: (id_etat_maintenance) => {
          if (id_etat_maintenance === 1) {
            return (
              <Badge
                color="green"
                text={
                  <span>
                    <CheckCircleOutlined style={{ color: 'green', marginRight: 8 }} />
                    Terminé
                  </span>
                }
              />
            );
          }
          if (id_etat_maintenance === 2) {
            return (
              <Badge
                color="blue"
                text={
                  <span>
                    <SyncOutlined spin style={{ color: 'blue', marginRight: 8 }} />
                    En cours
                  </span>
                }
              />
            );
          }
          return null;
        },
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        width: '15%',
        render: (text, record) => (
          <Space size="middle" style={{ justifyContent: 'space-around', width: '100%' }}>
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
                onClick={() => console.log('Afficher les détails pour', record)}
              />
            </Tooltip>
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
            <Dropdown overlay={() => menu(record.id_reparation)} trigger={['click']} placement="bottomRight">
              <Button
                icon={<MoreOutlined />}
                style={{
                  color: '#fff',
                  backgroundColor: '#595959',
                  borderColor: '#595959',
                  transition: 'all 0.3s ease',
                }}
                aria-label="Plus d'options"
              />
            </Dropdown>

            <Tooltip title="Supprimer" placement="top">
              <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer cet élément ?"
                okText="Oui"
                cancelText="Non"
                onConfirm={() => console.log('Suppression confirmée pour', record)}
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
      },
    ];
    

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <div className="chauffeur">
        <div className="chauffeur_top">
            <div className="chauffeur_top_left">
                <h2 className="chauffeur_h2">LISTE DE TOUTES LES REPARATIONS ET ENTRETIENS</h2>
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
                bordered 
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
          <Maintenance_form fetchData={fetchData} closeModal={() => setModalType(null)}/>
        </Modal>

        <Modal
          title=""
          visible={modalType === 'suivi'}
          onCancel={closeAllModals}
          footer={null}
          width={1000}
          centered
        >
          <SuiviMaintenance fetchData={fetchData} closeModal={() => setModalType(null)} idReparation={idReparation}/>
        </Modal>

        <Modal
          title=""
          visible={modalType === 'liste_suivi'}
          onCancel={closeAllModals}
          footer={null}
          width={1000}
          centered
        >
          <SuivieMaintenantOne fetchData={fetchData} closeModal={() => setModalType(null)} idReparation={idReparation}/>
        </Modal>
    </div>
  );
};

export default Maintenance;
