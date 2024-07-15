import React from 'react';

const Hero = () => {
  return (
    <section className="self-center mt-16 w-full max-w-[1339px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
          <div className="grow max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[73%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
                  <div className="max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                      <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
                        <img loading="lazy" src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041452/Demo/Rectangle1_u6eckn.png" alt="Hero image 1" className="grow w-full aspect-[1.27] max-md:mt-6" />
                      </div>
                      <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
                        <img loading="lazy" src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041453/Demo/Rectangle4_myn66b.png" alt="Hero image 2" className="grow shrink-0 max-w-full aspect-[0.59] w-[193px] max-md:mt-6" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                      <div className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
                        <img loading="lazy" src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041453/Demo/Rectangle6_gejqy6.png" alt="Hero image 3" className="grow shrink-0 max-w-full aspect-[0.65] w-[213px] max-md:mt-4" />
                      </div>
                      <div className="flex flex-col ml-5 w-[65%] max-md:ml-0 max-md:w-full">
                        <img loading="lazy" src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041452/Demo/Rectangle2_nxjks7.png" alt="Hero image 4" className="grow w-full aspect-[1.23] max-md:mt-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-6">
                  <img loading="lazy" src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041452/Demo/Rectangle3_ezlosw.png" alt="Hero image 5" className="w-full aspect-[1.12]" />
                  <img loading="lazy" src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041453/Demo/Rectangle5_rewsjd.png" alt="Hero image 6" className="mt-3 w-full aspect-[0.54]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col self-stretch px-5 my-auto font-semibold max-md:mt-10">
            <h1 className="text-6xl tracking-tighter text-emerald-700 leading-[70px] text-ellipsis max-md:text-4xl max-md:leading-10">
              Transform Your Life with Rehaabit
            </h1>
            <button className="justify-center items-center px-6 py-3.5 mt-9 text-xl leading-8 text-center text-yellow-50 bg-violet-600 rounded-lg max-w-[360px] max-md:px-5">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;