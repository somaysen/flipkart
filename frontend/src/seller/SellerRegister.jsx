import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerSeller } from "../store/actons/sellerAction";

function SellerRegister({ onSwitch }) {
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
    <div className="w-full max-w-md bg-white shadow p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Seller Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm">
            Registration successful! You can now login.
          </p>
        )}

        <input
          name="name"
          placeholder="Business Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="contactName"
          placeholder="Contact Person"
          value={form.contactName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
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
        <textarea
          name="address"
          placeholder="Business Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="2"
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-blue-600 hover:underline font-medium"
        >
          Login here
        </button>
      </p>
    </div>
  );
}

export default SellerRegister;
