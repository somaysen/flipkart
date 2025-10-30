import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSeller } from "../store/actons/sellerAction";
import { Link, useNavigate } from "react-router-dom";

function SellerLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, seller } = useSelector((state) => state.seller);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginSeller(form));
  };

  useEffect(() => {
    if (seller) navigate("/seller/dashboard");
  }, [seller]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Seller Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/seller/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SellerLogin;
