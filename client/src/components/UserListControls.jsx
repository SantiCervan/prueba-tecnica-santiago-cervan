import React from "react";
import { Breadcrumb, Button, Input, Select } from "antd";
import '../styles/UserListControls.css';

const { Search } = Input;
const { Option } = Select;

const UserListControls = ({
  searchValue,
  onSearchChange,
  onSearch,
  statusFilter,
  onStatusFilterChange,
  onAddUser
}) => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
      </Breadcrumb>
      <div className='user-list-controls-container'>
        <div className='filters-container'>
          <Search
            placeholder="Buscar usuarios"
            allowClear
            size="middle"
            value={searchValue}
            onChange={onSearchChange}
            onSearch={onSearch}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Filtrar por estado"
            style={{ width: 200 }}
            onChange={onStatusFilterChange}
            value={statusFilter}
          >
            <Option value="all">Todos</Option>
            <Option value="active">Activos</Option>
            <Option value="inactive">Inactivos</Option>
          </Select>
        </div>
        <Button type="primary" onClick={onAddUser}>
          Agregar usuario
        </Button>
      </div>
    </div>
  );
};

export default UserListControls;
