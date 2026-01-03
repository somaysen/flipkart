// src/store/reducers/sellerProductsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSellerProducts,
  createSellerProduct,
  updateSellerProduct,
} from "../actons/productActions";
import { fetchSellerProductsById } from "../actons/sellerAction";

const sellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSellerProducts: (state) => {
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all seller products
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
      })

      // Fetch seller products by ID
      .addCase(fetchSellerProductsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(fetchSellerProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create product
      .addCase(createSellerProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update product
      .addCase(updateSellerProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (idx !== -1) state.products[idx] = action.payload;
      })
      .addCase(updateSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSellerProducts } = sellerProductsSlice.actions;
export default sellerProductsSlice.reducer;
