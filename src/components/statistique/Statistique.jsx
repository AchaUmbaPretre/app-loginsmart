import React from 'react';
import { DatePicker, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import './statistique.scss';
import StatistiqueItems from '../statistiqueItems/StatistiqueItems';

const Statistique = () => {
  return (
    <div className="statistique">
      <div className="statistique_wrapper">
        <div className="statistique_top">
          <div className="statistique_top_right">
            {/* <h2 className="static-h2">Accueil</h2>
            <span className="static_desc">Desccccccccccccccccc</span> */}
          </div>
          <div className="statistique_top_left">
            <div className="static_right">
              <DatePicker className="date-picker" />
            </div>
            <div className="static_left">
              <Button type="primary" icon={<ExportOutlined />} className="export-button">
                Export
              </Button>
            </div>
          </div>
        </div>
        <div className="statistique_bottom">
            <div className="static_bottom_right">
                <StatistiqueItems/>
            </div>
            <div className="static_bottom_left">
ffffffffffffffffff
            </div>
        </div>
      </div>
    </div>
  );
}

export default Statistique;
