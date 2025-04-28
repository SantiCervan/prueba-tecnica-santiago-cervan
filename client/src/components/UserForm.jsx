import React from 'react';
import { Form, Input, Select, InputNumber, Button } from 'antd';

const { Option } = Select;

const UserForm = ({ onFinish, initialValues, loading }) => {
  const [form] = Form.useForm();

  const requiredRule = { required: true, message: 'Este campo es obligatorio' };
  const emailRule = { type: 'email', message: 'Por favor ingrese un email válido' };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues || {
        status: 'active',
        age: 18
      }}
      onFinish={(values) => {
        onFinish(values);
        form.resetFields();
      }}
    >
      <Form.Item
        name="username"
        label="Usuario"
        rules={[requiredRule]}
      >
        <Input placeholder="Nombre de usuario" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[requiredRule, emailRule]}
      >
        <Input placeholder="correo@ejemplo.com" />
      </Form.Item>

      <Form.Item
        name="name"
        label="Nombre"
        rules={[requiredRule]}
      >
        <Input placeholder="Nombre" />
      </Form.Item>

      <Form.Item
        name="lastname"
        label="Apellido"
        rules={[requiredRule]}
      >
        <Input placeholder="Apellido" />
      </Form.Item>

      <Form.Item
        name="age"
        label="Edad"
        rules={[requiredRule]}
      >
        <InputNumber min={1} max={120} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="status"
        label="Estado"
        rules={[requiredRule]}
      >
        <Select>
          <Option value="active">Activo</Option>
          <Option value="inactive">Inactivo</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
