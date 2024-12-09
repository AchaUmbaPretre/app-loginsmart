import './filterCarburant.scss'
import {  Select } from 'antd';
const { Option } = Select;


const FilterCarburant = () => {
  return (
    <>
        <div className="filterCarburant">
            <div className="filterCarburant-wrapper">
                <div className="form_control">
                    <label htmlFor="" className="label-carburant">Immatriculation</label>
                    <Select  mode="multiple" showSearch placeholder="Choisir un lubrifiant moteur">
                        <Option value="1">Lubrifiant 1</Option>
                        <Option value="2">Lubrifiant 2</Option>
                    </Select>
                </div>
                <div className="form_control">

                </div>
                <div className="form_control">

                </div>
            
            </div>
        </div>
    </>
  )
}

export default FilterCarburant