import React from "react";

const FeedbackStatusToggle = ({ approved, onToggle }) => {
  return (
    <div className="flex  gap-1">
      <button
        onClick={() => onToggle(true)}
        className={`px-2 py-1 text-sm sm:text-sm rounded text-white ${
          approved ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        Approved
      </button>

      <button
        onClick={() => onToggle(false)}
        className={`px-2 py-1 text-sm sm:text-sm rounded text-white ${
          !approved ? "bg-red-500" : "bg-gray-300"
        }`}
      >
        Not Approved
      </button>
    </div>
  );
};

export default FeedbackStatusToggle;
