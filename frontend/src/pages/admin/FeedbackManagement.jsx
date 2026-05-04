import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackSearch from "../../components/admin_components/feedbackmanagement_components/FeedbackSearch";
import FeedbackFilter from "../../components/admin_components/feedbackmanagement_components/FeedbackFilter";
import FeedbackTable from "../../components/admin_components/feedbackmanagement_components/FeedbackTable";
import FeedbackPagination from "../../components/admin_components/feedbackmanagement_components/FeedbackPagination";

const FeedbackManagement = () => {
  const [data, setData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Helper for Initials
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // ✅ Fetch Data from Backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/admin/feedback");
        const feedbackData = res.data.feedbacks || [];

        const formatted = feedbackData.map((item) => ({
          id: item.id || item._id,
          name: item.user_name || item.name || "Unknown",
          initials: getInitials(item.user_name || item.name),
          email: item.user_email || item.email || "N/A",
          rating: item.rating || 0,
          message: item.message || item.feedback_text || "",
          date: item.created_at ? new Date(item.created_at).toLocaleDateString("en-US", {
            month: 'short', day: 'numeric', year: 'numeric'
          }) : "N/A",
          approved: item.is_approved || false,
        }));

        setData(formatted);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, []);

  // ✅ FIXED SEARCH & FILTER LOGIC
  const filteredData = data.filter((item) => {
    const matchesRating = selectedRating === "All" || item.rating === Number(selectedRating);
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.message.toLowerCase().includes(searchLower);

    return matchesRating && matchesSearch;
  });

  // ✅ Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbacks = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // ✅ API CALL LOGIC: Update Approve status in Database
  const handleToggle = async (id, status) => {
    try {
      // Backend request
      await axios.put(`http://127.0.0.1:8000/admin/feedback/${id}/approve?is_approved=${status}`);

      // Frontend UI update
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, approved: status } : item
        )
      );
      console.log(`Feedback ${id} status updated to: ${status}`);
    } catch (error) {
      console.error("Failed to update database:", error);
      alert("Error: Database update nahi ho saka. Backend check karein.");
    }
  };

  // Reset page to 1 when search or rating changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRating]);

  return (
    <div className="p-4 sm:p-6 w-full min-h-screen bg-gray-50">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">
        Feedback Management
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Manage and review user testimonials
      </p>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <FeedbackSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FeedbackFilter
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <FeedbackTable data={currentFeedbacks} handleToggle={handleToggle} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-gray-500 font-medium text-sm">
          Showing <span className="text-gray-900">{filteredData.length > 0 ? indexOfFirstItem + 1 : 0}</span> to{" "}
          <span className="text-gray-900">{Math.min(indexOfLastItem, filteredData.length)}</span> of{" "}
          <span className="text-gray-900">{filteredData.length}</span> feedbacks
        </p>

        <FeedbackPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default FeedbackManagement;