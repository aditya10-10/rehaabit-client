import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService, editService } from "../../../slices/serviceSlice";
import {
  addPartnerInformation,
  saveFormData,
} from "../../../slices/partnerSlice";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdditionalInformation = ({ onSave, handleBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentStep, partnerFormData, isLoading } = useSelector(
    (state) => state.partner
  );

  const [formData, setFormData] = useState({
    numberOfEmployees:
      partnerFormData?.additionalInformation?.numberOfEmployees || "",
    yearsOfExperience:
      partnerFormData?.additionalInformation?.yearsOfExperience || "",
    servicesOffered:
      partnerFormData?.additionalInformation?.servicesOffered || [],
    serviceAreas: partnerFormData?.additionalInformation?.serviceAreas || [],
    bankName: partnerFormData?.additionalInformation?.bankName || "",
    accountNumber: partnerFormData?.additionalInformation?.accountNumber || "",
    routingNumber: partnerFormData?.additionalInformation?.routingNumber || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "servicesOffered" || name === "serviceAreas") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  console.log(partnerFormData.personalInformation.photo)

  const handleSubmit = () => {
    const isValid = onSave(formData);
    if (isValid) {
      dispatch(saveFormData({ step: "additionalInformation", data: formData }));
      dispatch(
        addPartnerInformation({
          formData: {
            ...partnerFormData.personalInformation,
            ...partnerFormData.businessInformation,
            ...formData,
          },
        })
      );
      navigate("/partner");
    }
  };

  return (
    <>
      <form className="w-[50%] mx-auto mt-4 p-6">
        <div className="flex gap-5">
          {/* NUMBER OF EMPLOYEES */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numberOfEmployees"
            >
              Number of Employees*
            </label>
            <input
              id="numberOfEmployees"
              name="numberOfEmployees"
              type="text"
              value={formData.numberOfEmployees}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Number of Employees"
              required
            />
          </div>

          {/* YEARS OF EXPERIENCE */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="yearsOfExperience"
            >
              Years of Experience*
            </label>
            <input
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="text"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Years of Experience"
              required
            />
          </div>
        </div>

        <div className="flex gap-5">
          {/* SERVICES OFFERED */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="servicesOffered"
            >
              Services Offered*
            </label>
            <input
              id="servicesOffered"
              name="servicesOffered"
              type="text"
              value={formData.servicesOffered.join(", ")}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Services Offered (comma-separated)"
              required
            />
          </div>

          {/* SERVICE AREAS */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="serviceAreas"
            >
              Service Areas
            </label>
            <input
              id="serviceAreas"
              name="serviceAreas"
              type="text"
              value={formData.serviceAreas.join(", ")}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Service Areas (comma-separated)"
            />
          </div>
        </div>

        <div className="flex gap-5">
          {/* BANK NAME */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bankName"
            >
              Bank Name
            </label>
            <input
              id="bankName"
              name="bankName"
              type="text"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Bank Name"
            />
          </div>

          {/* ACCOUNT NUMBER */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="accountNumber"
            >
              Account Number
            </label>
            <input
              id="accountNumber"
              name="accountNumber"
              type="text"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Account Number"
            />
          </div>
        </div>
      </form>

      <div className="flex w-1/2 justify-end px-6">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
          >
            <FaAngleLeft size={20} /> Back
          </button>
        )}

        {currentStep === 2 && (
          <button
            onClick={handleSubmit}
            className={`flex items-center bg-purple-500 text-white font-bold py-2 px-4 rounded-md ml-4`}
            disabled={isLoading}
          >
            {isLoading ? `Submitting...` : `Submit`}
          </button>
        )}
      </div>
    </>
  );
};

export default AdditionalInformation;
