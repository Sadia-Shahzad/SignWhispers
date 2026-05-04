
// pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardCard from "../../components/admin_components/admindashboard_components/DashboardCard";
import RecentActivityItem from "../../components/admin_components/admindashboard_components/RecentActivityItem";
import { FaUsers, FaStar, FaCommentDots, FaDollarSign } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    premium_users: 0,
    total_feedbacks: 0,
    total_payments: "$0.00",
    recent_activity: []
  });
  const [loading, setLoading] = useState(true);

  // --- BACKEND INTEGRATION ---
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Apne backend URL ke mutabiq change karein
        const response = await axios.get("http://localhost:8000/admin/dashboard");
        setStats(response.data);
      } catch (error) {
        console.error("Dashboard stats fetch karne mein masla:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Har 5 minute baad auto-refresh (Optional)
    const interval = setInterval(fetchStats, 300000);
    return () => clearInterval(interval);
  }, []);

  const cardsData = [
    {
      title: "Total Users",
      value: stats.total_users.toLocaleString(),
      percentage: "12%", // Ye backend se dynamic bhi kar sakte hain agar history save ho
      color: "bg-blue-500",
      icon: <FaUsers />,
    },
    {
      title: "Premium Users",
      value: stats.premium_users.toLocaleString(),
      percentage: "8%",
      color: "bg-yellow-400",
      icon: <FaStar />,
    },
    {
      title: "Total Feedbacks",
      value: stats.total_feedbacks.toLocaleString(),
      percentage: "0%",
      color: "bg-purple-500",
      icon: <FaCommentDots />,
    },
    {
      title: "Total Payments",
      value: stats.total_payments,
      percentage: "24%",
      color: "bg-green-500",
      icon: <FaDollarSign />,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <span className="text-gray-500 text-sm">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {cardsData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            percentage={card.percentage}
            color={card.color}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-lg rounded-xl p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <ul className="divide-y divide-gray-100 min-w-[600px]">
            {stats.recent_activity.length > 0 ? (
              stats.recent_activity.map((activity, index) => (
                <RecentActivityItem
                  key={index}
                  type={activity.type}
                  text={activity.message}
                  time={activity.time} // Backend se aane wala time string
                  extra="" 
                />
              ))
            ) : (
              <p className="py-4 text-gray-500 text-center">No recent activity found.</p>
            )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;