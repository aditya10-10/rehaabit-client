import { GoStarFill } from "react-icons/go";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const ServiceCard = ({
  _id,
  serviceName,
  thumbnail,
  serviceDescription,
  price,
  timeToComplete,
  ratingAndReviews,
  avgRating,
  priceStatus,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();
  // console.log(pathname);
  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 w-full mx-auto mt-4 ${
        pathname === "/cart" ? "" : "max-w-2xl"
      }`}
    >
      <img
        src={thumbnail}
        alt="Service Thumbnail"
        className="h-44 w-48 rounded-lg border border-gray-300 object-cover sm:mr-6 mb-4 sm:mb-0 max-sm:w-full max-sm:h-44 max-sm:mt-2"
      />

      <div className="flex flex-col">
        <span className="text-2xl mb-2 text-purple-600">{serviceName}</span>

        {priceStatus === "priced" && (
          <div className="flex items-center mb-2 gap-2 text-xl">
            {avgRating && <GoStarFill className="text-yellow-400" />}
            <span>{avgRating}</span>
            <span>({ratingAndReviews?.length} reviews)</span>
          </div>
        )}
        {priceStatus === "priced" && (
          <div className="flex items-center mb-2">
            <span className="mr-2 text-emerald-600 text-2xl">₹{price}</span>
            <span className="text-gray-500">• {timeToComplete} min</span>
          </div>
        )}

        <span className="text-sm text-gray-500">
          {isExpanded
            ? serviceDescription
            : `${serviceDescription?.substring(0, 160)}`}
          {serviceDescription?.length > 160 && (
            <button onClick={handleReadMore} className="text-blue-500 ml-1">
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
