import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/userSlice";
import { logoutUser } from "../store/actons/userActions";

function NavbarActions({ isMobile = false, closeMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((s) => s.user || {});

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch {}
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
    if (closeMenu) closeMenu();
  };

  const commonClass = isMobile
    ? "w-full text-center px-4 py-2 rounded-md"
    : "px-4 py-2 rounded-md text-sm font-medium transition";

  return (
    <div className={`${isMobile ? "flex flex-col gap-2" : "hidden md:flex items-center gap-3"}`}>
      {isAuthenticated ? (
        <>
          <button
            onClick={() => {
              navigate("/user/seller");
              closeMenu && closeMenu();
            }}
            className={`${commonClass} bg-green-500 text-white hover:bg-green-600 shadow`}
          >
            Become a Seller
          </button>

          {!isMobile && (
            <button
              onClick={() => navigate("/profile")}
              className="text-sm text-gray-700 px-3 py-2 rounded-md"
            >
              {user?.name || "Account"}
            </button>
          )}

          <button
            onClick={handleLogout}
            className={`${commonClass} bg-red-50 text-red-600 border border-red-200 hover:bg-red-100`}
          >
            Logout
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
