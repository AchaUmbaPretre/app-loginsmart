import { useState } from 'react';
import './carburantRapport.scss'
import { Radio } from 'antd';
import CarburantTabInfo from './carburantTabInfo/CarburantTabInfo';
import CarburantTabDetail from './carburantTabDetail/CarburantTabDetail';
import { Divider } from 'antd';
import RapportLineMensuel from '../../../components/rapportLineMensuel/RapportLineMensuel';
import RapportPieMensuel from '../../../components/rapportPieMensuel/RapportPieMensuel';

const CarburantRapport = () => {
    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

  return (
    <>
        <div className="carburantRapport">
            <div className="carburantRapport_wrapper">
                <div className="carburantRapport_row_title">
                    <h2 className="carburant_h2">RAPPORT DE CONSOMMATION DE CARBURANT PAR VÉHICULE (SUR LES 360 DERNIERS JOURS)</h2>
                </div>
                <div className="carburantRapport_top">

                    <div className="carburant_control">
                        <label htmlFor="" className="carburant_label">Spectre</label>
                        <Radio.Group size="small" onChange={onChange} className='carburant_radio' >
                            <Radio value={1} className='carburant_radio_txt'>Mes sites</Radio>
                            <Radio value={2} className='carburant_radio_txt'>Siege kin</Radio>
                        </Radio.Group>
                    </div>

                    <div className="carburant_control">
                        <label htmlFor="" className="carburant_label">Par</label>
                        <Radio.Group onChange={onChange} className='carburant_radio'>
                            <Radio value={1} className='carburant_radio_txt'>Sites</Radio>
                            <Radio value={2} className='carburant_radio_txt'>Vehicule</Radio>
                        </Radio.Group>
                    </div>

                    <div className="carburant_control">
                        <label htmlFor="" className="carburant_label">Nombre du jours</label>
                        <Radio.Group onChange={onChange} className='carburant_radio'>
                            <Radio value={'7jours'} className='carburant_radio_txt'>7 jours</Radio>
                            <Radio value={'30jours'} className='carburant_radio_txt'>30 jours</Radio>
                            <Radio value={'90jours'} className='carburant_radio_txt'>90 jours</Radio>
                            <Radio value={'180jours'} className='carburant_radio_txt'>180 jours</Radio>
                            <Radio value={'360jours'} className='carburant_radio_txt'>360 jours</Radio>
                        </Radio.Group>
                    </div>

                    <div className="carburant_control">
                        <label htmlFor="" className="carburant_label">Selection status</label>
                        <Radio.Group onChange={onChange} className='carburant_radio'>
                            <Radio value={1} className='carburant_radio_txt'>Litres</Radio>
                            <Radio value={2} className='carburant_radio_txt'>Option</Radio>
                            <Radio value={3} className='carburant_radio_txt'>Vehicules</Radio>
                        </Radio.Group>
                    </div>

                </div>
                <div className="carburantRapport_center">
                    <div className="carburantRapport_left">
                        <CarburantTabInfo/>
                    </div>
                    <div className="carburantRapport_right">
                        <CarburantTabDetail/>
                    </div>
                    .
                </div>
                <div className="carburantRapport_bottom">
                    <div className="carburantRapport_bottom-left">
                        <Divider>Consommation mensuelle de mes vehicules</Divider>
                        <RapportLineMensuel/>
                    </div>
                    <div className="carburantRapport_bottom-right">
                        <Divider>Réparation de la consomation(Litre)</Divider>
                        <RapportPieMensuel/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantRapport