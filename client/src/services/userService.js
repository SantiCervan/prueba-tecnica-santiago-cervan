const API_URL = "http://localhost:4000/users";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getUsers = async () => {
  await delay(1000);
  try {
    const response = await fetch(`${API_URL}?_sort=id&_order=desc`);
    if (!response.ok) {
      throw new Error(`Error al obtener usuarios: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getUsers:', error);
    throw error;
  }
};

export const createUser = async (user) => {
  await delay(1000);
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Error al crear usuario");
  return await res.json();
};

export const updateUser = async (id, userData) => {
  await delay(1000);
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar usuario: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en updateUser:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  await delay(1000);
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar usuario: ${response.status} ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error('Error en deleteUser:', error);
    throw error;
  }
};