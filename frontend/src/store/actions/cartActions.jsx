import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// Fetch current user's cart
export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/cart");
      return Array.isArray(data) ? data : data?.items || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to load cart" });
    }
  }
);

// Add a product to cart (or increase quantity)
export const addCartItem = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/cart", { productId, quantity });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to add item" });
    }
  }
);

// Update quantity for a cart item
export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/cart/${id}`, { quantity });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to update item" });
    }
  }
);

// Remove an item from cart
export const deleteCartItem = createAsyncThunk(
  "cart/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to remove item" });
    }
  }
);
