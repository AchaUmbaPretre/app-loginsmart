import React, { useEffect, useState } from 'react';
import './maintenance_form.scss';
import { MinusCircleOutlined, SendOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Button, Divider, message } from 'antd';
import vehiculeService from '../../../services/vehicule.service';
import maintenanceService from '../../../services/maintenance.service';
import TypeService from '../../../services/type.service';
const { Option } = Select;

const Maintenance_form = ({fetchData, closeModal}) => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [vehicule, setVehicule] = useState([]);
    const [reparation, setReparation] = useState([]);
    const [fournisseur, setFournisseur] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const vehiculeData = await vehiculeService.getVehicule();
            const reparationData = await TypeService.typeReparation();
            const fournisseurData = await TypeService.getFournisseur();


            setVehicule(vehiculeData);
            setReparation(reparationData);
            setFournisseur(fournisseurData);
            
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }
        fetchData()
    }, [])

    const onFinish = async(values) => {
        
        try {
            message.loading({ content: 'En cours...', key: 'submit' });
            await maintenanceService.postMaintenance(values)
            message.success({ content: 'Maintenance ajouté avec succès!', key: 'submit' });

            form.resetFields();
            fetchData();
            closeModal()
            
        } catch (error) {
            message.error({ content: 'Une erreur est survenue.', key: 'submit' });
            console.error('Erreur lors de l\'ajout de maintenance:', error);
        }
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
                        variant={'filled'}
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
                                        <Select
                                            showSearch
                                            options={vehicule.map((item) => ({
                                                value: item.id_vehicule                                           ,
                                                label: `${item.immatriculation} / ${item.nom_marque} / ${item.modele}`,
                                            }))}
                                            placeholder="Sélectionnez un vehicule..."
                                            optionFilterProp="label"
                                        />
                                            )}
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="date_reparation"
                                    label="Date d'entrée"
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
                                    name="date_prevu"
                                    label="Date prevue"
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

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="cout"
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

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="id_fournisseur"
                                    label="Fournisseur"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir un fournisseur...',
                                        },
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active={true} /> : 
                                        <Select
                                            showSearch
                                            options={fournisseur.map((item) => ({
                                                value: item.id_fournisseur                                           ,
                                                label: `${item.nom}`,
                                            }))}
                                            placeholder="Sélectionnez un vehicule..."
                                            optionFilterProp="label"
                                        /> }
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
                                    name={[name, 'id_type_reparation']}
                                    label="Type de réparation"
                                    rules={[
                                        { required: true, message: 'Veuillez fournir une réparation...' },
                                    ]}
                                    >
                                        <Select
                                            showSearch
                                            options={reparation.map((item) => ({
                                                value: item.id_type_reparation,
                                                label: `${item.type_rep}`,
                                            }))}
                                            placeholder="Sélectionnez un type de réparation..."
                                            optionFilterProp="label"
                                        />
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

export default Maintenance_form;
