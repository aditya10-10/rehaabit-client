import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAllCategories } from "../slices/categorySlice";
import { getAllServices } from "../slices/serviceSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSubCategoriesByCategory } from "../slices/subCategorySlice";
import { ConfirmationModal } from "../components";
import {
  addToCart,
  addCartToLocalStorage,
  getAllCartServices,
  removeFromCart,
  updateCart,
  removeServiceFromLocalStorage,
  updateCartInLocalStorage,
} from "../slices/cartSlice";
import { Helmet } from "react-helmet-async";
import { openModal } from "../slices/modalSlice";
import { setSingleOrder } from "../slices/orderSlice";
import EnquireNowModal from "../components/Home/EnquireNowModal";
import { ServiceCard } from "../components/Dashboard/Service";
import ServiceDetailsModal from "../components/ServiceDetailsModal";

// REACT QUERY
import { useQuery } from "@tanstack/react-query";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 
  const params = useParams();
  const categoryId = params.id;
  const { scrollTo, subCategoryId, serviceId } = location.state || {};

  const [onRemove, setOnRemove] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceIdToPass, setServiceIdToPass] = useState(null);
  const [isEnquireNowModalOpen, setIsEnquireNowModalOpen] = useState(false);

  const { subCategoriesByCategory } = useSelector(
    (state) => state.subcategories
  );
  const { allServices } = useSelector((state) => state.service);
  const { cartServices, isLoading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { categories } = useSelector((state) => state.categories);
  console.log(categories);
  console.log(subCategoriesByCategory)
  console.log(categories);
  console.log(categoryId);
  const categoryName = categories.find(
    (category) => category.slugName === categoryId
  );
  console.log(categoryName);
  <Helmet>
    <title>{categoryName?.name} | Rehaabit</title>
    <meta name="description" content={`Explore ${categoryName?.name} services at Rehaabit`} />
    <link rel="canonical" href={`/${categoryId}`} />
  </Helmet>

  const categoryRefs = useRef({});
  const serviceRefs = useRef({});

  // Function to update URL without page reload
  const updateUrl = (newPath, state = {}) => {
    navigate(newPath, { replace: true, state });
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      const scrollToTop = () => {
        window.scrollTo(0, 0);
      };
      setTimeout(scrollToTop, 0);
      return () => clearTimeout(scrollToTop);
    }
  }, []);

  useEffect(() => {
    dispatch(getSubCategoriesByCategory({ categoryId }));
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (scrollTo === "subcategory" && subCategoryId) {
      categoryRefs.current[subCategoryId]?.scrollIntoView({
        behavior: "smooth",
      });
    }
    if (scrollTo === "service" && serviceId && allServices.length > 0) {
      serviceRefs.current[serviceId]?.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollTo, subCategoryId, serviceId, allServices]);

  const handleCategoryClick = (subCategoryId, subCategoryName) => {
    categoryRefs.current[subCategoryId]?.scrollIntoView({ behavior: "smooth" });
    
    // Update URL when clicking on a subcategory
    const newUrl = `/${categoryId}?subCategory=${subCategoryName}`;
    updateUrl(newUrl);
  };

  const handleAddToCart = (service) => {
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

  const handleIncrease = (cartServiceId, service) => {
    if (user) {
      dispatch(updateCart({ cartServiceId, action: "increment" }));
    } else {
      dispatch(
        updateCartInLocalStorage({
          serviceId: service._id,
          acTion: "increment",
        })
      );
    }
  };

  const handleDecrease = (cartServiceId, service) => {
    if (user) {
      dispatch(updateCart({ cartServiceId, action: "decrement" }));
    } else {
      dispatch(
        updateCartInLocalStorage({
          serviceId: service._id,
          acTion: "decrement",
        })
      );
    }
  };

  const handleRemove = (cartServiceId, service) => {
    const removeHandler = () => {
      if (user) {
        dispatch(removeFromCart({ cartServiceId }));
      } else {
        dispatch(removeServiceFromLocalStorage({ serviceId: service._id }));
      }
    };

    setOnRemove(() => removeHandler);
    dispatch(openModal("removeConfirmation"));
  };

  const handleBuyNow = (service) => {
    dispatch(
      setSingleOrder({
        ...service,
        qty: 1,
        totalCost: service.price,
        serviceId: service._id,
      })
    );
    navigate("/checkout");
  };

  const handleServiceModal = () => {
    setIsServiceModalOpen(!isServiceModalOpen);
  };

  // Function to open the Service Details Modal
  const handleServiceModalOpen = (serviceId, serviceName) => {
    setServiceIdToPass(serviceId);
    setIsServiceModalOpen(true);
    
    // Update URL when opening service modal
    const newUrl = `/${categoryId}?service=${serviceName}`;
    updateUrl(newUrl);
  };

  // Function to close the Service Details Modal
  const handleServiceModalClose = () => {
    setIsServiceModalOpen(false);
    
    // Revert URL when closing service modal
    updateUrl(`/${categoryId}`);
  };

  // Function to open the Enquire Now Modal
  const handleEnquireNowModalOpen = (service) => {
    setServiceIdToPass(service._id);
    setIsEnquireNowModalOpen(true);
    
    // Update URL when opening Enquire Now modal
    const newUrl = `/${categoryId}?service=${service.serviceName}`;
    updateUrl(newUrl);
  };

  // Function to close the Enquire Now Modal
  const handleEnquireNowModalClose = () => {
    setIsEnquireNowModalOpen(false);
    
    // Revert URL when closing Enquire Now modal
    updateUrl(`/${categoryId}`);
  };


  return (
    <>
      {isServiceModalOpen && (
        <ServiceDetailsModal
          isServiceModalOpen={isServiceModalOpen}
          handleServiceModal={handleServiceModal}
          serviceId={serviceIdToPass}
        />
      )}

      {!isServiceModalOpen && (
        <ConfirmationModal text="Remove" onDelete={onRemove} />
      )}

      <EnquireNowModal
        isEnquireNowModalOpen={isEnquireNowModalOpen}
        handleEnquireNowModal={handleEnquireNowModalClose}
        serviceIdToPass={serviceIdToPass}
      />

      <div className="flex px-20 max-md:flex-col gap-5 max-lg:px-10 max-sm:px-4">
        <div className="w-[40%] max-md:w-full">
          <h1 className="text-5xl mb-10 max-sm:text-4xl">
            {categoryName?.name}
          </h1>

          <div className="border-2 rounded-lg bg-gray-50 p-4 h-fit w-full">
            <p className="text-4xl text-center max-lg:text-2xl mb-10">
              Select Sub-Category
            </p>

            <div className="grid grid-cols-3 p-2 gap-y-4 max-md:flex max-md:flex-nowrap max-md:overflow-x-auto w-full max-xl:grid-cols-2 max-lg:grid-cols-1 gap-x-20 max-2xl:gap-x-14">
              {subCategoriesByCategory.map((category) => {
                const { _id, subCategoryName, icon } = category;

                return (
                  <div
                    key={_id}
                    className="flex flex-col items-center justify-center text-center hover:shadow-custom-shadow p-2 rounded-lg bg-white cursor-pointer flex-shrink-0 max-md:w-[150px]"
                    onClick={() => handleCategoryClick(_id, subCategoryName)}
                    ref={(e) => (categoryRefs.current[_id] = e)}
                  >
                    <img
                      src={icon}
                      alt={subCategoryName}
                      className="h-20 w-20 rounded-full"
                    />
                    <span>{subCategoryName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-2 rounded-lg p-4 w-[60%] max-lg:w-[90%] max-md:w-full h-[75vh] overflow-y-auto">
          {subCategoriesByCategory.map((category) => {
            const { _id, subCategoryName } = category;

            const services = allServices.filter(
              (service) =>
                service.subCategoryId === _id && service.status !== "Draft"
            );

            return services.length > 0 ? (
              <div
                key={_id}
                ref={(e) => (categoryRefs.current[_id] = e)}
                className="mb-8"
              >
                <h3 className="text-2xl mb-4 ml-6">{subCategoryName}</h3>

                <div className="grid grid-cols-1 p-2 gap-4 max-lg:gap-2 w-full">
                  {services.map((service) => {
                    const {
                      _id,
                      serviceName,
                      thumbnail,
                      serviceDescription,
                      priceStatus,
                      status,
                    } = service;

                    const cartService = cartServices.find(
                      (service) => service.serviceId === _id
                    );
                    const serviceQty = cartService ? cartService.qty : 0;

                    return (
                      status !== "Draft" && (
                        <div
                          key={_id}
                          ref={(e) => (serviceRefs.current[_id] = e)}
                          className="flex items-start flex-col shadow-custom-shadow px-4 py-2 rounded-lg bg-white w-full"
                        >
                          <div
                            className="w-full cursor-pointer"
                            onClick={() => {
                              setIsServiceModalOpen(!isServiceModalOpen);
                              setServiceIdToPass(_id);
                            }}
                          >
                            <ServiceCard {...service} />
                          </div>

                          <div className="flex gap-2 justify-end w-full mt-4">
                            {priceStatus === "priced" ? (
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
                                        disabled={isLoading}
                                        onClick={() =>
                                          handleDecrease(
                                            cartService._id,
                                            service
                                          )
                                        }
                                      >
                                        -
                                      </button>

                                      <span className="mx-2 text-gray-500">
                                        {serviceQty}
                                      </span>

                                      <button
                                        className="border px-2 border-gray-400 rounded-full"
                                        disabled={isLoading}
                                        onClick={() =>
                                          handleIncrease(
                                            cartService._id,
                                            service
                                          )
                                        }
                                      >
                                        +
                                      </button>

                                      <button
                                        className="px-2 text-gray-600 hover:text-red-500"
                                        disabled={isLoading}
                                        onClick={() =>
                                          handleRemove(cartService._id, service)
                                        }
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
                              </>
                            ) : (
                              <button
                                className="bg-blue-400 px-4 py-2 rounded-md text-sm text-white"
                                onClick={() =>
                                  handleEnquireNowModalOpen(service)
                                } // Open Enquire Now Modal
                              >
                                Enquire Now
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
