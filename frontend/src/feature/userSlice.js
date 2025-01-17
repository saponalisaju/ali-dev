/**eslint-disable */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://jobsvisa24.com/api"; // Define the base URL

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
});

export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  const response = await axios.post(`${API_URL}/users`, newUser); // Include newUser in the request
  return response.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser) => {
    const { id, ...userData } = updatedUser;
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
  return id;
});
