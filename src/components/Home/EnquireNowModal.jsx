import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { enquire } from "../../slices/enquireSlice";

const EnquireNowModal = ({
  isEnquireNowModalOpen,
  handleEnquireNowModal,
  serviceNameToPass,
}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.enquire);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [query, setQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      contactNumber,
      serviceName: serviceNameToPass,
      query,
    };

    dispatch(enquire({ formData: data }))
      .unwrap()
      .then(() => {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      })
      .catch(() => {
        // Handle error if submission fails
      });

    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNumber("");
    setQuery("");
    handleEnquireNowModal();
  };

  return (
    <AnimatePresence>
      {isEnquireNowModalOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-gradient-to-br from-purple-100 via-blue-100 to-white p-10 rounded-xl shadow-2xl w-full max-w-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            {/* Close Button */}
            <button
              onClick={handleEnquireNowModal}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-transform"
            >
              <IoIosClose size={28} />
            </button>

            <h2 className="text-2xl font-bold text-gray-700 text-center mb-8">
              Enquire Now
            </h2>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    First Name*
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="John"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Email*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              {/* Contact Number */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="1234567890"
                  required
                />
              </div>

              {/* Query */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Your Query*
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="Type your query here"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md transition-transform duration-300 ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-teal-700 hover:scale-105"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Popup on successful submission */}
      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <motion.div
            className="relative z-50 bg-teal-50 text-gray-900 p-8 rounded-xl shadow-xl w-full max-w-xs text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Thank You for Your Enquiry!
            </h3>
            <p className="mb-4 text-gray-800">
              We've received your request and will get back to you as soon as
              possible. Our team is already on it!
            </p>
            <p className="text-sm text-gray-600">
              You should hear from us shortly. Feel free to check your inbox for
              confirmation.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EnquireNowModal;
