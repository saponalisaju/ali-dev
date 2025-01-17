// /**eslint-disable */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001/api/designation",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fetchDesignation = createAsyncThunk(
  "users/fetchDesignation",
  async () => {
    const response = await api.get(`/fetchDesignation`);
    return response.data;
  }
);

export const addDesignation = createAsyncThunk(
  "users/addDesignation",
  async (newUser) => {
    const response = await api.post(`/addDesignation`, newUser);
    return response.data;
  }
);

export const editDesignation = createAsyncThunk(
  "users/editDesignation",
  async (editDesignation) => {
    const { _id, ...userData } = editDesignation;
    const response = await api.put(`/editDesignation/${_id}`, userData);
    return response.data;
  }
);

export const deleteDesignation = createAsyncThunk(
  "users/deleteDesignation",
  async (id) => {
    await api.delete(`/deleteDesignation/${id}`);
    return id;
  }
);

export const designationSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addDesignation.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editDesignation.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default designationSlice.reducer;
