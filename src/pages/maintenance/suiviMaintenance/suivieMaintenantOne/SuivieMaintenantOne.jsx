import { Badge, Breadcrumb, Button,Menu, Input, Modal,Dropdown, Popconfirm,Tag, Space, Table, Tooltip } from 'antd';
import { PlusCircleOutlined,EyeOutlined,MoreOutlined,CarOutlined,CalendarOutlined,ToolOutlined,ShopOutlined,SyncOutlined,CheckCircleOutlined,DeleteOutlined,EditOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import maintenanceService from '../../../../services/maintenance.service';
import SuiviMaintenance from '../SuiviMaintenance';

const SuivieMaintenantOne = ({ fetchData, closeModal, idReparation }) => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const scroll = { x: 400 };
    const [immat, setImmat] = useState('');
    const [marque, setMarque] = useState('');

      const fetchDatas = async () =>{
        try {
          setLoading(true);
          const [maintenantData] = await Promise.all([
            maintenanceService.getSuiviOneReparation(idReparation)
          ])
  
          setData(maintenantData);
          setImmat(maintenantData[0].immatriculation);
          setMarque(maintenantData[0].nom_marque);
  
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

    const handleSuivi = (id_reparation) =>{
      openModal('suivi', id_reparation )
    }

    const handFilter = () => {
        setFilterVisible(!filterVisible)
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
        width: "5%" 
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
        title: 'Date suivie',
        dataIndex: 'created_at',
        render: (text) => (
          <span>
            <CalendarOutlined style={{ marginRight: 8, color: '#13c2c2' }} />
            {moment(text).format('DD-MM-yyyy')}
          </span>
        ),
      },
      {
        title: 'Pièce',
        dataIndex: 'nom_piece',
        render: (text) => (
          <span>
            <ToolOutlined style={{ marginRight: 8, color: '#000' }} />
            {text}
          </span>
        ),
      },
      {
        title: 'Etat',
        dataIndex: 'id_etat',
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
                <h2 className="chauffeur_h2">LISTE DES SUIVIES DE {marque.toUpperCase()} {immat.toUpperCase()}</h2>
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
                    onClick={handleSuivi}
                  >
                    Nouvelle suivie
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
          visible={modalType === 'suivi'}
          onCancel={closeAllModals}
          footer={null}
          width={1000}
          centered
        >
          <SuiviMaintenance fetchData={fetchDatas} closeModal={() => setModalType(null)} idReparation={idReparation}/>
        </Modal>
    </div>
  );
};

export default SuivieMaintenantOne;
