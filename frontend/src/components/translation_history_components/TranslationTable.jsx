import React from "react";

const TranslationTable = ({ data, currentPage, rowsPerPage }) => {
  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow border-b-gray-500">
      <table className="min-w-full divide-y divide-gray-200 text-sm shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Detected Text
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Translated Text
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Language
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 ">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-700">{item.detected}</td>
                <td className="px-6 py-4 text-gray-700 italic">
                  "{item.translated}"
                </td>
                <td className=" py-4 px-4 ">
                  <span className="inline-block px-3 py-1 rounded-full bg-green-500 text-white font-semibold shadow-md">
                    {item.language}
                  </span>
                </td>{" "}
                <td className="px-6 py-4 text-gray-500">{item.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-6 text-gray-500">
                No translations found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TranslationTable;
