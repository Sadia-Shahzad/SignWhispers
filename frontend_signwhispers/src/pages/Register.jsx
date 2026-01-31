import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import SignWhispersLogo from "./../assets/sign-whispers-logo.png";

const Register = () => {
  return (
    <div className="min-h-screen flex items-start justify-center pt-8 bg-linear-to-br from-white via-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-xs sm:max-w-sm rounded-2xl shadow-lg border border-gray-200 p-4 sm:px-5 py-1">
        {/* Logo */}
        <div className="flex items-center justify-center  ">
          <img src={SignWhispersLogo} alt="Logo" className="size-16 inset-0" />

          <h1 className="text-base sm:text-lg font-semibold text-black">
            Sign<span className="text-blue-700">Whispers</span>
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-lg sm:text-xl font-bold text-center text-gray-900">
          Join the conversation
        </h2>
        <p className="text-center text-gray-500 text-xs sm:text-xs mt-1 mb-4">
          Create an account to start translating ASL in real-time.
        </p>

        {/* Full Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-400 mr-2 text-sm" />
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="text-gray-400 mr-2 text-sm" />
            <input
              type="password"
              placeholder="Create a password"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* Register Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium shadow-md text-sm sm:text-sm">
          Register
        </button>

        {/* Divider */}
        <div className="flex items-center my-3">
          <div className="grow h-px bg-gray-200"></div>
          <span className="px-2 text-xs text-gray-400 tracking-wider">
            OR CONTINUE WITH
          </span>
          <div className="grow h-px bg-gray-200"></div>
        </div>

        {/* Google */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-1.5 hover:bg-gray-50 transition text-sm">
          <FcGoogle size={18} />
          <span className="font-medium text-gray-700 text-sm">Google</span>
        </button>

        <p className="text-center text-xs sm:text-xs text-gray-500 mt-3">
          Already have an account?{" "}
          <NavLink
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
