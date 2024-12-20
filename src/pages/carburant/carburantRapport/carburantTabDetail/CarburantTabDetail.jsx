import React, { useState } from 'react'
import { Button, Divider, Space, Table, Tag } from 'antd';
import './carburantTabDetail.scss'
import { SendOutlined } from '@ant-design/icons';


const CarburantTabDetail = () => {
  const [data, setData] = useState([])

  const columns = [
    { 
      title: '#', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record, index) => index + 1, 
      width: "3%" ,
    },
    {
      title: 'Immatriculation',
      dataIndex: 'immatriculation',
      key: 'immatriculation',
    },
    {
      title: 'Marque',
      dataIndex: 'marque',
      key: 'marque',
    },
    {
      title: 'Modele',
      dataIndex: 'modele',
      key: 'modele',
    },
    {
      title: 'Carburant',
      dataIndex: 'carburant',
      key: 'carburant',
    },
    {
      title: 'Litre',
      dataIndex: 'litres',
      key: 'litres',
    },
    {
      title: 'Plein',
      dataIndex: 'plein',
      key: 'plein',
    },
    {
      title: 'Km',
      dataIndex: 'km',
      key: 'km',
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
          <Table dataSource={data} columns={columns} size="middle"  />
        </div>
      </div>
    </>
  )
}

export default CarburantTabDetail