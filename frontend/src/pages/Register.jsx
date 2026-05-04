import { useState, useContext } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google"; // New Import
import { AuthContext } from "../context/AuthContext";
import SignWhispersLogo from "./../assets/sign-whispers-logo.png";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const { name, password, email } = formData;
    if (name.trim().length < 2) return "Name must be at least 2 characters long.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    if (!/\d/.test(password)) return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) { setError(validationError); toast.error(validationError); return; }

    setLoading(true);
    try {
      await api.post("/register", formData);
      toast.success("Registration Successful! Please Login.");
      navigate("/signin");
    } catch (err) {
      const serverError = err.response?.data?.detail || "Registration failed.";
      setError(serverError);
      toast.error(serverError);
    } finally { setLoading(false); }
  };

  const handleGoogleAuth = async (credentialResponse) => {
    setLoading(true);
    const loadToast = toast.loading("Authenticating with Google...");
    try {
      const res = await api.post("/google", { token: credentialResponse.credential });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      await fetchUser();
      toast.success("Welcome to SignWhispers!", { id: loadToast });
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Google Login failed.", { id: loadToast });
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-8 bg-linear-to-br from-white via-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-xs sm:max-w-sm rounded-2xl shadow-lg border border-gray-200 p-4 sm:px-5 py-1">
        <div className="flex items-center justify-center mt-2">
          <img src={SignWhispersLogo} alt="Logo" className="size-10" />
          <h1 className="text-base sm:text-lg font-semibold text-black ml-2">Sign<span className="text-blue-700">Whispers</span></h1>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-center text-gray-900 mt-2">Join the conversation</h2>
        {error && <p className="bg-red-50 text-red-600 text-[10px] p-2 rounded mt-2 border border-red-100">{error}</p>}
        <form onSubmit={handleRegister} className="mt-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
              <FaUser className="text-gray-400 mr-2 text-sm" />
              <input required type="text" placeholder="Full name" className="w-full outline-none text-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-400 mr-2 text-sm" />
              <input required type="email" placeholder="name@example.com" className="w-full outline-none text-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
              <FaLock className="text-gray-400 mr-2 text-sm" />
              <input required type="password" placeholder="Password" className="w-full outline-none text-sm" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow-md text-sm disabled:opacity-50">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="flex items-center my-3">
          <div className="grow h-px bg-gray-200"></div>
          <span className="px-2 text-xs text-gray-400 uppercase tracking-widest">or continue with</span>
          <div className="grow h-px bg-gray-200"></div>
        </div>
        
        {/* Google Integration */}
        <div className="flex justify-center w-full">
          <GoogleLogin onSuccess={handleGoogleAuth} onError={() => toast.error("Google Login Failed")} width="100%" />
        </div>

        <p className="text-center text-xs text-gray-500 mt-3">Already have an account? <NavLink to="/signin" className="text-blue-600 hover:underline">Sign In</NavLink></p>
      </div>
    </div>
  );
};

export default Register;