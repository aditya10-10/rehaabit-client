import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import ReviewCards from '../ReviewCards';

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
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 4 : testimonials.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < testimonials.length - 1 ? prevIndex + 4 : 0
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
    <section className="flex flex-col px-10 mt-40 w-full max-md:mt-10 max-md:max-w-full max-md:px-0 max-md:pl-4">
      <h2 className=" text-6xl text-center text-violet-900 leading-[67.2px] max-md:max-w-full max-md:text-4xl">
        Client Testimonials
      </h2>
      <p className=" mt-3 text-2xl leading-9 text-center text-purple-300 max-md:max-w-full">
        What Our Clients Say
      </p>

      <ReviewCards testimonials={testimonials} sliderRef={sliderRef} />

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
