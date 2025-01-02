import { useEffect, useState } from 'react';
import './carburantTabInfo.scss'
import { EnvironmentOutlined,CarOutlined,ArrowRightOutline,DashboardOutlined,ArrowRightOutlined   } from '@ant-design/icons';
import { Divider, Table, Tag, Tooltip } from 'antd';
import carburantService from '../../../../services/carburant.service';


const CarburantTabInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scroll = { x: 400 };

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const fetchData = async () =>{
    try {
      setLoading(true);
      const [carburantData] = await Promise.all([
        carburantService.getCarburantRapporInfoGen()
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
      width: "3%"
    },
    {
      title: (
        <>
          <EnvironmentOutlined style={{ color: "#52c41a" }} /> Mes Sites
        </>
      ),
      dataIndex: 'nom_site',
      render: (text) => (
        <Tooltip title="Nom du site">
          <Tag color="green">{text}</Tag>
        </Tooltip>
      )
    },
    {
      title: (
        <>
           Plein
        </>
      ),
      dataIndex: 'total_pleins',
      render: (text) => (
        <Tooltip title="Nombre total de pleins">
          <Tag color="gold">{text}</Tag>
        </Tooltip>
      )
    },
    {
      title: (
        <>
          <CarOutlined style={{ color: "#1890ff" }} /> Véhicule
        </>
      ),
      dataIndex: 'nbre_vehicule',
      render: (text) => (
        <Tooltip title="Nombre de véhicules">
          <Tag color="blue">{text}</Tag>
        </Tooltip>
      )
    },
    {
      title: (
        <>
          <ArrowRightOutlined style={{ color: "#722ed1" }} /> Litres
        </>
      ),
      dataIndex: 'total_litres',
      render: (text) => (
        <Tooltip title="Quantité totale en litres">
          <Tag color="purple">{text}</Tag>
        </Tooltip>
      )
    },
    {
      title: (
        <>
          <DashboardOutlined style={{ color: "#eb2f96" }} /> Km
        </>
      ),
      dataIndex: 'total_kilometrage',
      render: (text) => (
        <Tooltip title="Kilométrage total">
          <Tag color="magenta">{text}</Tag>
        </Tooltip>
      )
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
      title: (
        <>
          <EnvironmentOutlined style={{ color: "#52c41a" }} /> SIEGE KIN
        </>
      ),
      dataIndex: 'vehicules',
      className: 'vehicule-column'
    },
    {
      title: 'Plein',
      dataIndex: 'plein',
    },
    {
      title: (
        <>
          <CarOutlined style={{ color: "#1890ff" }} /> Véhicule
        </>
      ),
      dataIndex: 'vehicules',
    },
    {
      title: (
        <>
          <ArrowRightOutlined style={{ color: "#722ed1" }} /> Litres
        </>
      ),
      dataIndex: 'vehicules',
    },
    {
      title: (
        <>
          <DashboardOutlined style={{ color: "#eb2f96" }} /> Km
        </>
      ),
      dataIndex: 'km',
    }
  ];


  const columns3 = [
    { 
      title: '#', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record, index) => (
        <Tooltip title={`Ligne ${index + 1}`}>
          <Tag color="blue">{index + 1}</Tag>
        </Tooltip>
      ),
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
      title: (
        <>
          <DashboardOutlined style={{ color: "#eb2f96" }} /> Km
        </>
      ),
      dataIndex: 'km',
    }
  ];
  
    // Fonction pour appliquer des classes alternées
    const rowClassName = (record, index) => {
      return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

  return (
    <>
        <div className="carburantTabInfo">
        <Divider>Information générales</Divider>

            <div className="carburantTabInfo_wrapper">
                <div className="carburantTabInfo-left">
                  <Table
                    columns={columns}
                    dataSource={data}
                    size="small" 
                    loading={loading}
                    scroll={scroll}
                    pagination={false}
                    rowClassName={rowClassName}
                    summary={(pageData) => {
                      let totalPlein = 0;
                      let totalVehicule = 0;
                      let totalLitre = 0;
                      let totalKm = 0

                      pageData.forEach(({ total_pleins, nbre_vehicule, total_litres, total_kilometrage }) => {
                        totalPlein += total_pleins;
                        totalVehicule += nbre_vehicule;
                        totalLitre += total_litres;
                        totalKm += total_kilometrage;
                      });

                      const moyennePlein = pageData.length > 0 ? (totalPlein / pageData.length).toFixed(2) : 0;
                      const moyenneVehicule = pageData.length > 0 ? (totalVehicule / pageData.length).toFixed(2) : 0;
                      const moyenneLitre = pageData.length > 0 ? (totalLitre / pageData.length).toFixed(2) : 0;
                      const moyenneKm = pageData.length > 0 ? (totalKm / pageData.length).toFixed(2) : 0;

                      return (
                        <>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>Total</Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>{totalPlein}</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}>{totalVehicule}</Table.Summary.Cell>
                            <Table.Summary.Cell index={4}>{totalLitre}</Table.Summary.Cell>
                            <Table.Summary.Cell index={5}>{totalKm}</Table.Summary.Cell>
                          </Table.Summary.Row>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0}></Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>Moyenne</Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>{moyennePlein}</Table.Summary.Cell>
                            <Table.Summary.Cell index={3}>{moyenneVehicule}</Table.Summary.Cell>
                            <Table.Summary.Cell index={4}>{moyenneLitre}</Table.Summary.Cell>
                            <Table.Summary.Cell index={5}>{moyenneKm}</Table.Summary.Cell>

                          </Table.Summary.Row>
                        </>
                      );
                    }}
                  />

                </div>
                <div className="carburantTabInfo-center">
                  <Table columns={columns2} dataSource={data2} size="small" rowClassName={rowClassName} />
                </div>
                <div className="carburantTabInfo-bottom">
                  <Table columns={columns3} dataSource={data3} size="small" rowClassName={rowClassName} />
                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantTabInfo