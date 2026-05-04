import React, { useState, useEffect } from "react";
import axios from "axios";
import UserManagementHeader from "../../components/admin_components/usermanagement_components/UserManagementHeader";
import UserManagementFilters from "../../components/admin_components/usermanagement_components/UserManagementFilters";
import UsersTable from "../../components/admin_components/usermanagement_components/UsersTable";
import UsersTableFooter from "../../components/admin_components/usermanagement_components/UsersTableFooter";
import UserStatsCards from "../../components/admin_components/usermanagement_components/UserStatsCards";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/admin/users", {
        params: { limit: 100 },
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAdmin = async (userId, currentRole) => {
    try {
      const newRole = currentRole.toLowerCase() === "admin" ? "user" : "admin";
      const token = localStorage.getItem("token");
      await axios.put(`http://127.0.0.1:8000/admin/users/${userId}/role?role=${newRole}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Role update failed");
    }
  };

  const filteredUsers = users.filter((u) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = u.name.toLowerCase().includes(searchLower) || u.email.toLowerCase().includes(searchLower);
    
    // Filter Logic: Pending users are NOT shown in PREMIUM filter until confirmed
    const isActuallyPremium = u.is_premium && (u.total_paid === "$20.00" || u.total_paid === "20");
    if (filter === "PREMIUM" && !isActuallyPremium) return false;

    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  useEffect(() => setCurrentPage(1), [search, filter]);

  // Stats for the Top Cards
  const totalUsersCount = users.length;
  const totalPremiumCount = users.filter(u => u.is_premium && (u.total_paid === "$20.00" || u.total_paid === "20")).length;

  return (
    <div className="w-full min-h-screen px-0 sm:px-1 md:px-6 lg:px-8 py-4 flex flex-col gap-4 bg-gray-50">
      <UserManagementHeader totalUsers={totalUsersCount} />
      <UserManagementFilters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? <div className="p-20 text-center text-gray-500 font-medium">Fetching Records...</div> : <UsersTable users={paginatedUsers} toggleAdmin={toggleAdmin} />}
      </div>
      <UsersTableFooter currentPage={currentPage} usersPerPage={usersPerPage} filteredUsers={filteredUsers} totalPages={totalPages} setCurrentPage={setCurrentPage} />
      <UserStatsCards totalUsers={totalUsersCount} totalPremium={totalPremiumCount} />
    </div>
  );
};

export default UserManagement;