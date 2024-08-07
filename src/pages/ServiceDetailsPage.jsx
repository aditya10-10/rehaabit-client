import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getFullServiceDetails } from "../slices/serviceSlice";
import { ReviewCards, ServiceCard } from "../components";
import Navbar from "../components/Navbar";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import FAQ from "../assets/faq.svg";
import { addToCart, removeFromCart, updateCart } from "../slices/cartSlice";

const ServiceDetailsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const serviceId = params.id;

  const [showInfo, setShowInfo] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    dispatch(getFullServiceDetails({ serviceId }));
  }, [dispatch, serviceId]);

  const { service } = useSelector((state) => state.service);
  const { categories } = useSelector((state) => state.categories);
  const { cartServices, isLoading } = useSelector((state) => state.cart);

  const cartService = cartServices.find(
    (service) => service.serviceId === serviceId
  );
  const serviceQty = cartService ? cartService.qty : 0;

  const testimonials = [
    {
      quote: "Their attention to detail and customer service are unmatched.",
      name: "John Smith",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&",
    },
    {
      quote: "Exceptional service that exceeded our expectations.",
      name: "Jane Doe",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&",
    },
    {
      quote: "Innovative solutions that transformed our business.",
      name: "Mike Johnson",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&",
    },
    {
      quote: "Reliable and professional team that delivers results.",
      name: "Emily Brown",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&",
    },
    {
      quote: "Outstanding support and cutting-edge technology.",
      name: "David Lee",
      imageSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f3096cc0e65c499f92866c157674c95caa62f07ef5f037db9eb05ea7d269f923?apiKey=14bc5a83475145d8890ac8c4aa074f6f&",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

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

  const handleAddToCart = () => {
    dispatch(
      addToCart({ serviceData: { ...service, qty: 1, serviceId: service._id } })
    );
  };

  const handleIncrease = () => {
    dispatch(
      updateCart({ cartServiceId: cartService._id, action: "increment" })
    );
  };

  const handleDecrease = () => {
    dispatch(
      updateCart({ cartServiceId: cartService._id, action: "decrement" })
    );
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ cartServiceId: cartService._id }));
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full px-20 max-lg:px-10">
        {/* SERVICE OVERVIEW */}
        <ServiceCard {...service} />

        {/* BUTTONS */}
        <div className="flex gap-2 justify-end w-full mt-4">
          <button className="bg-red-400 px-4 py-2 rounded-md text-sm text-white">
            Buy Now
          </button>

          <div className="flex items-center">
            {serviceQty > 0 ? (
              <>
                <button
                  className="border px-2 border-gray-400 rounded-full"
                  disabled={isLoading}
                  onClick={handleDecrease}
                >
                  -
                </button>

                <span className="mx-2 text-gray-500">{serviceQty}</span>

                <button
                  className="border px-2 border-gray-400 rounded-full"
                  disabled={isLoading}
                  onClick={handleIncrease}
                >
                  +
                </button>

                <button
                  className="px-2 text-gray-600 hover:text-red-500"
                  disabled={isLoading}
                  onClick={handleRemove}
                >
                  REMOVE
                </button>
              </>
            ) : (
              <button
                className="bg-yellow-400 px-4 py-2 rounded-md text-sm"
                disabled={isLoading}
                onClick={() => handleAddToCart(service)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* SERVICE DETAILS & INCLUSIONS */}
        <div className="flex justify-evenly w-full mt-10 gap-10 max-sm:flex-col">
          <div className="shadow-custom-shadow rounded-xl p-6 w-full">
            <h1 className="text-2xl text-purple-600">Service Details</h1>

            <div className="flex flex-col">
              <span>
                • Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, exercitationem!
              </span>
              <span>
                • Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, exercitationem!
              </span>
              <span>
                • Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia, exercitationem!
              </span>
            </div>
          </div>
          <div className="shadow-custom-shadow rounded-xl p-6 w-full">
            <h1 className="text-2xl text-purple-600">Inclusions</h1>

            <div className="flex flex-col">
              {service?._id &&
                service?.includes.length >= 1 &&
                service?.includes.map((include) => {
                  const { _id, content } = include;

                  return <span key={_id}>{content}</span>;
                })}
            </div>
          </div>
        </div>

        {/* HOW DOES IT WORK? & EXCLUSIONS */}
        <div className="flex justify-evenly w-full mt-10 gap-10 max-sm:flex-col">
          <div className="shadow-custom-shadow rounded-xl p-6 w-full">
            <h1 className="text-2xl text-purple-600">How Does It Work?</h1>

            <div className="flex flex-col">
              {service?._id &&
                service?.howDoesItWorks.length >= 1 &&
                service?.howDoesItWorks.map((howDoesItWork) => {
                  const { _id, point } = howDoesItWork;

                  return <span key={_id}>{point}</span>;
                })}
            </div>
          </div>
          <div className="shadow-custom-shadow rounded-xl p-6 w-full">
            <h1 className="text-2xl text-purple-600">Exclusions</h1>

            <div className="flex flex-col">
              {service?._id &&
                service?.excludes.length >= 1 &&
                service?.excludes.map((exclude) => {
                  const { _id, content } = exclude;

                  return <span key={_id}>{content}</span>;
                })}
            </div>
          </div>
        </div>

        {/* WARRANTY DETAILS */}
        <div className="bg-[#E6F7F3] border-2 border-[#009F78] rounded-lg w-full mt-10 p-4">
          <h1 className="text-[#006049] text-2xl">Warranty Details</h1>

          <span>{service.warranty}</span>
        </div>

        {/* REVIEWS */}
        <div className="flex flex-col w-full mt-10">
          <h1 className="text-2xl text-purple-600">Reviews</h1>

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
        </div>

        {/* FAQ */}
        <div className="flex justify-center gap-40 w-full mt-20 max-xl:gap-20 max-lg:gap-5 max-md:flex-col max-md:mt-10">
          <img
            src={FAQ}
            alt="FAQ"
            className="h-96 w-[40rem] max-xl:w-[30rem] max-lg:w-[20rem] max-md:w-full"
          />

          <div className="flex flex-col gap-5 w-[40%] max-xl:w-[50%] max-lg:w-full shadow-custom-shadow rounded-lg p-6">
            {service?._id &&
              service?.faqs.length >= 1 &&
              service?.faqs.map((faq) => {
                const { _id, question, answer } = faq;

                return (
                  <div key={_id} className="flex w-full rounded-lg border">
                    <button
                      onClick={() => {
                        setShowInfo(!showInfo);
                        setActiveId(_id);
                      }}
                      className="flex flex-col items-center w-full bg-gray-50 p-2 transition-all duration-300"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span>{question}</span>
                        {showInfo && activeId === _id ? (
                          <RiArrowDropUpLine size={30} />
                        ) : (
                          <RiArrowDropDownLine size={30} />
                        )}
                      </div>

                      {showInfo && activeId === _id && (
                        <span className="text-start mt-4 text-gray-600 w-full">
                          {answer}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-col w-full mt-10 mb-10">
          <h1 className="text-2xl text-purple-600">Select Category</h1>

          <div className="grid grid-cols-6 p-2 gap-4 max-md:grid-cols-3 w-full max-xl:grid-cols-4 max-sm:grid-cols-2 justify-center mt-6">
            {categories.map((category) => {
              const { _id, name, icon } = category;

              return (
                <Link key={_id} to={`/${name}/${_id}`}>
                  <div className="flex flex-col items-center justify-center text-center hover:shadow-custom-shadow px-2 py-6 rounded-lg bg-white cursor-pointer flex-shrink-0 max-md:w-[150px]">
                    <img
                      src={icon}
                      alt="Icon"
                      className="h-20 w-20 rounded-lg"
                    />
                    <span>{name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailsPage;
