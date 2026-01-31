import React from "react";
import { FaBolt, FaShieldAlt, FaUniversalAccess } from "react-icons/fa";

const features = [
  {
    icon: <FaBolt className="text-blue-600" size={24} />,
    title: "Instant Translation",
    description:
      "Zero latency processing ensures your conversation flows naturally. No awkward pauses waiting for the cloud.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600" size={24} />,
    title: "Private & Secure",
    description:
      "All video processing happens locally on your device. Your personal moments never leave your browser.",
  },
  {
    icon: <FaUniversalAccess className="text-blue-600" size={24} />,
    title: "Accessibility First",
    description:
      "Designed with high contrast interfaces and clear typography to ensure usability for everyone.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Section Heading */}
        <p className="text-blue-600 font-semibold text-sm sm:text-base mb-2">
          CORE CAPABILITIES
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Why Choose SignWhispers?
        </h2>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-12">
          Engineered for speed, privacy, and accessibility.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              {/* Icon in square */}
              <div className="bg-blue-100 p-4 rounded-lg mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-gray-500 text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
