import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCallback } from "react";

const FeatureItem = ({ icon, name, description }) => (
  <div className="flex flex-col justify-center items-center text-center">
    <img
      loading="lazy"
      src={icon}
      alt="Category Icon"
      className="h-[100px] w-[100px] rounded-full max-md:h-[80px] max-md:w-[80px]"
    />
    <div className="mt-1 text-base leading-5 text-purple-950">
      <h3>{name}</h3>
    </div>
  </div>
);

const Features = () => {
  const { categories } = useSelector((state) => state.categories);

  const createSlug = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  return (
    <div className="relative flex items-center justify-center px-20 max-md:px-10 max-sm:px-4">
      <div className="absolute w-48 h-48 bg-[#009F78] text-white font-bold text-xl rounded-[30px] rotate-12 top-[96px] max-md:top-[40px]"></div>
      <div className="absolute w-24 h-24 bg-[#FFDA54] text-white font-bold text-xl rounded-[16px] -rotate-[30deg] left-[384px] max-md:left-[280px]"></div>
      <div className="absolute w-72 h-72 bg-[#6200EE] text-white font-bold text-xl rounded-[16px] -rotate-[30deg] right-[384px] top-[288px]"></div>
      <div className="absolute w-24 h-48 bg-[#E86558] text-white font-bold text-xl rounded-[30px] -rotate-[70deg] top-[510px] max-md:top-[384px]"></div>

      <section className="relative z-30 flex flex-col items-center justify-center self-center px-5 py-16 mt-40 bg-amber-100 rounded-3xl shadow-lg max-w-full md:px-20 md:w-[938px] max-md:mt-20">
        <h2 className="text-4xl font-semibold text-center text-violet-700 max-md:max-w-full">
          Our Services
        </h2>
        <div className="grid grid-cols-4 max-sm:grid-cols-3 gap-5 mt-6 max-w-full w-[676px]">
          {categories?.map((feature) => (
            <Link key={feature?._id} to={`${createSlug(feature?.name)}`}>
              <FeatureItem {...feature} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
