import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      quote: "Their attention to detail and customer service are unmatched.",
      name: "John Smith",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
    {
      quote: "Exceptional service that exceeded our expectations.",
      name: "Jane Doe",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
    {
      quote: "Innovative solutions that transformed our business.",
      name: "Mike Johnson",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
    {
      quote: "Reliable and professional team that delivers results.",
      name: "Emily Brown",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
    {
      quote: "Outstanding support and cutting-edge technology.",
      name: "David Lee",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
    {
      quote: "Their attention to detail and customer service are unmatched.",
      name: "John Smith",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
    {
      quote: "Exceptional service that exceeded our expectations.",
      name: "Jane Doe",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
    {
      quote: "Innovative solutions that transformed our business.",
      name: "Mike Johnson",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
    {
      quote: "Reliable and professional team that delivers results.",
      name: "Emily Brown",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
    {
      quote: "Outstanding support and cutting-edge technology.",
      name: "David Lee",
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      // prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      prevIndex === 0 ? 0 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      // prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      prevIndex === testimonials.length - 1 ? testimonials.length - 1 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <section className="flex flex-col px-5 mt-12 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <h2 className=" text-6xl text-center text-violet-900 leading-[67.2px] max-md:max-w-full max-md:text-4xl">
        Client Testimonials
      </h2>
      <p className=" mt-3 text-2xl leading-9 text-center text-purple-300 max-md:max-w-full">
        What Our Clients Say
      </p>
      <div
        ref={sliderRef}
        className="mt-12 w-full overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[calc(33.33%-20px)] min-w-[300px]"
            >
              <div className="flex flex-col grow p-8 w-full bg-yellow-100 rounded-[32px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <p className="text-2xl leading-8 text-black max-md:max-w-full">
                  {testimonial.quote}
                </p>
                <div className="flex gap-2 mt-8 max-md:flex-wrap">
                  <div className="flex flex-1 gap-5 max-md:flex-wrap">
                    <img
                      loading="lazy"
                      src={testimonial.imageSrc}
                      alt={`${testimonial.name}'s profile`}
                      className="shrink-0 aspect-square w-[60px]"
                    />
                    <div className="flex flex-col flex-1 justify-center my-auto">
                      <p className="text-lg leading-7 text-black">
                        {testimonial.name}
                      </p>
                      <div className="flex gap-0.5 justify-center self-start mt-1">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0ccb9d1a7d8a897604381933b1e7538df860ec9ea0dfb4738edcbbf2aa64558?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
                            alt=""
                            className="shrink-0 w-4 aspect-square"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e4be5f92c9bfdd4409bbb5059fd1e560d251670f9cb2a103320b52747845964?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
                    alt=""
                    className="shrink-0 my-auto w-12 aspect-[1.33] fill-emerald-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 justify-center self-center mt-12 max-md:mt-10">
        <button
          className="flex justify-center items-center py-4 w-14 h-14 border border-violet-700 border-solid rounded-[56px]"
          aria-label="Previous testimonial"
          onClick={handlePrev}
        >
          <IoIosArrowRoundBack className="w-full h-full text-violet-700" />
        </button>
        <button
          className="flex justify-center items-center py-4 w-14 h-14 bg-red-400 rounded-[56px]"
          aria-label="Next testimonial"
          onClick={handleNext}
        >
          <IoIosArrowRoundForward className="w-full h-full text-white" />
        </button>
      </div>
    </section>
  );
};

export default TestimonialSection;