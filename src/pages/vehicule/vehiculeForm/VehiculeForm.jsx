import { useState } from 'react';
import './vehiculeForm.scss'
import { Button, Form, Upload, Input, Row, Col, Select, DatePicker, Skeleton, Divider, InputNumber, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

const VehiculeForm = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);

    const handleYearChange = (date, dateString) => {
        console.log("Selected year:", dateString);
      };

    const onFinish = () => {

    }

  return (
    <>
        <div className="vehiculeForm">
            <div className="vehicule_row_title">
                <div className="title_h2">Formulaire</div>
            </div>
            <div className="vehiculeForm_wrapper">
                <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    autoComplete="off"
                    className="custom-form"
                    onFinish={onFinish}
                >
                    <Row gutter={12}>
                        <Divider>Identification</Divider>
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
                                <Select placeholder="Choisir la marque">
                                    <Option value="1">Marque 1</Option>
                                    <Option value="2">Marque 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_modele"
                                label="Modèle"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un modèle...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir un modèle">
                                    <Option value="1">Modele 1</Option>
                                    <Option value="2">Modele 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

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
                                        required: true,
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
                                {loadingData ? <Skeleton.Input active={true} /> :    <DatePicker 
                                                                                        picker="year" 
                                                                                        onChange={handleYearChange} 
                                                                                        style={{width:'100%'}}
                                                                                        placeholder="Sélectionnez une année" 
                                                                                        />}
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
                                {loadingData ? <Skeleton.Input active={true} /> :    <DatePicker 
                                                                                            picker="year" 
                                                                                            onChange={handleYearChange} 
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
                                <Select placeholder="Choisir une categorie">
                                    <Option value="1">Cat 1</Option>
                                    <Option value="2">Cat 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Divider>Dimensions et Poids</Divider>

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
                                <Select placeholder="Choisir une couleur">
                                    <Option value="1">Couleur 1</Option>
                                    <Option value="2">Couleur 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="capacite_carburant"
                                label="Capacité carburant"
                                rules={[
                                    {
                                        required: true,
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
                                        required: true,
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
                                        required: true,
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
                                        required: true,
                                        message: 'Veuillez fournir le nombre porte...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer la capacité cartel..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item name="img" label="Image du Véhicule">
                                <Upload  >
                                    <Button icon={<UploadOutlined />}>Télécharger</Button>
                                </Upload>
                            </Form.Item>

                        </Col>

                        <Divider>Moteur</Divider>
                        <Col xs={24} md={8}>
                            <Form.Item
                                name="nbre_moteur"
                                label="Nombre moteur"
                                rules={[
                                    {
                                        required: true,
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
                                        required: true,
                                        message: 'Veuillez fournir le cylindre...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer le cylindre..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="cylindre"
                                label="Nombre de cylindre"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir le Nombre de cylindre...',
                                    },
                                ]}
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Entrer le Nombre de cylindre..." style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="disposition_cylindre"
                                label="Disposition"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir une disposition...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir une disposition">
                                    <Option value="1">Dispo 1</Option>
                                    <Option value="2">Dispo 2</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_type_carburant"
                                label="Type carburant"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un carburant...',
                                    },
                                ]}
                            >
                                <Select placeholder="Choisir un type de carburant">
                                    <Option value="1">Type carburant 1</Option>
                                    <Option value="2">Type carburant 2</Option>
                                </Select>
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
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir le regime moteur" />}
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

                        <Divider>Information complementaires</Divider>
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
                            >
                            {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} />}
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
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Saisir le km initial" style={{width:'100%'}}/>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="puissance"
                                label="Puissance"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir la puissance...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Saisir la puissance" style={{width:'100%'}}/>}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item
                                name="id_transmission"
                                label="Transmission"
                                rules={[
                                    {
                                        required: true,
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
                                        required: true,
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
                                        required: true,
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

                    </Row>
                </Form>
            </div>
        </div>
    </>
  )
}

export default VehiculeForm