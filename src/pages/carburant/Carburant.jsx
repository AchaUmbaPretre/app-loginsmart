import { Breadcrumb, Button, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import { PlusCircleOutlined,AppstoreAddOutlined,IdcardOutlined,FireOutlined,AppstoreOutlined, CalendarOutlined, UserOutlined, CarOutlined, EyeOutlined,DeleteOutlined,EditOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import './carburant.scss';
import { useEffect, useState } from 'react';
import CarburantForm from './carburantForm/CarburantForm';
import FilterCarburant from './filterCarburant/FilterCarburant';
import carburantService from '../../services/carburant.service';
import moment from 'moment';

const Carburant = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () =>{
      try {
        setLoading(true);
        const [carburantData] = await Promise.all([
          carburantService.getCarburant()
        ])

        setData(carburantData)

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
        render: (text, record, index) => (
          <Tooltip title={`Ligne ${index + 1}`}>
            <Tag color="blue">{index + 1}</Tag>
          </Tooltip>
        ),
        width: "4%" 
      },
      {
        title: 'Immatri.',
        dataIndex: 'immatriculation',
        render: text => (
          <Tooltip title="Immatriculation">
            <span ><CarOutlined style={{ color: '#1890ff' }} /> {text}</span>
          </Tooltip>
        )
      },
      {
        title: 'Marque',
        dataIndex: 'nom_marque',
        render: text => (
          <Tooltip title="Marque">
            <span><CarOutlined style={{ color: '#40a9ff' }} /> {text}</span>
          </Tooltip>
        )
      },
      {
        title: 'Chauffeur',
        dataIndex: 'nom_chauffeur',
        render: text => (
          <Tooltip title="Chauffeur">
            <span><UserOutlined style={{ color: '#52c41a' }} /> {text}</span>
          </Tooltip>
        )
      },
      {
        title: 'Date',
        dataIndex: 'date_plein',
        render: text => (
          <Tooltip title="Date du plein">
            <div><CalendarOutlined style={{ color: '#fa8c16' }} /> {moment(text).format('DD-MM-yyyy')}</div>
          </Tooltip>
        )
      },
      {
        title: 'Kilometrage',
        dataIndex: 'kilometrage',
        render: text => (
          <Tooltip title="Kilométrage">
            <span><AppstoreOutlined style={{ color: '#52c41a' }}/> {text} km</span>
          </Tooltip>
        )
      },
      {
        title: 'T. carburant',
        dataIndex: 'nom_type_carburant',
        render: text => (
          <Tooltip title="Type de carburant">
            <span><FireOutlined style={{ color: '#ffec3d' }} /> {text}</span>
          </Tooltip>
        )
      },
      {
        title: 'Qté',
        dataIndex: 'qte_plein',
        sorter: {
          compare: (a, b) => a.qte_plein - b.qte_plein,
          multiple: 1,
        },
        render: text => (
          <Tooltip title="Quantité">
            <span><PlusCircleOutlined style={{ color: '#fa8c16' }} /> {text}</span>
          </Tooltip>
        )
      },
      {
        title: 'Numero',
        dataIndex: 'matricule_ch',
        render: text => (
          <Tooltip title="Numéro">
            <span><IdcardOutlined style={{ color: '#ff4d4f' }} /> {text}</span>
          </Tooltip>
        )
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        width: '15%',
        render: (text, record) => (
          <Space size="middle" style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
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
                  console.log('Afficher les détails pour', record);
                }}
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
    
            <Tooltip title="Supprimer" placement="top">
              <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer ce client ?"
                okText="Oui"
                cancelText="Non"
                onConfirm={() => {}}
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
                <h2 className="chauffeur_h2">LISTE DES PRÉLÈVEMENTS DE CARBURANT</h2>
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
                    Nouveau carburant
                </Button>
                </Space>
            </div>
        </div>
        {filterVisible && <FilterCarburant onFilter={handleFilterChange}/>}
        <div className="chauffeur_bottom">
            <Table 
                columns={columns} 
                dataSource={data} 
                onChange={onChange} 
                bordered 
                size="small"
            />
        </div>
        <Modal
          title=""
          visible={modalType === 'add'}
          onCancel={closeAllModals}
          footer={null}
          width={1055}
          centered
        >
          <CarburantForm closeModal={() => setModalType(null)} fetchData={fetchData}/>
        </Modal>
    </div>
  );
};

export default Carburant;
