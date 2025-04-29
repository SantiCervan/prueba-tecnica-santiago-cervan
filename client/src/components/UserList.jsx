import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Table, Alert, Button } from "antd";
import UserListControls from "./UserListControls";
import UserModal from "./UserModal";
import DeleteUserModal from './DeleteUserModal';
import '../styles/UserList.css';

// Importar custom hooks
import { useUserActions } from '../hooks/useUserActions';

// Importar columnas
import { getUserColumns } from './UserListColumns';

const UserList = () => {
  // Seleccionar estados del store de Redux
  const {
    filteredList,
    loading,
    error,
    searchValue,
    statusFilter,
    currentUser,
    isEditing,
    isModalVisible,
    formLoading,
    userToDelete,
    isDeleteModalVisible,
    deleteLoading
  } = useSelector(state => state.users);

  // Obtener acciones del custom hook
  const {
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
  } = useUserActions();

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers();
  }, []);

  // Obtener columnas para la tabla
  const columns = getUserColumns(handleEditUser, handleShowDeleteModal);

  if (error) {
    return (
      <div>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" type="primary" onClick={loadUsers}>
              Reintentar
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className='list-user-container'>
      <UserListControls
        searchValue={searchValue}
        onSearchChange={handleSearchInputChange}
        onSearch={handleSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        onAddUser={handleAddUser}
      />

      <Table
        rowKey="id"
        loading={loading}
        dataSource={filteredList}
        columns={columns}
        pagination={{ pageSize: 9 }}
        locale={{
          emptyText: (searchValue || statusFilter)
            ? "No se encontraron resultados con los filtros aplicados"
            : "No hay usuarios disponibles"
        }}
      />

      <UserModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onFinish={handleFormSubmit}
        initialValues={currentUser}
        action={isEditing ? "Editar usuario" : "Agregar usuario"}
        loading={formLoading}
      />

      <DeleteUserModal
        visible={isDeleteModalVisible}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        user={userToDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

export default UserList;
