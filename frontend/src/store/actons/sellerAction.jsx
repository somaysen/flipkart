
// src/store/actons/sellerAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// ✅ Seller Login
export const loginSeller = createAsyncThunk(
  "seller/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/seller/login", formData);
  // Do not store token in localStorage/sessionStorage
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
      const { data } = await api.post("/seller/register", formData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  }
);

// Fetch products for a seller by ID
export const fetchSellerProductsById = createAsyncThunk(
  "sellerProducts/fetchById",
  async (sellerId, { rejectWithValue }) => {
    if (!sellerId) {
      return rejectWithValue({ message: "Seller ID is required" });
    }

    try {
      const response = await api.get(`/seller/seller-prodect/${sellerId}`);

      if (!response.data) {
        throw new Error("Invalid response from server");
      }

      const products = response.data.products || [];
      if (!Array.isArray(products)) {
        throw new Error("Invalid products data received");
      }

      return products;
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue({ message: "unauthorized", status: 401 });
      }
      if (error.response?.status === 403) {
        return rejectWithValue({ message: "forbidden", status: 403 });
      }
      if (error.response?.data?.message) {
        return rejectWithValue({
          message: error.response.data.message,
          status: error.response.status,
        });
      }
      return rejectWithValue({
        message: error.message || "Failed to fetch seller products",
        status: error.response?.status,
      });
    }
  }
);

// Verify seller session using server-set httpOnly cookie
export const verifySellerSession = createAsyncThunk(
  "seller/verifySession",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/seller/verify-session");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Session invalid" });
    }
  }
);

