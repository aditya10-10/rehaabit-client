import React,{useState} from "react";
import { GoStarFill } from "react-icons/go";

const ServicesDetailsRatingCard = ({
  quote,
  name,
  imageSrc,
  rating,
  date,
  services,
}) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index + 1 <= rating ? (
          <GoStarFill className="text-green-600" />
        ) : (
          <GoStarFill className="text-gray-300" />
        )}
      </span>
    ));
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-xl mx-auto">
      {/* User Info */}
      <div className="flex justify-between items-center mb-2">
        {/* User Name */}
        <h3 className="text-lg font-semibold text-gray-800">
          {name || "Anonymous"}
        </h3>

        {/* Review Date */}
        <p className="text-sm text-gray-500">{formatDate(date) || "N/A"}</p>
      </div>

      {/* Services Section */}
      <p className="text-sm text-gray-500 mb-4">
        {services || "No services specified."}
      </p>

      {/* Review Text and Star Rating in the same row */}
      <div className="flex justify-between items-center">
        {/* Review Text */}
        <p className="text-base text-gray-700 flex-1">
          {!quote && "No testimonial available."}
          {isExpanded ? quote : `${quote.substring(0, 110)}`}
          {quote.length > 110 && (
            <button
            onClick={handleReadMore}
            className="text-blue-500 ml-1"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
          )}
        </p>

        {/* Star Rating */}
        <div className="flex items-center ml-4">
          <span className="text-lg font-semibold text-green-600">{rating}</span>
          <div className="ml-2 flex">{renderStars(rating)}</div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetailsRatingCard;
