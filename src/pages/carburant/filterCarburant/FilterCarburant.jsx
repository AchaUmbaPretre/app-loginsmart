import './filterCarburant.scss';
import { Select, DatePicker, Button } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

const FilterCarburant = () => {
  return (
    <div className="filterCarburant">
      <div className="filterCarburant-wrapper">

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
            <Button type="primary" htmlType="submit" className='btn-filter' >Filtrer</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterCarburant;
