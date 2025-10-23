import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actons/userActions";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [created, setCreated] = useState(false);

  const dispatch = useDispatch();

  // ✅ API submit handler
  const onSubmit = async (data) => {
    try {

      await dispatch(registerUser(data));
      console.log("user register",data)
      navigate("/");
     
    } catch (error) {
      console.log("error in register",error)
    }
  };

  if (created) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/90 p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-2">Account created</h2>
          <p className="text-sm text-gray-600 mb-4">
            Check your email for verification instructions (if applicable).
            Redirecting to login…
          </p>
          <div className="flex justify-end">
            <Link to="/login" className="text-indigo-600 hover:underline">
              Go to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Join us — just a few details to get started.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              className={`mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.name ? "ring-1 ring-red-300" : ""
              }`}
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className={`mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.email ? "ring-1 ring-red-300" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className={`mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.password ? "ring-1 ring-red-300" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile number
            </label>
            <input
              type="tel"
              inputMode="tel"
              placeholder="e.g. +919876543210"
              className={`mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.mobile ? "ring-1 ring-red-300" : ""
              }`}
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "Enter a valid mobile number",
                },
              })}
            />
            {errors.mobile && (
              <p className="text-xs text-red-600 mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* Already have account */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span>Already have an account? </span>
              <Link to="/login" className="text-indigo-600 hover:underline">
                Sign in
              </Link>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:brightness-105 disabled:opacity-70"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
