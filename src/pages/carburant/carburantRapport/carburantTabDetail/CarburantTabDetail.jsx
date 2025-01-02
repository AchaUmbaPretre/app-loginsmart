import React, { useEffect, useState } from 'react'
import { Button, Divider, Table, Tag, Tooltip } from 'antd';
import './carburantTabDetail.scss'
import { SendOutlined } from '@ant-design/icons';
import carburantService from '../../../../services/carburant.service';


const CarburantTabDetail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState([]);


  const handleCheckboxChange = (id, checked) => {
    setSelectedVehicles((prev) =>
      checked ? [...prev, id] : prev.filter((vehiculeId) => vehiculeId !== id)
    );
  };

  const fetchData = async () =>{
    try {
      setLoading(true);
      const [carburantData] = await Promise.all([
        carburantService.getCarburantRapportDetailVehicule()
      ])

      setData(carburantData)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
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
      title: 'Immatriculation',
      dataIndex: 'immatriculation',
      key: 'immatriculation',
    },
    {
      title: 'Marque',
      dataIndex: 'nom_marque',
      key: 'nom_marque',
    },
    {
      title: 'Modele',
      dataIndex: 'modele',
      key: 'modele',
      render : (text) => (
        <div>
          { text ? text : 'Aucune'}
        </div>
      )
    },
    {
      title: 'Carburant',
      dataIndex: 'nom_type_carburant',
      key: 'nom_type_carburant',
    },
    {
      title: 'Litre',
      dataIndex: 'total_litres',
      key: 'total_litres',
    },
    {
      title: 'Plein',
      dataIndex: 'total_pleins',
      key: 'total_pleins',
    },
    {
      title: 'Km',
      dataIndex: 'total_kilometrage',
      key: 'total_kilometrage',
    },
  ];


  return (
    <>
      <div className="carburantTabDetail">
        <div className="carburant-rows-btn">
          <Button className='btn' type='primary' icon={<SendOutlined />}>Compare la conso.</Button>
        </div>
        <div className="CarburantTabDetail-wrapper">
          <Divider>Détails pour chaque véhicule</Divider>
          <Table 
            dataSource={data} 
            columns={columns} 
            size="middle"  
            bordered
          />
        </div>
      </div>
    </>
  )
}

export default CarburantTabDetail