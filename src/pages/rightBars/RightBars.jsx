import React from 'react';
import PiaChart from '../../components/piaChart/PiaChart';
import Statistique from '../../components/statistique/Statistique';
import ListeVehicule from '../listeVehicule/ListeVehicule';
import './rightBars.scss';
import StatistiqueItems from '../../components/statistiqueItems/StatistiqueItems';
import Vehicule from '../vehicule/Vehicule';

const RightBars = () => {
  return (
    <div className="rightBar">
      <div className="rightBar-wrapper">
        <Statistique />
      </div>
      <div className="bottom-wrapper">
        <div className="liste-vehicule">
          <Vehicule />
        </div>
{/*         <div className="pia-chart">
          <StatistiqueItems />
        </div> */}
      </div>
    </div>
  );
};

export default RightBars;
