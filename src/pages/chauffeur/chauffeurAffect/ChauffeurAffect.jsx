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
        <div className="vehiculeForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">AFFECTER UN AGENT</h2>
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
                                name="id_site"
                                label="Site d'affecation"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un commentaire...',
                                    }
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select placeholder="Sélectionnez un site">
                                    <Option value="1">Site 1</Option>
                                    <Option value="2">Site 2</Option>
                                </Select>
                                }
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

                        <Col xs={24} md={24}>
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
                                {loadingData ? <Skeleton.Input active={true} /> : <Input.TextArea placeholder="Saisir le commentaire" style={{height:'100px', resize:'none'}} />}
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