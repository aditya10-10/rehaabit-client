import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/dateFormatter";

const UsersList = ({ users }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(users);

  return (
    <>
      {/* <PartnerDetailsModal
        isPartnerModalOpen={isPartnerModalOpen}
        handlePartnerModal={handlePartnerModal}
        partners={partners}
      /> */}

      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 gap-x-6 rounded-t-md border-b px-6 py-2">
            <th className="text-left text-sm font-medium uppercase">Picture</th>
            <th className="text-left text-sm font-medium uppercase">Names</th>
            <th className="text-left text-sm font-medium uppercase">
              Phone Numbers
            </th>
            <th className="text-left text-sm font-medium uppercase">
              Email
            </th>
            <th className="text-left text-sm font-medium uppercase">
              address
            </th>
            <th className="text-left text-sm font-medium uppercase">
              Service Offered
            </th>
            <th className="text-left text-sm font-medium uppercase">
              Business Name
            </th>
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
                // onClick={handlePartnerModal}
              >
                <td>
                  <img
                    src={image}
                    alt="profile"
                    className="rounded-full h-16 w-16"
                  />
                </td>
                <td className="text-sm">
                  {additionalDetails?.firstName} {additionalDetails?.lastName}
                </td>
                <td className="text-sm">{contactNumber}</td>
                <td className="text-sm">{additionalDetails?.email}</td>
                <td className="text-sm">{additionalDetails?.email}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
