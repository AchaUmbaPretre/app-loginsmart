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
                <h2 className="title_h2">Formulaire du véhicule</h2>
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
                    </Row>
                </Form>
            </div>
        </div>
    </>
  )
}

export default ChauffeurForm