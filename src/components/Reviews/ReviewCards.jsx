import React from "react";
import { GoStar, GoStarFill } from "react-icons/go";

const ReviewCards = ({ quote, name, imageSrc, rating }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index + 1 <= rating ? (
          <GoStarFill className="text-yellow-400" />
        ) : (
          <GoStar className="text-gray-400" />
        )}
      </span>
    ));
  };

  return (
    <div className="flex-shrink-0 w-full md:w-[calc(33.33%-20px)] mx-auto p-6 bg-yellow-100 rounded-[32px] max-md:px-4 max-sm:p-4">
      {/* Quote Section */}
      <p className="text-xl md:text-2xl leading-8 text-black">
        {quote || "No testimonial available."}
      </p>

      {/* User Info Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 items-center max-md:flex-wrap">
        <div className="flex flex-1 gap-4 max-md:flex-wrap items-center">
          {/* User Image */}
          {imageSrc && (
            <img
              loading="lazy"
              src={imageSrc}
              alt={name}
              className="w-16 h-16 md:w-[60px] md:h-[60px] rounded-full"
            />
          )}
          <div className="flex flex-col flex-1 justify-center my-auto">
            {/* User Name */}
            <h3 className="text-lg leading-7 text-black font-semibold">
              {name || "Anonymous"}
            </h3>

            {/* Star Ratings */}
            <div className="flex items-center gap-1 mt-1">
              {renderStars(rating)}
            </div>
          </div>
        </div>

        {/* Additional Icon or Decoration */}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e4be5f92c9bfdd4409bbb5059fd1e560d251670f9cb2a103320b52747845964?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
          alt=""
          className="shrink-0 my-auto w-10 h-10 md:w-12 md:h-12 aspect-[1.33] fill-emerald-700"
        />
      </div>
    </div>
  );
};

export default ReviewCards;
