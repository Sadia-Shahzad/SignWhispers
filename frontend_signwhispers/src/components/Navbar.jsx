import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SignWhispersLogo from "./../assets/sign-whispers-logo.png";

const Navbar = ({ isRegistered, userName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.length === 1
      ? names[0][0].toUpperCase()
      : names[0][0].toUpperCase() + names[1][0].toUpperCase();
  };

  const linkClasses = (path) =>
    location.pathname === path
      ? "text-blue-700 font-semibold"
      : "text-black hover:text-blue-600 transition-colors";

  const lightGrayPages = ["/feedback", "/signin", "/login", "/register"];
  const normalPages = ["/", "/dashboard", "/reviews", "/settings"];
  const isLightGray = lightGrayPages.includes(location.pathname);
  const isNormalPage = normalPages.includes(location.pathname);

  const desktopLinks = {
    home: [
      { path: "/", label: "Home" },
      { path: "/dashboard", label: "Dashboard" },
      { path: "/reviews", label: "Reviews" },
      { path: "/settings", label: "Settings" },
    ],
    dashboard: [
      { path: "/dashboard", label: "Dashboard" },
      { path: "/settings", label: "Settings" },
      { path: "/", label: "Home" },
    ],
    reviews: [
      { path: "/", label: "Home" },
      { path: "/dashboard", label: "Dashboard" },
      { path: "/settings", label: "Settings" },
      { path: "/reviews", label: "Reviews" },
    ],
  };

  const getCurrentLinks = () => {
    if (location.pathname === "/" || location.pathname === "/reviews")
      return desktopLinks.home;
    if (location.pathname === "/dashboard") return desktopLinks.dashboard;
    if (location.pathname === "/reviews") return desktopLinks.reviews;
    return [];
  };

  return (
    <nav
      className={`${
        isLightGray
          ? "bg-white h-16 shadow-md" // feedback, register, signin pages
          : "bg-white h-16 shadow-xl" //rem pages
      } sticky top-0 z-50 border-none transition-all`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* LEFT: Logo */}
        <div
          className="shrink-0 flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={SignWhispersLogo} alt="Logo" className="size-16 inset-0" />

          <h1 className="text-base sm:text-lg font-bold text-black inset-1">
            Sign<span className="text-blue-700">Whispers</span>
          </h1>
        </div>

        {/* CENTER LINKS - Desktop (only non-dashboard pages) */}
        {location.pathname !== "/dashboard" && (
          <div className="hidden md:flex space-x-6">
            {getCurrentLinks().map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClasses(link.path)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* RIGHT SIDE - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Light gray pages Back button */}
          {isLightGray && (
            <button
              onClick={() => navigate("/")}
              className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all"
            >
              <span className="mr-1 text-lg">←</span> Back to Home
            </button>
          )}

          {/* Normal pages */}
          {isNormalPage && (
            <>
              {location.pathname === "/dashboard" && (
                <div className="flex space-x-6 mr-4">
                  {getCurrentLinks().map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={linkClasses(link.path)}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}

              {/* Register / Avatar */}
              {!isRegistered ? (
                <div className="flex items-center gap-3">
                  <NavLink
                    to="/register"
                    className="h-10 flex items-center justify-center rounded-lg bg-blue-600 px-6 text-sm text-white shadow-lg shadow-blue-700/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/30"
                  >
                    SignUp
                  </NavLink>
                  <NavLink
                    to="/signin"
                    className="h-10 flex items-center justify-center rounded-lg bg-gray-300 px-6 text-sm text-gray-700 shadow transition-all hover:bg-gray-400"
                  >
                    SignIn
                  </NavLink>
                </div>
              ) : (
                <div className="flex items-center space-x-2 cursor-pointer">
                  {location.pathname === "/settings" && (
                    <span className="font-medium text-black">{userName}</span>
                  )}
                  <div className="h-8 w-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-semibold">
                    {getInitials(userName)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none flex flex-col justify-between w-6 h-5"
          >
            <span
              className={`block h-0.5 w-full bg-black transform transition duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transform transition duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-4 pb-4 flex flex-col space-y-2">
            <NavLink
              to="/"
              className={linkClasses("/") + " py-2 px-2 block"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={linkClasses("/dashboard") + " py-2 px-2 block"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/settings"
              className={linkClasses("/settings") + " py-2 px-2 block"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Settings
            </NavLink>
            <NavLink
              to="/reviews"
              className={linkClasses("/reviews") + " py-2 px-2 block"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reviews
            </NavLink>
            <NavLink
              to="/feedback"
              className={linkClasses("/feedback") + " py-2 px-2 block"}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Feedback
            </NavLink>

            {!isRegistered ? (
              <div className="flex flex-col space-y-2 mt-2">
                <NavLink
                  to="/register"
                  className="h-10 flex items-center justify-center rounded-lg bg-blue-600 px-6 text-sm text-white shadow-lg shadow-blue-700/20 transition-all hover:bg-blue-500 hover:shadow-blue-600/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SignUp
                </NavLink>
                <NavLink
                  to="/signin"
                  className="h-10 flex items-center justify-center rounded-lg bg-gray-200 px-6 text-sm text-gray-800 shadow transition-all hover:bg-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SignIn
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-2 mt-2">
                <div className="h-8 w-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-semibold">
                  {getInitials(userName)}
                </div>
                <span className="font-medium text-black">{userName}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
