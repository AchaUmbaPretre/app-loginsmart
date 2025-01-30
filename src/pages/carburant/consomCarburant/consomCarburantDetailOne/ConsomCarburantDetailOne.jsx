import { Table, Tag, Tooltip } from 'antd';
import { 
    CarOutlined, 
    CalendarOutlined, 
    DashboardOutlined, 
    NumberOutlined, 
    UserOutlined,
    CalendarTwoTone
  } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import moment from 'moment';
import carburantService from '../../../../services/carburant.service';

const ConsomCarburantDetailOne = ({selectedDates, idVehicule}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [immatri, setImmatri] = useState('');
    const [marque, setMarque] = useState('')

    const fetchDatas = async () => {
        try {
          const res =  await carburantService.getCarburantConsommationOne(idVehicule, selectedDates);
          setData(res)
          setImmatri(res[0].immatriculation);
          setMarque(res[0].nom_marque)
    
        } catch (error) {
            console.error('Erreur lors:', error);
        } finally {
            setLoading(false);
        }
    }

  useEffect(()=> {
    fetchDatas()
  }, [selectedDates, idVehicule])

  const columns = [
    { 
      title: (
        <Tooltip title="Identifiant">
          <NumberOutlined style={{ color: "#1890ff" }} />
        </Tooltip>
      ),
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
      title: (
        <Tooltip title="Nom du chauffeur">
          <UserOutlined style={{ color: "#52c41a" }} /> {/* Vert pour le chauffeur */}
          <span style={{ marginLeft: 8 }}>Chauffeur</span>
        </Tooltip>
      ),
      dataIndex: 'nom_chauffeur',
    },
    {
      title: (
        <Tooltip title="Date de plein">
          <CalendarOutlined style={{ color: "#faad14" }} /> {/* Jaune pour la date */}
          <span style={{ marginLeft: 8 }}>Date</span>
        </Tooltip>
      ),
      dataIndex: 'date_plein',
      render: text => (
        <div>{moment(text).format('DD-MM-yyyy')}</div>
      ),
    },
    {
      title: (
        <Tooltip title="Kilométrage">
          <DashboardOutlined style={{ color: "#722ed1" }} /> {/* Violet pour le kilométrage */}
          <span style={{ marginLeft: 8 }}>Kilométrage</span>
        </Tooltip>
      ),
      dataIndex: 'kilometrage',
    },
    {
      title: (
        <Tooltip title="Type de carburant">
          <span style={{ marginLeft: 8 }}>T. carburant</span>
        </Tooltip>
      ),
      dataIndex: 'nom_type_carburant',
    },
    {
      title: (
        <Tooltip title="Quantité">
          <CarOutlined style={{ color: "#13c2c2" }} /> {/* Cyan pour la quantité */}
          <span style={{ marginLeft: 8 }}>Qté</span>
        </Tooltip>
      ),
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
      title: (
        <Tooltip title="Numéro de matricule">
          <span style={{ marginLeft: 8 }}>Numéro</span>
        </Tooltip>
      ),
      dataIndex: 'matricule_ch',
      render: text => (
        <Tooltip title="matricule_ch">
          <Tag color='gold'>{text}</Tag>
        </Tooltip>
      )
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
  }
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <>
        <div className="consommCarburant">
            <div className="consommeCarburant-top">
                <h2 className="consommation_h2">Immatricule : {immatri} / Marque : {marque} </h2>
                <div className="consommation_periode">
                    <h2 className="parcours_h2">Période</h2>
                    <CalendarTwoTone /> Du {formatDate(selectedDates[0])} au {formatDate(selectedDates[1])}
                </div>
            </div>
            <div className="consomm-wrapper">
                <Table
                    columns={columns} 
                    dataSource={data} 
                    onChange={onChange} 
                    bordered 
                    size="small"
                />
            </div>
        </div>
    </>
  );
};

export default ConsomCarburantDetailOne;
