/**eslint-disable */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../secret";

const api = axios.create({
  baseURL: `${apiUrl}/api/userManagement`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  withCredentials: true,
});

export const fetchUserManagement = createAsyncThunk(
  "users/fetchUserManagement",
  async () => {
    const response = await api.get("/fetchUserManagement");
    return response.data;
  }
);

export const addUserManagement = createAsyncThunk(
  "users/addUserManagement",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await api.post("/addUserManagement", newUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserManagement = createAsyncThunk(
  "users/updateUserManagement",
  async (editDesignation, { rejectWithValue }) => {
    const { _id, ...userData } = editDesignation;
    try {
      const response = await api.put(`/updateUserManagement/${_id}`, userData);
      if (response.status === 404) {
        return rejectWithValue("Resource not found");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An unexpected error occurred"
      );
    }
  }
);

export const deleteUserManagement = createAsyncThunk(
  "users/deleteUserManagement",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deleteUserManagement/${id}`);
      if (response.status === 404) {
        return rejectWithValue("Resource not found");
      }
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An unexpected error occurred"
      );
    }
  }
);

const userManagementSlice = createSlice({
  name: "userManagement",
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
