import { useState, useContext, useEffect } from "react";
import { FaStar, FaUser, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext"; // Path check karlein
import api from "../../api/axios"; // Axios instance

const FeedbackFormCard = () => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form submit handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // --- FRONTEND VALIDATIONS (Same as Backend) ---
    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }
    if (feedbackText.trim().length < 10) {
      setError("Feedback must be at least 10 characters long.");
      return;
    }
    if (feedbackText.trim().length > 500) {
      setError("Feedback cannot exceed 500 characters.");
      return;
    }

    try {
      const response = await api.post("/feedback", {
        rating: rating,
        feedback_text: feedbackText,
      });

      if (response.status === 200) {
        setSuccess(true);
        setFeedbackText("");
        setRating(0);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong. Are you logged in?");
    }
  };

  if (!user) {
    return (
      <div className="bg-white max-w-lg mx-auto rounded-2xl shadow-lg p-8 text-center mt-10 border border-gray-200">
        <p className="text-gray-600 font-medium">Please login to share your feedback.</p>
        <button 
          onClick={() => window.location.href = "/signin"}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-lg mx-auto rounded-2xl shadow-lg border border-gray-200 p-6 mt-1 sm:p-8">
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm text-center">
          Thank you! Your feedback has been submitted successfully.
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      {/* Star Rating */}
      <div className="mb-6 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Rate your experience</p>
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
                  star <= (hover || rating) ? "text-yellow-400 scale-125" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Read-only User Info */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
            <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 cursor-not-allowed">
              <FaUser className="text-gray-400 mr-2" />
              <input type="text" value={user.name} className="w-full text-sm outline-none bg-transparent" disabled />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 cursor-not-allowed">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input type="email" value={user.email} className="w-full text-sm outline-none bg-transparent" disabled />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Your Feedback</label>
          <textarea
            placeholder="Tell us what you liked or what needs improvement..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg p-3 h-28 resize-none outline-none focus:border-blue-500 transition"
            required
          ></textarea>
          <p className={`text-right text-xs mt-1 ${feedbackText.length < 10 ? 'text-red-400' : 'text-gray-400'}`}>
            {feedbackText.length}/500 (Min. 10 chars)
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            className="text-sm text-gray-500 hover:underline"
            onClick={() => { setFeedbackText(""); setRating(0); setError(""); }}
          >
            Clear
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


