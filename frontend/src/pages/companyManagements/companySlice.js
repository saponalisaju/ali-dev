/**eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../secret";

const api = axios.create({
  baseURL: `${apiUrl}/api/company`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fetchCompany = createAsyncThunk("users/fetchCompany", async () => {
  const response = await api.get(`/fetchCompany`);
  return response.data;
});

export const addCompany = createAsyncThunk(
  "users/addCompany",
  async (newUser) => {
    const response = await api.post(`/addCompany`, newUser);
    return response.data;
  }
);

export const updateCompany = createAsyncThunk(
  "users/updateCompany",
  async (updatedUser) => {
    const { _id, ...userData } = updatedUser;
    const response = await api.put(`/updateCompany/${_id}`, userData);
    return response.data;
  }
);

export const deleteCompany = createAsyncThunk(
  "users/deleteCompany",
  async (id) => {
    await api.delete(`/deleteCompany/${id}`);
    return id;
  }
);

const companySlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        console.log("fetchCompany fulfilled:", action.payload);
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        if (Array.isArray(state.users)) {
          state.users.push(action.payload); // Ensure state.users is an array
        }
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default companySlice.reducer;
