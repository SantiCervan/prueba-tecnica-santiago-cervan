import React from 'react';
import { Space, Tag, Button } from 'antd';

export const getUserColumns = (handleEditUser, handleShowDeleteModal) => [
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
    width: 80,
    render: (status) => {
      return (
        <Tag color={status === 'active' ? 'green' : 'red'} >
          {status === 'active' ? "Activo" : "Inactivo"}
        </Tag>
      );
    },
  },
  {
    title: "Acciones",
    key: "acciones",
    width: 100,
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
