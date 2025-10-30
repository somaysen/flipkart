import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/product/products");
      return response.data.products || []; // ✅ return only the array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch products" }
      );
    }
  }
);

export const fetchSellerProducts = createAsyncThunk(
  "sellerProducts/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/product/seller/products");
      return response.data.products || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch seller products" }
      );
    }
  }
);

export const createSellerProduct = createAsyncThunk(
  "sellerProducts/create",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images" && value) {
          Array.from(value).forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });
      const res = await api.post("/product/create-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create product" }
      );
    }
  }
);

export const updateSellerProduct = createAsyncThunk(
  "sellerProducts/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images" && value) {
          Array.from(value).forEach((file) => formData.append("images", file));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      const res = await api.patch(`/product/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update product" }
      );
    }
  }
);