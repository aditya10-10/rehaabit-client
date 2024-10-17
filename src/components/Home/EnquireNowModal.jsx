import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { enquire } from "../../slices/enquireSlice";
import { toast } from "sonner";

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

    console.log(data);

    dispatch(enquire({ formData: data }));
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
            className="relative bg-gradient-to-b from-white to-gray-100 p-8 rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={handleEnquireNowModal}
              className="absolute top-4 right-4 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform transform hover:scale-110"
            >
              <IoIosClose size={28} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Enquire Now
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
                  placeholder="John"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
                  placeholder="Doe"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
                  placeholder="1234567890"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Query*
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors"
                  placeholder="Type your query here"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquireNowModal;
