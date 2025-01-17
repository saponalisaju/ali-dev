/**eslint-disable */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001/api/userManagement",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fetchUserManagement = createAsyncThunk(
  "users/fetchUserManagement",
  async () => {
    const response = await api.get(`/fetchUserManagement`);
    return response.data;
  }
);

export const addUserManagement = createAsyncThunk(
  "users/addUserManagement",
  async (newUser) => {
    const response = await api.post(`/addUserManagement`, newUser);
    return response.data;
  }
);

export const updateUserManagement = createAsyncThunk(
  "users/updateUserManagement",
  async (updatedUser) => {
    const { _id, ...userData } = updatedUser;
    const response = await api.put(`/updateUserManagement/${_id}`, userData);
    return response.data;
  }
);

export const deleteUserManagement = createAsyncThunk(
  "users/deleteUserManagement",
  async (id) => {
    await api.delete(`/deleteUserManagement/${id}`);
    return id;
  }
);

const userManagementSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserManagement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserManagement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUserManagement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUserManagement.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUserManagement.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUserManagement.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default userManagementSlice.reducer;
