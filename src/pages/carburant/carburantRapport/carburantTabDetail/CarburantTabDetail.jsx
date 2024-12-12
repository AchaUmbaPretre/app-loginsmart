import React from 'react'
import { Divider, Space, Table, Tag } from 'antd';


const CarburantTabDetail = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
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
        <div className="CarburantTabDetail-wrapper">
          <Divider>Détails pour chaque véhicule</Divider>
          <Table dataSource={dataSource} columns={columns} size="middle"  />
        </div>
      </div>
    </>
  )
}

export default CarburantTabDetail