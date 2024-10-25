import React, { useEffect } from "react";
import rocket from "../assets/rocket_launch_flatline.webp";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Home/Footer";
import { Helmet } from "react-helmet-async";

const ComingSoon = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title> Coming Soon - Exciting Updates from Rehaabit </title>
        <meta
          name="description"
          content="Stay tuned! We're working on something exciting at Rehaabit. Check back soon for new features and updates that will enhance your home service experience."
        />
        <meta
          name="keywords"
          content="Rehaabit coming soon, new features, upcoming updates, home service improvements, Rehaabit updates, stay tuned, new services launch"
        />
      </Helmet>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-orange-50 p-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        {/* Container */}
        <div className="flex flex-col items-center text-center py-10 px-6 max-w-md w-full md:max-w-xl lg:max-w-2xl">
          {/* Rocket Image */}
          <div className="w-32 h-32 lg:w-48 lg:h-48 mb-6">
            <img
              src={rocket}
              alt="Lunching Soon"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title and Description */}
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            We're Working on This Page!
          </h1>
          <p className="text-gray-700 mb-8 text-sm lg:text-base">
            Our team is hard at work to bring you new features and updates.
            Please check back later!
          </p>

          {/* Button */}
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ComingSoon;
