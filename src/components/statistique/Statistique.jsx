import React from 'react';
import { DatePicker, Button } from 'antd';
import { ExportOutlined, DashboardOutlined } from '@ant-design/icons';
import './statistique.scss';
import StatistiqueItems from '../statistiqueItems/StatistiqueItems';
import ChartHome from '../chartHome/ChartHome';
import StaticTop from '../staticTop/StaticTop';
import PiaChart from '../piaChart/PiaChart';

const Statistique = () => {

  return (
    <div className="statistique">
      <div className="statistique_wrapper">
        <div className="statistique_top">
          <div className="statistique_top_right">
            <div className="static_icon_row">
              <DashboardOutlined className="static_icon" />
            </div>
            <div>
              <h2 className="static-h2">Accueil</h2>
              <p className="static_desc">Tableau de bord des statistiques</p>
            </div>
          </div>
          <div className="statistique_top_left">
            <div className="static_right">
              <DatePicker className="date-picker" />
            </div>
            <div className="static_left">
              <Button
                type="primary"
                icon={<ExportOutlined />}
                className="export-button"
              >
                Exporter
              </Button>
            </div>
          </div>
        </div>

        <div className="statistique_center">
          <StaticTop/>
        </div>
        
        <div className="statistique_bottom">
            <div className="static_bottom_right">
                <PiaChart/>
            </div>
            <div className="static_bottom_left">
              <ChartHome/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Statistique;
