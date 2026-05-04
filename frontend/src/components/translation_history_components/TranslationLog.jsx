import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const TranslationLog = () => {
  return (
    <div className="mt-8 p-6 mb-15 bg-gray-100 rounded-lg shadow-md border border-gray-200 max-w-7xl mx-auto">
      <div className="flex items-start space-x-4">
        <div className="text-blue-500 mt-1">
          <FaInfoCircle size={24} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Translation Log Overview
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            This view provides a complete log of your recent activity. Filters
            and search queries are performed in real-time to help you manage
            your translation records effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TranslationLog;
