import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminSidebar from "../admin_components/AdminSidebar";
import AdminTopbar from "../admin_components/AdminTopbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-auto">
      {/* SIDEBAR */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 w-full">
        {/* TOPBAR */}
        <AdminTopbar setSidebarOpen={setSidebarOpen} />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
