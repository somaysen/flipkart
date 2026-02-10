import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance";

// 🧠 Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", userData);
      return response.data;   // backend ka data return
    } catch (error) {
      const payload = error.response?.data || { message: error.message || "Login failed" };
      return rejectWithValue(payload);
    }
  }
);

// 🧠 Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", userData);
      return response.data;
    } catch (error) {
      const payload = error.response?.data || { message: error.message || "Register failed" };
      return rejectWithValue(payload);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // call backend to blacklist cookie token and clear cookie
      const response = await api.post("/user/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Logout failed" });
    }
  }
);

// 📧 Request email change OTP
export const requestEmailChangeOtp = createAsyncThunk(
  "user/requestEmailChangeOtp",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/email-change/request-otp");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to send OTP" });
    }
  }
);

// 🔐 Verify email change OTP (optional server-side verification step)
export const verifyEmailChangeOtp = createAsyncThunk(
  "user/verifyEmailChangeOtp",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/email-change/verify-otp", { otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Invalid OTP" });
    }
  }
);

// ✉️ Change email
export const changeEmail = createAsyncThunk(
  "user/changeEmail",
  async ({ newEmail, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/email-change", { newEmail, otp });
      return response.data; // expect { user }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Email change failed" });
    }
  }
);
