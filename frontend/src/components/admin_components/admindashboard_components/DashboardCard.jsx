import React from "react";

const DashboardCard = ({ title, value, percentage, color, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="text-gray-500">{title}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{value}</h2>
        <span className={`text-sm font-semibold rounded-2xl px-2 ${color}`}>
          {percentage}
        </span>
      </div>
      <div
        className={`h-1 bg-${color.split("-")[1]}-500 mt-3 rounded-full`}
      ></div>
    </div>
  );
};

export default DashboardCard;
