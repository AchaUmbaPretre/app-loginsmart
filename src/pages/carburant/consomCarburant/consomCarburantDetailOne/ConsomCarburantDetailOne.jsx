import { Table, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import carburantService from '../../../../services/carburant.service';

const ConsomCarburantDetailOne = ({selectedDates, idVehicule}) => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDatas = async () => {
        try {
          const res =  await carburantService.getCarburantConsommationOne(idVehicule, selectedDates);
          setData(res)
    
        } catch (error) {
            console.error('Erreur lors:', error);
        } finally {
            setLoading(false);
        }
    }

  useEffect(()=> {
    fetchDatas()
  }, [selectedDates, idVehicule])

    const closeAllModals = () => {
      setModalType(null);
    };
  
    const openModal = (type) => {
      closeAllModals();
      setModalType(type);
    };
  
    const handleAdd = (idVehicule) =>{
      openModal('add', idVehicule )
    }

    const handFilter = () => {
        setFilterVisible(!filterVisible)
      }

    const handleFilterChange = () => {

    }

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
          width: "4%" 
        },
        {
          title: 'Immatri.',
          dataIndex: 'immatriculation',
        },
        {
          title: 'Marque',
          dataIndex: 'nom_marque'
        },
        {
          title: 'Chauffeur',
          dataIndex: 'nom_chauffeur',
        },
        {
          title: 'Date',
          dataIndex: 'date_plein',
          render: text => (
            <div>{moment(text).format('DD-MM-yyyy')}</div>
          ),
        },
        {
            title: 'Kilometrage',
            dataIndex: 'kilometrage'
        },
        {
          title: 'T. carburant',
          dataIndex: 'nom_type_carburant'
        },
        {
          title: 'Qté',
          dataIndex: 'qte_plein',
          sorter: {
              compare: (a, b) => a.qte_plein - b.qte_plein,
              multiple: 1,
            },
        },
        {
            title: 'Numero',
            dataIndex: 'matricule_ch'

        }
      ];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <>
                <div className="consommCarburant">
            <div className="consommeCarburant-top">
                <h2 className="consommation_h2">CONSOMMATION</h2>
                <div className="consommation_periode">
                    <h2 className="parcours_h2">Période</h2>
                    <span className='date_desc'>Du {selectedDates[0]} au {selectedDates[1]}</span>
                </div>
            </div>
            <div className="consomm-wrapper">
                <Table
                    columns={columns} 
                    dataSource={data} 
                    onChange={onChange} 
                    bordered 
                    size="small"
                />
            </div>
        </div>
    </>
  );
};

export default ConsomCarburantDetailOne;
