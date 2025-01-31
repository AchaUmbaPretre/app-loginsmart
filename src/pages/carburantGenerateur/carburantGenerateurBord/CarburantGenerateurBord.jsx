import { Table } from 'antd'
import { useState } from 'react';

const CarburantGenerateurBord = () => {
    const [data, setData] = useState([]);
  

    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (_, __, index) => index + 1, width: "5%" },
        {
          title: 'Groupe',
          dataIndex: 'groupe',
          key: 'groupe',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Qte',
          dataIndex: 'qte',
          key: 'qte',
        },
        {
            title: 'Heure',
            dataIndex: 'heure',
            key: 'heure',
          },
          {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
          },
      ];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <>
        <div className="carburantBord">
            <div className="carburantBord-wrapper">
                <div className="carburantBord_top">
                    <h2 className="carburantBord-h2">Tableau de bord</h2>
                    <Table columns={columns} size="small" dataSource={data} onChange={onChange} />
                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantGenerateurBord