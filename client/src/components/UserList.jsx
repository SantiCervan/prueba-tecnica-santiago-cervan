import { useEffect, useState } from "react";
import { Table, Spin, Space, Alert, Empty, Tag, Button, message } from "antd";
import { getUsers, createUser } from "../services/userService";
import UserListControls from "./UserListControls";
import UserModal from "./UserModal";
import '../styles/UserList.css'

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
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      setFormLoading(true);
      await createUser(values);
      message.success('Usuario creado exitosamente');
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      message.error('Error al crear usuario');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
      render: () => (
        <Space>
          <Button type="link" size="small">
            Editar
          </Button>
          <Button type="link" size="small">
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div>
        <Spin size="large" tip="Cargando usuarios..." />
      </div>
    );
  }

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
      {filteredUsers.length > 0 ? (
        <Table
          rowKey="id"
          loading={loading}
          dataSource={filteredUsers}
          columns={columns}
          pagination={{ pageSize: 9 }}
        />
      ) : (
        <Empty
          description={
            (searchText || statusFilter)
              ? "No se encontraron resultados con los filtros aplicados"
              : "No hay usuarios disponibles"
          }
        />
      )}
      <UserModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onFinish={handleFormSubmit}
        initialValues={currentUser}
        action={currentUser ? "Editar usuario" : "Agregar usuario"}
        loading={formLoading}
      />
    </div>
  );
};

export default UserList;
