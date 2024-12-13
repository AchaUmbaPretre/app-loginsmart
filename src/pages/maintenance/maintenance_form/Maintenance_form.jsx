import React, { useState } from 'react';
import './maintenance_form.scss';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Button, Divider } from 'antd';
const { Option } = Select;

const Maintenance_form = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);

    // État pour les réparations dynamiques
    const [reparations, setReparations] = useState([
        { id: 1, type: '', montant: null, description: '' }
    ]);

    // Ajouter un nouvel ensemble de champs
    const addReparation = () => {
        setReparations([...reparations, { id: Date.now(), type: '', montant: null, description: '' }]);
    };

    // Supprimer un ensemble de champs
    const removeReparation = (id) => {
        setReparations(reparations.filter((rep) => rep.id !== id));
    };

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

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

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="commentaire"
                                    label="Commentaire"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir un commentaire...',
                                        }
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active={true} /> : <Input.TextArea placeholder="Saisir le commentaire..." style={{width:'100%', resize:'none'}}/>}
                                </Form.Item>
                            </Col>
                        </Row>

                        <div>
                            <Divider className='title_row'>Réparations</Divider>
                            {reparations.map((reparation, index) => (
                                <Row gutter={12} key={reparation.id} style={{ marginBottom: '12px' }}>
                                    <Col xs={24} md={8}>
                                        <Form.Item
                                            name={`type_reparation_${reparation.id}`}
                                            label="Type de réparation"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Veuillez fournir une réparation...',
                                                },
                                            ]}
                                        >
                                            {loadingData ? (
                                                <Skeleton.Input active={true} />
                                            ) : (
                                                <Select placeholder="Choisir une réparation">
                                                    <Option value="1">Réparation 1</Option>
                                                    <Option value="2">Réparation 2</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={7}>
                                        <Form.Item
                                            name={`montant_${reparation.id}`}
                                            label="Montant"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Veuillez fournir un montant...',
                                                },
                                            ]}
                                        >
                                            {loadingData ? (
                                                <Skeleton.Input active={true} />
                                            ) : (
                                                <InputNumber
                                                    min={0}
                                                    placeholder="Saisir le montant..."
                                                    style={{ width: '100%' }}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Item
                                            name={`description_${reparation.id}`}
                                            label="Description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Veuillez fournir une description...',
                                                },
                                            ]}
                                        >
                                            {loadingData ? (
                                                <Skeleton.Input active={true} />
                                            ) : (
                                                <Input.TextArea
                                                    placeholder="Saisir la description..."
                                                    style={{ width: '100%', resize: 'none' }}
                                                />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col xs={1} style={{ textAlign: 'right' }}>
                                        <Button
                                            icon={<MinusCircleOutlined /> }
                                            type="link"
                                            style={{marginTop:'40px'}}
                                            danger
                                            onClick={() => removeReparation(reparation.id)}
                                        >
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Button type="dashed" onClick={addReparation} block>
                                Ajouter une réparation
                            </Button>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <Button type="primary" htmlType="submit">
                                Soumettre
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Maintenance_form;
