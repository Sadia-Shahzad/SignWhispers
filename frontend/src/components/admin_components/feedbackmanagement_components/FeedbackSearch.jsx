import React from "react";
import { FaSearch } from "react-icons/fa";

const FeedbackSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full md:w-1/2">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        placeholder="Search feedback..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FeedbackSearch;
