import React, { useState } from 'react';
import moment from 'moment';
import './assuranceListeGarantie.scss'

const AssuranceListeGaranti = () => {
  const [dataSource, setDataSource] = useState([
    { id: 1, garanti: 'DM', checked: false, date_effet: null, echeance: null },
    { id: 2, garanti: 'RC', checked: false, date_effet: null, echeance: null },
    { id: 3, garanti: 'INC', checked: false, date_effet: null, echeance: null },
  ]);

  // Fonction pour gérer les changements de "checked"
  const handleCheckChange = (id, checked) => {
    const updatedData = dataSource.map((item) =>
      item.id === id ? { ...item, checked } : item
    );
    setDataSource(updatedData);
  };

  // Fonction pour gérer les changements de date
  const handleDateChange = (id, dateField, value) => {
    const updatedData = dataSource.map((item) =>
      item.id === id ? { ...item, [dateField]: value } : item
    );
    setDataSource(updatedData);
  };

  return (
    <div className="table-container">
      <h2>Liste des Garanties</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Actif</th>
            <th>#</th>
            <th>Garanti</th>
            <th>Date Effet</th>
            <th>Échéance</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((record) => (
            <tr key={record.id}>
              <td>
                <input
                  type="checkbox"
                  checked={record.checked}
                  onChange={(e) => handleCheckChange(record.id, e.target.checked)}
                />
              </td>
              <td>{record.id}</td>
              <td>{record.garanti}</td>
              <td>
                {record.checked ? (
                  <input
                    type="date"
                    value={record.date_effet || ''}
                    onChange={(e) => handleDateChange(record.id, 'date_effet', e.target.value)}
                    className="input-date"
                  />
                ) : (
                  <span className="inactive">Non actif</span>
                )}
              </td>
              <td>
                {record.checked ? (
                  <input
                    type="date"
                    value={record.echeance || ''}
                    onChange={(e) => handleDateChange(record.id, 'echeance', e.target.value)}
                    className="input-date"
                  />
                ) : (
                  <span className="inactive">Non actif</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssuranceListeGaranti;
