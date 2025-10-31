import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiShoppingCart,
  FiSettings,
  FiUserPlus,
  FiUser,
  FiMail,
  FiLock,
} from "react-icons/fi";
import BecomeSellerButton from "./BecomeSellerButton";

function NavbarActions({ isMobile = false, closeMenu }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.user || {});
  const { isAuthenticated: isSellerAuthenticated } = useSelector((s) => s.seller || {});
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const profileRef = useRef(null);

  const toggleProfile = () => setProfileOpen((p) => !p);
  const toggleSettings = () => setSettingsOpen((s) => !s);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const commonClass = isMobile
    ? "w-full text-center px-4 py-2 rounded-md"
    : "px-4 py-2 rounded-md text-sm font-medium transition";

  return (
    <div
      className={`${
        isMobile ? "flex flex-col gap-2" : "hidden md:flex items-center gap-3"
      }`}
      ref={profileRef}
    >
      {isAuthenticated ? (
        <>
          <BecomeSellerButton />

          {/* 🧑 Profile Button + Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="text-sm text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
            >
              <FiUser size={16} />
              {user?.name || "Account"}
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg z-30 p-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-2 relative">
                  <h2 className="text-base font-semibold text-gray-800">
                    My Profile
                  </h2>

                  {/* ⚙️ Settings */}
                  <div className="relative">
                    <button
                      onClick={toggleSettings}
                      className="p-1 rounded-md hover:bg-gray-100"
                      title="Settings"
                    >
                      <FiSettings size={18} />
                    </button>

                    {settingsOpen && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-40">
                        <button
                          onClick={() => {
                            navigate("/logout");
                            setSettingsOpen(false);
                            setProfileOpen(false);
                          }}
                          className="w-full text-left flex text-red-500 items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                        >
                          <FiLock />Logout
                        </button>

                        <button
                          onClick={() => {
                            navigate("/user/changed/email");
                            setSettingsOpen(false);
                            setProfileOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                        >
                          <FiMail /> Change Email
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="mt-3 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-semibold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-800">
                    {user?.name || "User Name"}
                  </h3>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                {/* Actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate("/user/add-to-card")}
                    className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg border text-sm hover:bg-gray-50 transition"
                  >
                    <FiShoppingCart /> Cart
                  </button>

                  <button
                    onClick={() => navigate(isSellerAuthenticated ? "/seller/dashboard" : "/seller/login")}
                    className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
                  >
                    <FiUserPlus /> Seller
                  </button>

                  <button
                    onClick={() => navigate("/user/profile")}
                    className="col-span-2 flex items-center justify-center gap-1 px-2 py-2 rounded-lg border text-sm hover:bg-gray-50 transition"
                  >
                    <FiUser /> Open Profile
                  </button>
                </div>

                {/* Footer */}
                <p className="mt-3 text-[10px] text-gray-400 text-center">
                  ⚙️ Manage your account settings here.
                </p>
              </div>
            )}
          </div>

          {/* 🛒 Add to Cart Button */}
          <button
            onClick={() => navigate("/user/add-to-card")}
            className={`${commonClass} flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-50`}
          >
            <FiShoppingCart className="text-lg" />
            Add to Cart
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            onClick={closeMenu}
            className={`${commonClass} border border-indigo-500 text-indigo-600 hover:bg-indigo-50`}
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            onClick={closeMenu}
            className={`${commonClass} bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:brightness-105`}
          >
            Register
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavbarActions;
