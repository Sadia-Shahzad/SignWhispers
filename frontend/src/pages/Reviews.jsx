
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReviewsHeader from "../components/reviews_components/ReviewsHeader";
import ReviewsFilters from "../components/reviews_components/ReviewsFilters";
import ReviewsGrid from "../components/reviews_components/ReviewsGrid";
import LoadMoreButton from "../components/reviews_components/LoadMoreButton";
import ReviewsCTASection from "../components/reviews_components/ReviewsCTASection";

const Reviews = () => {
  // --- States ---
  const [allApprovedReviews, setAllApprovedReviews] = useState([]); // Database se aane wale reviews
  const [activeFilter, setActiveFilter] = useState("All Reviews");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  // --- 1. Fetch Logic (Backend Se Data Lena) ---
  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const response = await axios.get("http://localhost:8000/feedback/approved");
        
        // Backend data ko purane UI ke format mein map karna
        const formattedData = response.data.map(r => ({
          name: r.name,
          initials: r.name.charAt(0).toUpperCase(),
          text: r.feedback_text,
          date: new Date(r.created_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          }),
          stars: r.rating,
        }));
        
        setAllApprovedReviews(formattedData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApproved();
  }, []);

  // --- 2. Filter & Sort Logic (Wahi Purana) ---
  const filteredReviews = allApprovedReviews.filter((r) => {
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // --- 3. UI Render (Exact Purana Wala) ---
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl px-4 mx-auto mt-1 md:px-6 py-8 space-y-10">
        <ReviewsHeader />
        
        <ReviewsFilters active={activeFilter} setActive={setActiveFilter} />

        {filteredReviews.length === 0 ? (
          <p className="text-center font-bold text-gray-500 py-10">
            No approved reviews found for this filter.
          </p>
        ) : (
          <>
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
          </>
        )}
      </div>

      <ReviewsCTASection />
    </div>
  );
};

export default Reviews;