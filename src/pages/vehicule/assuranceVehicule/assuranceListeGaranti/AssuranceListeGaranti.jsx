import React, { useState } from 'react';
import { Table } from 'antd';
import moment from 'moment';

const AssuranceListeGaranti = () => {
  // État local pour stocker les données
  const [dataSource, setDataSource] = useState([
    { key: '1', garanti: 'DM', date_effet: '2024-10-01', echeance: '2024-12-01' },
    { key: '2', garanti: 'RC', date_effet: '2024-10-05', echeance: '2025-01-05' },
    { key: '3', garanti: 'INC', date_effet: '2024-11-01', echeance: '2025-02-01' },
    { key: '4', garanti: 'VOL', date_effet: '2024-12-01', echeance: '2025-03-01' },
  ]);

  // Fonction pour gérer la modification des dates
  const handleDateChange = (key, field, date) => {
    const newDataSource = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: date };
      }
      return item;
    });
    setDataSource(newDataSource);
    console.log('Mise à jour :', newDataSource);
  };

  console.log(dataSource)

  // Colonnes du tableau
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (_, __, index) => index + 1,
      width: '5%',
    },
    {
      title: 'Garanti',
      dataIndex: 'garanti',
      key: 'garanti',
    },
    {
      title: 'Date effet',
      dataIndex: 'date_effet',
      key: 'date_effet',
      render: (text, record) => (
        <input
          style={{ border: 'none', padding: '8px', color: '#555', fontSize: '12px' }}
          type="date"
          value={moment(record.date_effet).format('YYYY-MM-DD')}
          onChange={(e) =>
            handleDateChange(record.key, 'date_effet', moment(e.target.value, 'YYYY-MM-DD').format('YYYY-MM-DD'))
          }
        />
      ),
    },
    {
      title: 'Échéance (mois)',
      dataIndex: 'echeance',
      key: 'echeance',
      render: (text, record) => (
        <input
          style={{ border: 'none', padding: '8px', color: '#555', fontSize: '12px' }}
          type="date"
          value={moment(record.echeance).format('YYYY-MM-DD')}
          onChange={(e) =>
            handleDateChange(record.key, 'echeance', moment(e.target.value, 'YYYY-MM-DD').format('YYYY-MM-DD'))
          }
        />
      ),
    },
  ];

  // Gestion des événements du tableau
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="carburantBord">
      <div className="carburantBord-wrapper">
        <div className="carburantBord_top">
          <h2 className="carburantBord-h2">Tableau de bord</h2>
          <Table columns={columns} bordered dataSource={dataSource} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default AssuranceListeGaranti;
