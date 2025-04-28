import { useEffect, useState } from "react";
import { Table, Spin, Space, Alert, Empty, Tag, Button, message } from "antd";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import UserListControls from "./UserListControls";
import UserModal from "./UserModal";
import '../styles/UserList.css'
import DeleteUserModal from './DeleteUserModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState(undefined);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      if (Array.isArray(data)) {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        throw new Error("Los datos recibidos no tienen el formato esperado");
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      setError(error.message || "Error al cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const applyFilters = () => {
    let result = [...users];

    if (searchText) {
      result = result.filter(user =>
        (user.name && user.name.toLowerCase().includes(searchText.toLowerCase())) ||
        (user.lastname && user.lastname.toLowerCase().includes(searchText.toLowerCase()))
      );
    }

    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(result);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

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
    setIsModalVisible(false);
    setCurrentUser(null);
    setIsEditing(false);
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

  const handleCancel = () => {
    setIsModalVisible(false);
    if (!formLoading) {
      setCurrentUser(null);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [searchText, statusFilter, users]);

  const columns = [
    {
      title: "Usuario",
      dataIndex: "username",
      key: "username",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: 150,
      ellipsis: true,
      render: (text) => text || <span>No disponible</span>
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      width: 150,
      ellipsis: true,
      render: (text) => text || <span>No disponible</span>
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        return (
          <Tag color={status === 'active' ? 'green' : 'red'} >
            {status === 'active' ? "Activo" : "Inactivo"}
          </Tag >
        );
      },
    },
    {
      title: "Acciones",
      key: "acciones",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => handleEditUser(record)}
          >
            Editar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => handleShowDeleteModal(record)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];


  if (error) {
    return (
      <div>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" type="primary" onClick={fetchUsers}>
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
        dataSource={filteredUsers}
        columns={columns}
        pagination={{ pageSize: 9 }}
        locale={{
          emptyText: (searchText || statusFilter)
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
