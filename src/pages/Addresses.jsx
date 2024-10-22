import { useEffect, useState } from "react";
import { AddressForm, AddressList } from "../components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { getUserAddresses } from "../slices/addressSlice";
import NothingToShow from "../components/NothingToShow";

const Addresses = () => {
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isNewAddress, setIsNewAddress] = useState(false);
  // console.log(useSelector((state) => state.address));
  // console.log(useSelector((state) => state.address.filteredDefaultAddress));
  // console.log(selectedAddress);
  const { filteredDefaultAddress } = useSelector((state) => state.address);

  const handleAddAddressClick = () => {
    setSelectedAddress(null);
    setIsNewAddress(!isNewAddress)
  };

  const handleEditAddressClick = (address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="flex  lg:pl-72  md:pl-64 max-sm:ml-3 max-sm:pl-12  sm:pl-16 flex-col items-center w-full p-10 max-sm:p-4">
      <nav className="flex w-full justify-between">
        <div className="flex items-center">
          <h1 className="text-4xl max-sm:text-2xl  max-sm:ml-3 font-semibold">My Addresses</h1>
        </div>
      </nav>

      <div className="flex w-full mt-10 p-4 border rounded-lg">
        <button
          onClick={handleAddAddressClick}
          className="text-blue-500 flex items-center gap-2"
        >
          <FaPlus />
          Add New Address
        </button>
      </div>

      <div className="mt-6 w-full border rounded-lg">
        {isNewAddress ? (
          <AddressForm
            handleAddAddressClick={handleAddAddressClick}
            selectedAddress={selectedAddress}
            height="70vh"
          />
        ) : !filteredDefaultAddress?.length ? (
          <NothingToShow text="Addresses" btnText="" />
        ) : (
          <AddressList
            filteredDefaultAddress={filteredDefaultAddress}
            onEditAddressClick={handleEditAddressClick}
            height="70vh"
          />
        )}
      </div>
    </div>
  );
};

export default Addresses;
