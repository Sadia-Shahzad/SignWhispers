import { FiChevronDown } from "react-icons/fi";

const LoadMoreButton = ({ onClick, disabled }) => {
  return (
    <div className="flex justify-center px-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          w-full sm:w-auto
          px-6 md:px-8
          py-3
          text-sm sm:text-base
          rounded-2xl font-medium
          flex items-center justify-center gap-2
          transition-all duration-200

          ${
            disabled
              ? "bg-blue-200 text-blue-400 cursor-not-allowed text-sm font-bold"
              : "bg-blue-500 text-white hover:bg-blue-700 active:scale-95 shadow-sm"
          }
        `}
      >
        <FiChevronDown className="text-lg" />
        {disabled ? "No More Reviews" : "Load More"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
