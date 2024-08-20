import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "../components/ServiceCard";
import {
  getAllCartServices,
  removeFromCart,
  removeServiceFromLocalStorage,
  updateCart,
  updateCartInLocalStorage,
} from "../slices/cartSlice";
import { useEffect, useState } from "react";
import {
  AddressModal,
  LoginSignup,
  PriceDetailsCard,
} from "../components/Cart";
import { getUserAddresses } from "../slices/addressSlice";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import { openModal } from "../slices/modalSlice";
import NothingToShow from "../components/NothingToShow";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [onRemove, setOnRemove] = useState(null);

  const { cartServices, isLoading, totalQty } = useSelector(
    (state) => state.cart
  );
  const { filteredDefaultAddress } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllCartServices());
    dispatch(getUserAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (
      localStorage.getItem("cart") &&
      JSON.parse(localStorage.getItem("cart")).totalQty === 0
    ) {
      localStorage.removeItem("cart");
    }
  }, []);

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

  const handleCloseModal = () => {
    setAnimationClass("modal-close");
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  const handleSelectedAddress = (address) => {
    setSelectedAddress(address);
  };

  // console.log(filteredDefaultAddress)

  return (
    <>
      <ConfirmationModal text="Remove" onDelete={onRemove} />

      {isModalOpen && (
        <div
          className={`fixed w-full inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${animationClass}`}
        >
          <AddressModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            handleSelectedAddress={handleSelectedAddress}
          />
        </div>
      )}

      <div className="px-20 max-md:px-10 max-sm:px-4">
        <div className="gap-10 flex max-lg:flex-col">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex w-full items-center justify-between p-2 shadow-custom-shadow rounded-lg">
              {filteredDefaultAddress &&
              filteredDefaultAddress?.length === 1 ? (
                <div>
                  <h1 className="font-semibold">
                    Deliver To:{" "}
                    <span className="font-normal">
                      {filteredDefaultAddress[0]?.name}
                    </span>
                  </h1>
                  <span>{filteredDefaultAddress[0]?.locality}</span>
                  <span>, {filteredDefaultAddress[0]?.address}</span>
                  <span>, {filteredDefaultAddress[0]?.landmark}</span>
                  <span>, {filteredDefaultAddress[0]?.city}</span>
                  <span>, {filteredDefaultAddress[0]?.pincode}</span>
                  <span>, {filteredDefaultAddress[0]?.state}</span>
                  <span>, {filteredDefaultAddress[0]?.phoneNo}</span>
                </div>
              ) : (
                <>
                  {user ? (
                    <h1>Select Delivery Address</h1>
                  ) : (
                    <div className="px-7 py-4">
                      <span>Login/SignUp First</span>
                    </div>
                  )}
                </>
              )}

              {user && (
                <button
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    setAnimationClass("modal-open");
                    setIsModalOpen(true);
                  }}
                >
                  Change
                </button>
              )}
            </div>

            {cartServices.totalQty === 0 || totalQty === 0 ? (
              <NothingToShow text="Cart" btnText="shopping" />
            ) : (
              <div className="w-full shadow-custom-shadow rounded-lg">
                <div className="max-h-[65vh] overflow-y-auto p-4">
                  {cartServices &&
                    cartServices.map((service) => {
                      const { _id, qty } = service;

                      return (
                        <div key={_id} className="mb-4 border-b-2 p-4">
                          <ServiceCard {...service} />

                          <div className="flex items-center mt-4 gap-2">
                            <button
                              className="border px-2 border-gray-400 rounded-full"
                              onClick={() => handleDecrease(_id, service)}
                              disabled={isLoading}
                            >
                              -
                            </button>

                            <span className="mx-2 text-gray-500">{qty}</span>

                            <button
                              className="border px-2 border-gray-400 rounded-full"
                              onClick={() => handleIncrease(_id, service)}
                              disabled={isLoading}
                            >
                              +
                            </button>

                            <button
                              className="hover:text-blue-500"
                              onClick={() => handleRemove(_id, service)}
                              disabled={isLoading}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="flex w-full p-4 justify-end shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                  <button
                    className="bg-orange-500 p-2 text-white rounded-md mt-2"
                    onClick={() => navigate("/checkout")}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PRICE DETAILS */}
          <PriceDetailsCard />
        </div>
      </div>
    </>
  );
};

export default Cart;
