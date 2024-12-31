import { Breadcrumb, Button, Input, Popconfirm, Space, Table, Tooltip } from 'antd';
import { PlusCircleOutlined,EditOutlined,HomeOutlined,TeamOutlined,EnvironmentOutlined,PhoneOutlined,  DeleteOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import TypeService from '../../services/type.service';

const Sites = () => {
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
        const [siteData] = await Promise.all([
          TypeService.getSite()
        ])

        setData(siteData)

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
        <span style={{ fontWeight: 'bold' }}>{index + 1}</span>
      ), 
      width: "5%",
    },
    {
      title: 'Nom site',
      dataIndex: 'nom_site',
      key: 'nom_site',
      render: (text) => (
        <div>
          <HomeOutlined style={{ color: '#1890ff', marginRight: 4 }} />
          {text}
        </div>
      ),
    },
    {
      title: 'Adresse',
      dataIndex: 'adress',
      key: 'adresse',
      render: (text) => (
        <div>
          <EnvironmentOutlined style={{ color: '#faad14', marginRight: 4 }} />
          {text}
        </div>
      ),
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
      render: (text) => (
        <div>
          <EnvironmentOutlined style={{ color: 'red', marginRight: 4 }} />
          {text}
        </div>
      ),
    },
    {
      title: 'Ville',
      dataIndex: 'ville',
      key: 'ville',
      render: (text) => (
        <div>
          <EnvironmentOutlined style={{ color: '#52c41a', marginRight: 4 }} />
          {text}
        </div>
      ),
    },
    {
      title: 'Téléphone',
      dataIndex: 'tel',
      key: 'tel',
      render: (text) => (
        <div>
          <PhoneOutlined style={{ color: '#eb2f96', marginRight: 4 }} />
          {text}
        </div>
      ),
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
              cancelText="Non"
            >
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
                <h2 className="chauffeur_h2">Liste des sites</h2>
                <Breadcrumb
                    separator=">"
                    items={[
                        { title: 'Accueil', href: '/' },
                        { title: 'Affectation', href: '/affectation' },
                        { title: 'Site' },
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
    </div>
  );
};

export default Sites;