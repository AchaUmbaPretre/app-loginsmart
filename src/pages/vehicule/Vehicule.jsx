import { Breadcrumb, Button, Image, Input, Modal, Popconfirm, Space, Table, Tooltip } from 'antd';
import { PlusCircleOutlined,EditOutlined,DeleteOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
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
          width: '10%',
          render: (text, record) => (
            <Space size="middle">
              <Tooltip title="Modifier">
                <Button
                  icon={<EditOutlined />}
                  style={{
                    color: '#fff',
                    backgroundColor: '#52c41a',
                    borderColor: '#52c41a',
                  }}
                  aria-label="Modifier"
                />
              </Tooltip>
              <Tooltip title="Supprimer">
                <Popconfirm
                  title="Êtes-vous sûr de vouloir supprimer ce client ?"
                  okText="Oui"
                  cancelText="Non"            >
                  <Button
                    icon={<DeleteOutlined />}
                    style={{
                      color: '#fff',
                      backgroundColor: '#ff4d4f',
                      borderColor: '#ff4d4f',
                    }}
                    aria-label="Supprimer"
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
            />
        </div>
        <Modal
          title=""
          visible={modalType === 'add'}
          onCancel={closeAllModals}
          footer={null}
          width={1023}
          centered
          scroll={scroll}
          size="small"
        >
          <VehiculeForm fetchData={fetchData} closeModal={()=>setModalType(null)}/>
        </Modal>
    </div>
  );
};

export default Vehicule;
