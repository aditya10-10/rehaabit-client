import React from "react";

const Hero = () => {
  return (
    <section className="self-center mt-16 w-full max-w-[1339px] max-md:mt-10 px-10 max-md:px-6 max-sm:px-4">
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
                        src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041452/Demo/Rectangle1_u6eckn.png"
                        alt="HeroImage 1"
                        className="grow"
                      />
                    </div>
                    <div className="flex flex-col ml-5">
                      <img
                        loading="lazy"
                        src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041453/Demo/Rectangle4_myn66b.png"
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
                        src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041453/Demo/Rectangle6_gejqy6.png"
                        alt="HeroImage 3"
                        className="grow"
                      />
                    </div>
                    <div className="flex flex-col ml-5">
                      <img
                        loading="lazy"
                        src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041452/Demo/Rectangle2_nxjks7.png"
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
                    src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041452/Demo/Rectangle3_ezlosw.png"
                    alt="HeroImage 5"
                    className="grow"
                  />
                  <img
                    loading="lazy"
                    src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041453/Demo/Rectangle5_rewsjd.png"
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
            <h1 className="text-6xl tracking-tighter text-emerald-700 leading-[70px] text-ellipsis max-md:text-5xl max-md:leading-10 max-sm:text-2xl">
              Transform Your Life with Rehaabit
            </h1>
            <button className="justify-center items-center px-6 py-3.5 mt-9 text-xl leading-8 text-center text-yellow-50 bg-violet-600 rounded-lg max-w-[360px] max-md:px-5 max-sm:px-2 max-sm:text-sm max-sm:mt-2">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
