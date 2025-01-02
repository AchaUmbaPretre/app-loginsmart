import { Radio } from 'antd';

export const RadioControle = ({ label, options, onChange, value, className }) => (
    <div className={`carburant_control ${className || ''}`}>
      <label className="carburant_label">{label}</label>
      <Radio.Group
        onChange={onChange}
        value={value}
        className="carburant_radio"
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            className="carburant_radio_txt"
          >
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );