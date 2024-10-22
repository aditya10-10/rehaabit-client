import React, { useRef } from "react";
import ReviewCards from "../Reviews/ReviewCards";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { testimonials } from "../../utils/testimonials";

const Testimonials = () => {
  const sliderRef = useRef(null);

  // Scroll logic to move left or right
  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -390 : 390,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="flex flex-col px-10 mt-40 w-full max-md:mt-10 max-md:max-w-full max-md:px-0 max-md:pl-4">
      <h2 className="text-6xl text-center text-violet-900 leading-[67.2px] max-md:max-w-full max-md:text-4xl">
        Client Testimonials
      </h2>
      <h1 className=" text-gray-600 max-sm:text-[22px] text-2xl text-center leading-[67.2px] max-md:max-w-full max-md:text-4xl">See What Client Say</h1>
      <div className="relative mt-10">
        <div
          ref={sliderRef}
          className="flex gap-4 justify-start self-center w-full flex-nowrap overflow-x-auto px-4 scrollbar-hide"
        >
          {testimonials?.map((review, index) => (
            <ReviewCards
              key={index}
              quote={review.review}
              name={review.name}
              rating={review.rating}
              imageSrc={""}
            />
          ))}
        </div>

        {/* Scroll Buttons */}
        <div className="flex gap-4 justify-center self-center mt-12 max-md:mt-10">
          <button
            className="flex justify-center items-center py-4 w-14 h-14 border border-violet-700 border-solid rounded-[56px]"
            aria-label="Previous testimonial"
            onClick={() => scroll("left")}
          >
            <IoIosArrowRoundBack className="w-full h-full text-violet-700" />
          </button>
          <button
            className="flex justify-center items-center py-4 w-14 h-14 bg-red-400 rounded-[56px]"
            aria-label="Next testimonial"
            onClick={() => scroll("right")}
          >
            <IoIosArrowRoundForward className="w-full h-full text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
