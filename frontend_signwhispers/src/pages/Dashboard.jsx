import React from "react";
import LiveInputSection from "../components/dashboard_components/LiveInputSection";
import ControlPanel from "../components/dashboard_components/ControlPanel";
import LiveTranslationPanel from "../components/dashboard_components/LiveTranslationPanel";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 flex flex-col gap-4">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-3">
        {/* LEFT — CAMERA */}
        <div className="lg:col-span-2 h-full">
          <LiveInputSection />
        </div>

        {/* RIGHT — CONTROL PANEL */}
        <div className="lg:col-span-1 h-full">
          <ControlPanel />
        </div>
      </div>

      {/* BOTTOM — LIVE TRANSLATION */}
      <div>
        <LiveTranslationPanel />
      </div>
    </div>
  );
};

export default Dashboard;
