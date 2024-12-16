import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Space } from 'antd';
import { useState } from 'react';
import { SendOutlined } from '@ant-design/icons';
const { Option } = Select;


const AssuranceForm = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const onFinish = () => {
    }

  return (
    <>
        <div className="carburantForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">AJOUTER UNE NOUVELLE ASSURANCE</h2>
            </div>
            <div className="carburantForm-wrapper">
                <div className="carburantForm-left">
                <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    autoComplete="off"
                    className="custom-form"
                    onFinish={onFinish}
                >
                    <Row gutter={12}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="id_vehicule"
                                label="Vehicule"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un vehicule...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select placeholder="Sélectionnez un vehicule">
                                    <Option value="1">Vehicule 1</Option>
                                    <Option value="2">Vehicule 2</Option>
                                </Select>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="assureur"
                                label="Assureur"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir d assureur...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select placeholder="Sélectionnez un vehicule">
                                    <Option value="1">Assureur 1</Option>
                                    <Option value="2">Assureur 2</Option>
                                </Select>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="agence"
                                label="Agence"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir d agence...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select placeholder="Sélectionnez une agence">
                                    <Option value="1">Agence 1</Option>
                                    <Option value="2">Agence 2</Option>
                                </Select>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="id_contrat"
                                label="Contrat"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un contrat...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select placeholder="Sélectionnez un contrat">
                                    <Option value="1">Contrat 1</Option>
                                    <Option value="2">Contrat 2</Option>
                                </Select>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="prime_ht"
                                label="Prime HT"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une prime...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Saisir la prime" style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="taxe"
                                label="Taxe"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une taxte...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Saisir..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="Prime TTC"
                                label="prime_TTC"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une prime TTC...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Saisir..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                            name="carte_verte"
                            label="Carte verte"
                            rules={[
                                {
                                    required: false,
                                    message: 'Veuillez fournir une carte verte...',
                                },
                            ]}
                            >
                                <Checkbox>Carte verte</Checkbox>
                            
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
                                    }
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active={true} /> : <Input.TextArea placeholder="Saisir le commentaire..." style={{width:'100%', resize:'none'}}/>}
                                </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item>
                                <Space className="button-group">
                                    <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading} icon={<SendOutlined />}>
                                        {'Enregistrer'}
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
                <div className="carburantForm-right">
{/*                     <CarburantGenerateurBord/> */}
                    cccc
                </div>
            </div>
        </div>
    </>
  )
}

export default AssuranceForm;