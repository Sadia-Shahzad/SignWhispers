// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaCheckCircle, FaRocket, FaCrown, FaInfinity, FaSpinner } from "react-icons/fa";
// import toast from "react-hot-toast"; // Professional Notifications
// import api from "../api/axios";

// const Payment = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Agar user login nahi hai, toh usey page load hote hi redirect kar dein
//   useEffect(() => {
//     if (!token) {
//       toast.error("Please login to access the Premium plan");
//       navigate("/signin");
//     }
//   }, [token, navigate]);

//   const handleUpgrade = async () => {
//     if (!token) return;

//     setLoading(true);
//     const loadingToast = toast.loading("Connecting to secure checkout...");

//     try {
//       const response = await api.post("/create-checkout-session");

//       if (response.data.url) {
//         toast.success("Redirecting to Stripe...", { id: loadingToast });
//         window.location.href = response.data.url;
//       }
//     } catch (err) {
//       console.error("Stripe Error:", err);
//       const errorMsg = err.response?.data?.detail || "Payment start nahi ho saka.";
      
//       // Alert ki jagah professional toast
//       toast.error(errorMsg, { id: loadingToast });

//       if (err.response?.status === 401) {
//         navigate("/signin");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Pricing Plan</h2>
//         <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Upgrade your experience</h1>
//         <p className="mt-4 text-lg text-slate-600 max-w-2xl">
//           Unlock the full potential of SignWhispers with our premium features and real-time translation tools.
//         </p>
//       </div>

//       {/* Pricing Card */}
//       <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden max-w-sm w-full transition-transform hover:scale-[1.02] duration-300">
//         <div className="p-8">
//           <div className="flex justify-between items-center mb-4">
//             <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Best Value</span>
//             <FaCrown className="text-yellow-500 text-2xl" />
//           </div>
          
//           <h3 className="text-2xl font-bold text-slate-900">Premium Plan</h3>
//           <div className="mt-4 flex items-baseline">
//             <span className="text-5xl font-extrabold tracking-tight text-slate-900">$20</span>
//             <span className="ml-1 text-xl font-semibold text-slate-500">/lifetime</span>
//           </div>
//           <p className="mt-4 text-slate-500 text-sm italic">No monthly subscriptions. Pay once, use forever.</p>

//           <ul className="mt-8 space-y-4">
//             <li className="flex items-start">
//               <FaCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//               <span className="text-slate-700"><strong>Unlimited</strong> sign language translations</span>
//             </li>
//             <li className="flex items-start">
//               <FaCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//               <span className="text-slate-700">High-fidelity <strong>Voice Output</strong> (AI Voices)</span>
//             </li>
//             <li className="flex items-start">
//               <FaCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//               <span className="text-slate-700">Priority processing (No delays)</span>
//             </li>
//             <li className="flex items-start">
//               <FaInfinity className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//               <span className="text-slate-700">Early access to new features</span>
//             </li>
//           </ul>

//           <button
//             onClick={handleUpgrade}
//             disabled={loading}
//             className={`mt-10 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
//           >
//             {loading ? <FaSpinner className="animate-spin text-xl" /> : <FaRocket />}
//             {loading ? "Processing..." : "Upgrade to Premium"}
//           </button>
//         </div>
        
//         <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
//           <p className="text-xs text-slate-400">Secure checkout powered by <strong>Stripe</strong></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaRocket, FaCrown, FaInfinity, FaSpinner, FaStar, FaShieldAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../api/axios";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Please login to access the Premium plan");
      navigate("/signin");
      return;
    }

    // ✅ User ki info fetch karo — premium check ke liye
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me"); // apna profile endpoint
        setUser(res.data);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };
    fetchUser();
  }, [token, navigate]);

  const handleUpgrade = async () => {
    if (!token) return;
    setLoading(true);
    const loadingToast = toast.loading("Connecting to secure checkout...");
    try {
      const response = await api.post("/create-checkout-session");
      if (response.data.url) {
        toast.success("Redirecting to Stripe...", { id: loadingToast });
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error("Stripe Error:", err);
      const errorMsg = err.response?.data?.detail || "Payment start nahi ho saka.";
      toast.error(errorMsg, { id: loadingToast });
      if (err.response?.status === 401) navigate("/signin");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Agar user premium hai — special UI dikhao
  if (user?.is_premium) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Premium Status</h2>
          <h1 className="text-4xl font-extrabold text-slate-900">You're already a Pro! 🎉</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-xl">
            You have full access to all SignWhispers premium features. Enjoy the experience!
          </p>
        </div>

        {/* Already Premium Card */}
        <div className="bg-white border-2 border-blue-200 rounded-3xl shadow-xl overflow-hidden max-w-sm w-full">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <FaCrown className="text-yellow-300 text-5xl mx-auto mb-2" />
            <h3 className="text-white text-2xl font-extrabold">Elite Member</h3>
            <p className="text-blue-100 text-sm mt-1">Lifetime Access Activated</p>
          </div>

          <div className="p-8">
            {/* Plan Details */}
            <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-center">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Your Plan</p>
              <p className="text-blue-700 font-extrabold text-xl capitalize">{user.premium_type} Access</p>
              {user.premium_start && (
                <p className="text-slate-400 text-xs mt-1">
                  Active since: {new Date(user.premium_start).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                <span className="text-slate-700 text-sm"><strong>Unlimited</strong> sign language translations</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                <span className="text-slate-700 text-sm">High-fidelity <strong>AI Voice Output</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                <span className="text-slate-700 text-sm">Priority processing (No delays)</span>
              </li>
              <li className="flex items-center gap-3">
                <FaInfinity className="text-blue-500 flex-shrink-0" />
                <span className="text-slate-700 text-sm">Early access to new features</span>
              </li>
              <li className="flex items-center gap-3">
                <FaShieldAlt className="text-blue-500 flex-shrink-0" />
                <span className="text-slate-700 text-sm">Lifetime — never expires</span>
              </li>
            </ul>

            {/* Action Buttons */}
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              <FaStar /> Go to Dashboard
            </button>
          </div>

          <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">Thank you for supporting <strong>SignWhispers</strong> ❤️</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Normal payment page — premium nahi hai
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Pricing Plan</h2>
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Upgrade your experience</h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          Unlock the full potential of SignWhispers with our premium features and real-time translation tools.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden max-w-sm w-full transition-transform hover:scale-[1.02] duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Best Value</span>
            <FaCrown className="text-yellow-500 text-2xl" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900">Premium Plan</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-5xl font-extrabold tracking-tight text-slate-900">$20</span>
            <span className="ml-1 text-xl font-semibold text-slate-500">/lifetime</span>
          </div>
          <p className="mt-4 text-slate-500 text-sm italic">No monthly subscriptions. Pay once, use forever.</p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-slate-700"><strong>Unlimited</strong> sign language translations</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-slate-700">High-fidelity <strong>Voice Output</strong> (AI Voices)</span>
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-slate-700">Priority processing (No delays)</span>
            </li>
            <li className="flex items-start">
              <FaInfinity className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-slate-700">Early access to new features</span>
            </li>
          </ul>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className={`mt-10 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? <FaSpinner className="animate-spin text-xl" /> : <FaRocket />}
            {loading ? "Processing..." : "Upgrade to Premium"}
          </button>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">Secure checkout powered by <strong>Stripe</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Payment;