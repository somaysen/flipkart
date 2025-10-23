import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// 🧠 Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", userData);
      return response.data;   // backend ka data return
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🧠 Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // call backend to blacklist cookie token and clear cookie
      const response = await api.post("/user/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Logout failed" });
    }
  }
);