import React, { useEffect } from "react";
import {
  FaVideo,
  FaUserCheck,
  FaMicrophone,
  FaHandPaper,
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    icon: <FaVideo className="text-blue-600" size={20} />,
    title: "Camera Input",
    description:
      "Simply allow camera access in your browser. Our system focuses on hand gestures and body positioning.",
  },
  {
    icon: <FaUserCheck className="text-gray-500" size={20} />,
    title: "AI Processing",
    description:
      "Our advanced neural network analyzes the video feed in real-time, identifying ASL signs with high accuracy.",
  },
  {
    icon: <FaMicrophone className="text-gray-500" size={20} />,
    title: "Speech Output",
    description:
      "The translated text is instantly converted to natural-sounding speech or displayed as text captions.",
  },
];

const HowItWorksSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ width: "98%" });
    }
  }, [controls, inView]);

  return (
    <section className="bg-gray-50 py-16 rounded-xl">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Timeline */}
        <div className="lg:w-1/2 flex flex-col relative">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>

          <div className="relative flex flex-col gap-5">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                {/* Icon in circle */}
                <div className="shrink-0 relative space-0">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${index === 0 ? "border-blue-600" : "border-gray-300"} bg-white`}
                  >
                    {step.icon}
                  </div>
                </div>
                {/* Step Content */}
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Animated Graphic */}
        <div className="lg:w-1/2 flex  flex-col items-center bg-white shadow-sm">
          <div className="relative w-full h-72 flex mt-19 mb-4 pb-15 inset-1 items-center justify-center">
            {/* Animated Rings */}
            <motion.div className="absolute border-2 border-blue-700 rounded-full w-48 h-48 animate-ping" />
            <motion.div
              className="absolute border-2 border-blue-400 rounded-full w-32 h-32 animate-ping"
              style={{ animationDelay: "0.1s" }} //0.2
            />
            <motion.div
              className="absolute border-2 border-blue-400 rounded-full w-24 h-24 animate-ping"
              style={{ animationDelay: "0.3s" }} //0.4
            />

            {/* Center Hand Icon */}
            <motion.div
              className="absolute text-blue-600 text-5xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <FaHandPaper />
            </motion.div>

            {/* Input Analysis Progress Bar */}
            <div
              ref={ref}
              className="mt-66 mb-3 mx-2 w-full inset-0  bg-white p-4 rounded-xl shadow-2xl"
            >
              <div className="flex justify-between">
                <span className="text-gray-800 text-sm tracking-tight font-bold mb-1 sm:mb-0">
                  INPUT ANALYSIS
                </span>

                {/* RIGHT SPAN */}
                <span className="text-green-700 text-sm tracking-tight font-bold mt-1 sm:mt-0 text-right">
                  {inView ? "98% CONFIDENCE" : "0%"}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-4 bg-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={controls}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
