import React from "react";
import { Divider, Modal, Typography } from "antd";
import '../styles/DeleteModal.css'

const { Text } = Typography;

const DeleteUserModal = ({
  visible,
  onCancel,
  onConfirm,
  user,
  loading = false
}) => {
  if (!user) return null;

  const displayName = user.username || 'este usuario';

  return (
    <Modal
      title="Eliminar usuario"
      open={visible}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Eliminar"
      cancelText="Cancelar"
      okButtonProps={{
        danger: true,
        loading: loading
      }}
      centered
      width={572}
    >
      <Divider />
      <div className='delete-modal-container'>
        <p>¿Está seguro que desea eliminar el usuario <Text type='danger'>@{displayName}</Text>?</p>
      </div>
      <Divider />
    </Modal>
  );
};

export default DeleteUserModal;
