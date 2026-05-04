import React from "react";

const Pagination = ({
  totalRows,
  rowsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const getPageNumbers = () => {
    const maxPagesToShow = 4;
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 py-3 px-2 bg-gray-100 shadow-lg rounded-lg">
      {/* Left: Showing results */}
      <div className="mb-3 sm:mb-0 text-gray-700 font-medium">
        Showing {totalRows === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to{" "}
        {Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} results
      </div>

      {/* Right: Pagination buttons */}
      <div className="flex gap-2 flex-wrap items-center">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white shadow-sm"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-1 rounded-lg font-semibold transition-all duration-200 border ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-800 shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white shadow-sm"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
