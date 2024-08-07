import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../../slices/addressSlice";

const AddressForm = ({ isNewAddress, handleAddAddressClick }) => {
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addAddress({ addressData: formData }));
    handleAddAddressClick();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-4 max-h-96 overflow-y-auto"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name*
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="address"
        >
          Address*
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter your address"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="addressType"
        >
          Address Type*
        </label>
        <select
          id="addressType"
          name="addressType"
          value={formData.addressType}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          required
        >
          <option value="">Select address type</option>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="city"
        >
          City*
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter city"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="landmark"
        >
          Landmark
        </label>
        <input
          id="landmark"
          name="landmark"
          type="text"
          value={formData.landmark}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter landmark"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="locality"
        >
          Locality
        </label>
        <input
          id="locality"
          name="locality"
          type="text"
          value={formData.locality}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter locality"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="pincode"
        >
          Pincode*
        </label>
        <input
          id="pincode"
          name="pincode"
          type="text"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter pincode"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="state"
        >
          State*
        </label>
        <input
          id="state"
          name="state"
          type="text"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter state"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phoneNo"
        >
          Phone Number*
        </label>
        <input
          id="phoneNo"
          name="phoneNo"
          type="tel"
          maxLength={10}
          value={formData.phoneNo}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter phone number"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="alternativePhone"
        >
          Alternative Phone Number
        </label>
        <input
          id="alternativePhone"
          name="alternativePhone"
          type="tel"
          maxLength={10}
          value={formData.alternativePhone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter alternative phone number"
        />
      </div>

      <div className="flex mt-6 justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Add
        </button>

        {isNewAddress && (
          <button
            onClick={handleAddAddressClick}
            className="py-2 px-4 hover:text-red-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddressForm;
