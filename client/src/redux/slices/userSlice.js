import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/userService';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUsers();
      if (Array.isArray(data)) {
        return data;
      } else {
        return rejectWithValue("Los datos recibidos no tienen el formato esperado");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Error al cargar los usuarios");
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData, { rejectWithValue }) => {
    try {
      const newUser = await createUser(userData);
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message || "Error al crear usuario");
    }
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUser(id, userData);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message || "Error al actualizar usuario");
    }
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Error al eliminar usuario");
    }
  }
);

const applyFilters = (users, searchText, statusFilter) => {
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

  return result;
};

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    filteredList: [],
    loading: false,
    error: null,
    searchText: '',
    searchValue: '',
    statusFilter: undefined,
    currentUser: null,
    isEditing: false,
    isModalVisible: false,
    formLoading: false,
    isDeleteModalVisible: false,
    userToDelete: null,
    deleteLoading: false,
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
      state.filteredList = applyFilters(state.list, action.payload, state.statusFilter);
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      state.filteredList = applyFilters(state.list, state.searchText, action.payload);
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setIsModalVisible: (state, action) => {
      state.isModalVisible = action.payload;
    },
    setUserToDelete: (state, action) => {
      state.userToDelete = action.payload;
    },
    setIsDeleteModalVisible: (state, action) => {
      state.isDeleteModalVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.filteredList = applyFilters(action.payload, state.searchText, state.statusFilter);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addUser.pending, (state) => {
        state.formLoading = true;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.formLoading = false;
        state.isModalVisible = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload;
      })

      .addCase(editUser.pending, (state) => {
        state.formLoading = true;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.formLoading = false;
        state.isModalVisible = false;
        state.currentUser = null;
        state.isEditing = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload;
      })

      .addCase(removeUser.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.deleteLoading = false;
        state.isDeleteModalVisible = false;
        state.userToDelete = null;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchText,
  setSearchValue,
  setStatusFilter,
  setCurrentUser,
  setIsEditing,
  setIsModalVisible,
  setUserToDelete,
  setIsDeleteModalVisible,
} = userSlice.actions;

export default userSlice.reducer;
