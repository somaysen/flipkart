import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/actions/userActions";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(data) {
    try {
      setLoginError("");
      const result = await dispatch(loginUser(data)).unwrap();
      // console.log("user login", result);
      navigate("/");
    } catch (err) {
      setLoginError(err?.message || "Login failed. Please check your credentials.");
      console.error("Login failed", err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign in to continue to your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {loginError && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
              {loginError}
            </div>
          )}
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                className={`pl-10 pr-3 py-2 w-full rounded-lg border ${
                  errors.email ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`pl-10 pr-10 py-2 w-full rounded-lg border ${
                  errors.password ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot & Register Links */}
          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgot"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Forgot password?
            </Link>
            <p className="text-gray-600">
              New here?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
