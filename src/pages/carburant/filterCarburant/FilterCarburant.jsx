import './filterCarburant.scss';
import { Select, DatePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;

const FilterCarburant = () => {
  return (
    <div className="filterCarburant">
      <div className="filterCarburant-wrapper">
        {/* Immatriculation Filter */}
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

        {/* Date Filter */}
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
      </div>
    </div>
  );
};

export default FilterCarburant;
