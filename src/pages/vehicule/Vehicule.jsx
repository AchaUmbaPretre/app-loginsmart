import { Breadcrumb, Button, Image, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import { PlusCircleOutlined,EditOutlined,CalendarOutlined,EyeOutlined,DeleteOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import VehiculeForm from './vehiculeForm/VehiculeForm';
import { useEffect, useState } from 'react';
import api from './../../utils/api'
import vehiculeService from '../../services/vehicule.service';
import moment from 'moment';

const Vehicule = () => {
  const [modalType, setModalType] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idVehicule, setIdVehicule] = useState('');
  const scroll = { x: 400 };


/*   const handleDelete = async (id) => {
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
  }; */

  const closeAllModals = () => {
    setModalType(null);
  };

  const openModal = (type, idVehicule = '') => {
    closeAllModals();
    setModalType(type);
    setIdVehicule(idVehicule)
  };

  const handleAdd = ( idVehicule) =>{
    openModal('add', idVehicule)
  }

  const handleEdit = ( idVehicule ) =>{
    openModal('edit', idVehicule)
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
      } finally{
        setLoading(false)
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
      render: (text, record, index) => (
        <Tooltip title={`Ligne ${index + 1}`}>
          <Tag color="blue">{index + 1}</Tag>
        </Tooltip>
      ),
      width: "4%" 
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
      title: 'Immatricule',
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
      dataIndex: 'modele',
      render : (text) => (
        <div>
          { text ? text : 'Aucune'}
        </div>
      )

    },
    {
      title: 'Année de fab',
      dataIndex: 'annee_fabrication',
      render: text => (
        <Tooltip title="Annee fabrication">
          <div>
            <CalendarOutlined style={{ color: '#fa8c16', marginRight:'5px' }} />
              {moment(text).format('YYYY')}
          </div>
        </Tooltip>
      )
    },
    {
      title: 'Année circulation',
      dataIndex: 'annee_circulation',
      render: text => (
        <Tooltip title="annee circulation'">
          <div>
            <CalendarOutlined style={{ color: '#fa8c16', marginRight:'5px' }} />
              {moment(text).format('YYYY')}
          </div>
        </Tooltip>
      )
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
              onClick={() => handleEdit(record.id_vehicule) }
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
                    { title: 'Véhicule', href: '/carburant' },
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
              loading={loading}
              rowClassName={(record, index) => (index % 2 === 0 ? 'odd-row' : 'even-row')}
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

        <Modal
          title=""
          visible={modalType === 'edit'}
          onCancel={closeAllModals}
          footer={null}
          width={1023}
          centered

        >
          <VehiculeForm fetchData={fetchData} closeModal={()=>setModalType(null)} idVehicule={idVehicule} />
        </Modal>
    </div>
  );
};

export default Vehicule;
