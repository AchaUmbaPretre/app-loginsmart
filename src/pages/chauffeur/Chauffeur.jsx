import { Breadcrumb, Button, Image, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import { PlusCircleOutlined,EditOutlined,EnvironmentOutlined ,DeleteOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import './chauffeur.scss';
import { useEffect, useState } from 'react';
import ChauffeurForm from './chauffeurForm/ChauffeurForm';
import ChauffeurService from '../../services/chauffeur.service';
import api from './../../utils/api'

const Chauffeur = () => {
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

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

  useEffect(()=> {
    const fetchData = async () =>{
      try {
        setLoading(true);
        const [chauffeurData] = await Promise.all([
          ChauffeurService.getChauffeur()
        ])

        setData(chauffeurData)

      } catch (error) {
        console.log(error)
      }
    }
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
            src={`${api.defaults.baseURL}/${record.profil}`} // Utilisation directe de l'URL complète
            fallback={`${api.defaults.baseURL}/default-image.jpg`} // Image de secours en cas d'échec
            width={40}
            height={40}
            style={{ borderRadius: '50%' }}
            alt="Profil utilisateur"
          />
        </div>
      ),
    },
    {
      title: 'Matricule',
      dataIndex: 'matricule',
      key: 'matricule',
      render: (text) => (
        <Tooltip title={`Matricule`}>
          <Tag color="blue">{text}</Tag>
        </Tooltip>
      )
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Prénom',
      dataIndex: 'prenom',
      key: 'prenom',
    },
    {
      title: 'Téléphone',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'Adresse',
      dataIndex: 'adresse',
      key: 'adresse',
      render: (text) => (
        <div>
          <EnvironmentOutlined style={{ color: 'red', marginRight: 4 }} />
          {text}
        </div>
      ),
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
      render: (text) => (
        <Tooltip title={`Sexe`}>
          <Tag color="blue">{text}</Tag>
        </Tooltip>
      )
    },
    {
      title: 'Affectation',
      dataIndex: 'nom_site',
      key: 'nom_site',
    },
    {
      title: 'Congés',
      dataIndex: 'conges',
      key: 'conges',
      render: (text) => (
        <div>
          {text?? 'Aucun'}
        </div>
      )
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
    },
  ];
  

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
                        { title: 'Affectation', href: '/affectation' },
                        { title: 'Congé', href: '/conge' },
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
                bordered 
                size="small"
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
          <ChauffeurForm closeModal={() => setModalType(null)}/>
        </Modal>
    </div>
  );
};

export default Chauffeur;
