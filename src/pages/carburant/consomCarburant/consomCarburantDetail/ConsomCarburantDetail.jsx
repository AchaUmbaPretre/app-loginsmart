import React, { useEffect, useState } from 'react'
import { CalendarTwoTone,        
    CarOutlined, 
    DashboardOutlined, 
    NumberOutlined, 
    BarChartOutlined, 
    CalendarOutlined,
    OrderedListOutlined } from '@ant-design/icons';
import { Modal, Space, Table, Tag, Tooltip } from 'antd';
import './consomCarburantDetail.scss'
import ConsomCarburantDetailOne from '../consomCarburantDetailOne/ConsomCarburantDetailOne';
import moment from 'moment';

const ConsomCarburantDetail = ({dataConsomme, selectedDates, targetKeys}) => {
    const [modalType, setModalType] = useState(null);
    const [idVehicule, setVehicule] = useState('');
    const [loading, setLoading] = useState(true)
    const scroll = { x: 400 };

    useEffect(() => {
      if (dataConsomme.length > 0) {
          setLoading(false);
      }
  }, [dataConsomme]);

    const closeAllModals = () => {
        setModalType(null);
      };
    
      const openModal = (type, idVehicule = '') => {
        closeAllModals();
        setModalType(type);
        setVehicule(idVehicule)
      };
    
      const handleDetail = (idVehicule) =>{
        openModal('detail', idVehicule )
      }
      
      const columns = [
        { 
          title: (
            <Tooltip title="Identifiant">
              <NumberOutlined style={{ color: "#1890ff" }} />
              <span style={{ marginLeft: 8 }}>#</span>
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
            <Tooltip title="Immatriculation">
              <CarOutlined style={{ color: "#52c41a" }} />
              <span style={{ marginLeft: 8 }}>Immatri.</span>
            </Tooltip>
          ),
          dataIndex: 'immatriculation',
          render: text => (
            <Tag color="green">{text}</Tag>
          ),
        },
        {
          title: (
            <Tooltip title="Marque">
              <CarOutlined style={{ color: "#722ed1" }} />
              <span style={{ marginLeft: 8 }}>Marque</span>
            </Tooltip>
          ),
          dataIndex: 'nom_marque',
          render: text => (
            <Tag color="purple">{text}</Tag>
          ),
        },
        {
          title: (
            <Tooltip title="Kilométrage Initial">
              <DashboardOutlined style={{ color: "#13c2c2" }} />
              <span style={{ marginLeft: 8 }}>Km Initial</span>
            </Tooltip>
          ),
          dataIndex: 'Km_Initial',
          render: text => (
            <span >{text?.toLocaleString("fr-FR")}</span>
          ),
        },
        {
          title: (
            <Tooltip title="Kilométrage Final">
              <DashboardOutlined style={{ color: "#fa8c16" }} />
              <span >Km Final</span>
            </Tooltip>
          ),
          dataIndex: 'Total_Kilometrage',
          render: text => (
            <span >{text?.toLocaleString("fr-FR")}</span>
          ),
        },
        {
          title: (
            <Tooltip title="Kilomètres Parcourus">
              <BarChartOutlined style={{ color: "#f5222d" }} />
              <span >Km parcourus</span>
            </Tooltip>
          ),
          dataIndex: 'Km_Parcourus',
          sorter: {
            compare: (a, b) => a.Km_Parcourus - b.Km_Parcourus,
            multiple: 1,
          },
          render: text => (
            <span >{text?.toLocaleString("fr-FR")}</span>
          ),
        },
        {
          title: (
            <Tooltip title="Total Litres">
              <span style={{ marginLeft: 8 }}>Total L</span>
            </Tooltip>
          ),
          dataIndex: 'Total_Litres',
          render: text => (
            <span >{text?.toLocaleString("fr-FR")}</span>
          ),
        },
        {
          title: (
            <Tooltip title="Consommation (L/100Km)">
              <span style={{ marginLeft: 8 }}>C L/100 Km</span>
            </Tooltip>
          ),
          dataIndex: 'Consommation_Litres_Par_100Km',
          render: text => (
            <span>{text?.toLocaleString("fr-FR")}</span>
          ),
        },
        {
          title: (
            <Tooltip title="Nombre de Pleins">
              <OrderedListOutlined style={{ color: "#2f54eb" }} />
              <span style={{ marginLeft: 8 }}>Nbre de plein</span>
            </Tooltip>
          ),
          dataIndex: 'Nbre_De_Plein',
          render: text => (
            <span>{text?.toLocaleString("fr-FR")}</span>
          ),
        },
      ];

      const columnsDetails = [
        { title: "Date", 
          dataIndex: "date_plein",
          key: "date_plein", 
          render: (text, record) => (
            <Space>
              <Tag icon={<CalendarOutlined />} color="blue">
                {moment(text).format('DD-MM-yyyy')}
              </Tag>
            </Space>
          )
        },
        { title: "Kilométrage", 
          dataIndex: "kilometrage", 
          key: "kilometrage" ,
          render: (text, record) => (
            <Space>
              {text?.toLocaleString("fr-FR")}
            </Space>
          )
        },
        { title: "Quantité (L)", 
          dataIndex: "qte_plein", 
          key: "qte_plein" ,
          render: (text, record) => (
            <Space>
              {text?.toLocaleString("fr-FR")}
            </Space>
          )
        },
        { title: "Type carburant", 
          dataIndex: "nom_type_carburant", 
          key: "nom_type_carburant",
          render: (text, record) => (
            <Space>
              <Tag color='orange'>
                {text?.toLocaleString("fr-FR")}
              </Tag>
            </Space>
          )
        },
    ];

      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <>
        <div className="consommCarburant">
            <div className="consommeCarburant-top">
                <h2 className="consommation_h2">CONSOMMATION</h2>
                <div className="consommation_periode">
                    <h2 className="parcours_h2">Période</h2>
                    <span className='date_desc'><CalendarTwoTone /> Du {formatDate(selectedDates[0])} au {formatDate(selectedDates[1])}</span>
                </div>
            </div>
            <div className="consomm-wrapper">
                <Table
                    columns={columns} 
                    dataSource={dataConsomme} 
                    onChange={onChange} 
                    scroll={scroll}
                    bordered 
                    size="small"
                    loading={loading}
                    rowKey="id_vehicule"
                    expandable={{
                        expandedRowRender: (record) => (
                            <Table
                                columns={columnsDetails}
                                dataSource={record.details}
                                pagination={false}
                                rowKey="date_plein"
                            />
                        ),
                    }}
                />
            </div>
        </div>
        <Modal
          title=""
          visible={modalType === 'detail'}
          onCancel={closeAllModals}
          footer={null}
          width={1055}
          centered
        >
          <ConsomCarburantDetailOne selectedDates={selectedDates} idVehicule={idVehicule}/>
        </Modal>
    </>
  )
}

export default ConsomCarburantDetail