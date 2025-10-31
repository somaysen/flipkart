import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-semibold text-gray-800">Somay Sen</h2>
        <p className="text-gray-500">somay@example.com</p>
        <p className="text-gray-500 mt-1">+91 98765 43210</p>

        {/* Buttons */}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate("/addtocard")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
          >
            🛒 Add To Cart
          </button>

          <button
            onClick={() => navigate("/userupdate")}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
          >
            👤 Update User Info
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg font-medium transition"
          >
            ⚙️ Change Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
