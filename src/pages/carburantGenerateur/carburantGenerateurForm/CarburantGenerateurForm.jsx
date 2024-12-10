import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Skeleton, Space } from 'antd';
import { useState } from 'react';

const CarburantGenerateurForm = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const onFinish = () => {
    }

  return (
    <>
        <div className="carburantForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">ENREGISTREMENT PLEIN GENERATEUR</h2>
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
                                name="groupe_agence"
                                label="Groupe Agence"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un groupe agence...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <Input placeholder="Saisir un groupe agence..." />}
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
                                name="index"
                                label="Index"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un index...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Saisir l'index..." style={{width:'100%'}} />}
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
                                name="carburant"
                                label="Carburant"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un carburant...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : <InputNumber placeholder="Saisir un carburant..." style={{width:'100%'}} />}
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
{/*                     <CarburantBoard/>
 */}                </div>
            </div>
        </div>
    </>
  )
}

export default CarburantGenerateurForm;