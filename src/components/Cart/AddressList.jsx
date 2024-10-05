import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteAddress,
  getUserAddresses,
  updateAddress,
} from "../../slices/addressSlice";
import { getAllCartServices } from "../../slices/cartSlice";
import AddressForm from "./AddressForm";
import { openModal } from "../../slices/modalSlice";
import { ConfirmationModal } from "..";

const AddressList = ({ height }) => {
  const dispatch = useDispatch();
  const { addresses, filteredDefaultAddress } = useSelector(
    (state) => state.address
  );
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [onDelete, setOnDelete] = useState(null);

  const handleDefaultAddress = async (addressId) => {
    if (filteredDefaultAddress[0]?._id !== addressId) {
      if (filteredDefaultAddress.length > 0) {
        await dispatch(
          updateAddress({ addressData: { addressId: filteredDefaultAddress[0]._id, status: "" } })
        );
      }
      await dispatch(
        updateAddress({ addressData: { addressId, status: "Default" } })
      );
      dispatch(getUserAddresses());
    }
  };

  const handleEditClick = (addressId) => {
    setEditingAddressId(addressId);
  };

  const handleDelete = (addressId) => {
    const deleteHandler = () => {
      dispatch(deleteAddress({ addressId }));
    };

    setOnDelete(() => deleteHandler);
    dispatch(openModal("deleteConfirmation"));
  };

  useEffect(() => {
    dispatch(getUserAddresses());
    dispatch(getAllCartServices());
  }, [dispatch]);

  return (
    <>
      <ConfirmationModal text="Delete" onDelete={onDelete} />

      <div className={`max-h-[${height}] overflow-y-auto w-full`}>
        {addresses.map((address) => {
          const {
            _id,
            address: addr,
            addressType,
            city,
            landmark,
            locality,
            name,
            pincode,
            state,
            phoneNo,
          } = address;

          const isSelected = filteredDefaultAddress[0]?._id === _id;
          const isEditing = editingAddressId === _id;

          return (
            <div
              key={_id}
              className={`border-b ${
                isSelected ? "bg-blue-50 border-blue-500" : "hover:bg-gray-100"
              }`}
            >
              {isEditing ? (
                <AddressForm
                  selectedAddress={address}
                  handleAddAddressClick={() => setEditingAddressId(null)}
                  height="auto"
                />
              ) : (
                <>
                  <div
                    className={`flex items-start w-full flex-col p-4 max-sm:p-2 cursor-pointer`}
                    onClick={() => handleDefaultAddress(_id)}
                  >
                    <div className="flex items-start flex-col">
                      <div>
                        <input
                          type="radio"
                          checked={isSelected}
                          readOnly
                          className="mr-2 max-sm:mr-2"
                        />
                        {/* <span className="font-semibold flex-grow max-sm:hidden">{name}</span> */}
                        <span className="text-sm mx-2 bg-gray-100 p-0 max-sm:p-0 rounded-sm">
                          {addressType}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-2 px-7">
                        {addr}, {locality}, {landmark && `${landmark},`} {city},{" "}
                        {state}, {pincode}
                        <br/>
                        Ph: +91 {phoneNo}
                      </div>
                      {/* <span className="text-sm text-gray-600 mt-2 px-7">{phoneNo}</span> */}
                    </div>
                  </div>

                  <div className="flex w-full justify-end mb-2 px-7 gap-4">
                    <button
                      className="hover:text-blue-500 text-sm uppercase"
                      onClick={() => handleEditClick(_id)}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:text-red-500 text-sm uppercase"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AddressList;
