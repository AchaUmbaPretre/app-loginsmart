import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, SendOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Button, Divider, message } from 'antd';
import maintenanceService from '../../../../services/maintenance.service';
import vehiculeService from '../../../../services/vehicule.service';
import ChauffeurService from '../../../../services/chauffeur.service';
import TypeService from '../../../../services/type.service';
const { Option } = Select;

const ControleTechForm = ({fetchData, closeModal}) => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);
    const [vehicule, setVehicule] = useState([]);
    const [fournisseur, setFournisseur] = useState([]);
    const [chauffeur, setChauffeur] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);


    const fetchDatas = async () =>{
        try {
          setLoading(true);
          const [vehiculeData, chauffeurData, typeData] = await Promise.all([
            vehiculeService.getVehicule(),
            ChauffeurService.getChauffeur(),
            TypeService.getFournisseur()
          ])
  
          setVehicule(vehiculeData);
          setChauffeur(chauffeurData);
          setFournisseur(typeData)
  
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(()=> {
        fetchDatas()
      }, [])

    const onFinish = async(values) => {
            try {
                message.loading({ content: 'En cours...', key: 'submit' });
                    await maintenanceService.postControle(values)
                message.success({ content: 'le nouveau controle technique a été ajouté avec succès!', key: 'submit' });

                form.resetFields();
            } catch (error) {
                message.error({ content: 'Une erreur est survenue.', key: 'submit' });
                console.error('Erreur lors de l\'ajout du chauffeur:', error);
            }
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
                                    name="date"
                                    label="Date Controle"
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
                                    name="date_validite"
                                    label="Date validité"
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

                            <Col xs={24} md={8}>
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

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="resultat"
                                    label="Resultat"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Veuillez fournir un résultat...',
                                        }
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir le resultat.." style={{width:'100%'}}/>}
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
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

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="Cout_ttc"
                                    label="Cout TTC"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir un cout TCC...',
                                        }
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active={true} /> : <InputNumber min={0} placeholder="Saisir le cout TCC" style={{width:'100%'}}/>}
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="taxe"
                                    label="Taxe"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir une taxe...',
                                        }
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active={true} /> : <InputNumber min={0} placeholder="Saisir la taxe..." style={{width:'100%'}}/>}
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
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
                                    {loadingData ? (
                                        <Skeleton.Input active={true} />
                                    ) : (
                                        <Select
                                            showSearch
                                            options={fournisseur.map((item) => ({
                                                value: item.id_fournisseur                                           ,
                                                label: `${item.nom}`,
                                            }))}
                                            placeholder="Sélectionnez un fournisseur..."
                                            optionFilterProp="label"
                                        />
                                    )}
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="chauffeur"
                                    label="Chauffeur"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez sélectionner un chauffeur...',
                                        },
                                    ]}
                                >
                                    {loadingData ? (
                                        <Skeleton.Input active={true} />
                                    ) : (
                                        <Select
                                            showSearch
                                            options={chauffeur.map((item) => ({
                                                value: item.id_chauffeur                                            ,
                                                label: `${item.nom} - ${item.prenom}`,
                                            }))}
                                            placeholder="Sélectionnez un chauffeur..."
                                            optionFilterProp="label"
                                        />
                                    )}
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
                            <Divider className='title_row'>Réparations</Divider>
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
                                    name={[name, 'autres']}
                                    label="Autre visite"
                                    rules={[
                                        { required: false, message: 'Veuillez fournir l information de ce champ...' },
                                    ]}
                                    >
                                    <Select placeholder="Choisir une réparation">
                                        <Option value="1">OUI</Option>
                                        <Option value="2">NON</Option>
                                    </Select>
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
