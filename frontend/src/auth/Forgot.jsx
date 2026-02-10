import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Verify token when page loads
  useEffect(() => {
    api
      .get(`/user/reset-password/${token}`)
      .then(({ data }) => {
        if (!data?.userId) throw new Error(data?.message || "Invalid token");
      })
      .catch((err) =>
        setError(err?.response?.data?.message || err?.message || "Invalid link")
      );
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await api.post("/user/reset-password", {
        token,
        newPassword: password,
      });
      setMessage(data?.message || "Password reset successfully");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        {message && <p className="text-green-600 text-center mb-3">{message}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
