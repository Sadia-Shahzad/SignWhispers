import { useState, useContext } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import SignWhispersLogo from "./../assets/sign-whispers-logo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    // Basic Client-side Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const loadToast = toast.loading("Signing in...");
    
    try {
      const res = await api.post("/login", { email, password });
      
      // Tokens save karein
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      
      // User data fetch karein context mein
      await fetchUser(); 
      
      toast.success("Welcome back!", { id: loadToast });
      navigate("/"); 
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Invalid credentials. Please try again.";
      toast.error(errorMsg, { id: loadToast });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async (credentialResponse) => {
    setLoading(true);
    const loadToast = toast.loading("Authenticating with Google...");
    try {
      // Backend expects: { token: "ID_TOKEN" }
      const res = await api.post("/google", { token: credentialResponse.credential });
      
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      
      await fetchUser();
      
      toast.success("Google Login Successful!", { id: loadToast });
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Google authentication failed.", { id: loadToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-blue-50 to-blue-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-xs sm:max-w-sm rounded-2xl shadow-lg border border-gray-200 p-4">
        <div className="flex items-center justify-center mb-2">
          <img src={SignWhispersLogo} alt="Logo" className="size-10" />
          <h1 className="text-base sm:text-lg font-semibold ml-2 text-black">
            Sign<span className="text-blue-700">Whispers</span>
          </h1>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-center text-gray-900">Welcome Back</h2>
        
        <form onSubmit={handleSignIn} className="mt-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <FaEnvelope className="text-gray-400 mr-2 text-sm" />
              <input 
                required 
                type="email" 
                placeholder="name@example.com" 
                className="w-full outline-none text-sm bg-transparent" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <FaLock className="text-gray-400 mr-2 text-sm" />
              <input 
                required 
                type="password" 
                placeholder="Password" 
                className="w-full outline-none text-sm bg-transparent" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="text-right mb-3">
            <NavLink to="/forgot-password" size="xs" className="text-blue-600 hover:underline text-xs">
              Forgot Password?
            </NavLink>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow-md text-sm transition-colors disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-200"></div>
          <span className="px-2 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">or continue with</span>
          <div className="grow h-px bg-gray-200"></div>
        </div>
        
        {/* Google Login Button Integration */}
        <div className="flex justify-center w-full overflow-hidden rounded-lg">
          <GoogleLogin 
            onSuccess={handleGoogleAuth} 
            onError={() => toast.error("Google Login Failed")} 
            width="100%"
            theme="outline"
          />
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Don't have an account? <NavLink to="/register" className="text-blue-600 hover:underline font-medium">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;