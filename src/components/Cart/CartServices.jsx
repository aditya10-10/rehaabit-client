import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "../Dashboard/Service/ServiceCard";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  removeServiceFromLocalStorage,
  updateCart,
  updateCartInLocalStorage,
} from "../../slices/cartSlice";
import { useState } from "react";
import { openModal } from "../../slices/modalSlice";
import ConfirmationModal from "../ConfirmationModal";

const CartServices = ({ cartServices, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const [onRemove, setOnRemove] = useState(null);

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

  return (
    <>
      <ConfirmationModal text="Remove" onDelete={onRemove} />

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
    </>
  );
};

export default CartServices;
