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
  const [isSubmitted, setIsSubmitted] = useState(false); // State to control popup visibility

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
        // Set popup to visible
        setIsSubmitted(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      })
      .catch(() => {
        // Handle error if submission fails
      });

    // Reset form and close modal
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
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white bg-gradient-to-b from-indigo-50 to-white p-8 rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={handleEnquireNowModal}
              className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-transform"
            >
              <IoIosClose size={28} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Enquire Now
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-400 bg-gradient-to-r from-white to-indigo-50 hover:shadow-lg"
                  placeholder="John"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Last Name*
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-400 bg-gradient-to-r from-white to-indigo-50 hover:shadow-lg"
                  placeholder="Doe"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-400 bg-gradient-to-r from-white to-indigo-50 hover:shadow-lg"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-400 bg-gradient-to-r from-white to-indigo-50 hover:shadow-lg"
                  placeholder="1234567890"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Your Query*
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-400 bg-gradient-to-r from-white to-indigo-50 hover:shadow-lg"
                  placeholder="Type your query here"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-600 ${
                    isLoading ? "opacity-60 cursor-not-allowed" : ""
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
{/* Custom popup for successful submission */}
{isSubmitted && (
 <div className="fixed inset-0 flex items-center justify-center z-50">
{/* Dark overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-50 z-40"></div>
    {/* Popup */}
    <motion.div
      className="relative z-50 bg-lime-200 text-gray-800 p-6 rounded-2xl shadow-lg max-w-sm w-full h-60 text-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <h3 className="text-xl font-semibold mb-2 mt-9">Thank You!</h3>
      <p>Your enquiry has been submitted successfully.</p>
    </motion.div>
  </div>
)}

    </AnimatePresence>
  );
};

export default EnquireNowModal;