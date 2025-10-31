import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react"; // nice mail icon

function Forgot() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [done, setDone] = useState(false);

  async function onSubmit(data) {
    console.log("Forgot request", data);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setDone(true);
  }

  // ✅ After submitting
  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">
        <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center animate-fadeIn">
          <div className="flex justify-center mb-4">
            <Mail className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
          <p className="text-sm text-gray-600 mb-6">
            If an account exists for that email, we've sent reset instructions.
          </p>
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline transition"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Default Forgot Password UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 animate-fadeIn">
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Forgot your password?</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email and we’ll send a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
                errors.email ? "ring-1 ring-red-300 bg-red-50" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition disabled:opacity-50 ${
              isSubmitting ? "cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm text-indigo-600 hover:underline transition"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
