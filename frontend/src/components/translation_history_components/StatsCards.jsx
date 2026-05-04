import React from "react";
import {
  FaChartLine,
  FaChartBar,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const StatsCards = ({ stats, onFilterClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          onClick={() => onFilterClick(stat.filter)}
          className={`bg-white p-4 rounded-2xl shadow hover:border-primary hover:shadow-md cursor-pointer transition-all`}
        >
          <div className="flex items-center justify-between mb-4">
            {/* Icon */}
            <div
              className={`w-11 h-11 flex items-center justify-center rounded-xl text-white ${stat.bgColor}`}
            >
              {stat.icon}
            </div>
            {/* Filter label */}
            <span className="text-xs text-gray-400">{stat.labelRight}</span>
          </div>

          {/* Number and caption */}
          <div className="text-left">
            <p className="text-xs font-medium text-gray-400">{stat.caption}</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {stat.number.toLocaleString()}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;



