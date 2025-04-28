import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getUsers as fetchUsers,
  createUser as addUser,
  updateUser as modifyUser,
  deleteUser as removeUser,
} from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const data = await fetchUsers();
    setUsers(data);
    setLoading(false);
  };

  const createUser = async (user) => {
    setLoading(true);
    await addUser(user);
    await getUsers();
  };

  const updateUser = async (user) => {
    setLoading(true);
    await modifyUser(user);
    await getUsers();
  };

  const deleteUser = async (id) => {
    setLoading(true);
    await removeUser(id);
    await getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, loading, createUser, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
