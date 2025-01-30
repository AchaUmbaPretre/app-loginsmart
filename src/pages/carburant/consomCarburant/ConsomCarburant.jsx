import React, { useEffect, useState } from 'react';
import { Transfer, DatePicker, Button, Breadcrumb, Modal, Spin } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './consomCarburant.scss';
import vehiculeService from '../../../services/vehicule.service';
import ConsomCarburantDetail from './consomCarburantDetail/ConsomCarburantDetail';
import carburantService from '../../../services/carburant.service';

const { RangePicker } = DatePicker;

const ConsomCarburant = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicule, setVehicule] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [consomm, setConsomm] = useState([]);

  const closeAllModals = () => {
    setModalType(null);
  };

  const openModal = (type) => {
    closeAllModals();
    setModalType(type);
  };

  const fetchDatas = async () => {
    setIsLoading(true);
    try {
      const res = await carburantService.getCarburantConsommation(targetKeys, selectedDates);
      setConsomm(res);
    } catch (error) {
      console.error('Erreur lors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (isLoading) return;
    openModal('consom');
    await fetchDatas();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
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
    };

    fetchData();
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
          <h2 className="title_h2">CALCUL DE CONSOMMATION</h2>
        </div>
        <div className="consomCarburant_rows">
          <div className="date-picker-section">
            <RangePicker onChange={handleDateChange} />
          </div>

          <div className="transfer-section">
            {isLoading ? (
              <Spin size="large" />
            ) : (
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
            )}
          </div>

          <div className="search-button">
            <Button
              type="primary"
              disabled={!(targetKeys.length > 0 && selectedDates.length > 0) || isLoading}
              onClick={handleAdd}
              icon={<CalculatorOutlined />}
              loading={isLoading}
            >
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
        width={1000}
        centered
      >
        <ConsomCarburantDetail dataConsomme={consomm} selectedDates={selectedDates} targetKeys={targetKeys} />
      </Modal>
    </div>
  );
};

export default ConsomCarburant;
