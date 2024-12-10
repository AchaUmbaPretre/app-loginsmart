import React, { useState } from 'react';
import { Transfer, DatePicker, Button, notification } from 'antd';
import dayjs from 'dayjs';
import './consomCarburant.scss';

const { RangePicker } = DatePicker;

const ConsomCarburant = () => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  // Générer des données fictives pour le Transfer
  React.useEffect(() => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        key: i.toString(),
        title: `Item ${i + 1}`,
        description: `Description of item ${i + 1}`,
      });
    }
    setMockData(data);
  }, []);

  // Gérer les données transférées
  const handleTransferChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  // Gérer la sélection des dates
  const handleDateChange = (dates) => {
    if (dates) {
      setSelectedDates(dates.map((date) => dayjs(date).format('YYYY-MM-DD')));
    } else {
      setSelectedDates([]);
    }
  };

  // Recherche des données sélectionnées
  const handleSearch = () => {
    if (selectedDates.length !== 2) {
      notification.error({
        message: 'Erreur de recherche',
        description: 'Veuillez sélectionner une plage de dates valide.',
      });
      return;
    }

    const [startDate, endDate] = selectedDates;
    const filteredData = targetKeys.filter((key) => {
      // Logique fictive de filtrage basée sur les dates (à personnaliser selon vos données réelles)
      return true; // Remplacez cette ligne par votre logique de filtrage
    });

    notification.success({
      message: 'Recherche effectuée',
      description: `Recherche effectuée pour les dates entre ${startDate} et ${endDate}.`,
    });

    console.log('Filtered data:', filteredData);
  };

  return (
    <div className="consomCarburant">
      <div className="consomCarburant-wrapper">
        <div className="consomCarburant-row-title">
          <h2 className="title_h2">CALCUL CONSOMATION</h2>
        </div>
        <div className="consomCarburant_rows">
          {/* Plage de dates */}
          <div className="date-picker-section">
            <RangePicker onChange={handleDateChange} />
          </div>

          {/* Composant Transfer */}
          <div className="transfer-section">
            <Transfer
              dataSource={mockData}
              showSearch
              targetKeys={targetKeys}
              onChange={handleTransferChange}
              render={(item) => item.title}
              oneWay
              style={{ width: '100%' }} // Ajuste la largeur
            />
          </div>

          {/* Bouton de recherche */}
          <div className="search-button">
            <Button type="primary" onClick={handleSearch}>
              Rechercher
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsomCarburant;
