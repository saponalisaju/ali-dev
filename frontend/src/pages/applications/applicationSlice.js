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
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/fetchApplication");
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

export const addApplication = createAsyncThunk(
  "users/addApplication",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await api.post("/addApplication", newUser, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "An unexpected error occurred"
      );
    }
  }
);

export const updateApplication = createAsyncThunk(
  "users/updateApplication",
  async (updatedUser, { rejectWithValue }) => {
    const { _id, ...userData } = updatedUser;
    try {
      const response = await api.put(`/updateApplication/${_id}`, userData);
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

export const deleteApplication = createAsyncThunk(
  "users/deleteApplication",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deleteApplication/${id}`);
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
