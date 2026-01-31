import { Link } from "react-router-dom";

const ReviewsCTASection = () => {
  return (
    <div className="bg-blue-600 text-white mt-8 py-12 px-6 sm:px-8 md:py-16 md:px-12 text-center rounded-2xl max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
        Join 10,000+ Satisfied Users
      </h2>

      <p className="text-blue-100 mt-3 text-sm sm:text-base md:text-lg leading-relaxed">
        Experience the difference real-time ASL translation can make in your
        daily communications
      </p>

      <Link
        to="/"
        className="inline-block mt-6 bg-white text-blue-600 px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
      >
        Get Started
      </Link>
    </div>
  );
};

export default ReviewsCTASection;
