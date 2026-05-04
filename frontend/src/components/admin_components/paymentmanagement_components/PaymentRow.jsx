import React from "react";

const PaymentRow = ({ payment }) => {
  const colors = ["bg-blue-500", "bg-purple-500", "bg-indigo-500", "bg-teal-500", "bg-pink-500"];
  const colorIndex = payment.id ? payment.id.toString().length % colors.length : 0;
  const colorClass = colors[colorIndex];

  const initials = payment.name && payment.name !== "Unknown"
    ? payment.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  // ✅ SMART AMOUNT LOGIC
  const displayAmount = React.useMemo(() => {
    const val = payment.amount;
    if (!val) return "$0.00";
    
    // Agar backend se pehle hi "$" ke sath string aa rahi hai (e.g. "$20.00")
    if (typeof val === 'string' && val.includes('$')) {
      return val;
    }
    
    // Agar sirf number ho (e.g. 2000)
    const num = parseFloat(val);
    if (isNaN(num)) return "$0.00";
    return `$${(num > 100 ? num / 100 : num).toFixed(2)}`;
  }, [payment.amount]);

  const statusLower = payment.status?.toLowerCase();

  // ✅ UPDATED STATUS COLOR LOGIC
  let statusBg = "bg-red-500"; // Default (Failed/Other)
  if (statusLower === "success" || statusLower === "succeeded") {
    statusBg = "bg-green-500";
  } else if (statusLower === "pending") {
    statusBg = "bg-orange-500"; // Updated to Orange
  }

  return (
    <tr className="border-b hover:bg-gray-50 text-xs sm:text-sm transition-colors bg-white">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm ${colorClass}`}>
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-gray-900 truncate">{payment.name}</span>
            <span className="text-gray-500 text-[11px] truncate">{payment.email}</span>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 font-bold text-gray-800">
        {displayAmount}
      </td>
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider ${statusBg}`}>
          {payment.status || "N/A"}
        </span>
      </td>
      <td className="py-4 px-4 text-gray-500 font-medium whitespace-nowrap">
        {payment.date}
      </td>
    </tr>
  );
};

export default PaymentRow;