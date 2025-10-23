import  { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Forgot() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [done, setDone] = useState(false);

  async function onSubmit(data) {
    console.log("Forgot request", data);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 500));
    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/90 p-6 rounded shadow"> 
          <h2 className="text-lg font-semibold mb-2">Check your email</h2>
          <p className="text-sm text-gray-600 mb-4">If an account exists for that email, we'll send reset instructions.</p>
          <div className="flex justify-end">
            <Link to="/login" className="text-indigo-600 hover:underline">Back to login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/90 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Reset your password</h2>
        <p className="text-sm text-gray-600 mb-4">Enter the email associated with your account and we'll send instructions to reset your password.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className={`mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.email ? 'ring-1 ring-red-300' : ''}`}
              {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Send reset link</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
