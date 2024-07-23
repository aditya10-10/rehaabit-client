import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "../../../assets/images/Rectangle1.png";

const ServicesList = () => {
  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="flex gap-x-10 rounded-t-md border-b px-6 py-2">
            <th className="flex-1 text-left text-sm font-medium uppercase ">
              Services
            </th>
            <th className="text-left text-sm font-medium uppercase ">Price</th>
            <th className="text-left text-sm font-medium uppercase ">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="flex gap-x-10 border-b px-6 py-8">
            <td className="flex flex-1 gap-x-4">
              <img
                src={Image}
                alt="Image1"
                className="h-[148px] w-[220px] rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between">
                <p className="text-lg font-semibold">Service Name</p>
                <p className="text-xs">Service Description</p>
                <p className="text-[12px]">Created:</p>
                {true ? (
                  <p className="flex w-fit flex-row items-center gap-2 rounded-full px-2 py-[2px] text-[12px] font-medium">
                    <HiClock size={14} />
                    Drafted
                  </p>
                ) : (
                  <p className="flex w-fit flex-row items-center gap-2 rounded-full-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100">
                      <FaCheck size={8} />
                    </div>
                    Published
                  </p>
                )}
              </div>
            </td>
            <td className="text-sm font-medium">₹99999</td>
            <td className="text-sm font-medium ">
              <button
                title="Edit"
                className="px-2 transition-all duration-200 hover:scale-110"
              >
                <FiEdit2 size={20} />
              </button>
              <button
                title="Delete"
                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ServicesList;
