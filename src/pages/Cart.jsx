import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "../components/Dashboard/Service/ServiceCard";
import { getAllCartServices } from "../slices/cartSlice";
import { useEffect, useState } from "react";
import {
  AddressModal,
  CartServices,
  PriceDetailsCard,
} from "../components/Cart";
import { getUserAddresses } from "../slices/addressSlice";
import { useNavigate } from "react-router-dom";
import NothingToShow from "../components/NothingToShow";
import { OtpModal } from "../components";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [selectedAddress, setSelectedAddress] = useState([]);

  const { cartServices, isLoading, totalQty } = useSelector(
    (state) => state.cart
  );
  const reversedCartServices = [...cartServices].reverse();
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

  const handleCloseOtpModal = () => {
    setAnimationClass("modal-close");
    setTimeout(() => {
      setIsOtpModalOpen(false);
    }, 300);
  };

  const handleLoginClick = () => {
    setAnimationClass("modal-open");
    setIsOtpModalOpen(true);
  };

  return (
    <>
      {isOtpModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 top-0 bg-black bg-opacity-50 ${animationClass} max-h-screen`}
        >
          <OtpModal isOpen={isOtpModalOpen} onClose={handleCloseOtpModal} />
        </div>
      )}

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

      <div
        className="px-20 max-md:px-10 max-sm:px-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <Helmet>
          <title>Cart</title>
        </Helmet>
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
                    <div className="px-7 py-4 flex w-full justify-end">
                      <button
                        onClick={handleLoginClick}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-md"
                      >
                        Login
                      </button>
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
                <CartServices
                  cartServices={reversedCartServices}
                  isLoading={isLoading}
                />

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
