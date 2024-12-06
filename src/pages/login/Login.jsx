import React from 'react';
import './login.scss';
import { Form, Input, Button, message } from 'antd';
import AuthService from '../../services/auth.service';  // Assurez-vous que le chemin est correct

const Login = () => {
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      const { email, mot_de_passe } = values;
      const response = await AuthService.login(email, mot_de_passe);
      if (response) {
        message.success('Connexion réussie');
        // Vous pouvez rediriger l'utilisateur ou effectuer d'autres actions après la connexion.
      }
    } catch (error) {
      message.error('Échec de la connexion, veuillez vérifier vos identifiants.');
    }
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
