import { GoStarFill } from "react-icons/go";

const ServiceCard = ({
  _id,
  serviceName,
  thumbnail,
  serviceDescription,
  price,
  timeToComplete,
}) => {
  return (
    <div className="flex max-sm:flex-col max-sm:justify-center max-sm:w-full w-full">
      <img
        src={thumbnail}
        alt="Icon"
        className="h-40 w-44 rounded-lg mr-4 mt-8 border-r-4 border-red-500 max-sm:w-full max-sm:h-44 max-sm:mt-2 max-sm:mr-0 max-sm:border-0"
      />

      <div className="flex flex-col">
        <span className="text-2xl mb-2 text-purple-600">{serviceName}</span>
        <div className="flex items-center mb-2 gap-2 text-xl">
          <GoStarFill className="text-yellow-400" />
          <span>4.5</span>
          <span>(4.17k reviews)</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="mr-2 text-emerald-600 text-2xl">₹{price}</span>
          <span className="text-gray-500">• {timeToComplete} min</span>
        </div>

        <span className="mb-1 text-gray-500">{serviceDescription}</span>
      </div>
    </div>
  );
};

export default ServiceCard;
