import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import {
  fetchUsers,
  addUser,
  editUser,
  removeUser,
  setSearchText,
  setSearchValue,
  setStatusFilter,
  setCurrentUser,
  setIsEditing,
  setIsModalVisible,
  setUserToDelete,
  setIsDeleteModalVisible,
} from '../redux/slices/userSlice';

export const useUserActions = () => {
  const dispatch = useDispatch();
  const {
    currentUser,
    isEditing,
    formLoading,
    userToDelete
  } = useSelector(state => state.users);

  const handleSearch = (value) => {
    dispatch(setSearchText(value));
  };

  const handleSearchInputChange = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleStatusFilterChange = (value) => {
    dispatch(setStatusFilter(value));
  };

  const handleAddUser = () => {
    dispatch(setCurrentUser(null));
    dispatch(setIsEditing(false));
    setTimeout(() => {
      dispatch(setIsModalVisible(true));
    }, 0);
  };

  const handleEditUser = (user) => {
    dispatch(setCurrentUser(user));
    dispatch(setIsEditing(true));
    dispatch(setIsModalVisible(true));
  };

  const handleCancel = () => {
    dispatch(setIsModalVisible(false));
    if (!formLoading) {
      dispatch(setCurrentUser(null));
      dispatch(setIsEditing(false));
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (isEditing && currentUser) {
        await dispatch(editUser({ id: currentUser.id, userData: values })).unwrap();
        message.success('Usuario actualizado exitosamente');
      } else {
        await dispatch(addUser(values)).unwrap();
        message.success('Usuario creado exitosamente');
      }
      dispatch(fetchUsers());
    } catch (error) {
      console.error('Error al procesar usuario:', error);
      message.error(`Error al ${isEditing ? 'actualizar' : 'crear'} usuario`);
    }
  };

  const handleShowDeleteModal = (user) => {
    dispatch(setUserToDelete(user));
    dispatch(setIsDeleteModalVisible(true));
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await dispatch(removeUser(userToDelete.id)).unwrap();
      message.success('Usuario eliminado exitosamente');
      dispatch(fetchUsers());
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      message.error('Error al eliminar usuario');
    }
  };

  const handleCancelDelete = () => {
    dispatch(setIsDeleteModalVisible(false));
    dispatch(setUserToDelete(null));
  };

  const loadUsers = () => {
    dispatch(fetchUsers());
  };

  return {
    handleSearch,
    handleSearchInputChange,
    handleStatusFilterChange,
    handleAddUser,
    handleEditUser,
    handleCancel,
    handleFormSubmit,
    handleShowDeleteModal,
    handleConfirmDelete,
    handleCancelDelete,
    loadUsers
  };
};
