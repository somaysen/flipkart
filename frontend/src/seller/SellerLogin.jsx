import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSeller } from "../store/actons/sellerAction"; // ✅ correct import

function SellerLogin({ onSwitch }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.seller);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginSeller(form));
  };

  return (
    <div className="w-full max-w-md bg-white shadow p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Seller Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-600">
        Don’t have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-blue-600 hover:underline font-medium"
        >
          Register here
        </button>
      </p>
    </div>
  );
}

export default SellerLogin;
