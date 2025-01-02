import { useState } from 'react';
import './carburantRapport.scss'
import CarburantTabInfo from './carburantTabInfo/CarburantTabInfo';
import CarburantTabDetail from './carburantTabDetail/CarburantTabDetail';
import { Divider } from 'antd';
import RapportLineMensuel from '../../../components/rapportLineMensuel/RapportLineMensuel';
import RapportPieMensuel from '../../../components/rapportPieMensuel/RapportPieMensuel';
import {RadioControle} from '../../../utils/radioControle';
import CarburantTabDetailSites from './carburantTabDetailSites/CarburantTabDetailSites';

const CarburantRapport = () => {

  const [filters, setFilters] = useState({
    spectre: 'siege_kin',
    par: 'vehicule',
    jours: '360jours',
    statut: 1,
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  return (
    <>
        <div className="carburantRapport">
            <div className="carburantRapport_wrapper">
                <div className="carburantRapport_row_title">
                    <h2 className="carburant_h2">RAPPORT DE CONSOMMATION DE CARBURANT PAR VÉHICULE (SUR LES 360 DERNIERS JOURS)</h2>
                </div>
                <div className="carburantRapport_top">

                    <RadioControle
                        label="Spectre"
                        value={filters.spectre}
                        options={[
                            { value: 'sites', label: 'Mes sites' },
                            { value: 'siege_kin', label: 'Siège Kin' },
                            ]}
                        onChange={(e) => handleFilterChange('spectre', e.target.value)}
                    />  

                    <RadioControle
                        label="Par"
                        value={filters.par}
                        options={[
                        { value: 'site', label: 'Sites' },
                        { value: 'vehicule', label: 'Véhicule' },
                        ]}
                        onChange={(e) => handleFilterChange('par', e.target.value)}
                    />

                    <RadioControle
                        label="Nombre de jours"
                        value={filters.jours}
                        options={[
                        { value: '7jours', label: '7 jours' },
                        { value: '30jours', label: '30 jours' },
                        { value: '90jours', label: '90 jours' },
                        { value: '180jours', label: '180 jours' },
                        { value: '360jours', label: '360 jours' },
                        ]}
                        onChange={(e) => handleFilterChange('jours', e.target.value)}
                    />

                    <RadioControle
                        label="Sélection statut"
                        value={filters.statut}
                        options={[
                        { value: 1, label: 'Litres' },
                        { value: 2, label: 'Option' },
                        { value: 3, label: 'Véhicules' },
                        ]}
                        onChange={(e) => handleFilterChange('statut', e.target.value)}
                    />

                </div>
                <div className="carburantRapport_center">
                    <div className="carburantRapport_left">
                        <CarburantTabInfo/>
                    </div>
                    <div className="carburantRapport_right">
                    { filters.spectre !=='siege_kin' 
                        ? 
                        <CarburantTabDetail/>
                        :
                        <CarburantTabDetailSites/>
                    }
                    </div>
                    .
                </div>
                <div className="carburantRapport_bottom">
                    <div className="carburantRapport_bottom-left">
                        <Divider>Consommation mensuelle de mes vehicules</Divider>
                        <RapportLineMensuel/>
                    </div>
                    <div className="carburantRapport_bottom-right">
                        <Divider>Réparation de la consomation(Litre)</Divider>
                        <RapportPieMensuel/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantRapport