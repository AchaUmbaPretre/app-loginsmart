import { useState } from 'react';
import { Button, Form, Upload, Input, Row, Col, Select, DatePicker, Skeleton, Divider, InputNumber, Radio, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

const LocalisationForm = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleYearChange = (date, dateString) => {
        console.log("Selected year:", dateString);
      };

    const onFinish = () => {

    }

  return (
    <>
        <div className="vehiculeForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">Formulaire de localisation</h2>
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
                                name="code_site"
                                label="Code site"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un code...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir le code..." />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="nom_site"
                                label="Nom site"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un nom site... ',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir..." />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
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
                                <Select placeholder="Sélectionnez une ville">
                                    <Option value="1">Ville 1</Option>
                                    <Option value="2">Ville 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="zone"
                                label="Zone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une zone...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir une zone">
                                    <Option value="1">Zone 1</Option>
                                    <Option value="2">Zone 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="telephone"
                                label="Telephone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un telephone...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="+243" />}

                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="adresse"
                                label="Adresse"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une adresse...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input.TextArea placeholder="Saisir l'adresse...." />}

                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item>
                                <Space className="button-group">
                                    <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
                                        {'Ajouter'}
                                    </Button>
                                    <Button htmlType="reset">
                                        Réinitialiser
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    </>
  )
}

export default LocalisationForm;