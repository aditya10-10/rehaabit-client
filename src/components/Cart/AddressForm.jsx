import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, updateAddress } from "../../slices/addressSlice";

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

    if (selectedAddress) {
      dispatch(
        updateAddress({
          addressData: { ...formData, addressId: selectedAddress._id },
        })
      );
    } else {
      dispatch(addAddress({ addressData: formData }));
    }

    handleAddAddressClick(false)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full mt-4 max-h-[${height}] overflow-y-auto p-6 max-sm:p-2 max-sm:text-sm`}
    >
      <div className="mb-4 flex gap-4 max-sm:flex-col">
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

      <div className="mb-4 flex gap-4 max-sm:flex-col">
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

      <div className="mb-4 flex gap-4">
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

      <div className="mb-4 flex gap-4 max-sm:flex-col">
        <input
          id="landmark"
          name="landmark"
          type="text"
          value={formData.landmark}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter landmark"
        />

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

      <div className="mb-4">
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
