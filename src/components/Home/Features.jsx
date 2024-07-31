import React from "react";
import { useSelector } from "react-redux";

const FeatureItem = ({ icon, name, description }) => (
  <div className="flex flex-col justify-center items-center text-center">
    <img
      loading="lazy"
      src={icon}
      alt="Category Icon"
      className="h-[100px] w-[100px] rounded-full"
    />
    <div className="mt-1 text-base leading-5 text-purple-950">
      {name} <br /> {description}
    </div>
  </div>
);

const Features = () => {
  const { categories } = useSelector((state) => state.categories);

  return (
    <div className="relative flex items-center justify-center px-20 max-md:px-10 max-sm:px-4">
      <div className="absolute w-48 h-48 bg-[#009F78] text-white font-bold text-xl rounded-[30px] -translate-y-[180px] rotate-12"></div>
      <div className="absolute w-24 h-24 bg-[#FFDA54] text-white font-bold text-xl rounded-[16px] translate-y-[80px] -translate-x-[500px] -rotate-[30deg]"></div>
      <div className="absolute w-72 h-72 bg-[#6200EE] text-white font-bold text-xl rounded-[16px] translate-y-[120px] translate-x-[400px] -rotate-[30deg]"></div>
      <div className="absolute w-24 h-48 bg-[#E86558] text-white font-bold text-xl rounded-[30px] translate-y-[380px] -rotate-[70deg]"></div>

      <section className="relative z-50 flex flex-col items-center justify-center self-center px-5 py-16 mt-40 bg-amber-100 rounded-3xl shadow-lg max-w-full md:px-20 md:w-[938px] max-md:mt-10">
        <h2 className="text-4xl font-bold text-center text-purple-950">
          Categories
        </h2>
        <div className="flex flex-wrap gap-5 justify-center content-center mt-6 max-w-full w-[676px]">
          {categories.map((feature) => (
            <FeatureItem key={feature._id} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
