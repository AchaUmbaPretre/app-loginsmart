import React, { useState } from 'react';
import { MinusCircleOutlined, SendOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Button, Divider } from 'antd';
const { Option } = Select;

const ControleTechForm = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

    return (
        <>
            <div className="Maintenance_form">
                <div className="vehicule_row_title">
                    <h2 className="title_h2">ENREGISTRER UN CONTROLE TECHNIQUE</h2>
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
                                    {loadingData ? (
                                        <Skeleton.Input active={true} />
                                    ) : (
                                        <Select placeholder="Choisir une immatriculation">
                                            <Option value="1">Immatriculation 1</Option>
                                            <Option value="2">Immatriculation 2</Option>
                                        </Select>
                                    )}
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
                                    {loadingData ? (
                                        <Skeleton.Input active={true} />
                                    ) : (
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
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
                                    {loadingData ? (
                                        <Skeleton.Input active={true} />
                                    ) : (
                                        <InputNumber
                                            min={0}
                                            placeholder="Saisir le kilometrage"
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </Form.Item>
                            </Col> 
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="ref_controle"
                                    label="Ref. Controle Tech"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir une référence...',
                                        }
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir la ref..." style={{width:'100%'}}/>}
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="agent"
                                    label="Agent"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez selectionner un agent...',
                                        },
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active={true} /> : 
                                    <Select placeholder="Choisir un agent">
                                        <Option value="1">Agent 1</Option>
                                        <Option value="2">Agent 2</Option>
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
                                        }
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active={true} /> : <Input.TextArea placeholder="Saisir le commentaire..." style={{width:'100%', resize:'none'}}/>}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Réparations dynamiques */}
                        <Form.List name="reparations">
                        {(fields, { add, remove }) => (
                            <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={12} align="middle">
                                <Col xs={24} md={7}>
                                    <Form.Item
                                    {...restField}
                                    name={[name, 'type_reparation']}
                                    label="Type de réparation"
                                    rules={[
                                        { required: true, message: 'Veuillez fournir une réparation...' },
                                    ]}
                                    >
                                    <Select placeholder="Choisir une réparation">
                                        <Option value="1">Réparation 1</Option>
                                        <Option value="2">Réparation 2</Option>
                                    </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={7}>
                                    <Form.Item
                                    {...restField}
                                    name={[name, 'montant']}
                                    label="Montant"
                                    rules={[
                                        { required: true, message: 'Veuillez fournir un montant...' },
                                    ]}
                                    >
                                    <InputNumber
                                        min={0}
                                        placeholder="Saisir le montant"
                                        style={{ width: '100%' }}
                                    />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                    {...restField}
                                    name={[name, 'description']}
                                    label="Description"
                                    rules={[
                                        { required: true, message: 'Veuillez fournir une description...' },
                                    ]}
                                    >
                                    <Input.TextArea
                                        placeholder="Saisir la description"
                                        style={{ width: '100%', resize: 'none' }}
                                    />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={2}>
                                    <Button
                                    type="text"
                                    danger
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => remove(name)}
                                    >
                                    </Button>
                                </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button
                                type="dashed"
                                onClick={() => add()}
                                icon={<PlusCircleOutlined />}
                                style={{ width: '100%' }}
                                >
                                Ajouter une réparation
                                </Button>
                            </Form.Item>
                            </>
                        )}
                        </Form.List>
                        <div style={{ marginTop: '20px' }}>
                            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                                Soumettre
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default ControleTechForm;
