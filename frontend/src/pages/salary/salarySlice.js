import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001/api/salary",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fetchSalary = createAsyncThunk("users/fetchSalary", async () => {
  const response = await api.get(`/fetchSalary`);
  return response.data;
});

export const addSalary = createAsyncThunk(
  "users/addSalary",
  async (newUser) => {
    const response = await api.post(`/addSalary`, newUser); // Include newUser in the request
    return response.data;
  }
);

export const updateSalary = createAsyncThunk(
  "users/updateSalary",
  async (updatedUser) => {
    const { _id, ...userData } = updatedUser;
    const response = await api.put(`/updateSalary/${_id}`, userData);
    return response.data;
  }
);

export const deleteSalary = createAsyncThunk(
  "users/deleteSalary",
  async (id) => {
    await api.delete(`/deleteSalary/${id}`);
    return id;
  }
);

const salarySlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSalary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchSalary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSalary.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateSalary.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteSalary.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default salarySlice.reducer;
