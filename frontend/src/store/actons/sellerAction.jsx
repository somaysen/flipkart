// src/store/actons/sellerAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Seller Login
export const loginSeller = createAsyncThunk(
  "seller/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/seller/login",
        formData
      );
      localStorage.setItem("sellerToken", data.token);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Try again."
      );
    }
  }
);

// ✅ Seller Register
export const registerSeller = createAsyncThunk(
  "seller/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/seller/register",
        formData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  }
);
