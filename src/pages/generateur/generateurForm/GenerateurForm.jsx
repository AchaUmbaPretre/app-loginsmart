import { Divider } from 'antd'
import React from 'react'

const GenerateurForm = () => {
  return (
    <>
        <div className="generateurForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2"></h2>
            </div>
            <div className="generateurForm_wrapper">
                <Form
                    form={form}
                    name="validateOnly"
                    layout="vertical"
                    autoComplete="off"
                    className="custom-form"
                    onFinish={onFinish}
                >
                    <Row gutter={12}>
                        <Divider className='title_row'>Identification</Divider>
                    </Row>
                </Form>
            </div>
        </div>
    </>
  )
}

export default GenerateurForm