import React from 'react';
import { DatePicker, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import './statistique.scss';
import StatistiqueItems from '../statistiqueItems/StatistiqueItems';
import ChartHome from '../chartHome/ChartHome';

const Statistique = () => {
  
  return (
    <div className="statistique">
      <div className="statistique_wrapper">
        <div className="statistique_top">
          <div className="statistique_top_right">
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
              <ChartHome/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Statistique;
