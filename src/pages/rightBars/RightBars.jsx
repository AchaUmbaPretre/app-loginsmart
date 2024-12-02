import React from 'react';
import PiaChart from '../../components/piaChart/PiaChart';
import Statistique from '../../components/statistique/Statistique';
import ListeVehicule from '../listeVehicule/ListeVehicule';
import './rightBars.scss';

const RightBars = () => {
  return (
    <div className="rightBar">
      <div className="rightBar-wrapper">
        <Statistique />
      </div>
      <div className="bottom-wrapper">
        <div className="liste-vehicule">
          <ListeVehicule />
        </div>
        <div className="pia-chart">
          <PiaChart />
        </div>
      </div>
    </div>
  );
};

export default RightBars;
