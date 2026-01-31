import { NavLink } from "react-router-dom";
import { FaCog, FaUniversalAccess, FaUser } from "react-icons/fa";
import { MdGraphicEq, MdVideoSettings } from "react-icons/md";
import { FaTachometerAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";

import { FaHome } from "react-icons/fa";

const SettingsSidebar = () => {
  const linkStyle =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition";

  const activeStyle = "bg-blue-100 text-blue-600 font-medium";

  return (
    <div className="w-64 bg-white shadow-lg border-none p-7 hidden md:block">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <FaHome /> Home
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <MdGraphicEq /> Speech Synthesis
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <FaStar /> Reviews
        </NavLink>

        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <FaCommentDots /> Give Feedback
        </NavLink>
      </nav>
      <button className="mt-8 flex items-center justify-center gap-2 w-full bg-red-500 py-2.5 rounded-lg border border-gray-200 text-white font-medium text-sm  hover:bg-red-400  hover:border-red-200 transition-all duration-300 shadow-sm hover:shadow-md">
        Log Out
      </button>
    </div>
  );
};

export default SettingsSidebar;
