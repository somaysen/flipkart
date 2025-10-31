import { createSlice } from "@reduxjs/toolkit";
import { fetchProductDetails } from "../actons/productActions";

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductDetails: (state) => {
      state.product = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error loading product";
      });
  },
});

export const { clearProductDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;


