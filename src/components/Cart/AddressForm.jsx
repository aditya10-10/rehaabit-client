import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, updateAddress } from "../../slices/addressSlice";
import { pincodes } from "../../utils/pincode";
import { toast } from "sonner";

const AddressForm = ({ handleAddAddressClick, selectedAddress, height }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.address);

  const [formData, setFormData] = useState({
    address: "",
    addressType: "",
    city: "",
    landmark: "",
    locality: "",
    name: "",
    pincode: "",
    state: "",
    alternativePhone: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (selectedAddress) {
      setFormData(selectedAddress);
    }
  }, [selectedAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phoneNo.length !== 10) {
      return toast.error("Phone number should be 10 digits");
    }
    if (formData.pincode.length !== 6) {
      return toast.error("Invalid pincode");
    }
    if (!pincodes.includes(formData.pincode)) {
      return toast.error("We do not serve at this location");
    }
    if (selectedAddress) {
      dispatch(
        updateAddress({
          addressData: { ...formData, addressId: selectedAddress._id },
        })
      );
    } else {
      dispatch(addAddress({ addressData: formData }));
    }

    handleAddAddressClick(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-4 p-6 max-sm:p-2 max-sm:text-sm"
    >
      <div className="mb-4 flex gap-4 max-sm:flex-col">
        <div className="relative w-full">
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="peer w-full px-3 pt-5 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className={`absolute left-3 top-1 text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
        peer-focus:top-1 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
        ${formData.name && 'top-1 left-3 text-sm text-blue-500'}`}
          >
            Enter your name
          </label>
        </div>

        <div className="relative w-full">
          <input
            id="phoneNo"
            name="phoneNo"
            type="tel"
            maxLength={10}
            value={formData.phoneNo}
            onChange={handleChange}
            className="peer w-full px-3 pt-5 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder=" "
            required
          />
          <label
            htmlFor="phoneNo"
            className={`absolute left-3 top-1 text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
        peer-focus:top-1 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
        ${formData.phoneNo && 'top-1 left-3 text-sm text-blue-500'}`}
          >
            Enter phone number
          </label>
        </div>
      </div>

      <div className="mb-4 flex gap-4 max-sm:flex-col">
        <div className="relative w-full">
          <input
            id="pincode"
            name="pincode"
            type="text"
            maxLength={6}
            value={formData.pincode}
            onChange={handleChange}
            className="peer w-full px-3 pt-5 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder=" "
            required
          />
          <label
            htmlFor="pincode"
            className={`absolute left-3 top-1 text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
        peer-focus:top-1 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
        ${formData.pincode && 'top-1 left-3 text-sm text-blue-500'}`}
          >
            Enter pincode
          </label>
        </div>

        <div className="relative w-full">
          <input
            id="locality"
            name="locality"
            type="text"
            value={formData.locality}
            onChange={handleChange}
            className="peer w-full px-3 pt-5 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder=" "
          />
          <label
            htmlFor="locality"
            className={`absolute left-3 top-1 text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
        peer-focus:top-1 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
        ${formData.locality && 'top-1 left-3 text-sm text-blue-500'}`}>
            Enter locality
          </label>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative w-full">
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="peer w-full px-3 pt-5 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder=" "
            required
          />
          <label
            htmlFor="address"
            className={`absolute left-3 top-1 text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
        peer-focus:top-1 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
        ${formData.address && 'top-1 left-3 text-sm text-blue-500'}`}
          >
            Enter your address
          </label>
        </div>
      </div>

      <div className="mb-4 flex gap-4 max-sm:flex-col">
        <div className="relative w-full">
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="peer w-full px-3 pt-5 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className={`absolute left-3 top-1 text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
        peer-focus:top-1 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
        ${formData.city && 'top-1 left-3 text-sm text-blue-500'}`}
          >
            Enter city
          </label>
        </div>

        <div className="relative w-full">
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full px-3 pt-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 ${formData.state ? 'text-black' : 'text-gray-500'}`}
            required
          >
            <option value="" className="text-gray-500">
              Select state
            </option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>
      </div>


        <div className="mb-4 flex gap-4 max-sm:flex-col">
          <div className="relative w-full">
            <input
              id="landmark"
              name="landmark"
              type="text"
              value={formData.landmark}
              onChange={handleChange}
              className="peer w-full px-3 pt-5 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="landmark"
              className={`absolute left-3 top-1 text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
        peer-focus:top-1 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
        ${formData.landmark && 'top-1 left-3 text-sm text-blue-500'}`}
            >
              Enter landmark
            </label>
          </div>

          <div className="relative w-full">
            <input
              id="alternativePhone"
              name="alternativePhone"
              type="tel"
              maxLength={10}
              value={formData.alternativePhone}
              onChange={handleChange}
              className="peer w-full px-3 pt-5 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="alternativePhone"
              className={`absolute left-3 top-1 text-gray-500 transition-all
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3
        peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
        peer-focus:top-1 peer-focus:left-3 peer-focus:text-sm peer-focus:text-blue-500
        ${formData.alternativePhone && 'top-1 left-3 text-sm text-blue-500'}`}
            >
              Enter another PhoneNo.
            </label>
          </div>
        </div>

        <div className="mb-4 text-gray-500">
          <label className="block mb-2 font-semibold">Select address type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="Home"
                checked={formData.addressType === "Home"}
                onChange={handleChange}
                className="mr-2"
                required
              />
              Home
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="addressType"
                value="Office"
                checked={formData.addressType === "Office"}
                onChange={handleChange}
                className="mr-2"
                required
              />
              Office
            </label>
          </div>
        </div>

        <div className="flex mt-6">
          <button
            type="submit"
            className="bg-orange-500 uppercase text-white font-bold py-2 px-6 rounded-md"
            disabled={isLoading}
          >
            {selectedAddress ? "Update" : "Save"}
          </button>

          <button
            onClick={() => handleAddAddressClick(false)}
            className="py-2 px-4 hover:text-red-500"
          >
            Cancel
          </button>
        </div>
    </form>
  );

};

export default AddressForm;
