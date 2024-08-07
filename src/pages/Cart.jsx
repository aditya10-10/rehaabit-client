import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Home/Navbar";
import ServiceCard from "../components/ServiceCard";
import {
  getAllCartServices,
  removeFromCart,
  updateCart,
} from "../slices/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartServices, totalQty, totalCost, isLoading } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getAllCartServices());
  }, [dispatch]);

  const handleIncrease = (service) => {
    dispatch(updateCart({ serviceId: service.serviceId, action: "increment" }));
  };

  const handleDecrease = (service) => {
    dispatch(updateCart({ serviceId: service.serviceId, action: "decrement" }));
  };

  const handleRemove = (service) => {
    dispatch(removeFromCart({ serviceId: service.serviceId }));
  };

  return (
    <>
      <Navbar />

      <div className="px-20 max-md:px-10 max-sm:px-4">
        <div className="gap-10 flex">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex w-full items-center justify-between p-2 shadow-custom-shadow rounded-lg">
              <div>
                <h1 className="font-semibold">
                  Deliver To:{" "}
                  <span className="font-normal">Anirudha Rajodiya</span>
                </h1>
                <span>Bekar Street, London</span>
              </div>

              <button className="bg-emerald-600 text-white px-4 py-2 rounded-md">
                Change
              </button>
            </div>

            <div className="w-full shadow-custom-shadow p-4 rounded-lg">
              {cartServices &&
                cartServices.map((service) => {
                  const { _id, qty } = service;

                  return (
                    <div key={_id} className="mb-4 border-b-2 p-4">
                      <ServiceCard {...service} />

                      <div className="flex items-center mt-4 gap-2">
                        <button
                          className="border px-2 border-gray-400 rounded-full"
                          onClick={() => handleDecrease(service)}
                          disabled={isLoading}
                        >
                          -
                        </button>

                        <span className="mx-2 text-gray-500">{qty}</span>

                        <button
                          className="border px-2 border-gray-400 rounded-full"
                          onClick={() => handleIncrease(service)}
                          disabled={isLoading}
                        >
                          +
                        </button>

                        <button
                          className="hover:text-blue-500"
                          onClick={() => handleRemove(service)}
                          disabled={isLoading}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  );
                })}

              <div className="flex w-full justify-end">
                <button className="bg-orange-500 p-2 text-white rounded-md mt-2">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>

          {/* PRICE DETAILS */}
          <div className="flex flex-col w-[40%] max-lg:w-full">
            <div className="max-lg:w-full shadow-custom-shadow p-4 rounded-lg h-fit">
              <h1 className="text-gray-500 border-b">PRICE DETAILS</h1>

              <div className="flex w-full justify-between">
                <span>Price ({totalQty} item)</span>
                <span>₹ {totalCost}</span>
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
                <span className="text-xl font-bold">₹ {totalCost}</span>
              </div>
            </div>

            <span className="my-4 p-4 text-gray-600">
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
