import { AnimatePresence, motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../../slices/usersSlice";
import { useState } from "react";

const NewUserModal = ({ isNewUserModalOpen, handleNewUserModal }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [accountType, setAccountType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { firstName, lastName, email, contactNumber, accountType };

    dispatch(createNewUser({ formData: newUser }));
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNumber("");
    handleNewUserModal();
  };

  return (
    <AnimatePresence>
      {isNewUserModalOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-lg:w-3/4 max-h-[70vh] overflow-y-auto relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={handleNewUserModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full"
            >
              <IoIosClose size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
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
                  Last Name
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
                <label className="block text-sm font-medium mb-1">Email</label>
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
                  Contact Number
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
                  Account Type
                </label>
                <select
                  name="accountType"
                  id="accountType"
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                >
                  <option value="">Select Account Type</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Partner">Partner</option>
                  <option value="Caller">Caller</option>
                  <option value="Content Writer">Content Writer</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add User
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewUserModal;
