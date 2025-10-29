import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import NavbarActions from "./NavbarActions";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              MB
            </div>
          </NavLink>

          {/* Desktop Search */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Desktop Buttons */}
          <NavbarActions />

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden ${open ? "max-h-[600px]" : "max-h-0"} overflow-hidden transition-all duration-300`}>
        <div className="px-4 py-4 space-y-3 border-t border-gray-100">
          <SearchBar />
          <NavbarActions isMobile={true} closeMenu={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
