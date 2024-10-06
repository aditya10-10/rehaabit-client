import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../slices/usersSlice";
import { updateContactStatusAndAssignment } from "../../slices/contactSlice";

const UpdateContactModal = ({ contact, onClose }) => {
  const dispatch = useDispatch();

  const { users, isLoading, error } = useSelector((state) => state.users);

  const [updatedContact, setUpdatedContact] = useState(contact);

  // Fetch users when the component mounts or when users/contact changes
  useEffect(() => {
    // This will fetch the users whenever the component mounts or contact changes
    dispatch(getAllUsers());
  }, [dispatch, contact]); // Adding 'contact' as a dependency ensures the component refreshes if the contact changes.

  // Filter for admin users
  const adminUsers = Array.isArray(users)
    ? users.filter((user) => user.accountType === "Admin")
    : [];

  // Log for debugging
  console.log("Admin Users:", adminUsers);

  const handleUpdate = async () => {
    try {
      const payload = {
        caseId: updatedContact.caseId,
        formData: {
          id: contact._id,
          newStatus: updatedContact.status,
          newPriority: updatedContact.priority,
          assignedAdmin: updatedContact.assignedAdmin || null, // Avoid sending undefined
          adminNotes: updatedContact.adminNotes, // Admin Notes are now included
        },
      };

      console.log("Payload being sent to backend:", payload);

      const response = await dispatch(
        updateContactStatusAndAssignment(payload)
      ).unwrap();

      console.log("Backend response:", response);

      onClose(); // Close the modal after successful update
    } catch (error) {
      // Log more details for better debugging
      console.error("Error details:", error);
      console.error("Failed to update contact:", error.message || error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Update Contact Details</h2>
        <form>
          {/* Status Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              className="shadow border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={updatedContact.status}
              onChange={(e) =>
                setUpdatedContact({ ...updatedContact, status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Priority Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Priority</label>
            <select
              className="shadow border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={updatedContact.priority}
              onChange={(e) =>
                setUpdatedContact({
                  ...updatedContact,
                  priority: e.target.value,
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Assigned Admin Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Assigned Admin</label>
            <select
              className="shadow border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={updatedContact.assignedAdmin || ""}
              onChange={(e) =>
                setUpdatedContact({
                  ...updatedContact,
                  assignedAdmin: e.target.value,
                })
              }
            >
              <option value="">Select Admin</option>
              {adminUsers.map((admin) => (
                <option key={admin._id} value={admin._id}>
                  {admin.additionalDetails
                    ? `${admin.additionalDetails.firstName || "Unknown"} ${
                        admin.additionalDetails.lastName || ""
                      }`
                    : "Unknown"}
                </option>
              ))}
            </select>
          </div>

          {/* Admin Notes Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Admin Notes</label>
            <textarea
              className="shadow border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="4"
              value={updatedContact.adminNotes || ""}
              onChange={(e) =>
                setUpdatedContact({
                  ...updatedContact,
                  adminNotes: e.target.value,
                })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateContactModal;
