import { Breadcrumb, Button, Input, Modal, Space, Table, Tag, Tooltip } from 'antd';
import { PlusCircleOutlined, SearchOutlined,EnvironmentOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import TypeService from '../../services/type.service';

const Localisation = () => {
  const [modalType, setModalType] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(()=> {
    const fetchData = async () =>{
      try {
        setLoading(true);
        const [siteData] = await Promise.all([
          TypeService.getProvince()
        ])

        setData(siteData)

      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
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
            title: 'Province',
            dataIndex: 'province',
            render: (text) => (
              <div>
                <EnvironmentOutlined style={{ color: '#52c41a', marginRight: 4 }} />
                {text}
              </div>
            ),
        },
        {
          title: 'Pays',
          dataIndex: 'pays',
          render: (text) => (
            <div>
              <EnvironmentOutlined style={{ color: 'red', marginRight: 4 }} />
              {text}
            </div>
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
                <h2 className="chauffeur_h2">Liste des provinces</h2>
                <Breadcrumb
                separator=">"
                items={[
                    { title: 'Accueil', href: '/' },
                    { title: 'Gestion', href: '/gestion' },
                    { title: 'Province' },
                ]}
                className="chauffeur_breadcrumb"
                />
            </div>
            <div className="chauffeur_top_right">
                <Space size="middle">
                <Input
                    placeholder="Rechercher ..."
                    prefix={<SearchOutlined />}
                    className="chauffeur_search"
                />
                <Button icon={<FilterOutlined />} className="chauffeur_filter">
                    Filtres
                </Button>
                </Space>
            </div>
        </div>
        <div className="chauffeur_bottom">
            <Table 
              columns={columns} 
              dataSource={data} 
              onChange={onChange} 
              loading={loading}
              bordered
            />
        </div>
    </div>
  );
};

export default Localisation;
