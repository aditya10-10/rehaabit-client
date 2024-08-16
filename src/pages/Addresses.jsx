import { useEffect, useState } from "react";
import { AddressForm, AddressList } from "../components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { getUserAddresses } from "../slices/addressSlice";

const Addresses = () => {
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState(null);

  const { filteredDefaultAddress } = useSelector((state) => state.address);

  const handleAddAddressClick = () => {
    setSelectedAddress(null);
  };

  const handleEditAddressClick = (address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center w-full p-10">
      <nav className="flex w-full justify-between">
        <div className="flex items-center">
          <h1 className="text-4xl font-semibold">My Addresses</h1>
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
        <AddressList
          //   handleSelectedAddress={handleSelectedAddress}
          height="70vh"
          filteredDefaultAddress={filteredDefaultAddress}
          onEditAddressClick={handleEditAddressClick}
        />
      </div>
    </div>
  );
};

export default Addresses;
