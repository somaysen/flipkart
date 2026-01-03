// src/store/slices/sellerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginSeller, registerSeller, verifySellerSession } from "../actons/sellerAction";

const initialState = {
  seller: null,
  token: null,
  loading: false,
  error: null,
  success: false,
  isVerified: false,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    logoutSeller: (state) => {
      state.seller = null;
      state.token = null;
      state.success = false;
      state.isVerified = false;
    },
    clearSellerError: (state) => {
      state.error = null;
    },
    resetSellerState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟢 Login
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload.seller;
        state.token = action.payload.token;
        state.success = true;
        state.isVerified = !!action.payload.seller?.isVerified;
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Verify session (on app start / route access)
      .addCase(verifySellerSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySellerSession.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.seller) {
          state.seller = action.payload.seller;
          state.isVerified = true;
        }
      })
      .addCase(verifySellerSession.rejected, (state, action) => {
        state.loading = false;
        state.seller = null;
        state.token = null;
        state.isVerified = false;
      })

      // 🟣 Register
      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload?.seller) {
          state.seller = action.payload.seller;
          state.isVerified = !!action.payload.seller?.isVerified;
        }
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutSeller, clearSellerError, resetSellerState } = sellerSlice.actions;
export default sellerSlice.reducer;
