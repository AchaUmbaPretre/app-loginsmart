import React, { useState } from 'react'
import { Button, Form, Upload, Input, Row, Col, Select, DatePicker, Skeleton, Divider, InputNumber, Radio, Space } from 'antd';


const SinistreVehiculeForm = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);


    const onFinish = () => {

    }

  return (
    <>
        <div className="vehiculeForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">ENREGISTRER UN SINISTRE</h2>
            </div>
            <div className="vehiculeForm_wrapper">
                <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    autoComplete="off"
                    className="custom-form"
                    onFinish={onFinish}
                >
                    <Col xs={24} md={8}>
                        <Form.Item
                            name="lieu"
                            label="Lieu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez fournir une immatriculation...',
                                },
                            ]}
                        >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir l'immatriculation" />}
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                        <Form.Item
                            name="numero_ordre"
                            label="Numéro d'ordre"
                            rules={[
                                {
                                    required: true,
                                    message: 'Veuillez fournir un Numéro d ordre... ',
                                },
                            ]}
                        >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Numéro d'ordre (optionnel)" />}
                        </Form.Item>
                    </Col>
                </Form>
            </div>
        </div>
    </>
  )
}

export default SinistreVehiculeForm