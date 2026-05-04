import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaComments,
  FaDollarSign,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const AdminSidebar = () => {
  const location = useLocation(); // to track current active route

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { name: "User Management", icon: <FaUsers />, path: "/admin/users" },
    { name: "Feedback", icon: <FaComments />, path: "/admin/feedback" },
    { name: "Payments", icon: <FaDollarSign />, path: "/admin/payments" },
  ];

  return (
    <div
      className="bg-white shadow-lg min-h-screen flex flex-col justify-between 
                    p-4 sm:p-6 
                    w-16 sm:w-64
                    transition-all duration-300"
    >
      {/* Logo */}
      <div className="mb-6 sm:mb-10 flex justify-center sm:justify-start">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 truncate">
          SignWhispers
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 sm:gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 py-2 sm:py-3 px-2 sm:px-3 rounded-lg text-sm sm:text-lg transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          className="flex items-center gap-2 text-red-500 hover:bg-red-100 
                           p-2 sm:p-3 rounded-lg w-full text-sm sm:text-lg"
        >
          <MdLogout /> <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
