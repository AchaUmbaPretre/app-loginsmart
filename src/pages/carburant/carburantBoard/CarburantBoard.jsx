import { Divider, Table } from 'antd'
import './carburantBoard.scss'
import { useEffect, useState } from 'react';
import carburantService from '../../../services/carburant.service';
import moment from 'moment';

const CarburantBoard = ({vehiculeData}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scroll = { x: 400 };

  const fetchData = async () =>{
    try {
      setLoading(true);
      const [chauffeurData] = await Promise.all([
        carburantService.getCarburantCinq()
      ])

      setData(chauffeurData)

    } catch (error) {
      console.log(error)
    }
  }

useEffect(()=> {
  fetchData()
}, [])

    const columns = [
        { title: '#', dataIndex: 'id', key: 'id', render: (_, __, index) => index + 1, width: "5%" },
        {
          title: 'N°',
          dataIndex: 'matricule_ch',
          key: 'matricule_ch',
        },
        {
          title: 'Immatri.',
          dataIndex: 'immatriculation',
          key: 'immatriculation',
        },
        {
          title: 'Qte',
          dataIndex: 'qte_plein',
          key: 'qte_plein',
        },
        {
          title: 'Km',
          dataIndex: 'kilometrage',
          key: 'kilometrage',
        },
        {
          title: 'Date',
          dataIndex: 'date_plein',
          key: 'date_plein',
          render: text => (
            <div>{moment(text).format('DD-MM-yyyy')}</div>
          ),
        },
        {
          title: 'User',
          dataIndex: 'nom',
          key: 'nom'
        }
      ];

    
      const columnsDeux = [
        { title: '#', dataIndex: 'id', key: 'id', render: (_, __, index) => index + 1, width: "5%" },
        {
          title: 'N°',
          dataIndex: 'matricule_ch',
          key: 'matricule_ch',
        },
        {
          title: 'Immatri.',
          dataIndex: 'immatriculation',
          key: 'immatriculation',
        },
        {
          title: 'Qte',
          dataIndex: 'qte_plein',
          key: 'qte_plein',
        },
        {
          title: 'Km',
          dataIndex: 'kilometrage',
          key: 'kilometrage',
        },
        {
          title: 'Date',
          dataIndex: 'date_plein',
          key: 'date_plein',
          render: text => (
            <div>{moment(text).format('DD-MM-yyyy')}</div>
          ),
        },
        {
          title: 'User',
          dataIndex: 'nom',
          key: 'nom'
        }
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
                    <Table columns={columns} bordered size="small" dataSource={data} onChange={onChange} />
                </div>

                <Divider className='title_row'></Divider>

                {
                  vehiculeData.length !== 0 &&
                  <div className="carburantBord_bottom">
                    <h2 className="carburantBord-h2">{vehiculeData[0]?.nom_marque} {vehiculeData[0]?.modele}</h2>
                    <Table 
                      columns={columnsDeux} 
                      bordered 
                      size="small" 
                      dataSource={vehiculeData} 
                      scroll={scroll}
                    />
                </div>
                }
            </div>
        </div>
    </>
  )
}

export default CarburantBoard