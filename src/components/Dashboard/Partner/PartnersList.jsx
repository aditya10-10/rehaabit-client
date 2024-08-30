import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PartnerDetailsModal from "./PartnerDetailsModal";

const PartnersList = ({ partners }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const handlePartnerModal = () => {
    setIsPartnerModalOpen(!isPartnerModalOpen);
  };

  return (
    <>
      <PartnerDetailsModal
        isPartnerModalOpen={isPartnerModalOpen}
        handlePartnerModal={handlePartnerModal}
        partners={partners}
      />

      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 gap-x-6 rounded-t-md border-b px-6 py-2">
            <th className="text-left text-sm font-medium uppercase">Picture</th>
            <th className="text-left text-sm font-medium uppercase">Names</th>
            <th className="text-left text-sm font-medium uppercase">
              Phone Numbers
            </th>
            <th className="text-left text-sm font-medium uppercase">
              Alternative
            </th>
            <th className="text-left text-sm font-medium uppercase">
              Service Areas
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
          {partners.map((partner) => {
            const {
              _id,
              firstName,
              lastName,
              dateOfBirth,
              gender,
              nationality,
              identificationType,
              identificationNumber,
              email,
              phoneNumber,
              businessName,
              businessStructure,
              numberOfEmployees,
              yearsOfExperience,
              bankName,
              accountNumber,
              routingNumber,
              address,
              businessAddress,
              alternativeContact,
              servicesOffered,
              serviceAreas,
              photo,
            } = partner;

            return (
              <tr
                key={_id}
                className={`grid grid-cols-7 gap-x-6 border-b px-6 py-4 items-center cursor-pointer`}
                onClick={handlePartnerModal}
              >
                <td>
                  <img
                    src={photo}
                    alt="profile"
                    className="rounded-full h-16 w-16"
                  />
                </td>
                <td className="text-sm">
                  {firstName} {lastName}
                </td>
                <td className="text-sm">{phoneNumber}</td>
                <td className="text-sm">{alternativeContact?.phoneNumber}</td>
                <td>
                  {serviceAreas.map((item) => {
                    return item + ", ";
                  })}
                </td>
                <td>
                  {servicesOffered.map((item) => {
                    return item + ", ";
                  })}
                </td>
                <td>{businessName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PartnersList;
