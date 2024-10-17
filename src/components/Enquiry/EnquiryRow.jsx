import React, { useEffect, useState, useRef } from "react";
import { formattedDate } from "../../utils/dateFormatter";
import { FaEllipsisV, FaEye, FaEdit, FaComments, FaRegDotCircle } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { getAllUsers } from "../../slices/usersSlice";
import { updateEnquiryAndStatusAssignment } from "../../slices/enquireSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

const EnquiryRow = ({
  index,
  enquiry,
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
  const { enquiries, isLoading, error} = useSelector((state) => state.enquire);
  console.log(enquiry);
  const enquiryLength = enquiries?.length;
  const n=Math.floor(enquiryLength/5);
  let isLastEnquiryofPage=0;
  for(let i=0;i<n;i++){
    isLastEnquiryofPage=index===((i+1)*5)-1;
    if(isLastEnquiryofPage) break;
  }
  // if(enquiryLength%5!==0){
  //   isLastEnquiryofPage=index===enquiryLength-1;
  // }
//  console.log(index,isLastEnquiryofPage);
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

  const handleUpdate = async (enquiry, updateType, newValue) => {
    const payload = {
      enquiryId: enquiry.enquiryId,
      formData: {
        id: enquiry._id,
        newStatus: updateType === "status" ? newValue : enquiry.status,
        newPriority: updateType === "priority" ? newValue : enquiry.priority,
        assignedAdmin: updateType === "admin" ? newValue : enquiry.assignedAdmin,
      },
    };
    if(!enquiry?.enquiryId){
      toast.error("Enquiry ID is required");
      return;
    }
    try {
      await dispatch(updateEnquiryAndStatusAssignment(payload)).unwrap();
    } catch (error) {
      console.error(`Failed to update enquiry ${updateType}:`, error);
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
      <td className="border-b border-gray-200 p-4 text-gray-800">{enquiry?.enquiryId}</td>
      <td className="border-b border-gray-200 p-4 text-gray-800">
        {enquiry?.firstName} {enquiry?.lastName}
      </td>
      <td className="border-b border-gray-200 p-4 text-gray-800">
        <div>{enquiry?.serviceName}</div>
        <div>{enquiry?.contactNumber}</div>
        <div>{enquiry?.email}</div>
      </td>

      {/* Status Cell */}
      <td className="border-b border-gray-200 p-4 text-gray-800">
        <span className="flex gap-2 items-center">
          <FaRegDotCircle onClick={() => toggleDropdown('statusDropdownOpen')} className="cursor-pointer" />
          <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
              enquiry.status === "pending" ? "bg-yellow-100 text-yellow-700"
              : enquiry.status === "in progress" ? "bg-blue-100 text-blue-700"
              : enquiry.status === "resolved" ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
          >
            {enquiry?.status}
          </span>
          {statusDropdownOpen && (
            <div className={`absolute bg-white border rounded-lg shadow-lg mt-14 ml-5 z-10 w-32 ${isLastEnquiryofPage?"-mt-20":""}`}>
              {["new", "in-progress", "closed"].map((status) => (
                <button
                  key={status}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  onClick={() => {
                        handleUpdate(enquiry, "status", status);
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
              enquiry?.priority === "low" ? "bg-green-100 text-green-700"
              : enquiry?.priority === "medium" ? "bg-yellow-100 text-yellow-700"
              : enquiry?.priority === "high" ? "bg-orange-100 text-orange-700"
              : "bg-red-100 text-red-700"
            }`}
          >
            {enquiry?.priority}
          </span>
          {priorityDropdownOpen && (
            <div className={`absolute bg-white border rounded-lg shadow-lg mt-2 ml-8 z-10 w-32 ${isLastEnquiryofPage?"mb-96":""}`}>
              {["low", "medium", "high", "urgent"].map((priority) => (
                <button
                  key={priority}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                  onClick={() => {
                    handleUpdate(enquiry, "priority", priority);
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
      {enquiry?.assignedAdmin && enquiry?.assignedAdmin?.additionalDetails && 
      <FaRegDotCircle onClick={() => toggleDropdown('adminDropdownOpen')} className="cursor-pointer" />}
        {enquiry?.assignedAdmin && enquiry?.assignedAdmin?.additionalDetails
          ? `${enquiry?.assignedAdmin?.additionalDetails?.firstName} ${enquiry?.assignedAdmin?.additionalDetails?.lastName}`
          : <IoPersonAddSharp 
              onClick={() => toggleDropdown('adminDropdownOpen')}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />}
        {adminDropdownOpen && (
          <div className={`absolute bg-white border rounded-lg shadow-lg mt-2 ml-8 z-10 w-32 ${isLastEnquiryofPage?"-mt-2":""}`}>
            {adminUsers?.map((admin) => (
              <button
                key={admin?._id}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                onClick={() => {
                    handleUpdate(enquiry, "admin", admin);
                  setAdminDropdownOpen(false);
                }}
              >
                {`${admin?.additionalDetails?.firstName} ${admin?.additionalDetails?.lastName}`}
              </button>
            ))}
          </div>
        )}
        </div>
      </td>
      <td className="border-b border-gray-200 p-4 text-gray-800">{formattedDate(enquiry?.createdAt)}</td>

      {/* Action Menu */}
      <td className="border-b border-gray-200 p-4 text-gray-800">
        <button onClick={() => toggleDropdown('isDropdownOpen')} className="focus:outline-none">
          <FaEllipsisV className="text-gray-500 hover:text-gray-700" />
        </button>
        {isDropdownOpen && (
          <div className={`absolute right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10 ${isLastEnquiryofPage?"mt-20":""} `}>
            <div className="py-1">
              <button
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 w-full text-left"
                onClick={() => {
                  handleViewDetails(enquiry);
                  setIsDropdownOpen(false);
                }}
              >
                <FaEye className="mr-2" /> View
              </button>
              {/* <button
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 w-full text-left"
                onClick={() => {
                  handleUpdateDetails(contact);
                  setIsDropdownOpen(false);
                }}
              >
                <FaEdit className="mr-2" /> Update
              </button> */}
              <button
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 w-full text-left"
                onClick={() => {
                  handlePreviousResponses(enquiry);
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

export default EnquiryRow;
