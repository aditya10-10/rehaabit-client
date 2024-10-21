import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import careers from "../../assets/carrers/carrers.webp";
import HeroImage from "../../assets/partner/Hero.webp";

const JoinRehaabitFamily = ({ JoinRehaabitFamilyText, type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="absolute w-full z-40 -top-40 flex items-center justify-center max-lg:-top-28 max-md:-top-20 max-sm:-top-10">
      <div className="flex rounded-3xl h-[368px] w-[1144px] bg-[#8937FF] max-xl:w-[900px] max-lg:w-[700px] max-md:w-[600px] max-sm:w-[90%] max-md:flex-col max-md:h-auto max-md:gap-6 max-md:p-4">
        {/* Text Section */}
        <div className="flex flex-col gap-10 p-10 max-md:gap-6 max-md:p-6 max-sm:p-4 max-xs:p-3">
          <h1 className="text-white font-bold text-4xl capitalize max-xl:text-3xl max-md:text-2xl max-sm:text-xl">
            Join the Rehaabit Family
          </h1>

          <p className="text-lg text-white max-xl:text-base max-md:text-sm max-sm:text-xs">
            {JoinRehaabitFamilyText.text1}
          </p>

          <div>
            <button
              className="bg-orange-700 capitalize rounded-lg py-2 px-6 max-md:py-2 max-md:px-5 max-sm:py-1 max-sm:px-4 text-base max-md:text-sm max-sm:text-xs"
              onClick={() => navigate("/partner-form/personal-information")}
            >
              Join Now
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative flex items-center justify-center max-md:mt-6">
          <div className="absolute top-0 right-40 z-0 max-xl:right-28 max-lg:right-16 max-md:right-8 max-sm:right-4">
            {/* Decorative Background Shapes */}
            <div className="h-20 w-60 bg-[#974dff] rounded-br-full rounded-tl-full max-xl:w-48 max-xl:h-16 max-lg:w-36 max-lg:h-14 max-md:w-28 max-md:h-12 max-sm:w-20 max-sm:h-10"></div>
            <div className="h-20 w-60 bg-[#974dff] rounded-br-full rounded-tl-full mt-[-10px] max-xl:w-48 max-xl:h-16 max-lg:w-36 max-lg:h-14 max-md:w-28 max-md:h-12 max-sm:w-20 max-sm:h-10"></div>
            <div className="h-20 w-60 bg-[#974dff] rounded-br-full rounded-tl-full mt-[-10px] max-xl:w-48 max-xl:h-16 max-lg:w-36 max-lg:h-14 max-md:w-28 max-md:h-12 max-sm:w-20 max-sm:h-10"></div>
          </div>

          <div className="relative z-10">
            <img
              src={pathname === "/partner" ? HeroImage : careers}
              alt={type === "partner" ? "Partner" : "Careers"}
              className="relative z-10 w-[113rem] -top-20 max-xl:w-[80rem] max-lg:w-[60rem] max-md:w-[40rem] max-sm:w-[30rem] max-xs:w-[90%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRehaabitFamily;
