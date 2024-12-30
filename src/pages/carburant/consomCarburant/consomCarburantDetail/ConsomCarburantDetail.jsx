import React, { useState } from 'react'
import moment from 'moment';
import { PlusCircleOutlined,EyeOutlined,DeleteOutlined,EditOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip } from 'antd';
import './consomCarburantDetail.scss'

const ConsomCarburantDetail = ({dataConsomme, selectedDates}) => {

    const columns = [
        { 
          title: '#', 
          dataIndex: 'id', 
          key: 'id', 
          render: (text, record, index) => (
            <Tooltip title={`Ligne ${index + 1}`}>
              <Tag color="blue">{index + 1}</Tag>
            </Tooltip>
          ),
          width: "4%" 
        },
        {
          title: 'Immatri.',
          dataIndex: 'immatriculation',
        },
        {
          title: 'Marque',
          dataIndex: 'nom_marque'
        },
        {
            title: 'Km Initial',
            dataIndex: 'Total_Kilometrage'
        },
        {
          title: 'Km Final',
          dataIndex: 'Total_Kilometrage'
        },
        {
          title: 'Km parcourus',
          dataIndex: 'Km_Parcourus',
          sorter: {
              compare: (a, b) => a.Km_Parcourus - b.Km_Parcourus,
              multiple: 1,
            },
        },
        {
            title: 'Total L',
            dataIndex: 'Total_Litres'

        },
        {
            title: 'C L/100 Km',
            dataIndex: 'Consommation_Litres_Par_100Km'

        },
        {
            title: 'Nbre de plein',
            dataIndex: 'Nbre_De_Plein'

        }
      ];

      
      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

      console.log(selectedDates)

  return (
    <>
        <div className="consommCarburant">
            <div className="consommeCarburant-top">
                <h2 className="consommation_h2">CONSOMMATION</h2>
                <div className="consommation_periode">
                    <h2 className="parcours_h2">Période</h2>
                    <span className='date_desc'>Du {selectedDates[0]} au {selectedDates[1]}</span>
                </div>
            </div>
            <div className="consomm-wrapper">
                <Table
                    columns={columns} 
                    dataSource={dataConsomme} 
                    onChange={onChange} 
                    bordered 
                    size="small"
                />
            </div>
        </div>
    </>
  )
}

export default ConsomCarburantDetail