import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchFilter = ({ onSearchChange, onLanguageChange, languages }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearchChange(value);
  };

  const handleLanguage = (e) => {
    const value = e.target.value;
    setSelectedLanguage(value);
    onLanguageChange(value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-2 mb-0 mx-2 gap-4">
      {/* Search Input */}
      <div className="flex items-center w-full sm:w-1/2 bg-neutral-100 rounded-xl shadow px-4 py-3">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search detected text or translated text..."
          value={searchText}
          onChange={handleSearch}
          className="w-full outline-none text-sm text-gray-700"
        />
      </div>

      {/* Language Dropdown */}
      <div className="w-full sm:w-1/4">
        <select
          value={selectedLanguage}
          onChange={handleLanguage}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-700 shadow hover:border-primary transition-all"
        >
          <option value="all">All Languages</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;
