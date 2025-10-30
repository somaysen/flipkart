// src/store/actions/sellerActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🧾 REGISTER SELLER
export const registerSeller = createAsyncThunk(
  "seller/registerSeller",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/seller/register",
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  }
);

// 🔐 LOGIN SELLER
export const loginSeller = createAsyncThunk(
  "seller/loginSeller",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/seller/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// 🔹 Fetch products by logged-in seller
export const fetchSellerProducts = createAsyncThunk(
  "sellerProducts/fetchSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("sellerToken"); // stored on seller login
      const res = await axios.get("/api/seller/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller products"
      );
    }
  }
);