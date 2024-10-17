import React from "react";
import AcRepair from "../../assets/homepage/ACrepair.webp";
import Electrian from "../../assets/homepage/electrian.webp";
import Factory from "../../assets/homepage/factory.webp";
import Painting from "../../assets/homepage/painting.webp";
import Carpentry from "../../assets/homepage/carpentry.webp";
import Cleaning from "../../assets/homepage/cleaning.webp";

const Hero = () => {
  return (
    <section className="self-center mt-0 w-full max-w-[1339px] max-md:mt-0 px-10 max-md:px-6 max-sm:px-4">
      <div className="flex gap-5 max-md:gap-0">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="flex gap-5 max-md:gap-0">
              <div className="flex flex-col">
                <div className="flex flex-col grow">
                  <div className="flex gap-5 max-md:gap-0">
                    <div className="flex flex-col">
                      <img
                        loading="lazy"
                        src={AcRepair}
                        alt="HeroImage 1"
                        className="grow"
                      />
                    </div>
                    <div className="flex flex-col ml-5">
                      <img
                        loading="lazy"
                        src={Factory}
                        alt="HeroImage 2"
                        className="grow"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex gap-5 max-md:gap-0">
                    <div className="flex flex-col">
                      <img
                        loading="lazy"
                        src={Painting}
                        alt="HeroImage 3"
                        className="grow"
                      />
                    </div>
                    <div className="flex flex-col ml-5">
                      <img
                        loading="lazy"
                        src={Electrian}
                        alt="HeroImage 4"
                        className="grow"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 max-md:hidden">
                <div className="flex flex-col grow">
                  <img
                    loading="lazy"
                    src={Carpentry}
                    alt="HeroImage 5"
                    className="grow"
                  />
                  <img
                    loading="lazy"
                    src={Cleaning}
                    alt="HeroImage 6"
                    className="grow mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-sm:w-full">
          <div className="flex flex-col self-stretch px-5 my-auto font-semibold max-md:mt-10 max-sm:mt-0">
            <h1 className="text-5xl tracking-tighter text-emerald-500 leading-[70px] text-ellipsis max-md:text-5xl max-md:leading-10 max-sm:text-3xl font-serif">
              <span className="font-bold text-emerald-500">
                Your Trusted Partner
              </span>
              <br />
              <span className="font-light text-black">
                for All Home Services
              </span>
            </h1>
            <p
              className="text-gray-600 text-sm mt-4 leading-relaxed max-md:text-base max-sm:text-sm hidden md:block"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              <span className="text-purple-700 font-medium">
                From quick repairs to complete renovations,
              </span>{" "}
              we've got you covered with skilled professionals and reliable
              service. Experience
              <span className="font-semibold text-red-500">
                {" "}
                quality
              </span> and{" "}
              <span className="font-semibold text-red-500">
                peace of mind
              </span>{" "}
              for your home!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
