import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { contact } from "../../slices/contactSlice";

const ContactForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted:", formData);

    dispatch(contact({ formData }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-10 max-md:p-6">
      <div className="flex max-xs:flex-col mb-4 w-full gap-5">
        <div className="w-1/2 max-xs:w-full">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-2"
          />
        </div>
        <div className="w-1/2 max-xs:w-full">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-2"
          />
        </div>
      </div>

      <div className="flex max-xs:flex-col mb-4 w-full gap-5">
        <div className="w-1/2 max-xs:w-full">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-2"
          />
        </div>
        <div className="w-1/2 max-xs:w-full">
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-2"
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 font-semibold text-start">Select Subject?</p>

        <div className="flex items-center flex-wrap gap-5">
          <label className="mb-2 flex items-center cursor-pointer">
            <input
              type="radio"
              name="subject"
              value="General Inquiry"
              checked={formData.subject === "General Inquiry"}
              onChange={handleChange}
              className="hidden"
            />
            <span className="rounded-full mr-2 flex items-center justify-center">
              {formData.subject === "General Inquiry" ? (
                <span className="bg-black text-sm text-white rounded-full">
                  <FaCheck />
                </span>
              ) : (
                <span className="bg-gray-300 rounded-full h-4 w-4"></span>
              )}
            </span>
            General Inquiry
          </label>

          <label className="mb-2 flex items-center cursor-pointer">
            <input
              type="radio"
              name="subject"
              value="Support"
              checked={formData.subject === "Support"}
              onChange={handleChange}
              className="hidden"
            />
            <span className="rounded-full mr-2 flex items-center justify-center">
              {formData.subject === "Support" ? (
                <span className="bg-black text-sm text-white rounded-full">
                  <FaCheck />
                </span>
              ) : (
                <span className="bg-gray-300 rounded-full h-4 w-4"></span>
              )}
            </span>
            Support
          </label>

          <label className="mb-2 flex items-center cursor-pointer">
            <input
              type="radio"
              name="subject"
              value="Feedback"
              checked={formData.subject === "Feedback"}
              onChange={handleChange}
              className="hidden"
            />
            <span className="rounded-full mr-2 flex items-center justify-center">
              {formData.subject === "Feedback" ? (
                <span className="bg-black text-sm text-white rounded-full">
                  <FaCheck />
                </span>
              ) : (
                <span className="bg-gray-300 rounded-full h-4 w-4"></span>
              )}
            </span>
            Feedback
          </label>

          <label className="mb-2 flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="subject"
              value="Other"
              checked={formData.subject === "Other"}
              onChange={handleChange}
              className="hidden"
            />
            <span className="rounded-full mr-2 flex items-center justify-center">
              {formData.subject === "Other" ? (
                <span className="bg-black text-sm text-white rounded-full">
                  <FaCheck />
                </span>
              ) : (
                <span className="bg-gray-300 rounded-full h-4 w-4"></span>
              )}
            </span>
            Other
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="text-sm font-[500] text-gray-400">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write Your Message.."
          className="w-full border-b-2 border-gray-300 focus:border-black focus:outline-none py-2"
          rows="4"
        ></textarea>
      </div>

      <div className="flex justify-end w-full">
        <button
          type="submit"
          className="bg-[#00AF84] text-white font-bold py-2 px-6 rounded-md z-10 relative"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
