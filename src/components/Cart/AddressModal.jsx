import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";

const AddressModal = ({
  onClose,
  handleSelectedAddress,
  filteredDefaultAddress,
}) => {
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddAddressClick = () => {
    setIsNewAddress(!isNewAddress);
    setSelectedAddress(null);
  };

  const handleEditAddressClick = (address) => {
    setIsNewAddress(true);
    setSelectedAddress(address);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 w-full">
      <main className="relative flex flex-col justify-center items-center px-4 py-4 bg-white rounded-xl shadow-sm w-[30%] max-2xl:w-[40%] max-xl:w-[60%] max-md:w-[80%] max-sm:w-[90%] transform transition-transform duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full"
        >
          <IoIosClose size={24} />
        </button>

        <div className="px-6 py-4 w-full max-sm:px-2">
          <h1 className="text-xl mb-6">
            {isNewAddress ? "Add New Address" : "Select Delivery Address"}
          </h1>

          {isNewAddress ? (
            <AddressForm
              isNewAddress={isNewAddress}
              handleAddAddressClick={handleAddAddressClick}
              selectedAddress={selectedAddress}
              height="60vh"
            />
          ) : (
            <>
              <AddressList
                handleSelectedAddress={handleSelectedAddress}
                filteredDefaultAddress={filteredDefaultAddress}
                onEditAddressClick={handleEditAddressClick}
                height="60vh"
              />

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
