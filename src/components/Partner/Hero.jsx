import React from "react";
import Navbar from "./Navbar"; // Assuming you have a Navbar component
import carrers from "../../assets/carrers/carrers.svg"; // Assuming correct path to your image
import { useLocation, useNavigate } from "react-router-dom";

const Hero = ({ HeroSectionText }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#FFF7F6] min-h-screen relative flex flex-col-reverse lg:flex-row items-center justify-between overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(130deg, rgba(253, 96, 55, 1) -10%, rgba(255, 247, 246, 1) 10%)`,
      }}
    >
      {/* Left Side Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start px-6 lg:px-16 py-12 lg:py-20">
        <div className="text-center lg:text-left">
          <span className="uppercase text-purple-600 text-sm md:text-lg font-bold">
            best place for
          </span>
          <h1 className="capitalize text-2xl md:text-2xl lg:text-2xl font-bold mt-4 ">
            {HeroSectionText.text1}
          </h1>
          <h3 className="capitalize text-lg md:text-xl lg:text-2xl text-gray-600 mt-3">
            {HeroSectionText.text2}
          </h3>
        </div>

        {/* Join Now Button */}
        <button
          className="bg-[#F56944] mt-8 w-33 md:w-44 lg:w-46 text-white rounded-lg px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base"
          onClick={() => navigate("/partner-form/personal-information")}
        >
          Join Now
        </button>

        {/* Stats Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-10 text-center lg:text-left">
          <div>
            <span className="text-2xl md:text-3xl lg:text-3xl font-semibold">
              250+
            </span>
            <p className="text-gray-500 capitalize mt-2">Verified Partners</p>
          </div>
          <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
            <span className="text-2xl md:text-3xl lg:text-3xl font-semibold">
              1500+
            </span>
            <p className="text-gray-500 capitalize mt-2">Happy Customers</p>
          </div>
          <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
            <span className="text-2xl md:text-3xl lg:text-3xl font-semibold">
              10+
            </span>
            <p className="text-gray-500 capitalize mt-2">Years experience</p>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <img
          className="w-full max-w-[1200px] lg:w-[600px] xl:w-[700px] h-auto object-cover"
          src={carrers}
          alt="Hero Image"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute z-10 right-10 lg:right-[200px] bottom-[50px] lg:bottom-[100px] rotate-[15deg] bg-[#ffe7e2] h-16 w-16"></div>
      <div className="absolute z-10 right-[150px] top-[200px] lg:top-[300px] rotate-[30deg] bg-[#ffe7e2] h-6 w-6"></div>
      <div className="absolute z-10 left-[100px] top-[100px] rotate-[30deg] bg-[#8937FF] h-6 w-6"></div>
    </div>
  );
};

export default Hero;
