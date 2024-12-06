// Register.js
import React, { useState } from 'react';
import './register.scss';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('nom', values.nom);
    formData.append('prenom', values.prenom);
    formData.append('email', values.email);
    formData.append('mot_de_passe', values.mot_de_passe);
    try {
      const response = await AuthService.register(formData);
      message.success('Inscription réussie !');
      form.resetFields(); // Réinitialiser le formulaire après soumission réussie
      navigate('/login')
    } catch (error) {
      message.error('Échec de l\'inscription, veuillez réessayer.');
    }
  };


  return (
    <div className="register-container">
      <div className="background-elements">
        <div className="circle"></div>
        <div className="circle small"></div>
      </div>
      <div className="register-card">
        <h1>Rejoignez-nous</h1>
        <p className="description">Inscrivez-vous pour profiter de nos services exclusifs</p>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="register-form"
        >
          <Form.Item
            name="nom"
            label="Nom"
            rules={[{ required: true, message: 'Veuillez entrer votre nom.' }]}
          >
            <Input placeholder="Votre nom" />
          </Form.Item>

          <Form.Item
            name="prenom"
            label="Prénom"
            rules={[{ required: false }]}
          >
            <Input placeholder="Votre prénom" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Veuillez entrer votre email.' },
              { type: 'email', message: 'Entrez un email valide.' },
            ]}
          >
            <Input placeholder="Votre email" />
          </Form.Item>

          <Form.Item
            name="mot_de_passe"
            label="Mot de passe"
            rules={[{ required: true, message: 'Veuillez entrer un mot de passe.' }]}
          >
            <Input.Password placeholder="Votre mot de passe" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="register-button">
              S'inscrire
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
