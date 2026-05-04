import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); 
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Password Strong Validation Function
  const isPasswordStrong = (pw) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pw);
    const hasLowerCase = /[a-z]/.test(pw);
    const hasNumber = /\d/.test(pw);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pw);

    if (pw.length < minLength) return "Password must be at least 8 characters long.";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter.";
    if (!hasNumber) return "Password must contain at least one number.";
    if (!hasSpecialChar) return "Password must contain at least one special character.";
    
    return null; // Null matlab password strong hai
  };

  const handleReset = async (e) => {
    e.preventDefault();

    // 1. Check if passwords match
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    // 2. Check Strong Password Validation (Backend Sync)
    const validationError = isPasswordStrong(password);
    if (validationError) {
      return toast.error(validationError);
    }

    setLoading(true);
    try {
      await api.post("/reset-password", { 
        token: token, 
        new_password: password 
      });

      toast.success("Password reset successful!");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Invalid or expired link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">New Password</h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Password must be 8+ chars with A-Z, a-z, 0-9 & symbols.
        </p>
        
        <form onSubmit={handleReset} className="space-y-6">
          <input
            type="password"
            required
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            required
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition disabled:opacity-50 shadow-lg"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;