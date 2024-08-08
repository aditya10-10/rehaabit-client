import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "../components/ServiceCard";
import {
  getAllCartServices,
  removeFromCart,
  updateCart,
} from "../slices/cartSlice";
import { useEffect, useState } from "react";
import { AddressModal, PriceDetailsCard } from "../components/Cart";
import { getUserAddresses } from "../slices/addressSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [selectedAddress, setSelectedAddress] = useState([]);

  const { cartServices, isLoading } = useSelector((state) => state.cart);

  // useEffect(() => {
  //   dispatch(getAllCartServices());
  //   dispatch(getUserAddresses());
  // }, [dispatch]);

  const handleIncrease = (cartServiceId) => {
    dispatch(updateCart({ cartServiceId, action: "increment" }));
  };

  const handleDecrease = (cartServiceId) => {
    dispatch(updateCart({ cartServiceId, action: "decrement" }));
  };

  const handleRemove = (cartServiceId) => {
    dispatch(removeFromCart({ cartServiceId }));
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

  console.log(selectedAddress);

  return (
    <>
      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${animationClass}`}
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
              {selectedAddress && (
                <div>
                  <h1 className="font-semibold">
                    Deliver To:{" "}
                    <span className="font-normal">{selectedAddress.name}</span>
                  </h1>
                  <span>{selectedAddress.locality}</span>
                  <span>, {selectedAddress.address}</span>
                  <span>, {selectedAddress.landmark}</span>
                  <span>, {selectedAddress.city}</span>
                  <span>, {selectedAddress.pincode}</span>
                  <span>, {selectedAddress.state}</span>
                  <span>, {selectedAddress.phoneNo}</span>
                </div>
              )}

              <button
                className="bg-emerald-600 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setAnimationClass("modal-open");
                  setIsModalOpen(true);
                }}
              >
                Change
              </button>
            </div>

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
                            onClick={() => handleDecrease(_id)}
                            disabled={isLoading}
                          >
                            -
                          </button>

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

              <div className="flex w-full p-4 justify-end shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                <button
                  className="bg-orange-500 p-2 text-white rounded-md mt-2"
                  onClick={() => navigate("/checkout")}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>

          {/* PRICE DETAILS */}
          <PriceDetailsCard />
        </div>
      </div>
    </>
  );
};

export default Cart;
