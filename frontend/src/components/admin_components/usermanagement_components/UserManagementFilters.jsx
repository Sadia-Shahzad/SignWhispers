import { FaSearch } from "react-icons/fa";

const UserManagementFilters = ({ search, setSearch, filter, setFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
      {/* SEARCH */}
      <div className="relative w-full sm:w-1/2">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

        <input
          type="text"
          placeholder="Search by name, email..."
          className="pl-10 p-2 rounded w-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-gray-700 text-sm">Filter:</span>

        <button
          onClick={() => setFilter("ALL")}
          className={`px-3 py-1 rounded text-sm transition ${
            filter === "ALL"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All Users
        </button>

        <button
          onClick={() => setFilter("PREMIUM")}
          className={`px-3 py-1 rounded text-sm transition ${
            filter === "PREMIUM"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Premium
        </button>
      </div>
    </div>
  );
};

export default UserManagementFilters;
