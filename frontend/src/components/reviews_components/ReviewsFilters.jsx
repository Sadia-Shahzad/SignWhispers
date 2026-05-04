const filters = ["All Reviews", "Most Recent", "5 Stars", "4 Stars"];

const ReviewsFilters = ({ active, setActive }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActive(f)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition border-none shadow-sm
            ${
              active === f
                ? "bg-black text-white"
                : "bg-white border text-gray-600 hover:bg-gray-100"
            }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default ReviewsFilters;
