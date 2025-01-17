/**eslint-disable */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001/api/slider",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fetchSlider = createAsyncThunk("users/fetchSlider", async () => {
  const response = await api.get(`/fetchSlider`);
  return response.data;
});

export const addSlider = createAsyncThunk(
  "users/addSlider",
  async (newUser) => {
    const response = await api.post(`/addSlider`, newUser, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const updateSlider = createAsyncThunk(
  "users/updateSlider",
  async (updatedUser) => {
    const { _id, ...userData } = updatedUser;
    const response = await api.put(`/updateSlider/${_id}`, userData);
    return response.data;
  }
);

export const deleteSlider = createAsyncThunk(
  "users/deleteSlider",
  async (id) => {
    await api.delete(`/deleteSlider/${id}`);
    return id;
  }
);

const sliderSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlider.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSlider.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchSlider.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSlider.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateSlider.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default sliderSlice.reducer;
