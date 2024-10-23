import React from "react";
import { GoStar, GoStarFill } from "react-icons/go";

const ReviewCards = ({ quote, name, imageSrc, rating }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index + 1 <= rating ? (
          <GoStarFill className="text-yellow-400" />
        ) : (
          <GoStar className="text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <div className="flex-shrink-0 w-full md:w-[calc(33.33%-20px)] mx-5 p-6 bg-yellow-100 rounded-[32px] max-md:px-4 max-sm:p-4">
      {/* Quote Section */}
      <p className="text- md:text-lg leading-8 text-black mb-4 line-clamp-4">
        {quote || "No review provided."}
      </p>

      {/* User Info Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 items-center">
        <div className="flex items-center gap-4">
          {/* User Image */}
          {imageSrc && (
            <img
              loading="lazy"
              src={imageSrc}
              alt={name}
              className="w-16 h-16 md:w-[60px] md:h-[60px] rounded-full object-cover"
            />
          )}
          <div className="flex flex-col justify-center">
            {/* User Name */}
            <p className="text-lg font-semibold leading-7 text-black">
              {name || "Anonymous"}
            </p>

            {/* Star Ratings */}
            <div className="flex items-center gap-1 mt-1">
              {renderStars(rating)}
            </div>
          </div>
        </div>

        {/* Additional Icon */}
        <div className="ml-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e4be5f92c9bfdd4409bbb5059fd1e560d251670f9cb2a103320b52747845964?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
            alt="comma in reviews"
            className="w-10 h-10 md:w-12 md:h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCards;
