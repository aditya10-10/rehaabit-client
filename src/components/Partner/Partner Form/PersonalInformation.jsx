import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import ImageDropzone from "../../ImageDropzone";
import { saveFormData } from "../../../slices/partnerSlice";
import { FaAngleRight } from "react-icons/fa";

const PersonalInformation = ({ onSave, handleNext }) => {
  const dispatch = useDispatch();

  const { partnerFormData, currentStep } = useSelector(
    (state) => state.partner
  );

  const [preview, setPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    firstName: partnerFormData.personalInformation?.firstName || "",
    lastName: partnerFormData.personalInformation?.lastName || "",
    dateOfBirth: partnerFormData.personalInformation?.dateOfBirth || "",
    gender: partnerFormData.personalInformation?.gender || "",
    nationality: partnerFormData.personalInformation?.nationality || "",
    identificationType:
      partnerFormData.personalInformation?.identificationType || "",
    identificationNumber:
      partnerFormData.personalInformation?.identificationNumber || "",
    photo: partnerFormData.personalInformation?.photo || null,
    email: partnerFormData.personalInformation?.email || "",
    address: {
      street: partnerFormData.personalInformation?.address?.street || "",
      city: partnerFormData.personalInformation?.address?.city || "",
      state: partnerFormData.personalInformation?.address?.state || "",
      postalCode:
        partnerFormData.personalInformation?.address?.postalCode || "",
      country: partnerFormData.personalInformation?.address?.country || "",
    },
    phoneNumber: partnerFormData.personalInformation?.phoneNumber || "",
  });

  formData.photo = thumbnail;

  useEffect(() => {
    setPreview(partnerFormData.personalInformation?.photo || null);
  }, [partnerFormData.personalInformation?.photo]);

  useEffect(() => {
    if (thumbnail) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(thumbnail);
    } else {
      setPreview(formData.thumbnail);
    }
  }, [thumbnail, formData.thumbnail]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name.startsWith("address")) {
      const [_, field] = name.split(".");
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleClose = () => {
    setPreview(null);
    setThumbnail(null);
  };

  const handleSaveAndNext = () => {
    const isValid = onSave(formData);
    if (isValid) {
      dispatch(saveFormData({ step: "personalInformation", data: formData }));
      handleNext();
    }
  };

  return (
    <>
      <form className="w-1/2 max-2xl:w-3/4 max-lg:w-11/12 mx-auto mt-4 p-6 max-sm:p-4">
        {/* FIRST AND LAST NAME */}
        <div className="mb-4 flex max-sm:flex-col gap-5">
          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name*
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Your First Name"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name*
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Your Last Name"
              required
            />
          </div>
        </div>

        {/* GENDER AND DOB */}
        <div className="mb-4 flex max-sm:flex-col gap-5">
          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender*
            </label>
            <select
              id="gender"
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dateOfBirth"
            >
              Date of Birth*
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Your Date of Birth"
              required
            />
          </div>
        </div>

        {/* NATIONALITY AND EMAIL */}
        <div className="mb-4 flex max-sm:flex-col gap-5">
          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nationality"
            >
              Nationality*
            </label>
            <input
              id="nationality"
              name="nationality"
              type="text"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Your Nationality"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Your Email"
            />
          </div>
        </div>

        {/* IDENTIFICATION TYPE AND NUMBER */}
        <div className="mb-4 flex max-sm:flex-col gap-5">
          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="identificationType"
            >
              Identification Type*
            </label>
            <select
              id="identificationType"
              name="identificationType"
              onChange={handleChange}
              value={formData.identificationType}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
            >
              <option value="">Select</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
              <option value="National ID">National ID</option>
              <option value="Birth Certificate">Birth Certificate</option>
              <option value="Aadhaar Card">Aadhaar Card</option>
              <option value="VoterID">VoterID</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="identificationNumber"
            >
              Identification Number*
            </label>
            <input
              id="identificationNumber"
              name="identificationNumber"
              type="text"
              value={formData.identificationNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Your Identification Number"
              required
            />
          </div>
        </div>

        {/* PHOTO UPLOAD */}
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="thumbnail"
        >
          Upload Image*
        </label>

        {preview ? (
          <div className="relative inline-block mb-4">
            <IoIosClose
              className="absolute top-2 right-2 text-2xl cursor-pointer text-red-600"
              onClick={handleClose}
            />
            <img
              src={
                typeof preview === "string"
                  ? preview
                  : URL.createObjectURL(preview)
              }
              alt="thumbnail"
              className="block max-w-full h-auto rounded-md"
            />
          </div>
        ) : (
          <div className="mb-4">
            <ImageDropzone onDrop={setThumbnail} image={thumbnail} />
          </div>
        )}

        {/* ADDRESS AND PHONE NUMBER */}
        <div className="mb-4 flex gap-5">
          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="street"
            >
              Address*
            </label>
            <textarea
              id="street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Street"
              required
            />
          </div>
        </div>
        <div className="mb-4 flex gap-5">
          <div className="flex flex-col w-full">
            <input
              id="city"
              name="address.city"
              type="text"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="City"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <input
              id="state"
              name="address.state"
              type="text"
              value={formData.address.state}
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
              id="postalCode"
              name="address.postalCode"
              type="text"
              value={formData.address.postalCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Postal Code"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <input
              id="country"
              name="address.country"
              type="text"
              value={formData.address.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Country"
              required
            />
          </div>
        </div>

        <div className="mb-4 flex gap-5">
          <div className="flex flex-col w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number*
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              minLength={10}
              maxLength={10}
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-100 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>
        </div>

        {/* <div className="flex mt-6">
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
          {serviceId ? "Update" : "Add"}
        </button>
      </div> */}
      </form>

      <div className="flex w-1/2 max-2xl:w-3/4 max-lg:w-11/12 justify-end px-6 max-sm:mb-10">
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

export default PersonalInformation;
