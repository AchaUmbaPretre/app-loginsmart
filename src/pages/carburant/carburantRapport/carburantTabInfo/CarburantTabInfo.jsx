import './carburantTabInfo.scss'
import { Divider, Table } from 'antd';


const CarburantTabInfo = () => {

  const columns = [
    {
      title: 'Mes véhicules',
      dataIndex: 'vehicule',
      className: 'vehicule-column', // Ajouter une classe pour la colonne
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
      vehicule: 'Voiture 1',
      plein: 50,
      vehicule: 40,
      litre: 30,
      km: 1000,
    },
    {
      key: '2',
      vehicule: 'Voiture 2',
      plein: 70,
      vehicule: 15,
      litre: 45,
      km: 500,
    },
    {
      key: '3',
      vehicule: 'Voiture 3',
      plein: 60,
      vehicule: 30,
      litre: 50,
      km: 800,
    },
  ];

  return (
    <>
        <div className="carburantTabInfo">
            <div className="carburantTabInfo_wrapper">
                <div className="carburantTabInfo-left">
                  <Divider>Information générales</Divider>
                  <Table
                    columns={columns}
                    dataSource={data}
                    size="small"
                    pagination={false}
                    summary={(pageData) => {
                      let totalPlein = 0;
                      let totalLitre = 0;

                      pageData.forEach(({ plein, litre }) => {
                        totalPlein += plein;
                        totalLitre += litre;
                      });

                      const moyennePlein = pageData.length > 0 ? (totalPlein / pageData.length).toFixed(2) : 0;
                      const moyenneLitre = pageData.length > 0 ? (totalLitre / pageData.length).toFixed(2) : 0;

                      return (
                        <>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>{totalPlein}</Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>{totalLitre}</Table.Summary.Cell>
                          </Table.Summary.Row>
                          <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>Moyenne</Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>{moyennePlein}</Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>{moyenneLitre}</Table.Summary.Cell>
                          </Table.Summary.Row>
                        </>
                      );
                    }}
                  />

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