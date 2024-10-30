import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal } from "../components";
import EnquireNowModal from "../components/Home/EnquireNowModal";

import {
  IoIosArrowRoundForward,
  IoIosArrowRoundBack,
  IoIosClose,
} from "react-icons/io";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import ServicesDetailsRatingCard from "./Reviews/ServicesDetailsRatingCard";
import { getFullServiceDetails ,getServiceRatingAndReviews} from "../slices/serviceSlice";
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
import { clearService } from "../slices/serviceSlice";
import ReviewCards from "../components/Reviews/ReviewCards";
import { setSingleOrder } from "../slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ShimmerEffect from './ShimmerEffect';

const ServiceDetailsModal = ({
  isServiceModalOpen,
  handleServiceModal,
  serviceId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //  console.log(isServiceModalOpen);
  const [activeId, setActiveId] = useState(null);
  const [onRemove, setOnRemove] = useState(null);
  const [page, setPage] = useState(1);
  const [ratingsAndReviews, setRatingsAndReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    dispatch(getFullServiceDetails({ serviceId }));
  }, [dispatch, serviceId, isServiceModalOpen]);
  // useEffect(() => {
  //   if (isServiceModalOpen) {
  //     setRatingsAndReviews([]);
  //     setPage(1);
  //     setHasMore(true);
  //     loadReviews(1);
  //   }
  // }, [isServiceModalOpen, serviceId]);

  // const loadReviews = async (pageNum) => {
  //   if (isLoading || !hasMore) return;
  //   setIsLoading(true);
  //   try {
  //     const result = await dispatch(getServiceRatingAndReviews({ serviceId, page: pageNum })).unwrap();
  //     const newReviews = result[0]?.data || [];
  //     const totalReviews = result[0]?.totalRatingAndReviews || 0;
      
  //     setRatingsAndReviews(prev => [...prev, ...newReviews]);
  //     setHasMore(ratingsAndReviews.length + newReviews.length < totalReviews);
  //   } catch (error) {
  //     console.error("Error loading reviews:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleLoadMore = () => {
  //   const nextPage = page + 1;
  //   setPage(nextPage);
  //   loadReviews(nextPage);
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isEnquireNowModalOpen, setIsEnquireNowModalOpen] = useState(false);
  const [serviceNameToPass, setServiceNameToPass] = useState(null);
  const { service, isLoading: serviceIsLoading } = useSelector((state) => state.service);
  // console.log(service);
  // const { serviceRatingAndReviews } = useSelector((state) => state.service);
  // console.log(serviceRatingAndReviews);
  // const ratingsAndreviews = serviceRatingAndReviews[0]?.data;

  // useEffect(() => {
  //   if (Array.isArray(ratingsAndreviews)) {
  //     setRatingsAndReviews(prevReviews => [...prevReviews, ...ratingsAndreviews]);
  //   }
  // }, [ratingsAndreviews]);

  // console.log(ratingsAndReviews);
  // const totalRatingAndReviews = serviceRatingAndReviews[0]?.totalRatingAndReviews;
  // console.log(totalRatingAndReviews);
  // console.log(ratingsAndReviews.length);
  const { categories } = useSelector((state) => state.categories);
  const { cartServices, isLoading: cartIsLoading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);

  const cartService = cartServices?.find(
    (service) => service?.serviceId === serviceId
  );
  const serviceQty = cartService ? cartService?.qty : 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 4 : service.ratingAndReviews.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < service.ratingAndReviews.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

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

  const handleCloseModal = () => {
    handleServiceModal();
    dispatch(clearService());
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };

  const handleEnquireNowModal = () => {
    setIsEnquireNowModalOpen(!isEnquireNowModalOpen);
  };
  //  console.log(hasMore)
  // console.log(ratingsAndReviews.length, totalRatingAndReviews);
  return (
    <>
      <ConfirmationModal text="Remove" onDelete={onRemove} />

      <EnquireNowModal
        isEnquireNowModalOpen={isEnquireNowModalOpen}
        handleEnquireNowModal={handleEnquireNowModal}
        serviceNameToPass={serviceNameToPass}
      />

      <AnimatePresence>
        {isServiceModalOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOutsideClick}
          >
            <IoIosClose
              size={30}
              className="bg-red-600  absolute top-4 right-4 text-white cursor-pointer"
              onClick={handleCloseModal}
            />
            <motion.div
              className="bg-white p-6 max-xs:p-0 rounded-lg shadow-lg w-1/3 max-2xl:w-1/2 max-xl:w-3/4 max-xs:w-11/12 max-h-[70vh] overflow-y-auto relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {serviceIsLoading || !service ? (
                <ShimmerEffect />
              ) : (
                <>
                  <Helmet>
                    <title>{service.serviceName}</title>
                    <meta name="description" content={service.serviceDescription} />
                  </Helmet>
                  <div className="flex flex-col items-center justify-center w-full px-10 max-lg:px-4">
                    {/* SERVICE OVERVIEW */}
                    <ServiceCard {...service} />

                    {/* BUTTONS */}
                    {/* BUTTONS */}
                    <div className="flex gap-2 justify-end w-full my-4">
                      {service.price === 0 ||
                      service.priceStatus === "non-priced" ? (
                        <button
                          className="bg-blue-400 px-4 py-2 rounded-md text-sm text-white"
                          onClick={() => {
                            setServiceNameToPass(service?.serviceName);
                            handleServiceModal();
                            handleEnquireNowModal();
                          }}
                        >
                          Enquire Now
                        </button>
                      ) : (
                        <>
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
                                  disabled={cartIsLoading}
                                  onClick={handleDecrease}
                                >
                                  -
                                </button>

                                <span className="mx-2 text-gray-500">
                                  {serviceQty}
                                </span>

                                <button
                                  className="border px-2 border-gray-400 rounded-full"
                                  disabled={cartIsLoading}
                                  onClick={handleIncrease}
                                >
                                  +
                                </button>

                                <button
                                  className="px-2 text-gray-600 hover:text-red-500"
                                  disabled={cartIsLoading}
                                  onClick={handleRemove}
                                >
                                  REMOVE
                                </button>
                              </>
                            ) : (
                              <button
                                className="bg-yellow-400 px-4 py-2 rounded-md text-sm"
                                disabled={cartIsLoading}
                                onClick={() => handleAddToCart(service)}
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    {/* SERVICE INCLUDES */}
                    {service?.includes?.length > 0 && (
                      <div className="shadow-custom-shadow rounded-xl p-6 max-xs:p-4 w-full mb-4">
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
                      </div>
                    )}

                    {/* SERVICE EXCLUDES */}
                    {service?.excludes?.length > 0 && (
                      <div className="shadow-custom-shadow rounded-xl p-6 max-xs:p-4 w-full mb-4">
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
                      </div>
                    )}

                    {/* HOW IT WORK? */}
                    {service?.howDoesItWorks?.length > 0 && (
                      <div className="shadow-custom-shadow rounded-xl p-6 max-xs:p-4 w-full">
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
                      </div>
                    )}

                    {/* WARRANTY DETAILS */}

                    {service?.warranty && service?.priceStatus !== "non-priced" && (
                      <div className="bg-[#E6F7F3] border-2 border-[#009F78] rounded-lg w-full mt-10 p-4">
                        <h1 className="text-[#006049] text-2xl max-xs:text-xl">
                          Warranty Details
                        </h1>
                        <span>{service.warranty}</span>
                      </div>
                    )}

                    {/* FAQ */}
                    {service?.faqs?.length > 0 && (
                      <div className="flex flex-col w-full mt-10">
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
                                        <div className="flex items-center">
                                          {isActive ? (
                                            <RiArrowDropUpLine size={30} />
                                          ) : (
                                            <RiArrowDropDownLine size={30} />
                                          )}
                                          {isActive && (
                                            <IoIosClose
                                              size={24}
                                              className="ml-2 text-red-500"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveId(null);
                                              }}
                                            />
                                          )}
                                        </div>
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
                      </div>
                    )}

                    {/* REVIEWS */}

                    {Array.isArray(service?.ratingAndReviews) &&
                      service?.ratingAndReviews?.length > 0 && (
                      <>
                        <div className="w-full mt-10">
                          <h1 className="text-2xl max-xs:text-xl text-purple-600">
                            Reviews
                          </h1>
                          <div className="">
                            {service?.ratingAndReviews?.map((review, index) => (
                              <ServicesDetailsRatingCard
                                key={index}
                                quote={review.review || "No review provided."}
                                name={`${review.user?.additionalDetails?.firstName || 'Anonymous'} ${review.user?.additionalDetails?.lastName || ''}`}
                                rating={review.rating || 0}
                                imageSrc={review.user?.image || ""}
                                date={review.date || "N/A"}
                                services={service.serviceName}
                              />
                            ))}
                          </div>
                        </div>
                        {/* {hasMore && (
                          <div className="flex justify-center items-center w-full mt-6">
                            <button 
                              // onClick={handleLoadMore}
                              disabled={isLoading}
                              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50"
                            >
                              {isLoading ? 'Loading...' : 'Load More Reviews'}
                            </button>
                          </div>
                        )} */}
                      </>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceDetailsModal;
