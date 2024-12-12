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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <>
      <div className="carburantTabDetail">
        <div className="CarburantTabDetail-wrapper">
          <Divider>Information générales</Divider>
          <Table dataSource={dataSource} columns={columns} size="middle" />
        </div>
      </div>
    </>
  )
}

export default CarburantTabDetail