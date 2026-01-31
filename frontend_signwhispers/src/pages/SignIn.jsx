import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignWhispersLogo from "./../assets/sign-whispers-logo.png";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-xs sm:max-w-sm rounded-2xl shadow-lg border border-gray-200 p-3 sm:px-4 ">
        {/* Logo */}
        <div className="flex items-center justify-center  ">
          <img src={SignWhispersLogo} alt="Logo" className="size-16 inset-0" />

          <h1 className="text-base sm:text-lg font-semibold text-black">
            Sign<span className="text-blue-700">Whispers</span>
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-lg sm:text-xl font-bold text-center text-gray-900">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-xs sm:text-xs mt-1 mb-3">
          Bridge the gap with real-time translation.
        </p>

        {/* Email */}
        <div className="mb-2.5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
            <FaEnvelope className="text-gray-400 mr-2 text-sm" />
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-1.5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="text-gray-400 mr-2 text-sm" />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Forgot */}
        <div className="text-right mb-3">
          <a
            href="#"
            className="text-blue-600 text-xs sm:text-xs hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Sign In Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium shadow-md text-sm sm:text-sm">
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-3">
          <div className="grow h-px bg-gray-200"></div>
          <span className="px-2 text-xs text-gray-400 tracking-wider">
            OR CONTINUE WITH
          </span>
          <div className="grow h-px bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-1.5 hover:bg-gray-50 transition text-sm">
          <FcGoogle size={18} />
          <span className="font-medium text-gray-700 text-sm">Google</span>
        </button>

        {/* Signup */}
        <p className="text-center text-xs sm:text-xs text-gray-500 mt-3">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            SignUp
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
