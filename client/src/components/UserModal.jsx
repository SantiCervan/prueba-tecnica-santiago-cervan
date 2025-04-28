import React, { useEffect } from "react";
import { Modal, Form, Input, Select, InputNumber, Button, Divider, Row, Col } from "antd";
import '../styles/UserModal.css'

const { Option } = Select;

const UserModal = ({
  visible,
  onCancel,
  onFinish,
  initialValues,
  action = "Usuario",
  loading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSubmit = async (values) => {
    await onFinish(values);
    form.resetFields();
  };

  return (
    <Modal
      title={action}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose={true}
      width={572}
      centered={true}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Row gutter={29}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Usuario"
              rules={[{ required: true, message: 'Por favor ingrese un nombre de usuario' }]}
            >
              <Input placeholder="johndoe" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Por favor ingrese un email' },
                { type: 'email', message: 'Por favor ingrese un email válido' }
              ]}
            >
              <Input placeholder="johndoe@domain.com" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={29}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
            >
              <Input placeholder="John" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastname"
              label="Apellido"
              rules={[{ required: true, message: 'Por favor ingrese un apellido' }]}
            >
              <Input placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={29}>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Estado"
              rules={[{ required: true, message: 'Por favor seleccione un estado' }]}
            >
              <Select placeholder="Seleccione un estado">
                <Option value="active">Activo</Option>
                <Option value="inactive">Inactivo</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="age"
              label="Edad"
              rules={[{ required: true, message: 'Por favor ingrese la edad' }]}
            >
              <InputNumber min={1} max={100} style={{ width: '100%' }} placeholder='43' />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Form.Item className='action-button'>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {action}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
