import React, { useState } from 'react'
import { CalendarTwoTone,        
    CarOutlined, 
    DashboardOutlined, 
    NumberOutlined, 
    EyeOutlined, 
    BarChartOutlined, 
    OrderedListOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Table, Tag, Tooltip } from 'antd';
import './consomCarburantDetail.scss'
import ConsomCarburantDetailOne from '../consomCarburantDetailOne/ConsomCarburantDetailOne';

const ConsomCarburantDetail = ({dataConsomme, selectedDates, targetKeys}) => {
    const [modalType, setModalType] = useState(null);
    const [idVehicule, setVehicule] = useState('');
    const scroll = { x: 400 };

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
          dataIndex: 'Total_Kilometrage',
          render: text => (
            <span >{text}</span>
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
            <span >{text}</span>
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
            <span >{text}</span>
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
            <span >{text}</span>
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
            <span>{text}</span>
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
            <span>{text}</span>
          ),
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          render: (text, record) => (
            <Space size="middle" style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
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
                  onClick={() => { handleDetail(record.id_vehicule); }}
                />
              </Tooltip>
            </Space>
          ),
        },
      ];
      

      
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
                    <span className='date_desc'><CalendarTwoTone /> Du {selectedDates[0]} au {selectedDates[1]}</span>
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