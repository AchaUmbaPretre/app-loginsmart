import { useEffect, useState } from 'react';
import './vehiculeForm.scss'
import { Button, Form, Upload, Input, Row, Col, Select, DatePicker, Skeleton, Divider, InputNumber, Radio, Space, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TypeService from '../../../services/type.service';
import vehiculeService from '../../../services/vehicule.service';
import getCroppedImg from '../../../utils/getCroppedImg';
import Cropper from 'react-easy-crop';
import moment from 'moment';
const { Option } = Select;

const VehiculeForm = ({fetchData, closeModal}) => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [modele, setModele] = useState([]);
    const [iDmarque, setIdMarque] = useState('');
    const [marque, setMarque] = useState([]);
    const [couleur, setCouleur] = useState([]);
    const [disposition, setDisposition] = useState([]);
    const [typeCarburant, setTypeCarburant] = useState([]);
    const [catVehicule, setCatVehicule] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [cropping, setCropping] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


    useEffect(() => {
        const fetchDatas = async () => {
            try {
                setLoadingData(true);
    
                const marqueData = await TypeService.typeMarque();
                const couleurData = await TypeService.typeCouleur();
                const catVehiculeData = await TypeService.catVehicule();
                const dispositionData = await TypeService.typeDisposition();
                const typeCarburantData = await TypeService.typeCarburant();

                setCouleur(couleurData);
                setMarque(marqueData);
                setCatVehicule(catVehiculeData);
                setDisposition(dispositionData);
                setTypeCarburant(typeCarburantData);

                if (iDmarque) {
                    const  data  = await TypeService.typeModele(iDmarque);
                    setModele(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingData(false);
            }
        };
    
        fetchDatas();
    }, [iDmarque]);
    
    const handleYearChange = (date, dateString) => {
        console.log("Selected year:", dateString);
      };

    const onFinish = async (values) => {

        setIsLoading(true)
        try {
            if(values.date_service) {
                values.date_service =  values.date_service ? moment(values.date_service).format('YYYY-MM-DD') : null;

            }
            if (fileList.length > 0) {
                values.img = fileList[0].originFileObj;
            }
            if (values.annee_circulation) {
                values.annee_circulation = values.annee_circulation.format("YYYY");
            }
            if (values.annee_fabrication) {
                values.annee_fabrication = values.annee_fabrication.format("YYYY");
            }
            message.loading({ content: 'En cours...', key: 'submit' });
            await vehiculeService.postVehicule(values)
            message.success({ content: 'Véhicule ajouté avec succès!', key: 'submit' });

            form.resetFields();
            closeModal();
            fetchData();

        } catch (error) {
            message.error({ content: 'Une erreur est survenue.', key: 'submit' });
            console.error('Erreur lors de l\'ajout du chauffeur:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
        if (fileList.length > 0) {
          setPreviewImage(URL.createObjectURL(fileList[0].originFileObj));
          setCropping(true);
        }
      };
    
      const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
      };
    
      const handleCrop = async () => {
        try {
            const cropped = await getCroppedImg(previewImage, croppedAreaPixels);
            const croppedFile = new File(
                [await fetch(cropped).then((r) => r.blob())],
                'cropped-image.jpg',
                { type: 'image/jpeg' }
            );
    
            setFileList([
                {
                    uid: '-1',
                    name: 'cropped-image.jpg',
                    status: 'done',
                    url: cropped,
                    originFileObj: croppedFile,
                },
            ]);
    
            setCropping(false);
        } catch (e) {
            console.error('Error cropping image:', e);
        }
    };

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
                    variant={'filled'}
                >
                    <Row gutter={12}>
                        <Divider className='title_row'>Identification</Divider>
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
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir l'immatriculation" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="numero_ordre"
                                label="Numéro d'ordre"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un Numéro d ordre... ',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Numéro d'ordre (optionnel)" />}
                            </Form.Item>
                        </Col>
                        
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_marque"
                                label="Marque"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une marque...',
                                    },
                                ]}
                            >
                            {
                                loadingData ? <Skeleton.Input active={true} /> : 
                                <Select
                                    showSearch
                                    options={marque.map((item) => ({
                                        value: item.id_marque                                           ,
                                        label: item.nom_marque,
                                    }))}
                                    placeholder="Sélectionnez une marque..."
                                    optionFilterProp="label"
                                    onChange={(value)=> setIdMarque(value)}
                                />
                            }
                            </Form.Item>
                        </Col> 
                        { iDmarque && 
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_modele"
                                label="Modèle"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un modèle...',
                                    },
                                ]}
                            >
                                {
                                    loadingData ? <Skeleton.Input active={true} /> :
                                    <Select
                                        showSearch
                                        options={modele.map((item) => ({
                                                value: item.id_modele                                           ,
                                                label: item.modele,
                                        }))}
                                        placeholder="Sélectionnez une modèle..."
                                        optionFilterProp="label"
                                    />
                                }

                            </Form.Item>
                        </Col> }

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="variante"
                                label="Variante"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une variante...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir l'immatriculation" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="num_chassis"
                                label="Numero chassis"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un numero de chassis',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir un numero de chassis" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="annee_fabrication"
                                label="Année de fabrication"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un numero de chassis',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> :  
                                    <DatePicker 
                                        picker="year" 
                                        style={{width:'100%'}}
                                        placeholder="Sélectionnez une année" 
                                    />
                                }
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="annee_circulation"
                                label="Mise en circulation"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir l année de circulation',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <DatePicker 
                                    picker="year" 
                                    placeholder="Sélectionnez une année" 
                                    style={{width:'100%'}}
                                />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_cat_vehicule"
                                label="Categorie"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une Categorie...',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    options={catVehicule.map((item) => ({
                                            value: item.id                                           ,
                                            label: item.nom_cat,
                                    }))}
                                    placeholder="Sélectionnez une categorie..."
                                    optionFilterProp="label"
                                />
                            </Form.Item>
                        </Col>

                        <Divider className='title_row'>Dimensions et Poids</Divider>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="longueur"
                                label="Longueur"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une longueur...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer la longueur" style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="largeur"
                                label="Largeur"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une largeur...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer la largeur" style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="hauteur"
                                label="Hauteur"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un hauteur...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer l'hauteur..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="poids"
                                label="Poids"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un poids...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer le poids..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_couleur"
                                label="Couleur"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une couleur...',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    options={couleur.map((item) => ({
                                            value: item.id_couleur                                          ,
                                            label: item.nom_couleur,
                                    }))}
                                    placeholder="Sélectionnez une couleur..."
                                    optionFilterProp="label"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="capacite_carburant"
                                label="Capacité carburant"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir la capacité du carburant...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer la capacité du carburant..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="capacite_radiateur"
                                label="Capacité radiateur"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir la capacité du radiateur...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer la capacité du radiateur..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="capacite_carter"
                                label="Capacité carter"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir une capacité carter...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer la capacité cartel..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="nbre_place"
                                label="Nombre place"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un nombre place...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer le nombre place..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="nbre_portes"
                                label="Nombre portes"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir le nombre porte...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer la capacité cartel..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item name="img" label="Image du Véhicule">
                                <Upload  
                                    accept="image/*"
                                    listType="picture-card"
                                    onChange={handleUploadChange}
                                    beforeUpload={() => false} 
                                >
                                    <Button icon={<UploadOutlined />}></Button>
                                </Upload>
                            </Form.Item>

                        </Col>

                        <Divider className='title_row'>Moteur</Divider>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="nbre_moteur"
                                label="Nombre moteur"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un nombre de moteur...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer le nombre de moteur..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="cylindre"
                                label="Cylindre"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir le cylindre...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer le cylindre..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="nbre_cylindre"
                                label="Nombre de cylindre"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir le Nombre de cylindre...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber min={0} placeholder="Entrer le Nombre de cylindre..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="disposition_cylindre"
                                label="Disposition"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir une disposition...',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    options={disposition.map((item) => ({
                                            value: item.id_disposition_cylindre                                          ,
                                            label: item.nom_disposition,
                                    }))}
                                    placeholder="Sélectionnez une disposition..."
                                    optionFilterProp="label"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_type_carburant"
                                label="Type carburant"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un carburant...',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    options={typeCarburant.map((item) => ({
                                            value: item.id_type_carburant                                          ,
                                            label: item.nom_type_carburant,
                                    }))}
                                    placeholder="Sélectionnez un type de carburant..."
                                    optionFilterProp="label"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="regime_moteur_vehicule"
                                label="Regime moteur"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un regime moteur...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input min={0} placeholder="Saisir le regime moteur" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="consommation_carburant"
                                label="Consommation carburant"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir une Consommation carburant...',
                                    },
                                ]}
                            >
                                <Radio.Group>
                                    <Radio value={1}>OUI</Radio>
                                    <Radio value={2}>NON</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Divider className='title_row'>Information complementaires</Divider>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="date_service"
                                label="Mise en service"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une date service...',
                                    },
                                ]}
                                initialValue={moment()}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} format="YYYY-MM-DD" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="km_initial"
                                label="Km initial"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un km initial...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber min={0} placeholder="Saisir le km initial" style={{width:'100%'}}/>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="puissance"
                                label="Puissance"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir la puissance...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber min={0} placeholder="Saisir la puissance" style={{width:'100%'}}/>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_transmission"
                                label="Transmission"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir une transmission...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir une Transmission">
                                    <Option value="1">Transmission 1</Option>
                                    <Option value="2">Transmission 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_climatisation"
                                label="Climatisation"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir une climatisation...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir une climatisation">
                                    <Option value="1">Climatisation 1</Option>
                                    <Option value="2">Climatisation 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="pneus"
                                label="Type de pneu"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un pneu...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir un pneu">
                                    <Option value="1">Pneu 1</Option>
                                    <Option value="2">Pneu 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="valeur_acquisition"
                                label="Valeur d'acquisition"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir la valeur d acquisition...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber min={0} placeholder="Saisir la valeur d acquisition" style={{width:'100%'}}/>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="lubrifiant_moteur"
                                label="Lubrifiant"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Veuillez fournir un lubrifiant moteur...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir un lubrifiant moteur">
                                    <Option value="1">Lubrifiant 1</Option>
                                    <Option value="2">Lubrifiant 2</Option>
                                </Select>
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

                <Modal
                        visible={cropping}
                        title="Rogner l'image"
                        onCancel={() => setCropping(false)}
                        onOk={handleCrop}
                        okText="Rogner"
                        cancelText="Annuler"
                        width={800}
                    >
                        <div style={{ position: 'relative', height: 400 }}>
                        <Cropper
                            image={previewImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                        </div>
                    </Modal>
            </div>
        </div>
    </>
  )
}

export default VehiculeForm