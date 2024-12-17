import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Space } from 'antd';
import React, { useState } from 'react'
const { Option } = Select;


const Conge = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);

    const onFinish = () => {
    }


  return (
    <>
        <div className="vehiculeForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">Enregistrer conge</h2>
            </div>
            <div className="vehiculeForm_wrapper">
                <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    autoComplete="off"
                    className="custom-form"
                    onFinish={onFinish}
                    variant={'filled'}
                >
                    <Row gutter={12}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="id_chauffeur"
                                label="Chauffeur"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un chauffeur...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir..." />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="debut_conge"
                                label="Debut congé"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une date...',
                                    }
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="fin_conge"
                                label="Fin congé"
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

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="nbre_jour"
                                label="Nbr jours ouvrables"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une date...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber min={0} placeholder='2' style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="annee_conge"
                                label="Année de congé"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une date',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <DatePicker picker="year" style={{width:'100%'}} placeholder="Sélectionnez une année" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="type_conge"
                                label="Type de congé"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un type...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select placeholder="Sélectionnez un type de congé">
                                    <Option value="1">Congé 1</Option>
                                    <Option value="2">Congé 2</Option>
                                </Select>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24}>
                            <Form.Item
                                name="commentaire"
                                label="Commentaire"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input.TextArea placeholder="Saisir..." style={{height:'100px'}}/>}
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </div>
        </div>
    </>
  )
}

export default Conge