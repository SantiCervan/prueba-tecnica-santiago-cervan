import { useState } from 'react';
import { message } from 'antd';
import { createUser, updateUser, deleteUser } from '../services/userService';

export const useUserListHandlers = (fetchUsers) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsEditing(false);
    setTimeout(() => {
      setIsModalVisible(true);
    }, 0);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    if (!formLoading) {
      setCurrentUser(null);
      setIsEditing(false);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      if (isEditing) {
        await updateUser(currentUser.id, values);
        message.success('Usuario actualizado exitosamente');
      } else {
        await createUser(values);
        message.success('Usuario creado exitosamente');
      }
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Error al procesar usuario:', error);
      message.error(`Error al ${isEditing ? 'actualizar' : 'crear'} usuario`);
    } finally {
      setFormLoading(false);
    }
  };
  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      setDeleteLoading(true);
      await deleteUser(userToDelete.id);
      message.success('Usuario eliminado exitosamente');
      setIsDeleteModalVisible(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      message.error('Error al eliminar usuario');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
    setUserToDelete(null);
  };

  return {
    isModalVisible,
    formLoading,
    currentUser,
    isEditing,
    isDeleteModalVisible,
    userToDelete,
    deleteLoading,
    handleAddUser,
    handleEditUser,
    handleCancel,
    handleFormSubmit,
    handleShowDeleteModal,
    handleConfirmDelete,
    handleCancelDelete
  };
};
