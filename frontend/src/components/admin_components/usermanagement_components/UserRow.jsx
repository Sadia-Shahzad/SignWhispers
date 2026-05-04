import React from "react";
import { FaStar, FaClock } from "react-icons/fa";

const UserRow = ({ user, toggleAdmin }) => {
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const colors = [
    "bg-red-100 text-red-700",
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-yellow-100 text-yellow-700",
  ];

  const colorIndex = user.id ? user.id.length % colors.length : 0;
  const colorClass = colors[colorIndex];
  const isAdmin = user.role?.toLowerCase() === "admin";

  // --- UPDATED LOGIC FOR RAHIM GUL ---
  // 1. Confirmed: Paisay mil gaye hain ($20.00)
  const isPremiumConfirmed = user.total_paid === "$20.00" || user.total_paid === "20";

  // 2. Pending: Rahim Gul ka case - Agar is_premium true hai YA total_paid $0 hai magar wo premium ki list mein hai
  // Hum yahan check kar rahe hain ke agar user 'free' nahi hai aur payments $0 hain
  const isPaymentPending = (user.is_premium || user.premium_status === "pending") && 
                           (user.total_paid === "$0.00" || user.total_paid === "0" || !user.total_paid);

  return (
    <tr className="border-b last:border-none text-xs sm:text-sm hover:bg-gray-50 transition-colors">
      <td className="py-4 px-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`rounded-full w-9 h-9 flex items-center justify-center font-bold shadow-sm ${colorClass}`}>
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-gray-800 truncate">{user.name || "Unknown"}</span>
            <span className="text-gray-400 text-[11px] truncate">{user.email}</span>
          </div>
        </div>
      </td>

      <td className="px-3">
        {isAdmin ? (
          <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-[10px] font-black uppercase border border-indigo-200">
            ADMIN
          </span>
        ) : (
          <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-gray-200">
            USER
          </span>
        )}
      </td>

      <td className="px-3">
        {isPremiumConfirmed ? (
          <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-md text-[10px] font-black shadow-sm w-fit uppercase">
            <FaStar className="text-[9px]" /> Premium
          </span>
        ) : isPaymentPending ? (
          <span className="flex items-center gap-1 bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded-md text-[10px] font-bold w-fit uppercase">
            <FaClock className="text-[9px]" /> Pending
          </span>
        ) : (
          <span className="text-gray-300 font-medium text-[10px] uppercase">
            Free
          </span>
        )}
      </td>

      <td className="px-3 font-bold text-gray-700">
        {user.total_paid || "$0.00"}
      </td>

      <td className="px-3">
        <button
          onClick={() => toggleAdmin(user.id, user.role)}
          className={`py-1.5 px-3 rounded-lg text-[10px] font-bold transition-all active:scale-95 shadow-sm ${
            isAdmin
              ? "text-red-600 bg-white border border-red-200 hover:bg-red-50"
              : "text-white bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isAdmin ? "Remove Admin" : "Make Admin"}
        </button>
      </td>
    </tr>
  );
};

export default UserRow;