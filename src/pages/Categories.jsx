import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { showAllCategories } from "../slices/categorySlice";
import { getAllServices } from "../slices/serviceSlice";
import { Link, useParams } from "react-router-dom";
import { getSubCategoriesByCategory } from "../slices/subCategorySlice";
import { ServiceCard } from "../components";
import {
  addToCart,
  getAllCartServices,
  removeFromCart,
  updateCart,
} from "../slices/cartSlice";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const Categories = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const categoryName = params.category;
  const categoryId = params.id;

  const { subCategoriesByCategory } = useSelector(
    (state) => state.subcategories
  );
  const { allServices } = useSelector((state) => state.service);
  const { cartServices, isLoading } = useSelector((state) => state.cart);
  const categoryRefs = useRef({});

  useEffect(() => {
    dispatch(showAllCategories());
    dispatch(getAllServices());
    dispatch(getSubCategoriesByCategory({ categoryId }));
    dispatch(getAllCartServices());
  }, [dispatch, categoryId]);

  const handleCategoryClick = (subCategoryId) => {
    categoryRefs.current[subCategoryId]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (service) => {
    dispatch(
      addToCart({ serviceData: { ...service, qty: 1, serviceId: service._id } })
    );
  };

  const handleIncrease = (cartServiceId) => {
    dispatch(updateCart({ cartServiceId, action: "increment" }));
    console.log(cartServiceId);
  };

  const handleDecrease = (cartServiceId) => {
    dispatch(updateCart({ cartServiceId, action: "decrement" }));
    console.log(cartServiceId);
  };

  const handleRemove = (cartServiceId) => {
    dispatch(removeFromCart({ cartServiceId }));
  };

  const handleBuyNow = (service) => {
    console.log(service)
  }

  return (
    <>
      <div className="flex px-20 max-md:flex-col gap-5 max-lg:px-10 max-sm:px-4">
        <div className="w-[40%] max-md:w-full">
          <h1 className="text-5xl mb-10 max-sm:text-4xl">{categoryName}</h1>

          <div className="border-2 rounded-lg bg-gray-50 p-4 h-fit w-full">
            <h1 className="text-4xl text-center max-lg:text-2xl">
              Select Sub-Category
            </h1>

            <div className="grid grid-cols-3 p-2 gap-y-4 max-md:flex max-md:flex-nowrap max-md:overflow-x-auto w-full max-xl:grid-cols-2 max-lg:grid-cols-1 gap-x-24 max-2xl:gap-x-14">
              {subCategoriesByCategory.map((category) => {
                const { _id, subCategoryName, icon } = category;

                return (
                  <div
                    key={_id}
                    className="flex flex-col items-center justify-center text-center hover:shadow-custom-shadow p-2 rounded-lg bg-white cursor-pointer flex-shrink-0 max-md:w-[150px]"
                    onClick={() => handleCategoryClick(_id)}
                  >
                    <img
                      src={icon}
                      alt="Icon"
                      className="h-12 w-12 rounded-full"
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
              (service) => service.subCategoryId === _id
            );

            return services.length > 0 ? (
              <div
                key={_id}
                ref={(e) => (categoryRefs.current[_id] = e)}
                className="mb-8"
              >
                <h1 className="text-2xl mb-4 ml-6">{subCategoryName}</h1>

                <div className="grid grid-cols-1 p-2 gap-4 max-lg:gap-2 w-full">
                  {services.map((service) => {
                    const { _id, serviceName, thumbnail, serviceDescription } =
                      service;

                    const cartService = cartServices.find(
                      (service) => service.serviceId === _id
                    );
                    const serviceQty = cartService ? cartService.qty : 0;

                    return (
                      <div
                        key={_id}
                        className="flex items-start flex-col shadow-custom-shadow px-4 py-2 rounded-lg bg-white w-full"
                      >
                        <Link to={`/service-details/${_id}`} className="w-full">
                          <ServiceCard {...service} />
                        </Link>

                        <div className="flex gap-2 justify-end w-full mt-4">
                          <button className="bg-red-400 px-4 py-2 rounded-md text-sm text-white" onClick={() => handleBuyNow(service)}>
                            Buy Now
                          </button>

                          <div className="flex items-center">
                            {serviceQty > 0 ? (
                              <>
                                <button
                                  className="border px-2 border-gray-400 rounded-full"
                                  disabled={isLoading}
                                  onClick={() =>
                                    handleDecrease(cartService._id)
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
                                    handleIncrease(cartService._id)
                                  }
                                >
                                  +
                                </button>

                                <button
                                  className="px-2 text-gray-600 hover:text-red-500"
                                  disabled={isLoading}
                                  onClick={() => handleRemove(cartService._id)}
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
                      </div>
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
