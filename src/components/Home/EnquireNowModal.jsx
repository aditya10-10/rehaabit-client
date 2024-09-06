import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { enquire } from "../../slices/enquireSlice";

const EnquireNowModal = ({
  isEnquireNowModalOpen,
  handleEnquireNowModal,
  serviceIdToPass,
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
      serviceId: serviceIdToPass,
      query,
    };

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
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/4 max-h-[70vh] overflow-y-auto relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={handleEnquireNowModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full"
            >
              <IoIosClose size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Enquire Now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Query*
                </label>
                <textarea
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
