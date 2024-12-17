import React, { useState } from 'react'
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Button, Divider } from 'antd';
import { SendOutlined } from '@ant-design/icons';
const { Option } = Select;


const ChauffeurAffect = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);

    const onFinish = () => {

    }

  return (
    <>
        <div className="Maintenance_form">
            <div className="vehicule_row_title">
                <h2 className="title_h2">AFFECTER UN AGENT</h2>
            </div>
            <div className="maintenance_form_wrapper">
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
                        <Col xs={24} md={24}>
                            <Form.Item
                                name="id_site"
                                label="Site d'affecation"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un commentaire...',
                                    }
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir le site..." style={{width:'100%'}}/>}
                            </Form.Item>
                        </Col>

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
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select placeholder="Choisir un chauffeur">
                                    <Option value="1">Chauffeur 1</Option>
                                    <Option value="2">Chauffeur 2</Option>
                                </Select> }
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="commentaire"
                                label="Commentaire"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un commentaire...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input.TextArea placeholder="Saisir le commentaire" />}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div style={{ marginTop: '20px' }}>
                        <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                            Soumettre
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    </>
  )
}

export default ChauffeurAffect