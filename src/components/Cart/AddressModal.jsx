import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";

const AddressModal = ({ onClose, handleSelectedAddress }) => {
  const [isNewAddress, setIsNewAddress] = useState(false);

  const handleAddAddressClick = () => {
    setIsNewAddress(!isNewAddress);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <main className="relative flex flex-col justify-center items-center px-4 py-4 bg-white rounded-xl shadow-sm w-[25%] transform transition-transform duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full"
        >
          <IoIosClose size={24} />
        </button>

        <div className="px-6 py-4 w-full">
          <h1 className="text-xl mb-6">
            {isNewAddress ? "Add New Address" : "Select Delivery Address"}
          </h1>

          {isNewAddress ? (
            <AddressForm
              isNewAddress={isNewAddress}
              handleAddAddressClick={handleAddAddressClick}
            />
          ) : (
            <>
              <AddressList handleSelectedAddress={handleSelectedAddress} />

              <div className="flex w-full mt-10 justify-end">
                <button
                  onClick={handleAddAddressClick}
                  className="bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4 text-white"
                >
                  Add New Address
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AddressModal;
