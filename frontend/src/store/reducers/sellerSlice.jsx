// src/store/slices/sellerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginSeller, registerSeller } from "../actons/sellerAction";

const initialState = {
  seller: null,
  token: localStorage.getItem("sellerToken") || null,
  loading: false,
  error: null,
  success: false,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    logoutSeller: (state) => {
      state.seller = null;
      state.token = null;
      state.success = false;
      localStorage.removeItem("sellerToken");
    },
  },
  extraReducers: (builder) => {
    // ✅ Login
    builder
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload.seller;
        state.token = action.payload.token;
        state.success = true;
        if (action.payload?.token) {
          try { localStorage.setItem("sellerToken", action.payload.token); } catch {}
        }
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ Register
    builder
      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutSeller } = sellerSlice.actions;
export default sellerSlice.reducer;
