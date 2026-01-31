import FeedbackHeroHeader from "../components/feedback_components/FeedbackHeroHeader";
import FeedbackFormCard from "../components/feedback_components/FeedbackFormCard";

const FeedbackPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-blue-50 to-blue-100 p-7 px-4 sm:px-6 lg:px-8">
      <FeedbackHeroHeader />
      <FeedbackFormCard />
      <p className="text-center text-gray-400 text-xs mt-6">
        SignWhispers Inc. © 2023. Protected by reCAPTCHA and the Google Privacy
        Policy.
      </p>
    </div>
  );
};

export default FeedbackPage;
