import React from 'react';
import { Modal, Button, Typography, Divider } from 'antd';

const { Text } = Typography;

const DeleteUserModal = ({ visible, onCancel, onConfirm, user, loading }) => {
  return (
    <Modal
      title="Confirmar eliminación"
      open={visible}
      onCancel={onCancel}
      centered
      width={572}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          danger
          loading={loading}
          onClick={onConfirm}
        >
          Eliminar
        </Button>,
      ]}
    >
      <Divider />
      <div className='delete-modal-container'>
        <p>¿Está seguro que desea eliminar el usuario <Text type='danger'>@{user?.username}</Text>?</p>
      </div>
      <Divider />
    </Modal>
  );
};

export default DeleteUserModal;
