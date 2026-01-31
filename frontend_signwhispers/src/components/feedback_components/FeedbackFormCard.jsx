import { useState } from "react";
import { FaStar, FaUser, FaEnvelope } from "react-icons/fa";

const FeedbackFormCard = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Feedback submitted!\nRating: ${rating}\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.feedback}`,
    );
    setFormData({ name: "", email: "", feedback: "" });
    setRating(0);
  };

  return (
    <div className="bg-white max-w-lg mx-auto rounded-2xl shadow-lg border border-gray-200 p-6 mt-1 sm:p-8">
      {/* Star Rating */}
      <div className="mb-6 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
          Rate your experience
        </p>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <FaStar
                className={`w-6 h-6 transition-transform duration-200 ${
                  star <= (hover || rating)
                    ? "text-yellow-400 scale-125"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-sm outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-sm outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Your Feedback
          </label>
          <textarea
            name="feedback"
            placeholder="Tell us what you liked or what needs improvement..."
            value={formData.feedback}
            onChange={handleChange}
            maxLength={500}
            className="w-full text-sm border border-gray-300 rounded-lg p-3 h-28 resize-none outline-none"
            required
          ></textarea>
          <p className="text-right text-xs text-gray-400 mt-1">
            {formData.feedback.length}/500
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            className="text-sm text-gray-500 hover:underline"
            onClick={() => setFormData({ name: "", email: "", feedback: "" })}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg transition-shadow shadow-md"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackFormCard;
