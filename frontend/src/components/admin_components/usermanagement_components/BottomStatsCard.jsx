import { FaUsers, FaCrown } from "react-icons/fa";

const BottomStatsCard = ({ title, value }) => {
  const isPremium = title.toLowerCase().includes("premium");

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex items-center justify-between group">
      {/* LEFT SIDE */}
      <div>
        <h2 className="text-gray-500 text-sm sm:text-base mb-1">{title}</h2>

        <span className="text-2xl sm:text-3xl font-bold text-gray-800">
          {value}
        </span>
      </div>

      {/* ICON */}
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl text-white text-lg sm:text-xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${
          isPremium
            ? "bg-linear-to-r from-yellow-400 to-orange-500"
            : "bg-linear-to-r from-blue-500 to-indigo-600"
        }`}
      >
        {isPremium ? <FaCrown /> : <FaUsers />}
      </div>

      {/* DECORATION */}
      <div
        className={`absolute -right-10 -bottom-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full opacity-10 ${
          isPremium ? "bg-yellow-400" : "bg-blue-500"
        }`}
      />
    </div>
  );
};

export default BottomStatsCard;
