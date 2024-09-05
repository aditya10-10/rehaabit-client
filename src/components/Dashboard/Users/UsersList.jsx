import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/dateFormatter";
import { useState } from "react";
import UserDetailsModal from "./UserDetailsModal";
import {
  deleteUser,
  getUser,
  setUserDetails,
} from "../../../slices/usersSlice";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";

const UsersList = ({ users }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);

  const handleUserDetailsModal = () => {
    setIsUserDetailsModalOpen(!isUserDetailsModalOpen);
  };

  const handleDelete = (e, userId) => {
    e.preventDefault();
    e.stopPropagation();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06952c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser({ userId }));

        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          text: "User is safe :)",
          icon: "error",
        });
      }
    });
  };

  return (
    <>
      <UserDetailsModal
        isUserDetailsModalOpen={isUserDetailsModalOpen}
        handleUserDetailsModal={handleUserDetailsModal}
      />

      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 gap-x-6 rounded-t-md border-b px-6 py-2">
            <th className="text-left text-sm font-medium uppercase">Picture</th>
            <th className="text-left text-sm font-medium uppercase">Names</th>
            <th className="text-left text-sm font-medium uppercase">
              Phone Numbers
            </th>
            <th className="text-left text-sm font-medium uppercase">Email</th>
            <th className="text-left text-sm font-medium uppercase"></th>
            <th className="text-left text-sm font-medium uppercase"></th>
            <th className="text-left text-sm font-medium uppercase">actions</th>
          </tr>
        </thead>

        <tbody className="flex flex-col w-full">
          {users.map((user) => {
            const { _id, additionalDetails, address, image, contactNumber } =
              user;

            return (
              <tr
                key={_id}
                className={`grid grid-cols-7 gap-x-6 border-b px-6 py-4 items-center cursor-pointer`}
                onClick={() => {
                  // console.log("clicked");
                  // navigate(`/dashboard/users/${_id}`);
                  handleUserDetailsModal();
                  dispatch(getUser({ userId: _id }));
                }}
              >
                <td>
                  {image ? (
                    <img
                      src={image}
                      alt="profile"
                      className="rounded-full h-16 w-16"
                    />
                  ) : (
                    <CgProfile size={70} className="text-blue-300" />
                  )}
                </td>
                <td className="text-sm">
                  {additionalDetails?.firstName} {additionalDetails?.lastName}
                </td>
                <td className="text-sm">{contactNumber}</td>
                <td className="text-sm">{additionalDetails?.email}</td>
                {/* <td className="text-sm">{additionalDetails}</td> */}
                <td></td>
                <td></td>
                <td>
                  <button
                    className="px-4 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    onClick={(e) => handleDelete(e, _id)}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
