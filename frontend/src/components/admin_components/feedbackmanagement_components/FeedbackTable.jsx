import React from "react";
import FeedbackRow from "./FeedbackRow";

const FeedbackTable = ({ data, handleToggle }) => {
  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
      {/* min-w barha di hai taake user details aur visibility buttons ko poori jagah mile */}
      <table className="min-w-[850px] w-full border-collapse">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
          <tr>
            <th className="p-4 text-left font-semibold w-[220px]">User</th>
            <th className="p-4 text-left font-semibold w-[120px]">Rating</th>
            <th className="p-4 text-left font-semibold">Message</th>
            <th className="p-4 text-left font-semibold w-[180px]">Date</th>
            <th className="p-4 text-left font-semibold w-[150px]">Visibility</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((f) => (
              <FeedbackRow key={f.id} feedback={f} handleToggle={handleToggle} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-10 text-center text-gray-400">
                No feedback found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;