import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Button, Divider, message } from 'antd';
import React from 'react'
import { MinusCircleOutlined, SendOutlined, PlusCircleOutlined } from '@ant-design/icons';


const SuiviMaintenance = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {

    }

  return (
    <>
        <div className="Maintenance_form">
            <div className="vehicule_row_title">
                <h2 className="title_h2">SUIVI INTERVENTION BON N° 5: VEHECULE N°FORD RANGER XL 5701AN/01</h2>
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
                    initialValues={{
                            suivie: [
                                {
                                    id_tache: null,
                                    id_piece: null,
                                    cout: null,
                                    description: '',
                                },
                            ],
                        }}
                >
                    <Form.List name="suivie">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key} gutter={12} align="middle">
                                        <Col xs={24} md={5}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'id_tache']}
                                                label="Tache"
                                                rules={[
                                                    { required: true, message: 'Veuillez fournir une tache...' },
                                                ]}
                                            >
                                                <InputNumber
                                                    min={0}
                                                    placeholder="Saisir le montant"
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={5}>
                                            <Form.Item
                                            {...restField}
                                            name={[name, 'id_piece']}
                                            label="Piece"
                                            rules={[
                                                { required: true, message: 'Veuillez fournir une piece...' },
                                            ]}
                                            >
                                            <InputNumber
                                                min={0}
                                                placeholder="Saisir le montant"
                                                style={{ width: '100%' }}
                                            />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={5}>
                                            <Form.Item
                                            {...restField}
                                            name={[name, 'cout']}
                                            label="Cout"
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
                                        Ajouter une suivie
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
  )
}

export default SuiviMaintenance