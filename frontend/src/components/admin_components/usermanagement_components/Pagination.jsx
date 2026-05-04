import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // show current + next 2 pages
  const visiblePages = [];

  for (let i = currentPage; i <= Math.min(currentPage + 2, totalPages); i++) {
    visiblePages.push(i);
  }

  return (
    <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-0 justify-end items-center">
      {/* PREVIOUS */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`
          px-2 py-1 text-xs
          sm:px-3 sm:py-1 sm:text-sm
          md:px-4 md:py-1.5 md:text-base
          rounded
          ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }
        `}
      >
        Prev
      </button>

      {/* CURRENT + NEXT 2 */}
      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          className={`
            px-2 py-1 text-xs
            sm:px-3 sm:py-1 sm:text-sm
            md:px-4 md:py-1.5 md:text-base
            rounded
            ${
              currentPage === p
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
        >
          {p}
        </button>
      ))}

      {/* DOTS */}
      {currentPage + 2 < totalPages && (
        <span className="px-1 sm:px-2 text-xs sm:text-sm md:text-base text-gray-500">
          ...
        </span>
      )}

      {/* LAST PAGE */}
      {currentPage + 2 < totalPages && (
        <button
          onClick={() => setCurrentPage(totalPages)}
          className="
            px-2 py-1 text-xs
            sm:px-3 sm:py-1 sm:text-sm
            md:px-4 md:py-1.5 md:text-base
            rounded
            bg-gray-200 text-gray-700 hover:bg-gray-300
          "
        >
          {totalPages}
        </button>
      )}

      {/* NEXT */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          px-2 py-1 text-xs
          sm:px-3 sm:py-1 sm:text-sm
          md:px-4 md:py-1.5 md:text-base
          rounded
          ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
