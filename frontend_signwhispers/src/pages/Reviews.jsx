import { useState } from "react";
import ReviewsHeader from "../components/reviews_components/ReviewsHeader";
import ReviewsFilters from "../components/reviews_components/ReviewsFilters";
import ReviewsGrid from "../components/reviews_components/ReviewsGrid";
import LoadMoreButton from "../components/reviews_components/LoadMoreButton";
import ReviewsCTASection from "../components/reviews_components/ReviewsCTASection";

const allReviews = [
  {
    name: "Sarah Jenkins",
    initials: "SJ",
    text: "This app has completely changed how I communicate during my morning stand-ups. The real-time translation is incredibly fast and captures the context perfectly.",
    date: "Oct 12, 2023",
    stars: 5,
  },
  {
    name: "Emily R.",
    initials: "ER",
    text: "Great tool, very helpful. Occasional lag on my older laptop, but the team support was super responsive and helped me optimize my settings.",
    date: "Sep 28, 2023",
    stars: 5,
  },
  {
    name: "Michael Chen",
    initials: "MC",
    text: "Incredible accuracy for a desktop app. I use it daily for client meetings. It’s rare to find accessible tech that feels this polished.",
    date: "Oct 10, 2023",
    stars: 4,
  },
  {
    name: "David Smith",
    initials: "DS",
    text: "Finally, a tool that understands the nuances of ASL syntax. It doesn’t just translate words, it translates meaning. Highly recommended!",
    date: "Sep 15, 2023",
    stars: 4,
  },
  {
    name: "Jessica L.",
    initials: "JL",
    text: "Lifesaver for remote work. The interface is clean and easy to use. It integrates well with my other desktop tools.",
    date: "Sep 02, 2023",
    stars: 5,
  },
  {
    name: "Marcus T.",
    initials: "MT",
    text: "Good performance. Would love a native dark mode option soon, but the white theme is very clean and high contrast.",
    date: "Aug 20, 2023",
    stars: 4,
  },
  {
    name: "Anna K.",
    initials: "AK",
    text: "Easy to use and very intuitive. The support team helped me get started quickly.",
    date: "Aug 15, 2023",
    stars: 5,
  },
  {
    name: "Tom H.",
    initials: "TH",
    text: "Reliable and fast. My team loves it for daily standups.",
    date: "Aug 10, 2023",
    stars: 4,
  },
  {
    name: "Linda P.",
    initials: "LP",
    text: "Amazing features and smooth interface. Highly recommend.",
    date: "Aug 05, 2023",
    stars: 5,
  },
  {
    name: "Robert W.",
    initials: "RW",
    text: "Perfect for remote teams. Saves a lot of time.",
    date: "Aug 01, 2023",
    stars: 4,
  },
  {
    name: "Sophia L.",
    initials: "SL",
    text: "Very responsive support and excellent performance.",
    date: "Jul 28, 2023",
    stars: 5,
  },
  {
    name: "Mark D.",
    initials: "MD",
    text: "Simple, effective, and reliable.",
    date: "Jul 25, 2023",
    stars: 4,
  },
  {
    name: "Olivia G.",
    initials: "OG",
    text: "Great app with all the necessary features.",
    date: "Jul 20, 2023",
    stars: 5,
  },
  {
    name: "James C.",
    initials: "JC",
    text: "Excellent tool for team collaboration.",
    date: "Jul 15, 2023",
    stars: 4,
  },
  {
    name: "Mia F.",
    initials: "MF",
    text: "I love it! Makes meetings so much easier.",
    date: "Jul 10, 2023",
    stars: 5,
  },
];

const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState("All Reviews");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredReviews = allReviews.filter((r) => {
    if (activeFilter === "5 Stars") return r.stars === 5;
    if (activeFilter === "4 Stars") return r.stars === 4;
    return true;
  });

  if (activeFilter === "Most Recent") {
    filteredReviews.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const allShown = visibleCount >= filteredReviews.length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl px-4 mx-auto mt-1 md:px-6 py-8 space-y-10">
        <ReviewsHeader />
        <ReviewsFilters active={activeFilter} setActive={setActiveFilter} />
        <ReviewsGrid reviews={visibleReviews} />

        <LoadMoreButton
          onClick={() => setVisibleCount((prev) => prev + 3)}
          disabled={allShown}
        />

        {allShown && (
          <p className="text-center font-bold text-sm text-gray-500">
            You’ve reached the end of the reviews
          </p>
        )}
      </div>

      <ReviewsCTASection />
    </div>
  );
};

export default Reviews;
