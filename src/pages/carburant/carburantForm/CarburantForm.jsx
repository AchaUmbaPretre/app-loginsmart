import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Skeleton, Space } from 'antd';
import './carburantForm.scss'
import { useState } from 'react';
import CarburantBoard from '../carburantBoard/CarburantBoard';

const CarburantForm = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const onFinish = () => {

    }

  return (
    <>
        <div className="carburantForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">Formulaire du Prelevement carburant</h2>
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
                                name="numero"
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
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir l'immatriculation" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
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
                                {loadingData ? <Skeleton.Input active={true} /> : <DatePicker style={{width:'100%'}} />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="quantite"
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
                                name="chauffeur"
                                label="Chauffeur"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un chauffeur...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir l'immatriculation" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="carburant"
                                label="Carburant"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir le carburant...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir le carburant" />}
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="commentaire"
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
                    <CarburantBoard/>
                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantForm