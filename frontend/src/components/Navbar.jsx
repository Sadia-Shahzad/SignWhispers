
import React, { useState, useContext } from "react"; 
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdLogout, MdDashboard } from "react-icons/md";
import { AuthContext } from "../context/AuthContext"; 
import SignWhispersLogo from "../assets/sign-whispers-logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); 
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isRegistered = !!user;
  const userName = user?.name || "User";
  const isAdmin = user?.is_admin || false;
  const isPremium = user?.is_premium || false;

  const isDashboard = location.pathname === "/dashboard";

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names.length === 1
      ? names[0][0].toUpperCase()
      : names[0][0].toUpperCase() + names[1][0].toUpperCase();
  };

  const handleLogout = () => {
    logout(); 
    setIsDropdownOpen(false);
    navigate("/signin");
  };

  const linkClasses = (path) =>
    location.pathname === path
      ? "text-blue-700 font-semibold"
      : "text-black hover:text-blue-600 transition-colors";

  const pages = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/settings", label: "Settings" },
    { path: "/history", label: "History" },
    { path: "/payment", label: "Pricing" },
  ];

  return (
    <nav className={`bg-white h-16 shadow-xl border-none transition-all ${isDashboard ? "relative" : "sticky top-0 z-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="shrink-0 flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={SignWhispersLogo} alt="Logo" className="h-10 w-10 mr-2" />
          <h1 className="text-lg font-bold text-black">
            Sign<span className="text-blue-700">Whispers</span>
          </h1>
        </div>

        <div className="hidden md:flex space-x-4">
          {pages.map((page) => (
            <NavLink key={page.path} to={page.path} className={linkClasses(page.path)}>
              {page.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4 relative">
          {!isRegistered ? (
            <>
              <NavLink to="/register" className="h-10 flex items-center justify-center rounded-lg bg-blue-600 px-6 text-sm text-white shadow-lg hover:bg-blue-500 transition">SignUp</NavLink>
              <NavLink to="/signin" className="h-10 flex items-center justify-center rounded-lg bg-gray-300 px-6 text-sm text-gray-700 shadow hover:bg-gray-400 transition">SignIn</NavLink>
            </>
          ) : (
            <div className="relative">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="flex flex-col text-right">
                  <span className="font-medium text-black text-sm">{userName}</span>
                  <span className="text-gray-400 text-[10px]">{isPremium ? "★ Premium" : "Free Plan"}</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-semibold">
                  {getInitials(userName)}
                </div>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-2xl rounded-lg py-2 z-50 border border-gray-100">
                  {isAdmin && (
                    <button onClick={() => {navigate("/admin"); setIsDropdownOpen(false);}} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition">
                      <MdDashboard /> Admin Panel
                    </button>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                    <MdLogout /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;