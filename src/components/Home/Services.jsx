import React from "react";
import { useSelector } from "react-redux";

const ServiceCard = ({ serviceName, serviceDescription, price, thumbnail }) => (
  <div className="flex flex-col justify-center items-start px-6 py-4 mt-8 bg-amber-50 rounded-xl shadow-sm max-md:px-5 max-md:max-w-full">
    <div className="flex gap-5">
      <img src={thumbnail} alt="Thumbnail" className="w-20 h-20 rounded-xl" />
      <div className="flex flex-col">
        <span className="text-lg font-medium text-black">{serviceName}</span>
        <span className="text-sm text-zinc-700">{serviceDescription}</span>
        <span className="text-sm text-zinc-700">₹ {price}</span>
        <div className="flex gap-1 pr-20 max-md:pr-5">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/77def546a5b9a453f43bcf17e7cfcafa7d2628c3913c17c926c78b99eed52269?apiKey=4aa4f4b9f3a34924a64c875e602547ca&"
              alt=""
              className="shrink-0 w-6 aspect-square fill-yellow-400"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const { allServices } = useSelector((state) => state.service);

  return (
    <section className="self-center mt-44 w-full px-20 max-w-[1064px] max-md:mt-10 max-md:max-w-full max-md:px-10 max-sm:px-2">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full max-md:hidden">
          <img
            loading="lazy"
            src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041453/Demo/Services_d3vxax.png"
            alt="Service illustration"
            className="mt-3 w-full aspect-[0.70] max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-4xl font-semibold text-center text-violet-700 max-md:max-w-full">
              Services{" "}
            </h2>
            {allServices.slice(0, 5).map((service) => (
              <ServiceCard key={service._id} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
