import React from "react";
import AcRepair from "../../assets/homepage/ACrepair.webp";
import Electrian from "../../assets/homepage/electrian.webp";
import Factory from "../../assets/homepage/factory.webp";
import Painting from "../../assets/homepage/painting.webp";
import Carpentry from "../../assets/homepage/carpentry.webp";
import Cleaning from "../../assets/homepage/cleaning.webp";
import { Button } from "@material-tailwind/react";

const Hero = ({ scrollToFeatures }) => {
  return (
    <section className="self-center  mt-0 w-full max-w-[1339px] max-md:mt-0 px-10 max-md:px-6 max-sm:px-4">
      <div className="flex gap-5 max-md:gap-0">
        <div className="flex w-[800px] flex-col">
          <div className="w-full">
            <div className="flex gap-5 max-md:gap-0">
              <div className="flex flex-col">
                <div className="flex flex-col grow">
                  <div className="flex gap-5 max-md:gap-0">
                    <div className="flex flex-col">
                      <img
                        loading="lazy"
                        src={AcRepair}
                        alt="Technician servicing an air conditioner unit on a wall"
                        className="grow"
                      />
                    </div>
                    <div className="flex flex-col ml-5">
                      <img
                        loading="lazy"
                        src={Factory}
                        alt="Smiling engineer in a hard hat and blue uniform with arms crossed"
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
                        alt="Painter applying white paint to a wall with a roller"
                        className="grow"
                      />
                    </div>
                    <div className="flex flex-col ml-5">
                      <img
                        loading="lazy"
                        src={Electrian}
                        alt="Electrician adjusting wires in an electrical panel"
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
                    alt="Carpenter working on a wooden board in a workshop"
                    className="grow"
                  />
                  <img
                    loading="lazy"
                    src={Cleaning}
                    alt="Cleaner mopping a wooden floor in a living room"
                    className="grow mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-sm:w-full bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 p-8 max-sm:p-4 rounded-lg shadow-lg">
          <div className="flex flex-col items-start px-5 font-semibold max-md:mt-10 max-sm:mt-0">
            <h1 className="text-5xl tracking-tight text-emerald-600 leading-[65px] max-md:text-4xl max-sm:text-lg font-bold font-roboto">
              <span className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent">
                Your Trusted Home Service Experts
              </span>
            </h1>

            {/* Responsive Paragraph: Hidden on small screens (phones), shown on medium and above */}
            <p className="text-gray-700 text-base mt-6 leading-relaxed max-md:text-sm max-sm:hidden">
              From small repairs to major renovations, our skilled professionals
              deliver reliable, high-quality services. Transform your home with
              peace of mind and excellence every time!
            </p>

            <div className="mt-8 max-sm:mt-1">
              <Button color="green" onClick={scrollToFeatures}>
                Book a Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
