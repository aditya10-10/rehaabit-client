import React from 'react';

const ServiceCard = ({ headline, description, price }) => (
  <div className="flex flex-col justify-center items-start px-6 py-4 mt-8 bg-amber-50 rounded-xl shadow-sm max-md:px-5 max-md:max-w-full">
    <div className="flex gap-5">
      <div className="shrink-0 w-20 h-20 rounded-xl bg-neutral-200" />
      <div className="flex flex-col">
        <div className="text-lg font-medium text-black">{headline}</div>
        <div className="text-sm text-zinc-700">{description}</div>
        <div className="flex gap-1 pr-20 max-md:pr-5">
          {[...Array(5)].map((_, i) => (
            <img key={i} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/77def546a5b9a453f43bcf17e7cfcafa7d2628c3913c17c926c78b99eed52269?apiKey=4aa4f4b9f3a34924a64c875e602547ca&" alt="" className="shrink-0 w-6 aspect-square fill-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const services = [
    { headline: "Headline", description: "Long Lorem ispum to accmulated\n₹ price of service" },
    { headline: "Headline", description: "Long Lorem ispum to accmulated\n₹ price of service" },
    { headline: "Headline", description: "Long Lorem ispum to accmulated\n₹ price of service" },
    { headline: "Headline", description: "Long Lorem ispum to accmulated\n₹ price of service" },
    { headline: "Headline", description: "Long Lorem ispum to accmulated\n₹ price of service" },
  ];

  return (
    <section className="self-center mt-44 w-full max-w-[1064px] max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <img loading="lazy" src="https://res.cloudinary.com/dn9wcfwr4/image/upload/v1721041453/Demo/Services_d3vxax.png" alt="Service illustration" className="mt-3 w-full aspect-[0.70] max-md:mt-10 max-md:max-w-full" />
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-5 max-md:mt-10 max-md:max-w-full">
            <h2 className="text-4xl font-semibold text-center text-violet-700 max-md:max-w-full">
              Dummy text Heading{" "}
            </h2>
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;