


import { Outlet } from "react-router-dom";
import Navbar from "../Navbar"; 
import Footer from "../Footer"; 

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar ko ab kisi props ki zaroorat nahi */}
      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;