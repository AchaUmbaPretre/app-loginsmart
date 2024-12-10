import React, { useEffect, useState } from 'react';
import { Transfer, DatePicker, Button, notification, Breadcrumb } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './consomCarburant.scss';

const { RangePicker } = DatePicker;

const ConsomCarburant = () => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  // Générer des données fictives pour le Transfer
  useEffect(() => {
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

  const handleTransferChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

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
      return true;
    });

    notification.success({
      message: 'Recherche effectuée',
      description: `Recherche effectuée pour les dates entre ${startDate} et ${endDate}.`,
    });

    console.log('Filtered data:', filteredData);
  };

  return (
    <div className="consomCarburant">
      <Breadcrumb
        separator=">"
        items={[
          { title: 'Accueil', href: '/' },
          { title: 'Carburant', href: '/carburant' },
          { title: 'Calcule consommation' },
        ]}
        className="chauffeur_breadcrumb"
      />
      <div className="consomCarburant-wrapper">
        <div className="consomCarburant-row-title">
          <h2 className="title_h2">CALCUL CONSOMMATION</h2>
        </div>
        <div className="consomCarburant_rows">
        
          <div className="date-picker-section">
            <RangePicker onChange={handleDateChange} />
          </div>

          <div className="transfer-section">
            <Transfer
              dataSource={mockData}
              showSearch
              targetKeys={targetKeys}
              onChange={handleTransferChange}
              render={(item) => item.title}
              oneWay
              style={{ width: '100%' }}
              listStyle={{
                width: 300,
                height: 300,
              }}
            />
          </div>

          <div className="search-button">
            <Button type="primary" onClick={handleSearch} icon={<CalculatorOutlined />}>
              Calculer conso.
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsomCarburant;
