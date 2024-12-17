import React, { useState } from 'react'
import { Form, Input, Row, Col, Select, DatePicker, Skeleton, Divider, InputNumber, Radio, Space, Checkbox } from 'antd';
const { Option } = Select;

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
                    <Row gutter={12}>
                        <Divider className='title_row'>INFORMATION GENERALE</Divider>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="lieu"
                                label="Lieu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un lieu...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir le lieu" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une date... ',
                                    },
                                ]}
                            >
                                    {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="heure"
                                label="Heure"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une heure... ',
                                    }
                                ]}
                            >
                                    {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_vehicule"
                                label="Vehicule"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une vehicule...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir la vehicule">
                                    <Option value="1">Véhicule 1</Option>
                                    <Option value="2">Véhicule 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_ville"
                                label="Ville"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une ville...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir une ville">
                                    <Option value="1">Ville 1</Option>
                                    <Option value="2">Ville 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
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
                                <Select placeholder="Choisir un chauffeur">
                                    <Option value="1">Chauffeur 1</Option>
                                    <Option value="2">Chauffeur 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={16}>
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
                                <Select placeholder="Choisir un chauffeur">
                                    <Option value="1">Chauffeur 1</Option>
                                    <Option value="2">Chauffeur 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="partie_tierce"
                                label="Partie tierce"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={1}>A</Radio>
                                    <Radio value={2}>B</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Divider className='title_row'>Autres informations</Divider>

                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                            <div>
                                <h4>Dommage aux tiers</h4>
                                <div>
                                    <Col span={8}>
                                        <Checkbox value="vehicule">Vehicules</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="objet">Objet</Checkbox>
                                    </Col>
                                </div>
                            </div>

                            <div>
                                <h4>Largeur</h4>
                                <div>
                                <Checkbox.Group
                                        style={{
                                        width: '100%',
                                        }}
                                    >
                                        <Row>
                                            <Col span={12}>
                                                <Checkbox value="A">Passager(s) abord</Checkbox>
                                            </Col>
                                            <Col span={12}>
                                                <Checkbox value="B">Passager(s) à bord(tiers)</Checkbox>
                                            </Col>
                                            <Col span={12}>
                                                <Checkbox value="C">Blessé(s)</Checkbox>
                                            </Col>
                                            <Col span={12}>
                                                <Checkbox value="D">Témoin(s)</Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </div>
                            </div>
                        </div>

                        <Divider className='title_row'></Divider>
                        
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                            <div>
                                <h4>Y a-t-il eu Débit de fuite ?</h4>
                                <Col xs={24} md={8}>
                                    <Radio.Group>
                                        <Radio value={1}>Oui</Radio>
                                        <Radio value={2}>Non</Radio>
                                    </Radio.Group>
                                </Col>
                            </div>

                            <div>
                                <h4>Y a-t-il eu Débit de fuite ?</h4>
                                <Col xs={24} md={8}>
                                    <Radio.Group>
                                        <Radio value={1}>Oui</Radio>
                                        <Radio value={2}>Non</Radio>
                                    </Radio.Group>
                                </Col>
                            </div>
                        </div>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="num_verbal"
                                label="N°Proces verbale"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un lieu...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir le numero de proces verbale" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="date_etablissement"
                                label="Date Etablissement"
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
                                name="num_verbal"
                                label="Nom agent qualité"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un lieu...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir le nom d un agent" />}
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="Gandarmerie"
                                label="Gandarmerie"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une Gandarmerie...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir...." />}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    </>
  )
}

export default SinistreVehiculeForm