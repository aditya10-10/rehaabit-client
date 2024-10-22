import React, { useEffect, useState, useRef } from "react";
import { formattedDate } from "../../utils/dateFormatter";
import { FaEllipsisV, FaEye, FaEdit, FaComments, FaRegDotCircle } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { getAllUsers } from "../../slices/usersSlice";
import { updateContactStatusAndAssignment } from "../../slices/contactSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

const ContactRow = ({
  index,
  contact,
  handleViewDetails,
  handleUpdateDetails,
  handlePreviousResponses,
}) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [priorityDropdownOpen, setPriorityDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setStatusDropdownOpen(false);
        setPriorityDropdownOpen(false);
        setAdminDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const adminUsers = Array.isArray(users)
    ? users.filter((user) => user.accountType === "Admin" || user.accountType === "Caller")
    : [];

  const handleUpdate = async (contact, updateType, newValue) => {
    const payload = {
      caseId: contact?.caseId,
      formData: {
        id: contact._id,
        newStatus: updateType === "status" ? newValue : contact.status,
        newPriority: updateType === "priority" ? newValue : contact.priority,
        assignedAdmin: updateType === "admin" ? newValue : contact.assignedAdmin,
        adminNotes: contact.adminNotes,
      },
    };
    if(!contact?.caseId){
      toast.error("Case ID is required");
      return;
    }
    // console.log("payload",payload);
    try {
      await dispatch(updateContactStatusAndAssignment(payload)).unwrap();
    } catch (error) {
      // console.error(`Failed to update contact ${updateType}:`, error);
    }
  };

  const toggleDropdown = (dropdownType) => {
    setIsDropdownOpen(dropdownType === 'isDropdownOpen');
    setStatusDropdownOpen(dropdownType === 'statusDropdownOpen');
    setPriorityDropdownOpen(dropdownType === 'priorityDropdownOpen');
    setAdminDropdownOpen(dropdownType === 'adminDropdownOpen');
  };

  return (
    <tr ref={dropdownRef} className="hover:bg-gray-50 transition-colors duration-200" style={{ fontFamily: "Roboto, sans-serif" }}>
      <td className="border-b border-gray-200 p-4 text-gray-800">{contact.caseId}</td>
      <td className="border-b border-gray-200 p-4 text-gray-800">
        {contact.firstName} {contact.lastName}
      </td>
      <td className="border-b border-gray-200 p-4 text-gray-800">
        <div>{contact.phoneNumber}</div>
        <div>{contact.email}</div>
      </td>

      {/* Status Cell */}
      <td className="border-b border-gray-200 p-4 text-gray-800">
        <span className="flex gap-2 items-center">
          <FaRegDotCircle onClick={() => toggleDropdown('statusDropdownOpen')} className="cursor-pointer" />
          <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
              contact.status === "pending" ? "bg-yellow-100 text-yellow-700"
              : contact.status === "in progress" ? "bg-blue-100 text-blue-700"
              : contact.status === "resolved" ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
          >
            {contact.status}
          </span>
          {statusDropdownOpen && (
            <div className={`absolute bg-white border rounded-lg shadow-lg mt-14 ml-5 z-10 w-32 `}>
              {["pending", "in progress", "resolved", "closed"].map((status) => (
                <button
                  key={status}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  onClick={() => {
                    handleUpdate(contact, "status", status);
                    setStatusDropdownOpen(false);
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </span>
      </td>

      {/* Priority Cell */}
      <td className="border-b border-gray-200 p-4 text-gray-800">
        <span className="flex gap-2 items-center">
          <FaRegDotCircle onClick={() => toggleDropdown('priorityDropdownOpen')}  className="cursor-pointer" />
          <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
              contact.priority === "low" ? "bg-green-100 text-green-700"
              : contact.priority === "medium" ? "bg-yellow-100 text-yellow-700"
              : contact.priority === "high" ? "bg-orange-100 text-orange-700"
              : "bg-red-100 text-red-700"
            }`}
          >
            {contact.priority}
          </span>
          {priorityDropdownOpen && (
            <div className={`absolute bg-white border rounded-lg shadow-lg mt-2 ml-8 z-10 w-32 `}>
              {["low", "medium", "high", "urgent"].map((priority) => (
                <button
                  key={priority}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  onClick={() => {
                    handleUpdate(contact, "priority", priority);
                    setPriorityDropdownOpen(false);
                  }}
                >
                  {priority}
                </button>
              ))}
            </div>
          )}
        </span>
      </td>

      {/* Assigned Admin Cell */}
      <td className="border-b border-gray-200 p-4 text-gray-800">
      <div className="flex gap-2 items-center"  >
      {contact.assignedAdmin && contact.assignedAdmin.additionalDetails && 
      <FaRegDotCircle onClick={() => toggleDropdown('adminDropdownOpen')} className="cursor-pointer" />}
        {contact.assignedAdmin && contact.assignedAdmin.additionalDetails
          ? `${contact.assignedAdmin.additionalDetails.firstName} ${contact.assignedAdmin.additionalDetails.lastName}`
          : <IoPersonAddSharp 
              onClick={() => toggleDropdown('adminDropdownOpen')}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />}
        {adminDropdownOpen && (
          <div className={`absolute bg-white border rounded-lg shadow-lg mt-2 ml-8 z-10 w-32 `}>
            {adminUsers.map((admin) => (
              <button
                key={admin._id}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                onClick={() => {
                  handleUpdate(contact, "admin", admin);
                  setAdminDropdownOpen(false);
                }}
              >
                {`${admin.additionalDetails.firstName} ${admin.additionalDetails.lastName}`}
              </button>
            ))}
          </div>
        )}
        </div>
      </td>
      <td className="border-b border-gray-200 p-4 text-gray-800">{formattedDate(contact.createdAt)}</td>

      {/* Action Menu */}
      <td className="border-b border-gray-200 p-4 text-gray-800">
        <button onClick={() => toggleDropdown('isDropdownOpen')} className="focus:outline-none">
          <FaEllipsisV className="text-gray-500 hover:text-gray-700" />
        </button>
        {isDropdownOpen && (
          <div className={`absolute right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10 `}>
            <div className="py-1">
              <button
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 w-full text-left"
                onClick={() => {
                  handleViewDetails(contact);
                  setIsDropdownOpen(false);
                }}
              >
                <FaEye className="mr-2" /> View
              </button>
              <button
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 w-full text-left"
                onClick={() => {
                  handlePreviousResponses(contact);
                  setIsDropdownOpen(false);
                }}
              >
                <FaComments className="mr-2" /> Responses
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ContactRow;
