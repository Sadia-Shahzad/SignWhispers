import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import Feedback from "./pages/Feedback";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar isRegistered={true} userName="Ali Khan" /> */}
      <Navbar isRegistered={false} />

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
