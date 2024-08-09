import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses, updateAddress } from "../../slices/addressSlice";
import { useEffect } from "react";
import { getAllCartServices } from "../../slices/cartSlice";

const AddressList = ({ onEditAddressClick }) => {
  const dispatch = useDispatch();

  const { addresses, filteredDefaultAddress } = useSelector(
    (state) => state.address
  );

  const handleDefaultAddress = (addressId) => {
    if (filteredDefaultAddress[0]?._id !== addressId)
      dispatch(
        updateAddress({ addressData: { addressId, status: "Default" } })
      );

    dispatch(getUserAddresses());
  };

  useEffect(() => {
    dispatch(getUserAddresses());
    dispatch(getAllCartServices());
  }, [dispatch]);

  return (
    <div className="max-h-96 overflow-y-auto w-full">
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

        return (
          <div
            key={_id}
            className={`border-b ${
              isSelected ? "bg-blue-50 border-blue-500" : "hover:bg-gray-100"
            }`}
          >
            <div
              className={`flex items-start w-full flex-col p-4 max-sm:p-2 cursor-pointer `}
              onClick={() => handleDefaultAddress(_id)}
            >
              <div className="flex items-start flex-col">
                <div>
                  <input type="radio" checked={isSelected} readOnly className="mr-4" />
                  <span className="font-semibold flex-grow">{name}</span>
                  <span className="text-sm mx-2 bg-gray-100 p-2 rounded-sm">
                    {addressType}
                  </span>
                  <span className="text-sm mx-2">{phoneNo}</span>
                </div>

                <div className="text-sm text-gray-600 mt-2 px-7">
                  {addr}, {locality}, {landmark && `${landmark},`} {city},{" "}
                  {state}, {pincode}
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end mb-2 px-7">
              <button
                className="hover:text-blue-500 text-sm ml-auto uppercase"
                onClick={() => onEditAddressClick(address)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressList;
