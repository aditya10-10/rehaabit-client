import React, { useEffect, useState } from "react";
import {
  AddressForm,
  AddressList,
  LoginSignup,
  PriceDetailsCard,
} from "../components/Cart";
import { ConfirmationModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCartServices,
  removeFromCart,
  updateCart,
  updateCartFromLocalStorage,
} from "../slices/cartSlice";
import { FaCheck } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { getUserDetails } from "../services/operations/profileAPI";
import { logout } from "../services/operations/authAPI";
import { clearSingleOrder, updateSingleOrder } from "../slices/orderSlice";
import { placeOrder } from "../services/operations/serviceOrder";
import { useLocation, useNavigate } from "react-router-dom";
import { openModal } from "../slices/modalSlice";
import { ServiceCard } from "../components/Dashboard/Service";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  const [isNewAddress, setIsNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [onRemove, setOnRemove] = useState(null);

  const { cartServices, isLoading, totalQty, totalCost } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.profile);
  const { isOrderLoading, singleOrder, isSingleOrder } = useSelector(
    (state) => state.order
  );
  const { addresses, filteredDefaultAddress } = useSelector(
    (state) => state.address
  );

  const CartServices = isSingleOrder === true ? singleOrder : cartServices;

  const [currentStep, setCurrentStep] = useState(user ? 2 : 1);

  const handleIncrease = (cartServiceId) => {
    if (isSingleOrder) {
      dispatch(updateSingleOrder("increment"));
    } else {
      dispatch(updateCart({ cartServiceId, action: "increment" }));
    }
  };

  const handleDecrease = (cartServiceId) => {
    if (isSingleOrder) {
      dispatch(updateSingleOrder("decrement"));
    } else {
      dispatch(updateCart({ cartServiceId, action: "decrement" }));
    }
  };

  const handleRemove = (cartServiceId) => {
    const removeHandler = () => {
      if (isSingleOrder) {
        dispatch(clearSingleOrder());
        navigate("/cart");
      } else {
        dispatch(removeFromCart({ cartServiceId }));
      }
    };

    setOnRemove(() => removeHandler);
    dispatch(openModal("removeConfirmation"));
  };

  const handleSelectedAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleChangeStep = (step) => {
    setCurrentStep(step);
  };

  const handleAddAddressClick = () => {
    setIsNewAddress(!isNewAddress);
    setSelectedAddress(null);
  };

  const handleEditAddressClick = (address) => {
    setIsNewAddress(true);
    setSelectedAddress(address);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && localStorage.getItem("cart")) {
      dispatch(updateCartFromLocalStorage());
      setCurrentStep(2);
    }
  }, [dispatch, user]);

  useEffect(() => {
    if ((totalQty === 0 || CartServices.length === 0) && !isSingleOrder) {
      navigate("/cart");
    }
  }, [navigate, totalQty, CartServices.length, isSingleOrder]);

  const handleLogout = () => {
    dispatch(logout(navigate, location.pathname));
  };

  const handlePlaceOrder = () => {
    console.log("Placing order");

    // Extract the service IDs from the cartServices array
    // Extract the service details from the cartServices array
    // const serviceDetails = cartServices.map((service) => ({
    //   serviceId: service.serviceId || service._id,
    //   price: service.price,
    //   qty: service.qty,
    // }));

    // console.log("service details", serviceDetails);

    // Pass the correct data structure to the placeOrder function
    // placeOrder(token, serviceDetails, navigate, dispatch);

    // const partnerId = "66c9c8a413a342ca56c368c4";

    placeOrder(
      token,
      singleOrder,
      isSingleOrder,
      navigate,
      dispatch
    );

    // Refresh the cart services after placing the order
    dispatch(getAllCartServices());
    // navigate("/");
  };

  return (
    <>
      <ConfirmationModal text="Remove" onDelete={onRemove} />

      <div className="px-20 max-md:px-10 max-sm:px-4">
        <div className="gap-10 flex max-lg:flex-col">
          <div className="flex flex-col gap-5 w-full">
            {/* USER */}
            <div className="w-full shadow-custom-shadow rounded-lg">
              <div
                className={`flex items-center gap-2 w-full rounded-lg p-6 ${
                  currentStep === 1 && `bg-blue-500`
                }`}
              >
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-blue-500 px-2 rounded-sm">
                      1
                    </span>
                    <h1
                      className={
                        currentStep === 1 ? `text-white` : `text-gray-500`
                      }
                    >
                      LOGIN
                    </h1>
                    {user && currentStep > 1 && (
                      <FaCheck className="text-blue-500" />
                    )}
                  </div>
                </div>

                {user && currentStep !== 1 && (
                  <div className="flex w-full">
                    <div className="flex w-full justify-end">
                      <button
                        className="text-blue-500 py-2 px-7 uppercase rounded-md"
                        onClick={() => handleChangeStep(1)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {user && currentStep !== 1 && (
                <div className="flex w-full px-7 pb-6">
                  <span className="ml-7 mr-1">
                    {user.additionalDetails.firstName}
                  </span>
                  <span className="mr-2">
                    {user.additionalDetails.lastName}
                  </span>
                  <span className="">{user.contactNumber}</span>
                </div>
              )}

              {user && currentStep === 1 && (
                <div className="flex px-7 gap-2 py-4 items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      className="hover:text-blue-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                    <button
                      className="hover:text-red-500"
                      onClick={() => handleChangeStep(2)}
                    >
                      Cancel
                    </button>
                  </div>

                  {/* <button
                  className="bg-orange-500 text-white py-2 px-6 rounded-md"
                  onClick={() => handleChangeStep(2)}
                >
                  Continue
                </button> */}
                </div>
              )}

              {!user && currentStep === 1 && (
                <div className="px-7 py-4">
                  <LoginSignup />
                </div>
              )}
            </div>

            {/* DELIVERY ADDRESS */}
            <div className="w-full shadow-custom-shadow rounded-lg">
              <div
                className={`flex items-center justify-between text-blue-500 rounded-lg p-6 ${
                  user && currentStep === 2 && `bg-blue-500`
                }`}
              >
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-blue-500 px-2 rounded-sm">
                    2
                  </span>
                  <h1
                    className={
                      user && currentStep === 2 ? `text-white` : `text-gray-500`
                    }
                  >
                    DELIVERY ADDRESS
                  </h1>
                  {selectedAddress && currentStep > 2 && (
                    <FaCheck size={20} className="text-blue-500" />
                  )}
                </div>

                {user && currentStep > 2 && (
                  <div className="flex">
                    <div className="flex w-full justify-end">
                      <button
                        className="text-blue-500 py-2 px-7 uppercase rounded-md"
                        onClick={() => handleChangeStep(2)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {filteredDefaultAddress &&
                filteredDefaultAddress?.length !== 0 &&
                currentStep !== 2 && (
                  <div
                    className={`flex items-start w-full flex-col p-4 border-b cursor-pointer`}
                  >
                    <div className="flex w-full items-center px-7">
                      <div>
                        <span className="flex-grow">
                          {filteredDefaultAddress[0]?.name}
                        </span>
                        <span className="text-sm mx-2 bg-gray-100 p-2 rounded-sm">
                          {filteredDefaultAddress[0]?.addressType}
                        </span>
                        <span className="text-sm mx-2">
                          {filteredDefaultAddress[0]?.phoneNo}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2 px-7">
                      {filteredDefaultAddress[0]?.address},{" "}
                      {filteredDefaultAddress[0]?.locality},{" "}
                      {filteredDefaultAddress[0]?.landmark &&
                        `${filteredDefaultAddress[0]?.landmark},`}{" "}
                      {filteredDefaultAddress[0]?.city},{" "}
                      {filteredDefaultAddress[0]?.state},{" "}
                      <span className="font-semibold">
                        {filteredDefaultAddress[0]?.pincode}
                      </span>
                    </div>
                  </div>
                )}

              {user && currentStep === 2 && (
                <>
                  {isNewAddress ? (
                    <AddressForm
                      isNewAddress={isNewAddress}
                      handleAddAddressClick={handleAddAddressClick}
                      selectedAddress={selectedAddress}
                      height="10vh"
                    />
                  ) : (
                    <AddressList
                      handleSelectedAddress={handleSelectedAddress}
                      filteredDefaultAddress={filteredDefaultAddress}
                      onEditAddressClick={handleEditAddressClick}
                      height="10vh"
                    />
                  )}

                  <button
                    className="flex items-center gap-2 p-6 text-blue-500 rounded-lg w-full"
                    onClick={handleAddAddressClick}
                  >
                    <IoIosAdd size={20} />
                    <span>Add a New Address</span>
                  </button>

                  {filteredDefaultAddress?.length !== 0 && (
                    <div className="flex w-full justify-end py-2 px-7 mb-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                      <button
                        className="bg-orange-500 text-white py-2 px-7 uppercase rounded-md"
                        onClick={handleNextStep}
                        disabled={!filteredDefaultAddress}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* CART SERVICES */}
            <div className="w-full shadow-custom-shadow rounded-lg">
              <div
                className={`flex items-center justify-between rounded-lg p-6 ${
                  user && currentStep === 3 && `bg-blue-500`
                }`}
              >
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-blue-500 px-2 rounded-sm">
                    3
                  </span>

                  <h1
                    className={
                      user && currentStep === 3 ? `text-white` : `text-gray-500`
                    }
                  >
                    ORDER SUMMARY
                  </h1>

                  {CartServices.length > 0 && currentStep > 3 && (
                    <FaCheck size={20} className="text-blue-500" />
                  )}
                </div>

                {user && currentStep > 3 && (
                  <div className="flex">
                    <button
                      className="text-blue-500 py-2 px-7 uppercase rounded-md"
                      onClick={() => handleChangeStep(3)}
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>

              {user && currentStep > 3 && (
                <div className="flex w-full px-7 pb-6">
                  <span className="ml-7 mr-1">
                    {totalQty ? totalQty : singleOrder[0]?.qty} items
                  </span>
                </div>
              )}

              {user && currentStep === 3 && (
                <>
                  <div className="max-h-[65vh] overflow-y-auto p-4">
                    {CartServices &&
                      CartServices.map((service) => {
                        const { _id, qty } = service;

                        return (
                          <div key={_id} className="mb-4 border-b-2 p-4">
                            <ServiceCard {...service} />

                            <div className="flex items-center mt-4 gap-2">
                              {qty > 1 && (
                                <button
                                  className="border px-2 border-gray-400 rounded-full"
                                  onClick={() => handleDecrease(_id)}
                                  disabled={isLoading}
                                >
                                  -
                                </button>
                              )}

                              <span className="mx-2 text-gray-500">{qty}</span>

                              <button
                                className="border px-2 border-gray-400 rounded-full"
                                onClick={() => handleIncrease(_id)}
                                disabled={isLoading}
                              >
                                +
                              </button>

                              <button
                                className="hover:text-blue-500"
                                onClick={() => handleRemove(_id)}
                                disabled={isLoading}
                              >
                                REMOVE
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="flex w-full justify-end py-2 px-7 mb-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                    <button
                      className="bg-orange-500 text-white py-2 px-7 uppercase rounded-md"
                      onClick={handleNextStep}
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* PAYMENT OPTIONS */}
            <div className="w-full shadow-custom-shadow rounded-lg">
              <div
                className={`flex gap-2 rounded-lg p-6 ${
                  user && currentStep === 4 && `bg-blue-500`
                }`}
              >
                <span className="bg-gray-100 text-blue-500 px-2 rounded-sm">
                  4
                </span>
                <h1
                  className={
                    user && currentStep === 4
                      ? `text-white`
                      : `text-gray-500 uppercase`
                  }
                >
                  PAYMENT OPTIONS
                </h1>
                {currentStep > 4 && <FaCheck color="blue" />}
              </div>

              {user && currentStep === 4 && (
                <div className="max-h-[65vh] overflow-y-auto">
                  <div className="flex flex-col p-6">
                    <div className="flex w-full justify-between">
                      <span>
                        Price ({singleOrder[0] ? singleOrder[0]?.qty : totalQty}{" "}
                        item)
                      </span>
                      <span>
                        ₹{" "}
                        {singleOrder[0]
                          ? singleOrder[0]?.totalCost.toFixed(2)
                          : totalCost.toFixed(2)}
                      </span>
                    </div>

                    {/* <div className="flex w-full justify-between">
              <span>Discount</span>
              <span>₹ 2000</span>
            </div> */}

                    {/* <div className="flex w-full justify-between">
              <span>Delivery Charges</span>
              <span>₹ 2000</span>
            </div> */}

                    <div className="flex w-full justify-between mt-2 border-t">
                      <span className="text-xl font-bold">Total Amount</span>
                      <span className="text-xl font-bold">
                        ₹{" "}
                        {singleOrder[0]
                          ? singleOrder[0]?.totalCost.toFixed(2)
                          : totalCost.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full justify-end py-2 px-7 mb-4 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                    <button
                      className="bg-orange-500 text-white py-2 px-7 uppercase rounded-md"
                      onClick={handlePlaceOrder}
                      disabled={isOrderLoading}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}

              {user && currentStep > 4 && (
                <div className="flex w-full justify-end py-2 px-7 mb-4">
                  <button
                    className="bg-gray-500 text-white py-2 px-7 uppercase rounded-md"
                    onClick={() => handleChangeStep(4)}
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* PRICE DETAILS */}
          <PriceDetailsCard />
        </div>
      </div>
    </>
  );
};

export default Checkout;
