import React, { useEffect, useState } from 'react';
import { Transfer, DatePicker, Button, notification, Breadcrumb, Modal } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './consomCarburant.scss';
import vehiculeService from '../../../services/vehicule.service';
import ConsomCarburantDetail from './consomCarburantDetail/ConsomCarburantDetail';

const { RangePicker } = DatePicker;

const ConsomCarburant = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicule, setVehicule] = useState([]);
  const [modalType, setModalType] = useState(null);

  const closeAllModals = () => {
    setModalType(null);
  };

  const openModal = (type) => {
    closeAllModals();
    setModalType(type);
  };

  const handleAdd = () =>{
    openModal('consom')

  }

  useEffect(() => {
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const vehiculeData = await vehiculeService.getVehicule();

            const vehiculeWithKeys = vehiculeData.map((item) => ({
              ...item,
              key: item.id_vehicule,
            }));

            setVehicule(vehiculeWithKeys);
            
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    fetchData();
}, [])

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
          <h2 className="title_h2">CALCULE CONSOMMATION</h2>
        </div>
        <div className="consomCarburant_rows">
        
          <div className="date-picker-section">
            <RangePicker onChange={handleDateChange} />
          </div>

          <div className="transfer-section">
            <Transfer
              dataSource={vehicule}
              showSearch
              targetKeys={targetKeys}
              onChange={handleTransferChange}
              render={(item) => {
                const modele = item.modele && item.modele !== 'NULL' ? item.modele : '';
                return `N°/${item.id_vehicule} - ${item.immatriculation}, ${item.nom_marque}${modele ? `, ${modele}` : ''}`;
              }}
              oneWay
              style={{ width: '100%' }}
              listStyle={{
                width: 300,
                height: 300,
              }}
            />
          </div>

          <div className="search-button">
            <Button type="primary" onClick={handleAdd} targetKeys={targetKeys} icon={<CalculatorOutlined />}>
              Calculer conso.
            </Button>
          </div>
        </div>
      </div>
        <Modal
          title=""
          visible={modalType === 'consom'}
          onCancel={closeAllModals}
          footer={null}
          width={1020}
          centered
        >
          <ConsomCarburantDetail/>
        </Modal>
    </div>
  );
};

export default ConsomCarburant;
