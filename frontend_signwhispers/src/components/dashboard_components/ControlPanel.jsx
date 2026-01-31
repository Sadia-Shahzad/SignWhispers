import React from "react";
import { FaPlay, FaStop, FaHandPaper } from "react-icons/fa";
import { FiSun, FiImage } from "react-icons/fi";
import { MdTranslate } from "react-icons/md";
import { NavLink } from "react-router-dom";

const ControlPanel = () => {
  return (
    <div className="w-full flex flex-col gap-3 h-full">
      {/* START / END BUTTONS */}
      <div className="grid grid-cols-2 gap-4">
        <button className="h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md flex flex-col items-center justify-center gap-2 transition">
          <FaPlay size={20} />
          <span className="font-semibold">Start Input</span>
        </button>

        <button className="h-20 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-red-600 hover:border-red-600 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-2 transition">
          <FaStop size={20} />
          <span className="font-semibold">End Input</span>
        </button>
      </div>

      {/* SYSTEM STATUS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex-1">
        <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-slate-800">
          System Status
        </h3>

        <div className="space-y-1 text-sm">
          {/* Lighting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                <FiSun size={18} />
              </div>
              <span className="font-medium text-slate-700">Lighting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-green-600 font-semibold">Good</span>
            </div>
          </div>

          {/* Background */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                <FiImage size={18} />
              </div>
              <span className="font-medium text-slate-700">Background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-600 font-semibold">Complex</span>
            </div>
          </div>

          {/* Detection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                <FaHandPaper size={18} />
              </div>
              <span className="font-medium text-slate-700">Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
              <span className="text-blue-600 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* LANGUAGE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3">
        <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-slate-800 flex items-center gap-1">
          <MdTranslate size={18} />
          Target Language
        </h3>

        <select className="w-full border border-slate-200 rounded-xl p-3 text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
          <option>English (United States)</option>
          <option>Spanish (Español)</option>
          <option>French (Français)</option>
          <option>German (Deutsch)</option>
          <option>Japanese (日本語)</option>
        </select>
      </div>

      <NavLink
        to="/feedback"
        className="h-10 flex items-center justify-center rounded-lg px-6 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 shadow-md shadow-blue-700/20 transition-all duration-200 mt-2"
      >
        Give Feedback
      </NavLink>
    </div>
  );
};

export default ControlPanel;
