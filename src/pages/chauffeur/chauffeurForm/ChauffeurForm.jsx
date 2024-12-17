import React, { useState } from 'react'
import { Button, Form, Upload, Input, Row, Col, Select, DatePicker, Skeleton, Divider, InputNumber, Radio, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;


const ChauffeurForm = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = () => {

    }

  return (
    <>
        <div className="vehiculeForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">ENREGISTRER UN CHAUFFEUR</h2>
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
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="nom"
                                label="Nom"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un nom... ',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Numéro d'ordre (optionnel)" />}
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="prenom"
                                label="Prenom"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un prenom... ',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir un prenom..." />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="telephone"
                                label="Telephone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un prenom... ',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="+243..." />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="date_naissance"
                                label="Date de naissance"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir la date de naissance...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="date_engagement"
                                label="Date engagement"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir la date d engagement...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="sexe"
                                label="Sexe"
                                rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir l information sur le sexe..',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value='H'>Homme</Radio>
                                        <Radio value='F'>Femme</Radio>
                                    </Radio.Group>
                            </Form.Item> 
                        </Col> 

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="etat_civil"
                                label="Etat civil"
                                rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir l information sur l etat civil..',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>Marié(e)</Radio>
                                        <Radio value={2}>Célibataire</Radio>
                                    </Radio.Group>
                            </Form.Item> 
                        </Col>       
                    </Row>
                </Form>
            </div>
        </div>
    </>
  )
}

export default ChauffeurForm