import { Button, Col, DatePicker, Form, Input, InputNumber, message, Row, Select, Skeleton, Space } from 'antd';
import './carburantForm.scss'
import { useEffect, useState } from 'react';
import CarburantBoard from '../carburantBoard/CarburantBoard';
import vehiculeService from '../../../services/vehicule.service';
import ChauffeurService from '../../../services/chauffeur.service';
import carburantService from '../../../services/carburant.service';
import { useSelector } from 'react-redux';
import TypeService from '../../../services/type.service';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const { Option } = Select;

const CarburantForm = ({closeModal, fetchData, idPlein}) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [vehicule, setVehicule] = useState([]);
    const [chauffeur, setChauffeur] = useState([]);
    const [carburantOne, setCarburantOne] = useState([]);
    const [iDVehicule, setIdVehicule] = useState('');
    const [loadingData, setLoadingData] = useState(true);
    const userId = useSelector((state) => state.auth.user.id);
    const [typeCarburant, setTypeCarburant] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true);
                const vehiculeData = await vehiculeService.getVehicule();
                const chauffeurData = await ChauffeurService.getChauffeur();
                const typeCarburantData = await TypeService.typeCarburant();


                if(iDVehicule) {
                    const vehiculeOne = await carburantService.getCarburantOne(iDVehicule);
                    setCarburantOne(vehiculeOne)                
                }

                if (idPlein) {
                    const data = await carburantService.getCarburantOneV(idPlein);
                    if (data && data[0]) {
                        form.setFieldsValue({
                            ...data[0],
                            date_plein : moment(data[0].date_plein, 'YYYY-MM-DD')
                        });
                    }
                }

                setVehicule(vehiculeData);
                setChauffeur(chauffeurData);
                setTypeCarburant(typeCarburantData)
                
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingData(false);

            }
        }

        fetchData();
    }, [iDVehicule])

    const onFinish = async (values) => {
        setIsLoading(true);
        
        try {
            message.loading({ content: 'En cours...', key: 'submit' });
    
            const payload = { 
                ...values, 
                id_user: userId || undefined
            };
    
            if (idPlein) {
                await carburantService.putCarburant({ ...payload, id_plein: idPlein });
            } else {
                await carburantService.postCarburant(payload);
            }
    
            message.success({ content: 'Carburant ajouté avec succès!', key: 'submit' });
    
            form.resetFields();
            fetchData();
            closeModal();
        } catch (error) {
            message.error({ content: 'Une erreur est survenue.', key: 'submit' });
            console.error('Erreur lors de l\'ajout du carburant:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

  return (
    <>
        <div className="carburantForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">Formulaire pour le Prélèvement de Carburant</h2>
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
                    variant={'filled'}
                >
                    <Row gutter={12}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="matricule_ch"
                                label="Numero de bon"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un numero...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir l'immatriculation" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
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
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select
                                    showSearch
                                    options={vehicule.map((item) => ({
                                        value: item.id_vehicule                                           ,
                                        label: `${item.immatriculation} / ${item.nom_marque} / ${item.modele}`,
                                    }))}
                                    placeholder="Sélectionnez un vehicule..."
                                    optionFilterProp="label"
                                    onChange={(value)=> setIdVehicule(value)}
                                />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="date_plein"
                                label="Date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une date...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="qte_plein"
                                label="Quantité"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une quantité...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Saisir la quantité" style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="kilometrage"
                                label="Kilometrage"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un kilométrage...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Saisir le kilométrage" style={{width:'100%'}} />}
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
                                <Select
                                    showSearch
                                    options={chauffeur.map((item) => ({
                                        value: item.id_chauffeur                                           ,
                                        label: item.nom,
                                    }))}
                                    placeholder="Sélectionnez un chauffeur..."
                                    optionFilterProp="label"
                                />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="type_carburant"
                                label="Carburant"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir le carburant...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                    <Select
                                        showSearch
                                        options={typeCarburant.map((item) => ({
                                                value: item.id_type_carburant                                          ,
                                                label: item.nom_type_carburant,
                                        }))}
                                        placeholder="Sélectionnez un type de carburant..."
                                        optionFilterProp="label"
                                    />
                                }
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="observation"
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
                <div className="carburantForm-right">
                    <CarburantBoard vehiculeData={carburantOne}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantForm