import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService, editService } from "../../../slices/serviceSlice";
import {
  addPartnerInformation,
  saveFormData,
} from "../../../slices/partnerSlice";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const AdditionalInformation = ({ onSave, handleBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  useEffect(() => {
    setFormData({
      numberOfEmployees: "",
      yearsOfExperience: "",
      servicesOffered: [],
      serviceAreas: [],
      bankName: "",
      accountNumber: "",
      routingNumber: "",
    });
  }, []);

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

  // console.log(partnerFormData.personalInformation.photo);

  const handleSubmit = () => {
    const isEmpty = 
    formData.numberOfEmployees === "" || 
    formData.yearsOfExperience === "" || 
    formData.servicesOffered.length === 0 || 
    formData.serviceAreas.length === 0;

  // Check if any required field is empty
  if (isEmpty) {
    toast.error("Please fill in all required fields");
    return;
  }
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
      setIsSubmitted(true);
    }
  };
  const closeModalAndNavigate = () => {
  setIsSubmitted(false); // Close the modal
  navigate("/partner"); // Then navigate
};

  const handleDropdownChange = (e) => {
    const selectedService = e.target.value;
    if (
      selectedService &&
      !formData.servicesOffered.includes(selectedService)
    ) {
      setFormData({
        ...formData,
        servicesOffered: [...formData.servicesOffered, selectedService],
      });
    }
  };

  // Function to handle dropdown selection for service areas
  const handleAreaDropdownChange = (e) => {
    const selectedArea = e.target.value;
    if (selectedArea && !formData.serviceAreas.includes(selectedArea)) {
      setFormData({
        ...formData,
        serviceAreas: [...formData.serviceAreas, selectedArea],
      });
    }
  };

  return (
    <>
      <form className="w-1/2 max-2xl:w-3/4 max-lg:w-11/12 mx-auto mt-4 p-6 max-sm:p-4">
        <div className="flex gap-5 max-sm:flex-col max-sm:gap-0">
          {/* NUMBER OF EMPLOYEES */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numberOfEmployees"
            >
              Number of Employees<span className="text-red-500">*</span>
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
              Years of Experience<span className="text-red-500">*</span>
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

        <div className="flex gap-5 max-sm:flex-col max-sm:gap-0">
          {/* SERVICES OFFERED */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="servicesOffered"
            >
              Services Offered<span className="text-red-500">*</span>
            </label>

            {/* Text input for custom services */}
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

            {/* Dropdown for selecting predefined services */}
            <select
              id="selectServices"
              name="selectServices"
              onChange={handleDropdownChange}
              className="w-full mt-3 px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
            >
              <option value="">Select a service</option>
              <option value="Plumbing Services">Plumbing Services</option>
              <option value="Electrical Services">Electrical Services</option>
              <option value="Appliances Repair">Appliances Repair</option>
              <option value="Home Improvement">Home Improvement</option>
              <option value="Carpentry Services">Carpentry Services</option>
            </select>
          </div>

          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="serviceAreas"
            >
              Service Areas
            </label>

            {/* Text input for custom service areas */}
            <input
              id="serviceAreas"
              name="serviceAreas"
              type="text"
              value={formData.serviceAreas.join(", ")}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Service Areas (comma-separated)"
            />

            {/* Dropdown for selecting predefined service areas */}
            <select
              id="selectServiceAreas"
              name="selectServiceAreas"
              onChange={handleAreaDropdownChange}
              className="w-full mt-3 px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
            >
              <option value="">Select a service area</option>
              <option value="Downtown">Downtown</option>
              <option value="Uptown">Uptown</option>
              <option value="Suburbs">Suburbs</option>
              <option value="Industrial Area">Industrial Area</option>
              <option value="Rural">Rural</option>
            </select>
          </div>
        </div>

        <div className="flex gap-5 max-sm:flex-col max-sm:gap-0">
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

      <div className="flex w-1/2 max-2xl:w-3/4 max-lg:w-11/12 justify-end px-6 max-sm:mb-10">
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



       {/* Modal for Thank You message */}
{isSubmitted && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold text-green-500">Thank You!</h2>
      <p className="mt-4 text-lg">Your form has been successfully submitted.</p>
      <button
        onClick={closeModalAndNavigate} // Use this function to close modal and navigate
        className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-md"
      >
        Close
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default AdditionalInformation;
