import React from "react";
import { Link } from "react-router-dom";
import Error from "../assets/404.svg";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl text-center">
        {/* Main text */}
        <h1 className="text-5xl font-bold text-gray-800">Ooops...</h1>
        <h2 className="text-3xl font-semibold text-gray-600 mt-4">
          Page not found
        </h2>
        <p className="text-gray-500 mt-2">
          A massa, interdum pretium, ut sit est nec. Convallis fames proin lacus
          cras.
        </p>

        {/* Image */}
        <div className="mt-8">
          <img
            className="mx-auto w-72 md:w-96"
            src={Error} // Replace with your correct image source
            alt="Page not found illustration"
          />
        </div>

        {/* Back button */}
        <div className="mt-6">
          <Link
            to="/"
            className="bg-red-500 text-white py-2 px-6 rounded-full inline-flex items-center hover:bg-red-600"
          >
            Go Back <span className="ml-2">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
