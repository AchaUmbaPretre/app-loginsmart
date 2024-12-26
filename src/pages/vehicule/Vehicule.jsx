import { Breadcrumb, Button, Image, Input, Modal, Popconfirm, Space, Table, Tooltip } from 'antd';
import { PlusCircleOutlined,EditOutlined,EyeOutlined,DeleteOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import VehiculeForm from './vehiculeForm/VehiculeForm';
import { useEffect, useState } from 'react';
import api from './../../utils/api'
import vehiculeService from '../../services/vehicule.service';

const Vehicule = () => {
  const [modalType, setModalType] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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


    const fetchData = async () =>{
      try {
        setLoading(true);
        const [chauffeurData] = await Promise.all([
          vehiculeService.getVehicule()
        ])

        setData(chauffeurData)

      } catch (error) {
        console.log(error)
      }
    }

  useEffect(()=> {
    fetchData()
  }, [])

  const columns = [
    { 
      title: '#', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record, index) => index + 1, 
      width: "3%" 
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (text, record) => (
        <div className="userList">
          <Image
            className="userImg"
            src={`${api.defaults.baseURL}/${record.img}`}
            fallback={`${api.defaults.baseURL}/default-image.jpg`}
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
            alt="Profil utilisateur"
          />
        </div>
      ),
    },
    {
      title: 'Immatriculation',
      dataIndex: 'immatriculation',
    },
    {
      title: 'Marque',
      dataIndex: 'nom_marque',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Modèle',
      dataIndex: 'modele'
    },
    {
      title: 'Année de fab',
      dataIndex: 'annee_fabrication'
    },
    {
      title: 'Année circulation',
      dataIndex: 'annee_circulation'
    },
    {
      title: 'Categorie',
      dataIndex: 'nom_cat'
    },
    {
      title: 'Nbre place',
      dataIndex: 'nbre_place'
    },
    {
      title: 'Nbre porte',
      dataIndex: 'nbre_portes'
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
                <h2 className="chauffeur_h2">Liste des véhicules</h2>
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
                    Nouveau vehicule
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
              size="small"
              scroll={scroll}
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
          <VehiculeForm fetchData={fetchData} closeModal={()=>setModalType(null)}/>
        </Modal>
    </div>
  );
};

export default Vehicule;
