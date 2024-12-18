import React, { useEffect, useState } from 'react';
import { Button, Form, Upload, Input, Row, Col, Select, DatePicker, Skeleton, Divider, InputNumber, Radio, Space, Modal } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import Cropper from 'react-easy-crop';
import getCroppedImg from './../../../utils/getCroppedImg'; // Fonction utilitaire pour rogner l'image
import TypeService from '../../../services/type.service';

const { Option } = Select;

const ChauffeurForm = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [cropping, setCropping] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [catPermis, setCatPermis] = useState([]);
    const [typeContrat, setTypeContrat] = useState([]);
    const [etatCivil, setEtatCivil] = useState([]);
    const [fonction, setFonction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
    
                const [catPermisData, typeContratData, etatCivilData, typeFonctionData] = await Promise.all([
                    TypeService.catPermis(),
                    TypeService.typeContrat(),
                    TypeService.etatCivil(),
                    TypeService.typeFonction(),
                ]);
    
                setCatPermis(catPermisData);
                setTypeContrat(typeContratData);
                setEtatCivil(etatCivilData);
                setFonction(typeFonctionData);
            } catch (error) {
                setError('Une erreur est survenue lors du chargement des données.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    console.log(etatCivil)

    const onFinish = (values) => {
        console.log('Form values:', values, 'Cropped Image:', croppedImage);
      };
    
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
          setCroppedImage(cropped);
                const croppedFile = new File([await fetch(cropped).then((r) => r.blob())], 'cropped-image.jpg', { type: 'image/jpeg' });
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
                    <h2 className="title_h2">ENREGISTRER UN CHAUFFEUR</h2>
                </div>
                <div className="vehiculeForm_wrapper">
                    <Form
                        form={form}
                        name="chauffeurForm"
                        layout="vertical"
                        autoComplete="off"
                        className="custom-form"
                        onFinish={onFinish}
                        variant={'filled'}
                    >
                        <Row gutter={16}>
                        <Divider className='title_row' orientation="left" plain>INFORMATION GENERALE</Divider>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="nom"
                                    label="Nom"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir un nom.',
                                        },
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active /> : <Input placeholder="Saisir le nom" />}
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="prenom"
                                    label="Prénom"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir un prénom.',
                                        },
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active /> : <Input placeholder="Saisir le prénom" />}
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="telephone"
                                    label="Téléphone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir un numéro de téléphone.',
                                        },
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active /> : <Input placeholder="+243..." />}
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="date_naissance"
                                    label="Date de naissance"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir la date de naissance.',
                                        },
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active /> : <DatePicker style={{ width: '100%' }} />}
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="date_engagement"
                                    label="Date d'engagement"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir la date d\'engagement.',
                                        },
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active /> : <DatePicker style={{ width: '100%' }} />}
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="sexe"
                                    label="Sexe"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir le sexe.',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value="H">Homme</Radio>
                                        <Radio value="F">Femme</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="etat_civil"
                                    label="État civil"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir l\'état civil.',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>Marié(e)</Radio>
                                        <Radio value={2}>Célibataire</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={10}>
                                <Form.Item
                                    name="adresse"
                                    label="Adresse"
                                >
                                    {loadingData ? <Skeleton.Input active /> : <Input.TextArea placeholder="Saisir l'adresse" style={{height:'105px', resize:'none'}} />}
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={6}>
                                <Form.Item
                                    name="photo"
                                    label="Photo"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Veuillez fournir une photo.',
                                        },
                                    ]}
                                >
                                <Upload
                                    accept="image/*"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={() => false} // Empêche le téléchargement automatique
                                >
                                    {fileList.length < 1 && <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Ajouter</div>
                                    </div>}
                                </Upload>
                                </Form.Item>
                            </Col>

                            <Divider className='title_row' orientation="left" plain>AUTRES INFORMATIONS</Divider>

                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="id_fonction"
                                    label="Fonction"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir une fonction.',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        options={fonction.map((item) => ({
                                            value: item.id_type_fonction                                           ,
                                            label: item.nom_type_fonction,
                                        }))}
                                        placeholder="Sélectionnez une fonction..."
                                        optionFilterProp="label"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="type_contrat"
                                    label="Type de contrat"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir un type de contrat.',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        options={typeContrat.map((item) => ({
                                            value: item.id_type_contrat                                           ,
                                            label: item.nom_type_contrat,
                                        }))}
                                        placeholder="Sélectionnez un type de contrat..."
                                        optionFilterProp="label"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="type_travail"
                                    label="Type de travail"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir un type de travail.',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Choisir un type de travail">
                                        <Option value="1">Travail 1</Option>
                                        <Option value="2">Travail 2</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="num_permis"
                                    label="N° Permis de conduire"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir un numéro de permis.',
                                        },
                                    ]}
                                >
                                    {loadingData ? <Skeleton.Input active /> : <Input placeholder="Saisir le numéro de permis" />}
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="cat_permis"
                                    label="Catégorie Permis"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Veuillez fournir la catégorie du permis.',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        options={catPermis.map((item) => ({
                                            value: item.id_cat_permis                                           ,
                                            label: item.nom_cat_permis,
                                        }))}
                                        placeholder="Sélectionnez un type de permis..."
                                        optionFilterProp="label"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={8}>
                                <Form.Item
                                    name="date_validite"
                                    label="Validité"
                                >
                                    {loadingData ? <Skeleton.Input active /> : <DatePicker style={{ width: '100%' }} />}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider />
                        <Row justify="center">
                            <Button type="primary" htmlType="submit" loading={loadingData}>
                                Enregistrer
                            </Button>
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
    );
};

export default ChauffeurForm;
