import { Badge, Breadcrumb, Button,Menu, Input, Modal,Dropdown, Popconfirm,Tag, Space, Table, Tooltip } from 'antd';
import { PlusCircleOutlined,EyeOutlined,MoreOutlined,CarOutlined,CalendarOutlined,ToolOutlined,ShopOutlined,SyncOutlined,CheckCircleOutlined,DeleteOutlined,EditOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import maintenanceService from '../../../../services/maintenance.service';

const SuivieMaintenantOne = ({ fetchData, closeModal, idReparation }) => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };

      const fetchDatas = async () =>{
        try {
          setLoading(true);
          const [maintenantData] = await Promise.all([
            maintenanceService.getSuiviOneReparation(idReparation)
          ])
  
          setData(maintenantData)
  
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(()=> {
      fetchDatas()
    }, [idReparation])

    const closeAllModals = () => {
      setModalType(null);
    };
  
    const openModal = (type, id_reparation = '') => {
      closeAllModals();
      setModalType(type);
    };
  
    const handleAdd = (id_reparation) =>{
      openModal('add', id_reparation )
    }


    const handleSuivi = (id_reparation) =>{
      openModal('suivi', id_reparation )
    }

    const handFilter = () => {
        setFilterVisible(!filterVisible)
      }

      const menu = (record) => (
        <>

          <Menu>
            <Menu.Item key="listeSuivi" icon={<ToolOutlined style={{ color: '#d46b08' }} />}>
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
        title: 'Type tache',
        dataIndex: 'type_tache',
        render: (text) => (
          <span>
            <ToolOutlined style={{ marginRight: 8, color: '#d46b08' }} />
            {text}
          </span>
        ),
      },
      {
        title: 'Pièce',
        dataIndex: 'nom_piece',
        render: (text) => (
          <span>
            <ToolOutlined style={{ marginRight: 8, color: '#52c41a' }} />
            {text}
          </span>
        ),
      },
      {
        title: 'Montant',
        dataIndex: 'cout',
        render: (text) => (
          <span>
            {text} $
          </span>
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
                <h2 className="chauffeur_h2">LISTE DE SUIVIE</h2>
                <Breadcrumb
                    separator=">"
                    items={[
                        { title: 'Accueil', href: '/' },
                        { title: 'Suivie' }
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
    </div>
  );
};

export default SuivieMaintenantOne;
