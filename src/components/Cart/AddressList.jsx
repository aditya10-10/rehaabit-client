import { useSelector } from "react-redux";

const AddressList = ({ selectedAddress, handleSelectedAddress }) => {
  const { addresses } = useSelector((state) => state.address);

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

        const isSelected = selectedAddress?._id === _id;

        return (
          <div key={_id} className="">
            <div
              className={`flex items-start w-full flex-col p-4 border-b cursor-pointer ${
                isSelected ? "bg-blue-50 border-blue-500" : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelectedAddress(address)}
            >
              <div className="flex w-full items-center">
                <div>
                  <input
                    type="radio"
                    checked={isSelected}
                    onChange={() => handleSelectedAddress(address)}
                    className="mr-4"
                  />
                  <span className="font-semibold flex-grow">{name}</span>
                  <span className="text-sm mx-2 bg-gray-100 p-2 rounded-sm">{addressType}</span>
                  <span className="text-sm mx-2">{phoneNo}</span>
                </div>
                <button className="text-blue-500 text-sm ml-auto uppercase">
                  Edit
                </button>
              </div>
              <div className="text-sm text-gray-600 mt-2 px-7">
                {addr}, {locality}, {landmark && `${landmark},`} {city}, {state}
                , {pincode}
              </div>
              {/* {isSelected && (
                <div className="flex w-full py-2 px-7">
                  <button className="bg-orange-500 text-white py-2 px-7 uppercase rounded-md">
                    Deliver Here
                  </button>
                </div>
              )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressList;
