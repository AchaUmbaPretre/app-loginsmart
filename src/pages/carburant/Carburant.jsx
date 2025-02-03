import { Breadcrumb, Button, Input, message, Modal, notification, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import { PlusCircleOutlined,HomeOutlined,CloseOutlined,FireOutlined,AppstoreOutlined, CalendarOutlined, UserOutlined, CarOutlined, EyeOutlined,DeleteOutlined,EditOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import './carburant.scss';
import { useEffect, useState } from 'react';
import CarburantForm from './carburantForm/CarburantForm';
import FilterCarburant from './filterCarburant/FilterCarburant';
import carburantService from '../../services/carburant.service';
import moment from 'moment';
import CarburantOne from './carburantOne/CarburantOne';

const Carburant = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [data, setData] = useState([]);
    const [idPlein, setIdPlein] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const scroll = { x: 400 };

    const fetchData = async () =>{
      try {
        const [carburantData] = await Promise.all([
          carburantService.getCarburant()
        ])
        setLoading(true);
        setData(carburantData)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }

  useEffect(()=> {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
       await carburantService.deleteCarburant(id);
      setData(data.filter((item) => item.id_plein !== id));
      message.success('Plein a ete supprimé avec succès');
    } catch (error) {
      notification.error({
        message: 'Erreur de suppression',
        description: 'Une erreur est survenue lors de la suppression du plein.',
      });
    }
  };

    const closeAllModals = () => {
      setModalType(null);
    };
  
    const openModal = (type, idPlein = '') => {
      closeAllModals();
      setModalType(type);
      setIdPlein(idPlein)
    };
  
    const handleAdd = (idPlein) =>{
      openModal('add', idPlein)
    }

    const handleDetail = (idPlein) =>{
      openModal('detail', idPlein)
    }

    const handleEdit = (idPlein) =>{
      openModal('edit', idPlein)
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
        width: "3%" 
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
            <span><CarOutlined style={{ color: '#2db7f5' }} /> {text}</span>
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
        sorter: {
          compare: (a, b) => new Date(a.date_plein) - new Date(b.date_plein),  // Comparaison de dates via la conversion en Date
          multiple: 1,
        },
        render: text => (
          <Tooltip title="Date du plein">
            <div>
              <CalendarOutlined style={{ color: '#fa8c16', marginRight:'5px' }} />
                {moment(text).format('DD-MM-YYYY')}
            </div>
          </Tooltip>
        )
      },      
      {
        title: 'Kilometrage',
        dataIndex: 'kilometrage',
        sorter: {
          compare: (a, b) => a.kilometrage - b.kilometrage,
          multiple: 1,
        },
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
            <Tag color='cyan'>{text}</Tag>
          </Tooltip>
        )
      },
      {
        title: 'Numero',
        dataIndex: 'matricule_ch',
        render: text => (
          <Tooltip title="Numéro">
            <Tag color='gold'>{text}</Tag>
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
                onClick={() => handleDetail(record.id_plein)}
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
                onClick={() => handleEdit(record.id_plein)}
              />
            </Tooltip>
    
            <Tooltip title="Supprimer" placement="top">
              <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer ?"
                okText="Oui"
                cancelText="Non"
                onConfirm={() => handleDelete(record.id_plein)}
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

    const filteredData = data.filter(item =>
      item.immatriculation?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nom_marque?.toLowerCase().includes(searchValue.toLowerCase()) || 
      item.nom_chauffeur?.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div className="chauffeur">
        <div className="chauffeur_top">
            <div className="chauffeur_top_left">
                <h2 className="chauffeur_h2">LISTE DES PRÉLÈVEMENTS DE CARBURANT</h2>
                <Breadcrumb
                    separator=">"
                    items={[
                        { title: <><HomeOutlined /> Accueil</>, href: "/" },
                        { title: <><FireOutlined /> Consommation</>, href: "/consommation_carburant" },
                        { title: <><CarOutlined /> Véhicule</>, href: "/vehicule" },
                        { title: <>Carburant</> },
                    ]}
                    className="custom-breadcrumb"
                />
            </div>
            <div className="chauffeur_top_right">
                <Space size="middle">
                <Input
                    placeholder="Rechercher..."
                    prefix={<SearchOutlined />}
                    className="chauffeur_search"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <Button
                    icon={filterVisible ? <CloseOutlined /> : <FilterOutlined />}
                    onClick={handFilter}
                    className={`chauffeur_filter ${filterVisible ? "active" : ""}`}
                    style={{ backgroundColor: filterVisible ? "#ff4d4f" : "", color: filterVisible ? "#fff" : "" }}
                >
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
                dataSource={filteredData} 
                onChange={onChange} 
                loading={loading}
                scroll={scroll}
                bordered 
                size="small"
                rowClassName={(record, index) => (index % 2 === 0 ? 'odd-row' : 'even-row')}
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

        <Modal
          title=""
          visible={modalType === 'edit'}
          onCancel={closeAllModals}
          footer={null}
          width={1025}
          centered
        >
          <CarburantForm closeModal={() => setModalType(null)} fetchData={fetchData} idPlein={idPlein}/>
        </Modal>

        <Modal
          title=""
          visible={modalType === 'detail'}
          onCancel={closeAllModals}
          footer={null}
          width={1025}
          centered
        >
          <CarburantOne idPlein={idPlein}/>
        </Modal>
    </div>
  );
};

export default Carburant;
