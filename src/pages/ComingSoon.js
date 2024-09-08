import React from "react";
import rocket from "../assets/rocket_launch_flatline.svg";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-orange-50 p-4">
      {/* Container */}
      <div className="flex flex-col items-center text-center py-10 px-6 bg-white rounded-lg shadow-md max-w-md w-full md:max-w-xl lg:max-w-2xl">
        {/* Rocket Image */}
        <div className="w-32 h-32 lg:w-48 lg:h-48 mb-6">
          <img
            src={rocket}
            alt="Rocket"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title and Description */}
        <h1 className="text-2xl lg:text-3xl font-bold mb-4">
          We're Working on This Page!
        </h1>
        <p className="text-gray-700 mb-8 text-sm lg:text-base">
          Our team is hard at work to bring you new features and updates. Please
          check back later!
        </p>

        {/* Button */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
