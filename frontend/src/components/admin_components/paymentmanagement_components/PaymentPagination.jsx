import React from "react";

const PaymentPagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pageNumbers.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }
  }

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="shadow bg-white p-1 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <span key={idx} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-1 rounded ${
              currentPage === num
                ? "bg-blue-500 text-white font-semibold"
                : "bg-white text-black"
            }`}
          >
            {num}
          </button>
        ),
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="shadow bg-white p-1 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaymentPagination;
