import React, { useState } from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';

const AssuranceListeGaranti = () => {
  // État local pour stocker les données
  const [dataSource, setDataSource] = useState([
    { key: '1', garanti: 'DM', date_effet: '2024-10-01', echeance: '2024-12-01', checked: false },
    { key: '2', garanti: 'RC', date_effet: '2024-10-05', echeance: '2025-01-05', checked: false },
    { key: '3', garanti: 'INC', date_effet: '2024-11-01', echeance: '2025-02-01', checked: false },
    { key: '4', garanti: 'VOL', date_effet: '2024-12-01', echeance: '2025-03-01', checked: false },
  ]);

  // Fonction pour gérer la modification des dates ou l'état des cases à cocher
  const handleDateChange = (key, field, value) => {
    const newDataSource = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setDataSource(newDataSource);
  };

  const handleCheckboxChange = (key, checked) => {
    const newDataSource = dataSource.map((item) => {
      if (item.key === key) {
        return { ...item, checked };
      }
      return item;
    });
    setDataSource(newDataSource);
  };

  // Fonction pour récupérer les lignes cochées
  const getCheckedRows = () => {
    const checkedRows = dataSource.filter((item) => item.checked);
    console.log('Lignes cochées :', checkedRows);
    return checkedRows;
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
      title: 'Sélectionner',
      dataIndex: 'checked',
      key: 'checked',
      render: (text, record) => (
        <input
          type="checkbox"
          checked={record.checked}
          onChange={(e) => handleCheckboxChange(record.key, e.target.checked)}
        />
      ),
      width: '10%',
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

  return (
    <div className="carburantBord">
      <div className="carburantBord-wrapper">
        <div className="carburantBord_top">
          <h2 className="carburantBord-h2">Tableau de bord</h2>
          <Table columns={columns} bordered dataSource={dataSource} pagination={false} />
          <Button type="primary" onClick={getCheckedRows} style={{ marginTop: '16px' }}>
            Récupérer les lignes cochées
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssuranceListeGaranti;
