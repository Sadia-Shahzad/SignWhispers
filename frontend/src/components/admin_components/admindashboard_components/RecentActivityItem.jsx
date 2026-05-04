import React from "react";
import {
  FaUser,
  FaCheckCircle,
  FaCommentDots,
  FaExclamationCircle,
  FaCog,
} from "react-icons/fa";

const RecentActivityItem = ({ type, text, time, extra }) => {
  const typeConfig = {
    "NEW USER": {
      bgcolor: "bg-blue-200",
      color: "text-blue-500",
      icon: <FaUser />,
    },
    PAYMENT: {
      bgcolor: "bg-green-200",
      color: "text-green-500",
      icon: <FaCheckCircle />,
    },
    FEEDBACK: {
      bgcolor: "bg-purple-200",
      color: "text-purple-500",
      icon: <FaCommentDots />,
    },
    "SYSTEM ALERT": {
      bgcolor: "bg-red-200",
      color: "text-red-500",
      icon: <FaExclamationCircle />,
    },
    MAINTENANCE: {
      bgcolor: "bg-gray-200",
      color: "text-gray-500",
      icon: <FaCog />,
    },
  };

  const { bgcolor, color, icon } = typeConfig[type] || {};

  return (
    <li className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start sm:items-center gap-3">
        <span className={`text-xl ${color}`}>{icon}</span>
        <div className="flex flex-col">
          <span>{text}</span>
          <div className="flex gap-4 text-gray-400 text-sm  flex-wrap">
            {time && <span>{time}</span>}
            {extra && <span>{extra}</span>}
          </div>{" "}
        </div>
      </div>
      <span
        className={`mt-2 px-2 sm:mt-0 font-semibold ${bgcolor} shadow-2xl rounded-2xl  ${color} text-sm`}
      >
        {type}
      </span>
    </li>
  );
};

export default RecentActivityItem;
