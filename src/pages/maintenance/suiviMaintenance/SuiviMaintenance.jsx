import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Button, Divider, message } from 'antd';
import React from 'react'

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
                >
                    <Form.List name="suivie">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key} gutter={12} align="middle">
                                        <Col xs={24} md={7}>
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
                                    </Row>
                                ))}
                            </>
                        )}
                    </Form.List>
                </Form>
            </div>
        </div>
    </>
  )
}

export default SuiviMaintenance