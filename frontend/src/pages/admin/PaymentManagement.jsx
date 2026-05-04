import React, { useState, useEffect } from "react";
import axios from "axios";
import PaymentTable from "../../components/admin_components/paymentmanagement_components/PaymentTable";
import PaymentSearch from "../../components/admin_components/paymentmanagement_components/PaymentSearch";
import PaymentPagination from "../../components/admin_components/paymentmanagement_components/PaymentPagination";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); 
        const res = await axios.get("http://127.0.0.1:8000/admin/payments", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const paymentData = res.data.payments || [];

        const formatted = paymentData.map((item) => ({
          id: item.id || item._id, 
          name: item.user_name || "Unknown",
          email: item.user_email || "N/A",
          // Backend se "$20.00" aa raha hai, hum wahi save kar rahe hain
          amount: item.amount, 
          status: item.status || "Pending",
          date: item.created_at && item.created_at !== "None"
            ? new Date(item.created_at).toLocaleDateString("en-US", { 
                month: 'short', day: 'numeric', year: 'numeric' 
              }) 
            : "N/A",
        }));

        setPayments(formatted);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage) || 1;
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * paymentsPerPage,
    currentPage * paymentsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const start = filteredPayments.length > 0 ? (currentPage - 1) * paymentsPerPage + 1 : 0;
  const end = Math.min(currentPage * paymentsPerPage, filteredPayments.length);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">Payment Management</h1>
        <span className="text-gray-500 text-xs sm:text-sm mb-6 block">
          Viewing {filteredPayments.length} total transactions
        </span>
        <PaymentSearch search={search} setSearch={setSearch} />
        <div className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-200 mt-6">
          {loading ? (
            <div className="p-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-500 font-medium">Loading transactions...</p>
            </div>
          ) : filteredPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <PaymentTable payments={paginatedPayments} />
            </div>
          ) : (
            <div className="p-20 text-center text-gray-400">No payments found matching your search.</div>
          )}
        </div>
        {filteredPayments.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 py-2 gap-4">
            <p className="text-gray-500 text-xs sm:text-sm font-semibold">
              Showing <span className="text-gray-900">{start}</span> to <span className="text-gray-900">{end}</span> of {filteredPayments.length} results
            </p>
            <PaymentPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagement;