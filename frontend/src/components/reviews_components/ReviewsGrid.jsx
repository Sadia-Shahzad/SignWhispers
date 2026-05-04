import { FaStar } from "react-icons/fa";

// Bright color combinations
const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-pink-100 text-pink-600",
  "bg-yellow-100 text-yellow-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-orange-100 text-orange-600",
];

const ReviewsGrid = ({ reviews }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {reviews.map((r, i) => {
        const colorClass = avatarColors[i % avatarColors.length]; // rotate colors

        return (
          <div
            key={i}
            className="bg-white p-4 md:p-5 border-none rounded-xl shadow-sm flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                {/* Avatar */}
                <div
                  className={`${colorClass} w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base`}
                >
                  {r.initials}
                </div>

                <div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {r.name}
                  </h3>
                  <div className="flex text-blue-600 text-xs md:text-sm">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < r.stars ? "text-blue-600" : "text-gray-300"
                          }
                        />
                      ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                {r.text}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 text-xs">
              <span className="text-gray-400">{r.date}</span>
              <span className="bg-green-200 text-green-600 px-3 py-1 rounded-full whitespace-nowrap">
                Verified User
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsGrid;
