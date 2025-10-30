// src/store/slices/sellerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginSeller, registerSeller } from "../actons/sellerAction";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    seller: null,
    token: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logoutSeller: (state) => {
      state.seller = null;
      state.token = null;
      localStorage.removeItem("sellerToken");
    },
    clearSellerState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // 🧾 Register Seller
    builder
      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.seller = action.payload.seller;
        state.token = action.payload.token;
        localStorage.setItem("sellerToken", action.payload.token);
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // 🔐 Login Seller
    builder
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload.seller;
        state.token = action.payload.token;
        localStorage.setItem("sellerToken", action.payload.token);
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutSeller, clearSellerState } = sellerSlice.actions;
export default sellerSlice.reducer;
