import React from "react";

const HeaderSection = () => {
  return (
    <div className="my-6">
      {/* Hero section */}
      <div className="text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Detailed Translation History
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base md:text-lg">
          Comprehensive overview of your translation history records.
        </p>
      </div>
    </div>
  );
};

export default HeaderSection;
