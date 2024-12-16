import React, { useState } from 'react';
import { Table, Checkbox, message, Typography } from 'antd';
import { CloseCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Text } = Typography;

const AssuranceListeGaranti = () => {
  // État pour la gestion des lignes cochées
  const [checkedData, setCheckedData] = useState([]);

  // Initialisation des données avec les checkbox et valeurs de date
  const [dataSource, setDataSource] = useState([
    { id: 1, garanti: 'DM', checked: false, date_effet: null, echeance: null },
    { id: 2, garanti: 'RC', checked: false, date_effet: null, echeance: null },
    { id: 3, garanti: 'INC', checked: false, date_effet: null, echeance: null },
  ]);

  // Fonction pour gérer les changements de "checked"
  const handleCheckChange = (id, checked) => {
    // Mettre à jour les lignes dans dataSource
    const updatedData = dataSource.map((item) =>
      item.id === id ? { ...item, checked } : item
    );
    setDataSource(updatedData); // Mise à jour de dataSource

    // Si la case est cochée, on ajoute la ligne dans checkedData
    if (checked) {
      const updatedCheckedData = [...checkedData, updatedData.find(item => item.id === id)];
      setCheckedData(updatedCheckedData);
    } else {
      // Sinon, on enlève la ligne du tableau checkedData
      const updatedCheckedData = checkedData.filter(item => item.id !== id);
      setCheckedData(updatedCheckedData);
    }
  };

  // Fonction pour gérer les changements de date (Date Effet ou Échéance)
  const handleDateChange = (id, dateField, value) => {
    const updatedData = dataSource.map((item) =>
      item.id === id ? { ...item, [dateField]: value } : item
    );
    setDataSource(updatedData); // Mise à jour de dataSource avec les nouvelles dates

    // Mettre à jour checkedData en synchronisation avec dataSource
    const updatedCheckedData = checkedData.map((item) =>
      item.id === id ? { ...item, [dateField]: value } : item
    );
    setCheckedData(updatedCheckedData);

    // Afficher un message indiquant que les données ont été sauvegardées
    message.success('Données sauvegardées automatiquement.');
  };

  // Colonnes de la table
  const columns = [
    {
      title: 'Actif',
      dataIndex: 'checked',
      key: 'checked',
      render: (text, record) => (
        <Checkbox
          checked={record.checked}
          onChange={(e) => handleCheckChange(record.id, e.target.checked)}
        />
      ),
    },
    { title: 'Garanti', dataIndex: 'garanti', key: 'garanti' },
    {
      title: 'Date Effet',
      dataIndex: 'date_effet',
      key: 'date_effet',
      render: (text, record) =>
        record.checked ? (
          <input
            type="date"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: '#f7f7f7',
            }}
            value={record.date_effet || ''}
            onChange={(e) =>
              handleDateChange(record.id, 'date_effet', e.target.value)
            }
          />
        ) : (
            <Text type="secondary">
                <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} /> Non actif
            </Text>

        ),
    },
    {
      title: 'Échéance',
      dataIndex: 'echeance',
      key: 'echeance',
      render: (text, record) =>
        record.checked ? (
          <input
            type="date"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: '#f7f7f7',
            }}
            value={record.echeance || ''}
            onChange={(e) =>
              handleDateChange(record.id, 'echeance', e.target.value)
            }
          />
        ) : (
            <Text type="secondary">
                <CalendarOutlined /> Non actif
            </Text>
        ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Liste des Garanties</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={false}
        bordered
        style={{
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default AssuranceListeGaranti;
