import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Divider, Table, Tag, Tooltip } from 'antd';
import { EnvironmentOutlined, BankOutlined, LoadingOutlined,SendOutlined,DashboardOutlined, CheckCircleOutlined } from "@ant-design/icons";
import carburantService from '../../../../services/carburant.service';
import { useSearchTableau } from '../../../../hook/getColumnSearchProps';


const CarburantRapSites = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const { getColumnSearchProps } = useSearchTableau();
  const scroll = { x: 400 };

  const handleCheckboxChange = (id, checked) => {
    setSelectedVehicles((prev) =>
      checked ? [...prev, id] : prev.filter((vehiculeId) => vehiculeId !== id)
    );
  };

  const fetchData = async () =>{
    try {
      setLoading(true);
      const [carburantData] = await Promise.all([
        carburantService.getCarburantRapportDetailSiteAll()
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
      width: "4%",
    },
    {
      title: 'Nom Site',
      dataIndex: 'nom_site',
      key: 'nom_site',
      ...getColumnSearchProps('nom_site'),
      render: (text) => (
        <div>
          <BankOutlined style={{ color: "#1890ff", marginRight: "4px" }} />
          {text || "Aucune"}
        </div>
      )
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
      ...getColumnSearchProps('province'),
      render: (text) => (
        <div>
          <EnvironmentOutlined style={{ color: "red", marginRight: "8px" }} />
          {text}
        </div>
      )
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'zone',
      render: (text) => (
        <div>
          <EnvironmentOutlined style={{ color: "#faad14", marginRight: "8px" }} />
          {text || "Aucune"}
        </div>
      ),
    },
    {
      title: 'Litre',
      dataIndex: 'total_litres',
      key: 'total_litres',
      render: (text) => (
        <div>
          <LoadingOutlined style={{ color: "#722ed1", marginRight: "8px" }} />
          {text}
        </div>
      ),
    },
    {
      title: 'Plein',
      dataIndex: 'total_pleins',
      key: 'total_pleins',
      render: (text) => (
        <div>
          <CheckCircleOutlined
            style={{ color: "#52c41a", marginRight: "8px" }}
          />
          {text}
        </div>
      ),
    },
    {
      title: (
        <>
          <DashboardOutlined style={{ color: "#eb2f96" }} /> Km
        </>
      ),
      dataIndex: 'total_kilometrage',
      key: 'total_kilometrage',
      render: (text) => (
        <div>
          <DashboardOutlined style={{ color: "#1890ff", marginRight: "8px" }} />
          {text}
        </div>
      ),
    },
    {
      title: 'Sélection',
      dataIndex: 'id',
      key: 'checkbox',
      render: (id, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(record.id_vehicule, e.target.checked)}
          checked={selectedVehicles.includes(record.id_vehicule)}
        />
      ),
      width: "5%",
    },
  ];



  return (
    <>
      <div className="carburantTabDetail">
        <div className="carburant-rows-btn">
          <Button className='btn' type='primary' icon={<SendOutlined />}>Compare la conso.</Button>
        </div>
        <div className="CarburantTabDetail-wrapper">
          <Divider>Détails pour chaque site</Divider>
          <Table 
            dataSource={data} 
            columns={columns} 
            size="small"  
            bordered
            loading={loading}
            scroll={scroll}
          />
        </div>
      </div>
    </>
  )
}

export default CarburantRapSites;