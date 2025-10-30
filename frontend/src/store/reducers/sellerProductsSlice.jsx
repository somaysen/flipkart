// src/store/reducers/sellerProductsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Fetch all products for the logged-in seller
export const fetchSellerProducts = createAsyncThunk(
  "sellerProducts/fetchSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("sellerToken");
      const res = await axios.get("/api/seller/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller products"
      );
    }
  }
);

const sellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerProductsSlice.reducer;
