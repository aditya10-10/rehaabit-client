import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveFormData } from "../../../slices/partnerSlice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { toast } from "sonner";
const BusinessInformation = ({ onSave, handleNext, handleBack }) => {
  const dispatch = useDispatch();
  const { currentStep, partnerFormData } = useSelector(
    (state) => state.partner
  );

  const [formData, setFormData] = useState({
    businessName: partnerFormData?.businessInformation?.businessName || "",
    businessStructure:
      partnerFormData?.businessInformation?.businessStructure || "",
    businessAddress: {
      street:
        partnerFormData?.businessInformation?.businessAddress?.street || "",
      city: partnerFormData?.businessInformation?.businessAddress?.city || "",
      state: partnerFormData?.businessInformation?.businessAddress?.state || "",
      pinCode:
        partnerFormData?.businessInformation?.businessAddress?.pinCode || "",
      country:
        partnerFormData?.businessInformation?.businessAddress?.country || "",
    },
    alternativeContact: {
      name:
        partnerFormData?.businessInformation?.alternativeContact?.name || "",
      phoneNumber:
        partnerFormData?.businessInformation?.alternativeContact?.phoneNumber ||
        "",
      // email: "",
    },
  });

  useEffect(() => {
    // Reset form data to initial state when the component mounts
    setFormData({
      businessName: "",
      businessStructure: "",
      businessAddress: {
        street: "",
        city: "",
        state: "",
        pinCode: "",
        country: ""
      },
      alternativeContact: {
        name: "",
        phoneNumber: ""
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("businessAddress")) {
      const [_, field] = name.split(".");
      setFormData({
        ...formData,
        businessAddress: {
          ...formData.businessAddress,
          [field]: value,
        },
      });
    } else if (name.startsWith("alternativeContact")) {
      const [_, field] = name.split(".");
      setFormData({
        ...formData,
        alternativeContact: {
          ...formData.alternativeContact,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveAndNext = () => {
    const isEmpty = Object.values(formData).some(value => {
      // Check nested address fields separately
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some(nestedValue => nestedValue === "" || nestedValue === null);
      }
      return value === "" || value === null;
    });
  
    if (isEmpty) {
      toast.error("Please fill in all required fields");
      return;
    }
    const isValid = onSave(formData);
    if (isValid) {
      dispatch(saveFormData({ step: "businessInformation", data: formData }));
      handleNext();
    }
  };

  return (
    <>
      <form className="w-1/2 max-2xl:w-3/4 max-lg:w-11/12 mx-auto mt-4 p-6 max-sm:p-4">
        <div className="flex max-sm:flex-col gap-5 max-sm:gap-0">
          {/* BUSINESS NAME */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="businessName"
            >
              Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Your Business Name"
            />
          </div>

          {/* BUSINESS STRUCTURE */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="businessStructure"
            >
              Business Structure<span className="text-red-500">*</span>
            </label>
            <select
              id="businessStructure"
              name="businessStructure"
              onChange={handleChange}
              value={formData.businessStructure}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              required
            >
              <option value="">Select</option>
              <option value="Individual">Individual</option>
              <option value="Contractor">Contractor</option>
              <option value="Corporation">Corporation</option>
              <option value="Partnership">Partnership</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* BUSINESS ADDRESS */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="street"
          >
            Business Address<span className="text-red-500">*</span>
          </label>
          <textarea
            id="street"
            name="businessAddress.street"
            value={formData.businessAddress.street}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
            placeholder="Street"
            required
          />
        </div>
        <div className="mb-4 flex gap-5">
          <div className="flex flex-col w-full">
            <input
              id="city"
              name="businessAddress.city"
              type="text"
              value={formData.businessAddress.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="City"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <input
              id="state"
              name="businessAddress.state"
              type="text"
              value={formData.businessAddress.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="State"
              required
            />
          </div>
        </div>
        <div className="mb-4 flex gap-5">
          <div className="flex flex-col w-full">
            <input
              id="pinCode"
              name="businessAddress.pinCode"
              type="text"
              value={formData.businessAddress.pinCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Pin Code"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <input
              id="country"
              name="businessAddress.country"
              type="text"
              value={formData.businessAddress.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Country"
              required
            />
          </div>
        </div>

        <div className="flex max-sm:flex-col gap-5 max-sm:gap-0">
          {/* ALTERNATIVE CONTACT */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="alternativeName"
            >
              Alternative Contact Name
            </label>
            <input
              id="alternativeName"
              name="alternativeContact.name"
              type="text"
              value={formData.alternativeContact.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Alternative Contact Name"
            />
          </div>

          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="alternativePhone"
            >
              Alternative Contact Phone Number
            </label>
            <input
              id="alternativePhone"
              name="alternativeContact.phoneNumber"
              type="text"
              minLength={10}
              maxLength={10}
              value={formData.alternativeContact.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Alternative Contact Phone Number"
            />
          </div>
        </div>

        {/* <div className="flex mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          {serviceId ? "Update" : "Add"}
        </button>
      </div> */}
      </form>

      <div className="flex w-1/2 max-2xl:w-3/4 max-lg:w-11/12 justify-end px-6 max-sm:mb-10">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
          >
            <FaAngleLeft size={20} /> Back
          </button>
        )}

        {currentStep < 3 && (
          <button
            onClick={handleSaveAndNext}
            className={`flex items-center bg-purple-500 text-white font-bold py-2 px-4 rounded-md ml-4`}
          >
            Next <FaAngleRight size={20} />
          </button>
        )}
      </div>
    </>
  );

};

export default BusinessInformation;
