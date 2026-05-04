import React from "react";
import { useNavigate } from "react-router-dom";
import SignWhispersLogo from "./../assets/sign-whispers-logo.png";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-sm sm:max-w-md rounded-2xl shadow-xl border border-gray-200 p-6 sm:px-8 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <img src={SignWhispersLogo} alt="Logo" className="w-12 h-12" />
          <h1 className="text-lg font-semibold ml-2 text-black">
            Sign<span className="text-blue-600">Whispers</span>
          </h1>
        </div>

        {/* 404 Title */}
        <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-2">
          404
        </h2>
        <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </p>
        <p className="text-sm sm:text-base text-gray-500 mb-6">
          Oops! The page you are looking for does not exist. But don’t worry,
          you can go back home.
        </p>

        {/* Go Home Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-xl font-medium shadow-md text-sm sm:text-base"
        >
          Go Home
        </button>

        {/* Whisper style */}
        <p className="mt-6 text-xs sm:text-sm opacity-70 italic text-gray-500">
          ✨ SignWhispers ✨
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
