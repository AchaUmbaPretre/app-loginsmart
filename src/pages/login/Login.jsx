import React from 'react';
import './login.scss';
import { Form, Input, Button, message } from 'antd';

const Login = () => {
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    fetch('http://votre-api-endpoint/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          message.success('Connexion réussie !');
          form.resetFields();
        } else {
          message.error('Email ou mot de passe incorrect.');
        }
      })
      .catch(() => message.error('Une erreur est survenue.'));
  };

  return (
    <div className="login-container">
      <div className="background-elements">
        <div className="circle"></div>
        <div className="circle small"></div>
      </div>
      <div className="login-card">
        <h1>Connexion</h1>
        <p className="description">Reprenez là où vous vous êtes arrêté</p>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          className="login-form"
        >
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
            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe.' }]}
          >
            <Input.Password placeholder="Votre mot de passe" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="login-button">
              Se connecter
            </Button>
          </Form.Item>
        </Form>
        <p className="forgot-password">
          <a href="#forgot">Mot de passe oublié ?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
