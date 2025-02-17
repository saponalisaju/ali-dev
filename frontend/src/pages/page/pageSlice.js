/**eslint-disable */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../secret";

const api = axios.create({
  baseURL: `${apiUrl}/api/page`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fetchPage = createAsyncThunk("users/fetchPage", async () => {
  const response = await api.get(`/fetchPage`);
  return response.data;
});

export const addPage = createAsyncThunk("users/addPage", async (newUser) => {
  const response = await api.post(`/addPage`, newUser);
  return response.data;
});

export const updatePage = createAsyncThunk(
  "users/updatePage",
  async (updatedUser) => {
    const { _id, ...userData } = updatedUser;
    const response = await api.put(`/updatePage/${_id}`, userData);
    return response.data;
  }
);

export const deletePage = createAsyncThunk("users/deletePage", async (id) => {
  await api.delete(`/deletePage/${id}`);
  return id;
});

const pageSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPage.fulfilled, (state, action) => {
        if (Array.isArray(state.users)) {
          state.users.push(action.payload); // Ensure state.users is an array
        }
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default pageSlice.reducer;
