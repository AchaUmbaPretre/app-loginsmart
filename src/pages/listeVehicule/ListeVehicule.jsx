import React from 'react'
import { Table } from 'antd';

const ListeVehicule = () => {

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Cash Assets',
          className: 'column-money',
          dataIndex: 'money',
          align: 'right',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          money: '￥300,000.00',
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          money: '￥1,256,000.00',
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          money: '￥120,000.00',
          address: 'Sydney No. 1 Lake Park',
        },
      ];

  return (
    <>
         <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => 'Liste des voitures'}
            footer={() => 'Footer'}
        />
    </>
  )
}

export default ListeVehicule