# Prueba Técnica Flexxus - CRUD de Usuarios

## 📋 Descripción

Este proyecto es la resolución del desafío técnico propuesto por **Flexxus**. Consiste en un CRUD completo de usuarios implementado con **React**, siguiendo fielmente el diseño proporcionado en **Figma**.

La aplicación permite gestionar usuarios a través de operaciones de creación, lectura, actualización y eliminación.

---

## ✨ Características principales

- ✅ Listado de usuarios con paginación
- ✅ Creación de nuevos usuarios
- ✅ Edición de usuarios existentes
- ✅ Eliminación de usuarios con confirmación
- ✅ Búsqueda por nombre o apellido
- ✅ Filtrado por estado (activo/inactivo)
- ✅ Validación de formularios
- ✅ Gestión de estado global con Redux
- ✅ Loaders para indicar operaciones en curso
- ✅ Diseño fiel al de Figma

---

## 🛠️ Tecnologías utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz
- **Redux Toolkit**: Para la gestión del estado global
- **Ant Design**: Biblioteca de componentes UI
- **CSS**: Para personalizar los componentes y ajustarlos al diseño de Figma
- **json-server**: Para simular un backend y realizar operaciones CRUD

---

## 🚀 Estructura del proyecto

El proyecto fue inicializado con **Create React App** y organizado con la siguiente estructura de carpetas:

client/
├── public/
│ └── logo-flexxus.png
├── src/
│ ├── components/
│ │ ├── DeleteUserModal.jsx
│ │ ├── UserList.jsx
│ │ ├── UserListColumns.js
│ │ ├── UserListControls.jsx
│ │ └── UserModal.jsx
│ ├── hooks/
│ │ └── useUserActions.js
│ ├── redux/
│ │ ├── slices/
│ │ │ └── userSlice.js
│ │ └── store.js
│ ├── services/
│ │ └── userService.js
│ ├── styles/
│ │ ├── UserList.css
│ │ ├── UserListControls.css
│ │ └── UserModal.css
│ ├── App.css
│ ├── App.js
│ ├── index.css
│ └── index.js
└── package.json

---

## 💡 Implementación y decisiones técnicas

### Gestión del estado con Redux

Implementé **Redux Toolkit** para manejar el estado global de la aplicación, lo que permite:

- Centralizar la lógica de negocio
- Separar las responsabilidades entre componentes
- Facilitar el manejo de operaciones asíncronas
- Mejorar la escalabilidad del proyecto

### Componentes modulares

Diseñé la aplicación con componentes modulares y reutilizables:

- **UserList**: Componente principal que orquesta la visualización y gestión de usuarios
- **UserListControls**: Maneja los controles de búsqueda y filtrado
- **UserModal**: Componente reutilizable para la creación y edición de usuarios
- **DeleteUserModal**: Modal de confirmación para la eliminación de usuarios

### Custom Hooks

Extraje la lógica de negocio a un custom hook para mantener los componentes limpios y enfocados en la presentación:

- **useUserActions**: Centraliza todas las acciones relacionadas con los usuarios

### Validación de formularios

Implementé validación completa en los formularios utilizando las capacidades de **Ant Design Form**:

- Validación de campos requeridos
- Validación de formato de email
- Restricciones en campos numéricos (edad)

### Experiencia de usuario

Mejoré la experiencia de usuario con:

- Loaders durante operaciones asíncronas
- Mensajes de éxito/error tras las operaciones
- Confirmación antes de acciones destructivas
- Paginación para manejar grandes volúmenes de datos

### Diseño fiel a Figma

Utilicé **CSS** para personalizar los componentes de **Ant Design** y ajustarlos exactamente al diseño proporcionado en **Figma**:

- Espaciado y márgenes precisos
- Colores consistentes
- Estilos de botones y controles según el diseño

---

## 🏃‍♂️ Cómo ejecutar el proyecto

1. Clonar el repositorio
2. Instalar dependencias del cliente:

```bash
cd client
npm install
```

3. Instalar dependencias del servidor:

```bash
cd api
npm install
```

4. Iniciar el servidor:

```bash
cd api
npm run server
```

5. Iniciar el cliente:

```bash
cd client
npm start
```

## 📝 Conclusiones

Este proyecto demuestra mi capacidad para desarrollar aplicaciones web completas siguiendo requisitos específicos y diseños proporcionados. La implementación incluye buenas prácticas de desarrollo como:

- Arquitectura modular y escalable
- Separación de responsabilidades
- Gestión eficiente del estado
- Experiencia de usuario optimizada
- Código limpio y mantenible
- La aplicación cumple con todos los requisitos especificados en el desafío técnico, proporcionando una solución - robusta y elegante para la gestión de usuarios.

## 📚 Recursos utilizados

Documentación de React
Documentación de Redux Toolkit
Documentación de Ant Design
Documentación de json-server
Diseño de Figma proporcionado por Flexxus
