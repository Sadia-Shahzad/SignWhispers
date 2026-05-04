import React from "react";
import PaymentRow from "./PaymentRow";

const PaymentTable = ({ payments }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full text-left divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">
              User Name
            </th>
            <th className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">
              Amount
            </th>
            <th className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">
              Status
            </th>
            <th className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments.map((p) => (
            <PaymentRow key={p.id} payment={p} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
