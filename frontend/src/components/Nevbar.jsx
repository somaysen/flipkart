import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/userSlice";
import { logoutUser } from "../store/actons/userActions";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((s) => s.user || {});

  const links = [
    
  ];

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm transition-colors duration-200 ease-in-out ${
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-gray-600 hover:text-indigo-600"
    }`;

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + desktop nav */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                MB
              </div>
            </NavLink>

            <nav className="hidden md:flex ml-10 space-x-1">
              {links.map((l) => (
                <NavLink key={l.name} to={l.to} className={linkClass} end>
                  {l.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right: actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-sm text-gray-700 px-3 py-2 rounded-md"
                >
                  {user?.name || 'Account'}
                </button>

                <button
                  onClick={async () => {
                    try {
                      await dispatch(logoutUser()).unwrap();
                    } catch (e) {
                      // ignore server error and proceed to clear local state
                    }
                    // clear client-side auth and update redux
                    localStorage.removeItem('token');
                    dispatch(logout());
                    navigate('/login');
                  }}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-md border border-indigo-500 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-transform transform hover:-translate-y-0.5"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:brightness-105 transition-transform transform hover:-translate-y-0.5"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile: hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <svg
                className={`h-6 w-6 transform transition`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`md:hidden ${
          open ? "max-h-[800px]" : "max-h-0"
        } overflow-hidden transition-[max-height] duration-300 ease-in-out`}
      >
        <div className="px-4 pt-4 pb-6 space-y-3 border-t border-gray-100">
          {links.map((l) => (
            <NavLink
              key={l.name}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              {l.name}
            </NavLink>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setOpen(false);
                    localStorage.removeItem('token');
                    dispatch(logout());
                    navigate('/login');
                  }}
                  className="w-full text-center px-4 py-2 rounded-md border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:brightness-105 transition"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
