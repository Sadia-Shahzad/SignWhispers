import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast"; 
import { GoogleOAuthProvider } from "@react-oauth/google"; // New Import

// Layouts
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Public Pages
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

// User & Admin Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import Feedback from "./pages/Feedback";
import TranslationHistory from "./pages/TranslationHistory";
import Payment from "./pages/Payment";
import Success from "./pages/success";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import FeedbackManagement from "./pages/admin/FeedbackManagement";
import PaymentManagement from "./pages/admin/PaymentManagement";

function App() {
  return (
    <GoogleOAuthProvider clientId="848772628117-6m3bc82nju2de10ma6h1e352flc2torr.apps.googleusercontent.com">
      <AuthProvider>
        <Toaster position="top-center" reverseOrder={false} />
        
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* USER SIDE */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="settings" element={<Settings />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="history" element={<TranslationHistory />} />
            <Route path="payment" element={<Payment />} />
            <Route path="success" element={<Success />} /> 
          </Route>

          {/* ADMIN SIDE */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="feedback" element={<FeedbackManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;