import React from "react";
import FeedbackStatusToggle from "./FeedbackStatusToggle";

const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];

const FeedbackRow = ({ feedback, handleToggle }) => {
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(feedback.name);
  const colorClass = colors[feedback.id % colors.length] || "bg-blue-500";

  // ✅ DATE FORMATTING: Yeh lambi date ko "Oct 24, 2023" jaisa bana dega
  const formattedDate = new Date(feedback.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <tr className="border-t text-left text-xs sm:text-sm hover:bg-gray-50 transition-colors">
      {/* USER DETAILS */}
      <td className="p-2 sm:p-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0 ${colorClass}`}>
            {initials}
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="font-semibold text-gray-900 whitespace-nowrap">
              {feedback.name}
            </span>
            <span className="text-gray-500 text-[11px] sm:text-xs break-all">
              {feedback.email}
            </span>
          </div>
        </div>
      </td>

      {/* RATING */}
      <td className="p-2 sm:p-3 text-amber-400 whitespace-nowrap">
        {"★".repeat(feedback.rating)}
        <span className="text-gray-300">{"★".repeat(5 - feedback.rating)}</span>
      </td>

      {/* MESSAGE */}
      <td className="p-2 sm:p-3 max-w-[250px] sm:max-w-[350px] break-words text-gray-800">
        {feedback.message}
      </td>

      {/* DATE - AB YEH SAAFA SUTHRI DIKHEGI */}
      <td className="p-2 sm:p-3 whitespace-nowrap text-gray-500">
        {formattedDate}
      </td>

      {/* STATUS */}
      <td className="p-2 sm:p-3">
        <FeedbackStatusToggle
          approved={feedback.approved}
          onToggle={(status) => handleToggle(feedback.id, status)}
        />
      </td>
    </tr>
  );
};

export default FeedbackRow;