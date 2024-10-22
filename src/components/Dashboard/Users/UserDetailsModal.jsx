import { AnimatePresence, motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers, getUser, updateUserDetails } from "../../../slices/usersSlice";
import { CgProfile } from "react-icons/cg";
import { CartServices } from "../../Cart";

const UserDetailsModal = ({
  isUserDetailsModalOpen,
  handleUserDetailsModal,
}) => {
  const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state.users);

  // console.log(userDetails);

  const [firstName, setFirstName] = useState(
    userDetails?.additionalDetails?.firstName || ""
  );
  const [lastName, setLastName] = useState(
    userDetails?.additionalDetails?.lastName || ""
  );
  const [email, setEmail] = useState(
    userDetails?.additionalDetails?.email || ""
  );
  const [contactNumber, setContactNumber] = useState(userDetails.contactNumber);

  // console.log(userData?.contactNumber)

  // Editing states for each field
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingContactNumber, setIsEditingContactNumber] = useState(false);
  const [cartServices, setCartServices] = useState([]);

  // const { cartServices, isLoading, totalQty } = useSelector(
  //   (state) => state.cart
  // );

  useEffect(() => {
    setFirstName(userDetails?.additionalDetails?.firstName);
    setLastName(userDetails?.additionalDetails?.lastName);
    setEmail(userDetails?.additionalDetails?.email);
    setContactNumber(userDetails?.contactNumber);
    setCartServices(userDetails?.cart?.services);
    // dispatch(getUser())
  }, [userDetails, dispatch]);

  const { _id, additionalDetails, address, image } = userDetails;

  const handleEditIcon = (file) => {
    const formData = new FormData();
    formData.append("userId", _id);
    if (file) {
      formData.append("image", file);
    }

    dispatch(updateUserDetails({ formData }));
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("contactNumber", contactNumber);

    dispatch(updateUserDetails({ formData }));
  };

  return (
    <AnimatePresence>
      {isUserDetailsModalOpen && (
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
              onClick={handleUserDetailsModal}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full"
            >
              <IoIosClose size={24} />
            </button>

            <div className="flex flex-col items-center justify-center w-full px-10 max-lg:px-4">
              <div className="w-full flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  {image ? (
                    <img
                      src={image}
                      alt="profile"
                      className="rounded-full h-16 w-16"
                    />
                  ) : (
                    <CgProfile size={70} className="text-blue-300" />
                  )}
                  <input
                    type="file"
                    id={`newImage-${_id}`}
                    className="hidden"
                    onChange={(e) => handleEditIcon(e.target.files[0])}
                  />
                  <label
                    htmlFor={`newImage-${_id}`}
                    className="absolute bottom-0 right-[10px] transform translate-x-1/2 bg-blue-500 rounded-full p-1 text-white text-sm cursor-pointer"
                  >
                    <FaRegEdit />
                  </label>
                </div>

                <table className="w-full text-left border-collapse">
                  <tbody>
                    {/* First Name */}
                    <tr>
                      <td className="font-bold p-2">First Name:</td>
                      {isEditingFirstName ? (
                        <td className="flex items-center gap-5">
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            autoFocus
                            className="border border-gray-400 outline-none p-1 rounded-md"
                          />
                          <button
                            onClick={() => {
                              setIsEditingFirstName(false);
                              handleSave();
                            }}
                            className="capitalize text-blue-500"
                          >
                            save
                          </button>
                          <button
                            onClick={() => setIsEditingFirstName(false)}
                            className="text-red-500 capitalize"
                          >
                            cancel
                          </button>
                        </td>
                      ) : (
                        <td className="p-2 flex items-center gap-5">
                          {additionalDetails?.firstName}
                          <FaRegEdit
                            size={25}
                            className="bg-blue-500 rounded-full p-1 text-white cursor-pointer"
                            onClick={() => setIsEditingFirstName(true)}
                          />
                        </td>
                      )}
                    </tr>

                    {/* Last Name */}
                    <tr>
                      <td className="font-bold p-2">Last Name:</td>
                      {isEditingLastName ? (
                        <td className="flex items-center gap-5">
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            autoFocus
                            className="border border-gray-400 outline-none p-1 rounded-md"
                          />
                          <button
                            onClick={() => {
                              setIsEditingLastName(false);
                              handleSave();
                            }}
                            className="capitalize text-blue-500"
                          >
                            save
                          </button>
                          <button
                            onClick={() => setIsEditingLastName(false)}
                            className="text-red-500 capitalize"
                          >
                            cancel
                          </button>
                        </td>
                      ) : (
                        <td className="p-2 flex items-center gap-5">
                          {additionalDetails?.lastName}
                          <FaRegEdit
                            size={25}
                            className="bg-blue-500 rounded-full p-1 text-white cursor-pointer"
                            onClick={() => setIsEditingLastName(true)}
                          />
                        </td>
                      )}
                    </tr>

                    {/* Email */}
                    <tr>
                      <td className="font-bold p-2">Email:</td>
                      {isEditingEmail ? (
                        <td className="flex items-center gap-5">
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                            className="border border-gray-400 outline-none p-1 rounded-md"
                          />
                          <button
                            onClick={() => {
                              setIsEditingEmail(false);
                              handleSave();
                            }}
                            className="capitalize text-blue-500"
                          >
                            save
                          </button>
                          <button
                            onClick={() => setIsEditingEmail(false)}
                            className="text-red-500 capitalize"
                          >
                            cancel
                          </button>
                        </td>
                      ) : (
                        <td className="p-2 flex items-center gap-5">
                          {additionalDetails?.email}
                          <FaRegEdit
                            size={25}
                            className="bg-blue-500 rounded-full p-1 text-white cursor-pointer"
                            onClick={() => setIsEditingEmail(true)}
                          />
                        </td>
                      )}
                    </tr>

                    {/* Contact Number */}
                    <tr>
                      <td className="font-bold p-2">Contact Number:</td>
                      {isEditingContactNumber ? (
                        <td className="flex items-center gap-5">
                          <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            autoFocus
                            className="border border-gray-400 outline-none p-1 rounded-md"
                          />
                          <button
                            onClick={() => {
                              setIsEditingContactNumber(false);
                              handleSave();
                            }}
                            className="capitalize text-blue-500"
                          >
                            save
                          </button>
                          <button
                            onClick={() => setIsEditingContactNumber(false)}
                            className="text-red-500 capitalize"
                          >
                            cancel
                          </button>
                        </td>
                      ) : (
                        <td className="p-2 flex items-center gap-5">
                          {contactNumber}
                          <FaRegEdit
                            size={25}
                            className="bg-blue-500 rounded-full p-1 text-white cursor-pointer"
                            onClick={() => setIsEditingContactNumber(true)}
                          />
                        </td>
                      )}
                    </tr>

                    {/* Address */}
                    <tr>
                      <td className="font-bold p-2">Address:</td>
                      <td className="p-2">
                        {address && address.map((addr) => (
                          <div key={addr._id} className="mb-2">
                            {addr.status === "Default" && (
                              <span className="text-blue-500">Default</span>
                            )}
                            {` ${addr.name}, ${addr.address}, ${addr.addressType}, ${addr.locality}, ${addr.landmark}, ${addr.city}, ${addr.state}, ${addr.pincode}, ${addr.phoneNo}, ${addr.alternativePhone}`}
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full shadow-custom-shadow rounded-lg">
              {userDetails?.cart?.services && (
                <CartServices
                  cartServices={cartServices}
                  // isLoading={isLoading}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserDetailsModal;
