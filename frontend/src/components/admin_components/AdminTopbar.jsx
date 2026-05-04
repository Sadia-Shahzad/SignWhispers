import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext"; // ✅ fixed path

const AdminTopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const admin = {
    name: user?.name || "Admin",
    email: user?.email || "admin@example.com",
  };

  const initials = admin.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="sticky top-0 w-full bg-white shadow-lg z-50 flex items-center justify-between px-6 py-3">
      <Link
        to="/"
        className="flex items-center gap-2 bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition-all"
      >
        <FaUserCircle /> Go to User Portal
      </Link>
      <div className="flex items-center gap-4 relative">
        <div className="hidden sm:flex flex-col text-right">
          <span className="font-semibold text-gray-800">{admin.name}</span>
          <span className="text-gray-500 text-sm">{admin.email}</span>
        </div>

        <div
          className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {initials}
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 top-12 w-40 bg-white border rounded-lg shadow-lg overflow-hidden transition-all">
            {/* <button className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-500 hover:bg-red-100 transition">
              <MdLogout /> Logout
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopBar;