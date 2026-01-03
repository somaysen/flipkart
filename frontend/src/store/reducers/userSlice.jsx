import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, requestEmailChangeOtp, verifyEmailChangeOtp, changeEmail } from "../actons/userActions";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // 🟡 Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      // 🟢 Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Register failed";
      })
      // 🔴 Logout (async)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // 📧 Request email change OTP
      .addCase(requestEmailChangeOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestEmailChangeOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(requestEmailChangeOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to send OTP";
      })
      // 🔐 Verify OTP
      .addCase(verifyEmailChangeOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmailChangeOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyEmailChangeOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Invalid OTP";
      })
      // ✉️ Change email
      .addCase(changeEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.user) {
          state.user = action.payload.user;
          state.user = action.payload.user;
        }
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Email change failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
