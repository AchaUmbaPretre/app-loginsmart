import React, { useState } from 'react'
import './maintenance_form.scss'
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton } from 'antd';
const { Option } = Select;


const Maintenance_form = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);


    const onFinish = () => {
    }

  return (
    <>
        <div className="Maintenance_form">
            <div className="vehicule_row_title">
                <h2 className="title_h2">ETABLIR UN BON D'INTERVENTION</h2>
            </div>
            <div className="maintenance_form_wrapper">
                <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    autoComplete="off"
                    className="custom-form"
                    onFinish={onFinish}
                >
                    <Row gutter={12}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="immatriculation"
                                label="Immatriculation"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une immatriculation...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select placeholder="Choisir une immatriculation">
                                    <Option value="1">Immatriculation 1</Option>
                                    <Option value="2">Immatriculation 2</Option>
                                </Select> }
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une date...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="kilometrage"
                                label="Kilometrage"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un kilometrage...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber min={0} placeholder="Saisir le kilometrage" style={{width:'100%'}}/>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="Cout"
                                label="Cout(devise)"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un cout...',
                                    }
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber min={0} placeholder="Saisir le kilometrage" style={{width:'100%'}}/>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="fournisseur"
                                label="Fournisseur"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un fournisseur...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select placeholder="Choisir un fournisseur">
                                    <Option value="1">Fournisseur 1</Option>
                                    <Option value="2">Fournisseur 2</Option>
                                </Select> }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    </>
  )
}

export default Maintenance_form