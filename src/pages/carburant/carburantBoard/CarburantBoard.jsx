import { Divider, Table } from 'antd'
import './carburantBoard.scss'
import { useState } from 'react';

const CarburantBoard = () => {
  const [data, setData] = useState([]);

    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (_, __, index) => index + 1, width: "5%" },
        {
          title: 'N°',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: 'Immatriculation',
          dataIndex: 'immatriculation',
          key: 'immatriculation',
        },
        {
          title: 'Qte',
          dataIndex: 'qte',
          key: 'qte',
        },
        {
          title: 'Km',
          dataIndex: 'km',
          key: 'km',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
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

                <Divider className='title_row'></Divider>
                
                <div className="carburantBord_bottom">
                    <h2 className="carburantBord-h2">SUZUKI GRAND VITARA</h2>
                    <Table columns={columns} size="small" dataSource={data} onChange={onChange} />
                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantBoard