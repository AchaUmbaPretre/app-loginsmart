import './carburantTabInfo.scss'
import { Divider, Table } from 'antd';


const CarburantTabInfo = () => {

  const columns = [
    {
      title: 'Mes véhicules',
      dataIndex: 'vehicules',
      className: 'vehicule-column',
    },
    {
      title: 'Plein',
      dataIndex: 'plein',
    },
    {
      title: 'Vehicule',
      dataIndex: 'vehicule',
    },
    {
      title: 'Litre',
      dataIndex: 'litre',
    },
    {
      title: 'Km',
      dataIndex: 'km',
    },
  ];

  const data = [
    {
      key: '1',
      vehicules: 'Voiture 1',
      plein: 50,
      vehicule: 40,
      litre: 30,
      km: 1000,
    },
    {
      key: '2',
      vehicules: 'Voiture 2',
      plein: 70,
      vehicule: 15,
      litre: 45,
      km: 500,
    },
    {
      key: '3',
      vehicules: 'Voiture 3',
      plein: 60,
      vehicule: 30,
      litre: 50,
      km: 800,
    },
  ];

  const columns2 = [
    { 
      title: '#', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record, index) => index + 1, 
      width: "3%" ,
    },
    {
      title: 'SIEGE KIN',
      dataIndex: 'vehicules',
      className: 'vehicule-column'
    },
    {
      title: 'Plein',
      dataIndex: 'plein',
    },
    {
      title: 'Vehicules',
      dataIndex: 'vehicules',
    },
    {
      title: 'Litre',
      dataIndex: 'vehicules',
    },
    {
      title: 'Km',
      dataIndex: 'km',
    }
  ];

  const data2 = [
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

  const columns3 = [
    { 
      title: '#', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record, index) => index + 1, 
      width: "3%" 
    },
    {
      title: 'Mes Vehicules',
      dataIndex: 'name',
      className: 'vehicule-column'
    },
    {
      title: 'Plein',
      dataIndex: 'plein',
    },
    {
      title: 'Vehicules',
      dataIndex: 'vehicules',
    },
    {
      title: 'Litre',
      dataIndex: 'vehicules',
    },
    {
      title: 'Km',
      dataIndex: 'km',
    }
  ];

  const data3 = [
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
  
    // Fonction pour appliquer des classes alternées
    const rowClassName = (record, index) => {
      return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

  return (
    <>
        <div className="carburantTabInfo">
            <div className="carburantTabInfo_wrapper">
                <div className="carburantTabInfo-left">
                  <Divider>Information générales</Divider>
                  <Table
                    columns={columns}
                    dataSource={data}
                    size="middle"
                    pagination={false}
                    rowClassName={rowClassName}
                    summary={(pageData) => {
                      let totalPlein = 0;
                      let totalVehicule = 0;
                      let totalLitre = 0;
                      let totalKm = 0

                      pageData.forEach(({ plein, vehicule, litre, km }) => {
                        totalPlein += plein;
                        totalVehicule += vehicule;
                        totalLitre += litre;
                        totalKm += km;
                      });

                      const moyennePlein = pageData.length > 0 ? (totalPlein / pageData.length).toFixed(2) : 0;
                      const moyenneVehicule = pageData.length > 0 ? (totalVehicule / pageData.length).toFixed(2) : 0;
                      const moyenneLitre = pageData.length > 0 ? (totalLitre / pageData.length).toFixed(2) : 0;
                      const moyenneKm = pageData.length > 0 ? (totalKm / pageData.length).toFixed(2) : 0;

                      return (
                        <>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>{totalPlein}</Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>{totalVehicule}</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}>{totalLitre}</Table.Summary.Cell>
                            <Table.Summary.Cell index={4}>{totalKm}</Table.Summary.Cell>
                          </Table.Summary.Row>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Moyenne</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>{moyennePlein}</Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>{moyenneVehicule}</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}>{moyenneLitre}</Table.Summary.Cell>
                            <Table.Summary.Cell index={4}>{moyenneKm}</Table.Summary.Cell>

                          </Table.Summary.Row>
                        </>
                      );
                    }}
                  />

                </div>
                <div className="carburantTabInfo-center">
                  <Divider></Divider>
                  <Table columns={columns2} dataSource={data2} size="small" rowClassName={rowClassName} />
                </div>
                <div className="carburantTabInfo-bottom">
                  <Divider></Divider>
                  <Table columns={columns3} dataSource={data3} size="small" rowClassName={rowClassName} />
                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantTabInfo