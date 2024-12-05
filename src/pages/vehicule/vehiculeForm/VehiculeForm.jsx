import React from "react";
import { Form, Input, Select, Button, DatePicker, Divider } from "antd";
import { motion } from "framer-motion";
import "./vehiculeForm.scss";

const { Option } = Select;

const VehiculeForm = () => {
  const onFinish = (values) => {
    console.log("Form Data:", values);
  };

  return (
    <motion.div
      className="vehicule-form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="form-container"
        initialValues={{ turbo: "non" }}
      >
        {/* Identification Section */}
        <Divider>Identification</Divider>
        <Form.Item name="immatriculation" label="Immatriculation" rules={[{ required: true }]}>
          <Input placeholder="Saisir l'immatriculation" />
        </Form.Item>
        <Form.Item name="numero_ordre" label="Numéro d'ordre">
          <Input placeholder="Numéro d'ordre (optionnel)" />
        </Form.Item>
        <Form.Item name="id_marque" label="Marque" rules={[{ required: true }]}>
          <Select placeholder="Choisir la marque">
            <Option value="1">Marque 1</Option>
            <Option value="2">Marque 2</Option>
          </Select>
        </Form.Item>
        {/* Ajouter plus de champs similaires */}

        {/* Dimensions et Poids Section */}
        <Divider>Dimensions et Poids</Divider>
        <Form.Item name="longueur" label="Longueur (en cm)" rules={[{ required: true }]}>
          <Input placeholder="Saisir la longueur" type="number" />
        </Form.Item>
        <Form.Item name="poids" label="Poids (en kg)" rules={[{ required: true }]}>
          <Input placeholder="Saisir le poids" type="number" />
        </Form.Item>
        {/* Ajouter plus de champs similaires */}

        {/* Moteur Section */}
        <Divider>Moteur</Divider>
        <Form.Item name="nbre_cylindre" label="Nombre de cylindres">
          <Input placeholder="Saisir le nombre de cylindres" type="number" />
        </Form.Item>
        <Form.Item name="id_type_carburant" label="Type de carburant" rules={[{ required: true }]}>
          <Select placeholder="Choisir le type de carburant">
            <Option value="1">Diesel</Option>
            <Option value="2">Essence</Option>
          </Select>
        </Form.Item>
        {/* Ajouter plus de champs similaires */}

        {/* Informations Complémentaires Section */}
        <Divider>Informations Complémentaires</Divider>
        <Form.Item name="date_service" label="Date de mise en service" rules={[{ required: true }]}>
          <DatePicker placeholder="Choisir une date" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="valeur_acquisition" label="Valeur d'acquisition">
          <Input placeholder="Saisir la valeur" type="number" />
        </Form.Item>

        {/* Submit Button */}
        <motion.div
          className="submit-section"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button type="primary" htmlType="submit" block>
            Enregistrer le Véhicule
          </Button>
        </motion.div>
      </Form>
    </motion.div>
  );
};

export default VehiculeForm;
