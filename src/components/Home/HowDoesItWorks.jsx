import React from "react";

const StepItem = ({ title, description }) => (
  <div className="flex flex-col grow text-2xl font-semibold leading-8 text-violet-900 max-md:mt-10">
    <div className="text-ellipsis">{title}</div>
    <div className="mt-1 text-sm leading-6 text-emerald-900 text-ellipsis">
      {description}
    </div>
  </div>
);

const HowDoesItWorks = () => {
  const steps = [
    { title: "Book a Service", description: "Choose your desired service." },
    { title: "Confirm Details", description: "We verify all the details." },
    { title: "Enjoy the Service", description: "Sit back and relax." },
    { title: "Rate Us", description: "Give feedback on the service." },
  ];

  return (
    <div className="relative flex items-center justify-center px-20 max-md:px-10 max-sm:px-4">
      <div className="absolute w-48 h-72 text-white font-bold text-xl rounded-[30px] bg-[#009F78] -translate-x-[480px] translate-y-8 rotate-[105deg]"></div>

      <div className="absolute w-52 h-52 text-white font-bold text-xl rounded-[30px] bg-[#FFDA54] translate-y-[260px] -translate-x-[100px] rotate-[105deg]"></div>

      <div className="absolute w-48 h-48 text-white font-bold text-xl rounded-[16px] bg-[#6200EE] translate-y-[240px] translate-x-[500px] rotate-[30deg]"></div>

      <div className="absolute w-44 h-44 text-white font-bold text-xl rounded-[30px] bg-[#E86558] translate-x-[200px] translate-y-[1px] -rotate-[70deg]"></div>

      <section className="self-center p-12 mt-72 w-full bg-amber-100 shadow-sm max-w-[1118px] rounded-[30px] max-md:px-5 max-md:mt-10 max-md:max-w-full z-50">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center py-2.5 text-center max-w-[480px] rounded-[30px] max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a076d3b863a18df35e42f72c3af0d96f1aea7f7923578c2f50c360ed3239eda?apiKey=4aa4f4b9f3a34924a64c875e602547ca&"
                alt="How it works illustration"
                className="self-center max-w-full aspect-[1.25] w-[153px]"
              />
              <h2 className="mt-1.5 text-4xl font-black leading-10 text-violet-900 text-ellipsis max-md:max-w-full">
                How Rehaabit Works
              </h2>
              <p className="mt-1.5 text-lg leading-7 text-emerald-900 max-md:max-w-full">
                Simple steps to get started.
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full max-md:items-center max-md:text-center">
            <div className="flex-wrap grow content-center rounded-[30px] max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <StepItem {...steps[0]} />
                  <StepItem {...steps[1]} />
                </div>
                <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                  <StepItem {...steps[2]} />
                  <StepItem {...steps[3]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowDoesItWorks;
