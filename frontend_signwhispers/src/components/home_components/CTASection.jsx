import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Blue CTA Box */}
        <div className="bg-blue-600 rounded-2xl shadow-xl py-14 px-6 sm:px-10 text-center">
          {/* Heading */}
          <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ready to start communicating?
          </h2>

          {/* Sub Text */}
          <p className="text-blue-100 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Join thousands of users breaking down barriers with{" "}
            <span className="font-semibold text-white">SignWhispers</span>{" "}
            today.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink
              to="/dashboard"
              className="bg-white text-blue-600 font-semibold px-8 py-2 rounded-lg shadow-md hover:scale-105 transition"
            >
              Get Started
            </NavLink>

            {/* Learn More */}
            <button className="flex items-center gap-2 text-white font-medium hover:underline">
              Learn more <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
