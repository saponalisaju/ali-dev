/**eslint-disable */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: `https://travel-app-mern.onrender.com/api/application`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fetchApplication = createAsyncThunk(
  "users/fetchApplication",
  async () => {
    const response = await api.get("/fetchApplication");
    return response.data;
  }
);

export const addApplication = createAsyncThunk(
  "users/addApplication",
  async (newUser) => {
    const response = await api.post(`/addApplication`, newUser, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const updateApplication = createAsyncThunk(
  "users/updateApplication",
  async (updatedUser) => {
    const { _id, ...userData } = updatedUser;
    const response = await api.put(`/updateApplication/${_id}`, userData);
    return response.data;
  }
);

export const deleteApplication = createAsyncThunk(
  "users/deleteApplication",
  async (id) => {
    await api.delete(`/deleteApplication/${id}`);
    return id;
  }
);

const applicationSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplication.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addApplication.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default applicationSlice.reducer;
