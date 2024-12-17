import React from 'react'
import { Button, Form, Upload, Input, Row, Col, Select, DatePicker, Skeleton, Divider, InputNumber, Radio, Space } from 'antd';


const SinistreVehiculeForm = () => {
    const [form] = Form.useForm();

    const onFinish = () => {

    }

  return (
    <>
        <div className="vehiculeForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">ENREGISTRER UN SINISTRE</h2>
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
                </Form>
            </div>
        </div>
    </>
  )
}

export default SinistreVehiculeForm