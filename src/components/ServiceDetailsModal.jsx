import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal } from "../components";

import {
  IoIosArrowRoundForward,
  IoIosArrowRoundBack,
  IoIosClose,
} from "react-icons/io";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

import { getFullServiceDetails } from "../slices/serviceSlice";
import {
  addCartToLocalStorage,
  addToCart,
  removeFromCart,
  removeServiceFromLocalStorage,
  updateCart,
  updateCartInLocalStorage,
} from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";
import HIWCard from "./HIWCard";
import { ServiceCard } from "./Dashboard/Service";
import ReviewCards from "../components/Reviews/ReviewCards";
import { setSingleOrder } from "../slices/orderSlice";
import { useNavigate } from "react-router-dom";

const ServiceDetailsModal = ({
  isServiceModalOpen,
  handleServiceModal,
  serviceId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState(null);
  const [onRemove, setOnRemove] = useState(null);

  useEffect(() => {
    dispatch(getFullServiceDetails({ serviceId }));
  }, [dispatch, serviceId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { service } = useSelector((state) => state.service);
  const { categories } = useSelector((state) => state.categories);
  const { cartServices, isLoading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);

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
    if (user) {
      dispatch(
        addToCart({
          serviceData: { ...service, qty: 1, serviceId: service._id },
        })
      );
    } else {
      dispatch(
        addCartToLocalStorage({
          serviceData: { ...service, qty: 1, serviceId: service._id },
        })
      );
    }
  };

  const handleIncrease = () => {
    if (user) {
      dispatch(
        updateCart({ cartServiceId: cartService._id, action: "increment" })
      );
    } else {
      dispatch(
        updateCartInLocalStorage({
          serviceId: service._id,
          acTion: "increment",
        })
      );
    }
  };

  const handleDecrease = () => {
    if (user) {
      dispatch(
        updateCart({ cartServiceId: cartService._id, action: "decrement" })
      );
    } else {
      dispatch(
        updateCartInLocalStorage({
          serviceId: service._id,
          acTion: "decrement",
        })
      );
    }
  };

  const handleRemove = () => {
    const removeHandler = () => {
      if (user) {
        dispatch(removeFromCart({ cartServiceId: cartService._id }));
      } else {
        dispatch(removeServiceFromLocalStorage({ serviceId: service._id }));
      }
    };

    setOnRemove(() => removeHandler);
    dispatch(openModal("removeConfirmation"));
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleBuyNow = (service) => {
    dispatch(
      setSingleOrder({
        ...service,
        qty: 1,
        totalCost: service.price,
        serviceId: service._id,
      })
    );
    handleServiceModal();
    navigate("/checkout");
  };

  return (
    <>
      <ConfirmationModal text="Remove" onDelete={onRemove} />

      <AnimatePresence>
        {isServiceModalOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 max-xs:p-4 rounded-lg shadow-lg w-1/3 max-2xl:w-1/2 max-xl:w-3/4 max-xs:w-11/12 max-h-[70vh] overflow-y-auto relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={handleServiceModal}
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full"
              >
                <IoIosClose size={24} />
              </button>

              <div className="flex flex-col items-center justify-center w-full px-10 max-lg:px-4">
                {/* SERVICE OVERVIEW */}
                <ServiceCard {...service} />

                {/* BUTTONS */}
                <div className="flex gap-2 justify-end w-full my-4">
                  <button
                    className="bg-red-400 px-4 py-2 rounded-md text-sm text-white"
                    onClick={() => handleBuyNow(service)}
                  >
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

                {/* SERVICE INCLUDES */}
                {service?.includes?.length > 0 && <div className="shadow-custom-shadow rounded-xl p-6 max-xs:p-4 w-full mb-4">
                  <h1 className="text-2xl max-xs:text-xl text-purple-600">
                    Service Includes
                  </h1>

                  <div className="flex flex-col">
                    {service?._id &&
                      service?.includes.length >= 1 &&
                      service?.includes.map((include) => {
                        const { _id, content } = include;

                        return <span key={_id}>{content}</span>;
                      })}
                  </div>
                </div>}

                {/* SERVICE EXCLUDES */}
                {service?.excludes?.length > 0 && <div className="shadow-custom-shadow rounded-xl p-6 max-xs:p-4 w-full mb-4">
                  <h1 className="text-2xl max-xs:text-xl text-purple-600">
                    Service does not includes
                  </h1>

                  <div className="flex flex-col">
                    {service?._id &&
                      service?.excludes.length >= 1 &&
                      service?.excludes.map((exclude) => {
                        const { _id, content } = exclude;

                        return <span key={_id}>{content}</span>;
                      })}
                  </div>
                </div>}

                {/* HOW IT WORK? */}
                {service?.howDoesItWorks?.length > 0 && <div className="shadow-custom-shadow rounded-xl p-6 max-xs:p-4 w-full">
                  <h1 className="text-2xl max-xs:text-xl text-purple-600">
                    How It Work?
                  </h1>

                  <div className="flex flex-col">
                    {service?._id &&
                      service?.howDoesItWorks.length >= 1 &&
                      service?.howDoesItWorks.map((howDoesItWork) => {
                        return <HIWCard {...howDoesItWork} />;
                      })}
                  </div>
                </div>}

                {/* WARRANTY DETAILS */}
                <div className="bg-[#E6F7F3] border-2 border-[#009F78] rounded-lg w-full mt-10 p-4">
                  <h1 className="text-[#006049] text-2xl max-xs:text-xl">
                    Warranty Details
                  </h1>

                  <span>{service.warranty}</span>
                </div>

                {/* REVIEWS */}
                <div className="flex flex-col w-full mt-10">
                  <h1 className="text-2xl max-xs:text-xl text-purple-600">
                    Reviews
                  </h1>

                  <ReviewCards
                    testimonials={testimonials}
                    sliderRef={sliderRef}
                  />

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
                {service?.faqs?.length > 0 && <div className="flex flex-col w-full mt-10">
                  <h1 className="text-2xl max-xs:text-xl text-purple-600">
                    Frequently Asked Questions
                  </h1>
                  {service?.faqs && service?.faqs.length > 0 && (
                    <div className="flex flex-col gap-5 w-full p-6 max-xs:p-2 mt-4">
                      {service?._id &&
                        service?.faqs.length >= 1 &&
                        service?.faqs.map((faq) => {
                          const { _id, question, answer } = faq;
                          const isActive = activeId === _id;

                          return (
                            <div key={_id} className="flex w-full">
                              <button
                                onClick={() =>
                                  setActiveId(isActive ? null : _id)
                                }
                                className="flex flex-col items-center w-full bg-gray-50 p-2 transition-all duration-300 rounded-lg border"
                              >
                                <div className="flex justify-between items-center w-full">
                                  <span>{question}</span>
                                  {isActive ? (
                                    <RiArrowDropUpLine size={30} />
                                  ) : (
                                    <RiArrowDropDownLine size={30} />
                                  )}
                                </div>

                                <div
                                  className={`overflow-hidden transition-max-height duration-300 ease-in-out text-start w-full ${
                                    isActive ? "max-h-96" : "max-h-0"
                                  }`}
                                >
                                  <span className="text-start mt-4 text-gray-600">
                                    {answer}
                                  </span>
                                </div>
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceDetailsModal;
