import React from "react";
import { FiMic, FiMaximize } from "react-icons/fi";
import cameraImage from "../../assets/camera-image.png";

const LiveInputSection = () => {
  return (
    <div className="relative w-full h-75 sm:h-100 lg:h-full xl:h-140 bg-black rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-cover bg-center">
      {/* Camera Image */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-xl shadow-lg"
        style={{ backgroundImage: `url(${cameraImage})` }}
      />

      {/* LIVE Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 shadow">
        <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-white text-xs font-bold tracking-wide">
          LIVE INPUT
        </span>
      </div>

      {/* Detection Overlay */}
      <div className="absolute inset-5 pointer-events-none">
        {/* Left Hand */}
        <div className="absolute top-[28%] left-[31%] w-24 h-24 sm:w-28 sm:h-28 border-2 border-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-start justify-end p-1">
          <span className="text-[10px] bg-blue-600 text-white px-1 rounded font-bold">
            L-Hand 98%
          </span>
        </div>

        {/* Right Hand */}
        <div className="absolute top-[18%] left-[55%] w-24 h-24 sm:w-28 sm:h-28 border-2 border-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-start justify-end p-1">
          <span className="text-[10px] bg-blue-600 text-white px-1 rounded font-bold">
            R-Hand 96%
          </span>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent flex justify-between items-end">
        <div className="flex gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur border border-white/10 transition">
            <FiMic size={18} />
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur border border-white/10 transition">
            <FiMaximize size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveInputSection;
