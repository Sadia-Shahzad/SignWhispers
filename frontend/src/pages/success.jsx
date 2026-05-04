import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowRight, FaCrown } from "react-icons/fa";
import confetti from "canvas-confetti"; // Optional: Ek chota sa effect ke liye

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Page load hotay hi thora sa confetti (celebration) effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563eb", "#fbbf24", "#34d399"]
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-slate-600 mb-8 text-lg">
          Welcome to the SignWhisper Elite. Your lifetime premium access has been activated.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div className="text-left">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">Current Plan</p>
            <p className="text-slate-900 font-extrabold text-xl">Lifetime Premium</p>
          </div>
          <FaCrown className="text-yellow-500 text-4xl" />
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-100"
          >
            Go to Dashboard <FaArrowRight />
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="w-full text-slate-500 font-medium hover:text-slate-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* <p className="mt-8 text-slate-400 text-sm">
        A confirmation email has been sent to your registered address.
      </p> */}
    </div>
  );
};

export default Success;