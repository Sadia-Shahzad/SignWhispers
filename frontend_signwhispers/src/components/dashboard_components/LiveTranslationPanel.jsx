import React from "react";
import { FiCopy, FiDownload, FiMaximize2 } from "react-icons/fi";

const LiveTranslationPanel = () => {
  return (
    <div className="w-full">
      <div className="bg-white/95 backdrop-blur border-t-4 border-blue-600 shadow-xl rounded-2xl p-1 sm:p-6 flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-blue-600">
            <span className="font-bold uppercase tracking-wide text-sm">
              Live Translation
            </span>
          </div>

          <div className="flex gap-2 text-slate-500">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition">
              <FiCopy size={16} />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition">
              <FiDownload size={16} />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition">
              <FiMaximize2 size={16} />
            </button>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 text-sm sm:text-base">
          <p className="text-slate-400 italic">
            Session started at 18:42 AM...
          </p>

          <div className="flex gap-4">
            <span className="text-xs text-slate-400 w-16 shrink-0">
              10:43:05
            </span>
            <p className="text-slate-700 text-xs">
              Hello! I am happy to meet you.
            </p>
          </div>

          <div className="flex gap-4">
            <span className="text-xs text-slate-400 w-16 shrink-0">
              10:43:12
            </span>
            <p className="text-slate-700 text-xs">
              Can you help me find the nearest{" "}
              <span className="bg-blue-100 text-blue-600 px-1 rounded font-medium">
                train station
              </span>
              ?
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <span className="text-xs text-blue-600 font-semibold w-16 shrink-0">
              Now
            </span>
            <p className="text-slate-900 font-semibold text-xs">
              I need to buy a ticket for...
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-2 animate-bounce"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTranslationPanel;
