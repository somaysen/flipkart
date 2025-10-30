// src/store/reducers/sellerProductsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchSellerProducts, createSellerProduct, updateSellerProduct } from "../actons/productActions";

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
      })
      .addCase(createSellerProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      .addCase(updateSellerProduct.fulfilled, (state, action) => {
        const idx = state.products.findIndex(p => p._id === action.payload._id);
        if (idx !== -1) state.products[idx] = action.payload;
      });
  },
});

export default sellerProductsSlice.reducer;
