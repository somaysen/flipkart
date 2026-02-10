import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/actions/userActions";
import { Mail, Lock, User, Phone } from "lucide-react";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [created, setCreated] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const result = await dispatch(registerUser(data));

      if (result?.error) {
        throw new Error(result.error.message || "Registration failed");
      }

      console.log("✅ User registered:", data);
      setCreated(true);
      reset();

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("❌ Error in register:", error);
      setServerError(error.message || "Something went wrong.");
    }
  };

  if (created) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">
            🎉 Account Created Successfully!
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Redirecting you to login...
          </p>
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Join us — it only takes a minute!
        </p>

        {serverError && (
          <p className="text-sm text-red-600 mb-4 bg-red-50 p-2 rounded">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="John Doe"
                className={`pl-10 pr-3 py-2 w-full rounded-lg border ${
                  errors.name ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all`}
                {...register("name", { required: "Full name is required" })}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
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
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
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
                type="password"
                placeholder="••••••••"
                className={`pl-10 pr-3 py-2 w-full rounded-lg border ${
                  errors.password ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                placeholder="+91 9876543210"
                className={`pl-10 pr-3 py-2 w-full rounded-lg border ${
                  errors.mobile ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all`}
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^\+?\d{10,15}$/,
                    message: "Enter a valid mobile number",
                  },
                })}
              />
            </div>
            {errors.mobile && (
              <p className="text-xs text-red-500 mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
