import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "../actons/userActions";

const storedUserJson = localStorage.getItem("user");
const storedUser = storedUserJson ? JSON.parse(storedUserJson) : null;

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
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
      localStorage.removeItem("user");
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
        try {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } catch {}
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
        try {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } catch {}
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Register failed";
      })
      // 🔴 Logout (async)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
