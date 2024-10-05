import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRatingAndReviewsWithUserNames } from "../../slices/ratingAndReviewsSlice";
import ReviewCards from "../Reviews/ReviewCards";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const Testimonials = () => {
  const dispatch = useDispatch();
  const {
    ratingAndReviews = [],
    isLoading,
    error,
  } = useSelector((state) => state.ratingAndReviews);

  const withReviews = Array.isArray(ratingAndReviews)
    ? ratingAndReviews.filter(
        (ratingAndReview) => ratingAndReview.review !== ""
      )
    : [];

  // State to keep track of modal's current index
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(getAllRatingAndReviewsWithUserNames());
  }, [dispatch]);

  // Scroll logic to move left or right
  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -390 : 390, // Adjust scrolling distance as needed
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex flex-col px-10 mt-40 w-full max-md:mt-10 max-md:max-w-full max-md:px-0 max-md:pl-4">
      <h2 className="text-6xl text-center text-violet-900 leading-[67.2px] max-md:max-w-full max-md:text-4xl">
        Client Testimonials
      </h2>
      <div className="relative mt-10">
        <div
          ref={sliderRef}
          className="flex gap-4 justify-start self-center w-full flex-nowrap overflow-x-auto px-4 scrollbar-hide"
        >
          {Array.isArray(ratingAndReviews) && ratingAndReviews.length > 0 ? (
            withReviews.slice(0, 5).map((review, index) => {
              const { additionalDetails } = review.user || {};
              const firstName = additionalDetails?.firstName || "Anonymous";
              const lastName = additionalDetails?.lastName || "";

              return (
                <ReviewCards
                  key={index}
                  quote={review.review || "No review provided."}
                  name={`${firstName} ${lastName}`}
                  rating={review.rating}
                  imageSrc={""} // Provide a valid `imageSrc` if needed
                />
              );
            })
          ) : (
            <div>No reviews available</div>
          )}
        </div>

        {/* Scroll Buttons */}
        <div className="flex gap-4 justify-center self-center mt-12 max-md:mt-10">
          <button
            className="flex justify-center items-center py-4 w-14 h-14 border border-violet-700 border-solid rounded-[56px]"
            aria-label="Previous testimonial"
            onClick={() => scroll("left")} // Scroll left
          >
            <IoIosArrowRoundBack className="w-full h-full text-violet-700" />
          </button>
          <button
            className="flex justify-center items-center py-4 w-14 h-14 bg-red-400 rounded-[56px]"
            aria-label="Next testimonial"
            onClick={() => scroll("right")} // Scroll right
          >
            <IoIosArrowRoundForward className="w-full h-full text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
