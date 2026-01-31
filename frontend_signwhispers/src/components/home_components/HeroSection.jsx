import React from "react";
import { FaPlay } from "react-icons/fa";
import heroImage from "../../assets/hero-image.png";
import { NavLink } from "react-router-dom";
const HeroSection = () => {
  return (
    <section className="bg-gray-50  py-16 lg:py-17">
      <div className="container max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col gap-1 leading-0">
          <h1 className="text-4xl  leading-none sm:text-5xl lg:text-5xl font-bold text-gray-900">
            Bridging the Gap Between{" "}
            <span className="text-blue-600">Signs</span> and{" "}
            <span className="text-blue-400">Sounds</span>.
          </h1>
          <p className="text-gray-500 mt-2 text-base sm:text-lg lg:text-xl">
            Experience real-time American Sign Language to speech translation
            directly in your browser. Powered by advanced AI, designed for
            seamless communication.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <NavLink
              to="/dashboard"
              className="bg-blue-600 text-white px-6 py-5 rounded-lg font-semibold hover:bg-blue-700 transition inline-block text-center"
            >
              Get Started
            </NavLink>
            <button className="flex items-center justify-center border border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition">
              <FaPlay className="mr-2" /> Watch Demo
            </button>
          </div>

          {/* Trusted Users */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex -space-x-3">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="User 1"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://i.pravatar.cc/40?img=2"
                alt="User 2"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="User 3"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Trusted by 2,000+ early users
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 w-full min-h-80 lg:min-h-95 flex items-center justify-center relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-xl shadow-lg"
            style={{ backgroundImage: `url(${heroImage})` }}
          />

          {/* Blurred Rings Overlay */}
          <div className="absolute inset-4 bg-blue-500/10 blur-3xl rounded-full opacity-70"></div>

          <div className="absolute inset-0 rounded-xl bg-linear-to-t from-slate-900/90 to-transparent"></div>

          {/* LIVE TRANSLATION Label */}
          <div className="absolute bottom-15 left-6 flex items-center gap-3">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              LIVE TRANSLATION
            </span>
            <div className="h-2 w-2 rounded-full bg-red-100 animate-pulse"></div>
          </div>

          {/* Bottom Text and Progress Bar */}
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white text-sm font-medium mb-2">
              "Hello, nice to meet you!"
            </p>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-2/3 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
