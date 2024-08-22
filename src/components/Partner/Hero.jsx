import Navbar from "./Navbar";

import image from "../../assets/partner/Hero.svg";

const Hero = () => {
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
          mixBlendMode: "multiply", // or overlay, screen, etc., depending on the desired effect
          zIndex: 2,
        }}
      ></div>

      <div className="flex relative">
        <div className="p-10 flex flex-col w-[38%] mt-20">
          <div className="flex flex-col">
            <span className="uppercase text-purple-600 text-lg ml-2">
              best place for
            </span>
            <span className="capitalize text-6xl mb-6 font-lexend font-bold">
              transform your expertise into income!
            </span>
            <span className="capitalize text-xl text-gray-600">
              Join rehaabit today - where home service
            </span>
            <span className="capitalize text-xl text-gray-600">
              Pros connect with clients effortlessly
            </span>
          </div>

          <div className="my-20 w-52">
            <button className="bg-[#F56944] w-full text-white rounded-lg px-6 py-3">
              Join Now
            </button>
          </div>

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

        <div className="absolute z-40 right-0 top-0 translate-x-40 -translate-y-10">
          <img className="w-[110rem]" src={image} alt="HeroImage" />
        </div>

        <div className="absolute z-50 right-[260px] -rotate-[15deg] bg-[#ffe7e2] h-16 w-16"></div>

        <div className="absolute z-50 right-[700px] top-[300px] -rotate-[30deg] bg-[#ffe7e2] h-4 w-4"></div>

        <div className="absolute z-50 left-[600px] top-[100px] -rotate-[30deg] bg-[#8937FF] h-4 w-4"></div>
      </div>
    </div>
  );
};

export default Hero;
