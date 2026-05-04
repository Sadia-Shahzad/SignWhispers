import React from "react";
import { FaSearch } from "react-icons/fa";

const PaymentSearch = ({ search, setSearch }) => {
  return (
    <div className="mb-4 relative w-full sm:w-1/2">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search by name or email..."
        className="pl-10 w-full p-2 border border-gray-300 rounded shadow focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default PaymentSearch;
