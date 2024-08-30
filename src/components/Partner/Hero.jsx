import Navbar from "./Navbar";
import image from "../../assets/partner/Hero.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Hero = ({ HeroSectionText }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="bg-[#FFF7F6] h-[950px] relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(130deg, rgba(253, 96, 55, 1) -10%, rgba(255, 247, 246, 1) 10%)`,
      }}
    >
      <Navbar />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(310deg, rgba(253, 96, 55, 1) -10%, rgba(255, 247, 246, 1) 10%)",
          mixBlendMode: "multiply",
          zIndex: 1, // Lower the z-index here
        }}
      ></div>

      <div className="flex relative">
        <div className="p-10 flex flex-col w-[38%] mt-20 z-20">
          {" "}
          {/* Raised z-index */}
          <div className="flex flex-col">
            <span className="uppercase text-purple-600 text-lg ml-2">
              best place for
            </span>
            <span className="capitalize text-6xl mb-6 font-lexend font-bold">
              {HeroSectionText.text1}
            </span>
            <span className="capitalize text-xl text-gray-600">
              {HeroSectionText.text2}
            </span>
          </div>
          <button
            className="bg-[#F56944] my-20 w-52 text-white rounded-lg px-6 py-3 z-30"
            onClick={() => navigate("/partner-form/personal-information")}
          >
            Join Now
          </button>
          <div className="flex gap-6">
            <div className="flex flex-col px-6 py-2">
              <span className="text-4xl font-semibold">110+</span>
              <span className="text-gray-500 capitalize">expert trainers</span>
            </div>

            <div className="flex flex-col border-l px-6 py-2">
              <span className="text-4xl font-semibold">1219+</span>
              <span className="text-gray-500 capitalize">Member joined</span>
            </div>

            <div className="flex flex-col border-l px-6 py-2">
              <span className="text-4xl font-semibold">10+</span>
              <span className="text-gray-500 capitalize">Years experience</span>
            </div>
          </div>
        </div>

        <div className="absolute z-10 right-0 top-0 translate-x-40 -translate-y-10">
          <img className="w-[110rem]" src={image} alt="HeroImage" />
        </div>

        <div className="absolute z-15 right-[260px] -rotate-[15deg] bg-[#ffe7e2] h-16 w-16"></div>

        <div className="absolute z-15 right-[700px] top-[300px] -rotate-[30deg] bg-[#ffe7e2] h-4 w-4"></div>

        <div className="absolute z-15 left-[600px] top-[100px] -rotate-[30deg] bg-[#8937FF] h-4 w-4"></div>
      </div>
    </div>
  );
};

export default Hero;
