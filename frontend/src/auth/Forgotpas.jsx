import React, { useState } from "react";

function Forgotpas() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const baseUrl =
        (typeof import.meta?.env?.VITE_API_URL === "string" &&
          import.meta.env.VITE_API_URL.replace(/\/$/, "")) ||
        `${window.location.origin}/api`;
      const res = await fetch(`${baseUrl}/user/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(email).trim().toLowerCase() }),
      });

      const data = await res.json();
      if (res.ok) setMessage(data.message);
      else setError(data.message);
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        {message && <p className="text-green-600 text-center mb-3">{message}</p>}
        {Boolean(error) && (
          <p className="text-red-500 text-center mb-3">
            {typeof error === "string" ? error : String(error?.message || error || "An error occurred")}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter your email
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgotpas;
