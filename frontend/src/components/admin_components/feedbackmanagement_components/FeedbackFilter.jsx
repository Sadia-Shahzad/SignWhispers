import React from "react";

const FeedbackFilter = ({ selectedRating, setSelectedRating }) => {
  return (
    <select
      value={selectedRating}
      onChange={(e) => setSelectedRating(e.target.value)}
      className="border bg-gray-100 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="All">All Ratings</option>
      <option value="5">5 Star</option>
      <option value="4">4 Star</option>
      <option value="3">3 Star</option>
      <option value="2">2 Star</option>
      <option value="1">1 Star</option>
    </select>
  );
};

export default FeedbackFilter;
