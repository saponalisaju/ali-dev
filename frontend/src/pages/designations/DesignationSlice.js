import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../secret";

const api = axios.create({
  baseURL: `${apiUrl}/api/designation`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fetchDesignation = createAsyncThunk(
  "designations/fetchDesignation",
  async ({ page, limit, search }) => {
    const response = await api.get(`/fetchDesignation`, {
      params: { page, limit, search },
    });
    return response.data;
  }
);

export const addDesignation = createAsyncThunk(
  "designations/addDesignation",
  async (newUser) => {
    const response = await api.post("/addDesignation", newUser);
    return response.data;
  }
);

export const editDesignation = createAsyncThunk(
  "designations/editDesignation",
  async (editDesignation, { rejectWithValue }) => {
    const { _id, ...userData } = editDesignation;
    try {
      const response = await api.put(`/editDesignation/${_id}`, userData);
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

export const deleteDesignation = createAsyncThunk(
  "designations/deleteDesignation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/deleteDesignation/${id}`);
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

export const designationSlice = createSlice({
  name: "designations",
  initialState: {
    users: [],
    status: "idle",
    error: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designations = action.payload.designations;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addDesignation.fulfilled, (state, action) => {
        if (Array.isArray(state.designations)) {
          state.designations.push(action.payload);
        }
      })
      .addCase(editDesignation.fulfilled, (state, action) => {
        const index = state.designations.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.designations[index] = action.payload;
        }
      })
      .addCase(deleteDesignation.fulfilled, (state, action) => {
        state.designations = state.designations.filter(
          (user) => user._id !== action.payload
        );
      });
  },
});

export default designationSlice.reducer;
