import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRatingAndReviewsWithUserNames } from "../../slices/ratingAndReviewsSlice";
import ReviewCards from "../Reviews/ReviewCards";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const Testimonials = () => {
  const dispatch = useDispatch();
  const { ratingAndReviews, isLoading, error } = useSelector(
    (state) => state.ratingAndReviews
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(getAllRatingAndReviewsWithUserNames());
  }, [dispatch]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 4 : ratingAndReviews.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < ratingAndReviews.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

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
        <div ref={sliderRef} className="overflow-hidden">
          <div className="flex">
            {Array.isArray(ratingAndReviews) && ratingAndReviews.length > 0 ? (
              ratingAndReviews.map((review, index) => {
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
        </div>

        <div className="flex gap-4 justify-center self-center mt-12 max-md:mt-10">
          <button
            className="flex justify-center items-center py-4 w-14 h-14 border border-violet-700 border-solid rounded-[56px]"
            aria-label="Previous testimonial"
            onClick={handlePrev}
          >
            <IoIosArrowRoundBack className="w-full h-full text-violet-700" />
          </button>
          <button
            className="flex justify-center items-center py-4 w-14 h-14 bg-red-400 rounded-[56px]"
            aria-label="Next testimonial"
            onClick={handleNext}
          >
            <IoIosArrowRoundForward className="w-full h-full text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
