import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

const ReviewsHeader = () => {
  const [animate, setAnimate] = useState(false);

  //   animation trigger after Page load
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
      <div className="w-full max-w-2xl mx-auto px-4 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 pt-5 leading-tight">
          Trusted by the Community
        </h1>

        <p className="text-gray-500 mt-3 text-sm sm:text-base md:text-lg leading-relaxed">
          See how SignWhispers is empowering the Deaf and Hard of Hearing
          community with seamless, real-time communication.
        </p>
      </div>

      {/* RIGHT RATING BOX */}
      <div className="bg-white border-none rounded-xl p-6 mt-5 shadow-sm w-full md:w-95 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-4xl font-bold">4.8</span>
            <div className="text-sm text-gray-500">out of 5</div>
          </div>

          <div>
            <div className="flex text-blue-600">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
            </div>
            <p className="text-sm text-gray-500">500+ verified reviews</p>
          </div>
        </div>

        {/* Rating Bars */}
        <div className="mt-4 space-y-2">
          {[80, 60, 40].map((width, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span>{5 - i}</span>

              <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out ${
                    animate ? `w-[${width}%]` : "w-0"
                  }`}
                  style={{ width: animate ? `${width}%` : "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsHeader;
