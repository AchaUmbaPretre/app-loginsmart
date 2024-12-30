import { Select, DatePicker, Button } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const { RangePicker } = DatePicker;

const FilterControleTech = ({onFilter, filter}) => {
    
  return (
    <div className="filterCarburant">
      <div className="filterCarburant-wrapper">

      <div className="form_control">
          <label htmlFor="filtre" className="label-carburant">
            Filtrer par 
          </label>
          <Select
            id="filtre"
            showSearch
            placeholder="Choisir un lubrifiant moteur"
            style={{ width: '100%' }}
            onChange={(value) => filter(value)}
          >
            <Option value="tous">Tous</Option>
            <Option value="encours">Encours</Option>
            <Option value="3mois">Expire dans 3 mois</Option>
            <Option value="expire">Expiré</Option>
          </Select>
        </div>

        <div className="form_control">
          <label htmlFor="immatriculation" className="label-carburant">
            Immatriculation
          </label>
          <Select
            id="immatriculation"
            mode="multiple"
            showSearch
            placeholder="Choisir un lubrifiant moteur"
            style={{ width: '100%' }}
          >
            <Option value="1">Lubrifiant 1</Option>
            <Option value="2">Lubrifiant 2</Option>
          </Select>
        </div>

        <div className="form_control">
          <label htmlFor="date-range" className="label-carburant">
            Période
          </label>
          <RangePicker
            id="date-range"
            format="YYYY-MM-DD"
            className="date-picker"
            placeholder={['Date début', 'Date fin']}
          />
        </div>

        <div className="form_control">
          <label htmlFor="type_reparation" className="label-carburant">
          Type réparation
          </label>
          <Select
            id="type_reparation"
            mode="multiple"
            showSearch
            placeholder="Choisir un type de reparation"
            style={{ width: '100%' }}
          >
            <Option value="1">Type 1</Option>
            <Option value="2">Type 2</Option>
          </Select>
        </div>

        <div className="form_control">
            <Button type="primary" htmlType="submit" className='btn-filter' >Filtrer</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControleTech;
