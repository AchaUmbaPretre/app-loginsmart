import './vehiculeForm.scss'
import { Button, Form,Card, Input, Space, Row, Col, Select, notification, DatePicker, Skeleton, Modal } from 'antd';


const VehiculeForm = () => {
    const [form] = Form.useForm();

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
                    
                </Form>
            </div>
        </div>
    </>
  )
}

export default VehiculeForm