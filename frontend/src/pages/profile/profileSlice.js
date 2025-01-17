/**eslint-disable */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000"; // Define the base URL

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (updatedUser) => {
    const { _id, ...userData } = updatedUser;
    const response = await axios.put(
      `${API_URL}/updateProfile/${_id}`,
      userData
    );
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
  },
});

export default profileSlice.reducer;
