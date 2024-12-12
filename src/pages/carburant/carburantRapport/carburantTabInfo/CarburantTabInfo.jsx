import './carburantTabInfo.scss'
import { Divider, Table } from 'antd';


const CarburantTabInfo = () => {

  const columns = [
    {
      title: 'Mes vehicules',
      dataIndex: 'vehicule',
    },
    {
      title: 'Plein',
      dataIndex: 'plein',
    },
    {
      title: 'Vehicules',
      dataIndex: 'vehicule',
    },
    {
      title: 'Litre',
      dataIndex: 'litre',
    },
    {
      title: 'Litre',
      dataIndex: 'litre',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
  ];

  return (
    <>
        <div className="carburantTabInfo">
            <div className="carburantTabInfo_wrapper">
                <div className="carburantTabInfo-left">
                <Divider>Middle size table</Divider>
                <Table columns={columns} dataSource={data} size="middle" />

                </div>
                <div className="carburantTabInfo-center">

                </div>
                <div className="carburantTabInfo-bottom">

                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantTabInfo