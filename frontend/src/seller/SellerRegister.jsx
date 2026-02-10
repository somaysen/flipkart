import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerSeller } from "../store/actions/sellerAction";
import { Link } from "react-router-dom";

function SellerRegister() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.seller);
  const [form, setForm] = useState({
    name: "",
    contactName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerSeller(form));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Seller Register</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={form[key]}
              onChange={handleChange}
              type={key === "password" ? "password" : "text"}
              className="w-full p-3 border rounded"
            />
          ))}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm">
              Registration successful! Please login.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded text-white ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/seller/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SellerRegister;
