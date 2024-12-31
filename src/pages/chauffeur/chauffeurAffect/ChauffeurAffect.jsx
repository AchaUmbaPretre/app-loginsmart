import React, { useEffect, useState } from 'react'
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Button, Divider } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import TypeService from '../../../services/type.service';
import ChauffeurService from '../../../services/chauffeur.service';
const { Option } = Select;


const ChauffeurAffect = () => {
    const [form] = Form.useForm();
    const [loadingData, setLoadingData] = useState(false);
    const [site, setSite] = useState([]);
    const [chauffeur, setChauffeur] = useState([])
  

    useEffect(() => {
        const fetchData = async() => {
          try {
            setLoadingData(true);
    
            const siteData = await TypeService.getSite();
            const chauffeurData = await ChauffeurService.getChauffeur()
    
            setSite(siteData);
            setChauffeur(chauffeurData)
    
    
          } catch (error) {
            console.error(error);
          } finally {
            setLoadingData(false);
        }
        }
        fetchData();
      }, [])

    const onFinish = () => {

    }

  return (
    <>
        <div className="vehiculeForm">
            <div className="vehicule_row_title">
                <h2 className="title_h2">AFFECTER UN AGENT</h2>
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
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="id_site"
                                label="Site d'affecation"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un site...',
                                    }
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select
                                    showSearch
                                    options={site.map((item) => ({
                                            value: item.id_site                                           ,
                                            label: item.nom_site,
                                    }))}
                                    placeholder="Sélectionnez un site..."
                                    optionFilterProp="label"
                                />
                                }
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="id_chauffeur"
                                label="Chauffeur"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Veuillez fournir un chauffeur...',
                                    },
                                ]}
                            >
                                {loadingData ? <Skeleton.Input active={true} /> : 
                                <Select
                                    showSearch
                                    options={site.map((item) => ({
                                            value: item.id_chauffeur                                           ,
                                            label: `${item.nom} - ${item.prenom}`,
                                    }))}
                                    placeholder="Sélectionnez un chauffeur..."
                                    optionFilterProp="label"
                                />
                                }
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24}>
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
                                {loadingData ? <Skeleton.Input active={true} /> : <Input.TextArea placeholder="Saisir le commentaire" style={{height:'100px', resize:'none'}} />}
                            </Form.Item>
                        </Col>
                    </Row>
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

export default ChauffeurAffect