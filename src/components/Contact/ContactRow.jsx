import React, { useState } from "react";
import { formattedDate } from "../../utils/dateFormatter";
import { FaEllipsisV, FaEye, FaEdit, FaComments } from "react-icons/fa"; // Importing icons for actions

const ContactRow = ({
  contact,
  handleViewDetails,
  handleUpdateDetails,
  handlePreviousResponses,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <tr
      className="hover:bg-gray-50 transition-colors duration-200"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <td className="border-b border-gray-200 p-4 text-gray-800">
        {contact.caseId}
      </td>
      <td className="border-b border-gray-200 p-4 text-gray-800">
        {contact.firstName} {contact.lastName}
      </td>
      <td className="border-b border-gray-200 p-4 text-gray-800">
        <div>{contact.phoneNumber}</div>
        <div>{contact.email}</div>
      </td>
      <td className="border-b border-gray-200 p-4">
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${
            contact.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : contact.status === "in progress"
              ? "bg-blue-100 text-blue-700"
              : contact.status === "resolved"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {contact.status}
        </span>
      </td>
      <td className="border-b border-gray-200 p-4">
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${
            contact.priority === "low"
              ? "bg-green-100 text-green-700"
              : contact.priority === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : contact.priority === "high"
              ? "bg-orange-100 text-orange-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {contact.priority}
        </span>
      </td>
      <td className="border-b border-gray-200 p-4 text-gray-800">
        {contact.assignedAdmin && contact.assignedAdmin.additionalDetails
          ? `${contact.assignedAdmin.additionalDetails.firstName} ${contact.assignedAdmin.additionalDetails.lastName}`
          : "Not Assigned"}
      </td>
      <td className="border-b border-gray-200 p-4 text-gray-800">
        {formattedDate(contact.createdAt)}
      </td>
      <td className="border-b border-gray-200 p-4 relative">
        <button onClick={toggleDropdown} className="focus:outline-none">
          <FaEllipsisV className="text-gray-500 hover:text-gray-700" />
        </button>
        {isDropdownOpen && (
          <div
            className="absolute right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10 transition-opacity duration-200 ease-in-out"
            onMouseLeave={closeDropdown}
          >
            <div className="py-1">
              <button
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 w-full text-left transition-colors duration-150 rounded-md"
                onClick={() => {
                  handleViewDetails(contact);
                  closeDropdown();
                }}
              >
                <FaEye className="mr-2" /> View
              </button>
              <button
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 w-full text-left transition-colors duration-150 rounded-md"
                onClick={() => {
                  handleUpdateDetails(contact);
                  closeDropdown();
                }}
              >
                <FaEdit className="mr-2" /> Update
              </button>
              <button
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 w-full text-left transition-colors duration-150 rounded-md"
                onClick={() => {
                  handlePreviousResponses(contact);
                  closeDropdown();
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
