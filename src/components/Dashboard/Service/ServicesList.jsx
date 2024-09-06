import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormatter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearServiceForm,
  deleteService,
  getFullServiceDetails,
  setServiceEditing,
} from "../../../slices/serviceSlice";
import Swal from "sweetalert2";

const ServicesList = ({ allServices }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteService = (e, serviceId, subCategoryId) => {
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
        dispatch(deleteService({ serviceId, subCategoryId }));

        Swal.fire({
          title: "Deleted!",
          text: "Your service has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          text: "Your service is safe :)",
          icon: "error",
        });
      }
    });
  };

  const handleEditService = (serviceId) => {
    // dispatch(clearServiceForm());
    // dispatch(setServiceEditing());

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want Edit the service.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06952c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(getFullServiceDetails({ serviceId }));
        navigate("/dashboard/service/create-service");
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          icon: "error",
        });
      }
    });
  };

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

        <div className="max-h-[85vh] overflow-y-auto w-full">
          <tbody className="flex flex-col w-full">
            {allServices.map((service) => {
              const {
                _id,
                serviceName,
                serviceDescription,
                thumbnail,
                timeToComplete,
                createdAt,
                status,
                priceStatus,
                price,
                categoryId,
                subCategoryId,
              } = service;

              return (
                <tr key={_id} className="flex gap-x-10 border-b px-6 py-8">
                  <td className="flex flex-1 gap-x-4">
                    <img
                      src={thumbnail}
                      alt="thumbnail"
                      className="h-[148px] w-[220px] rounded-lg object-cover"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold">{serviceName}</p>
                      <p className="text-xs">{serviceDescription}</p>
                      <p className="text-[12px]">
                        Created: {formattedDate(createdAt)}
                      </p>

                      <div className="flex gap-2">
                        {status === "Draft" ? (
                          <p className="flex w-fit flex-row items-center gap-2 rounded-full px-2 py-[2px] text-[12px] font-medium">
                            <HiClock size={14} />
                            {status}
                          </p>
                        ) : (
                          <p className="flex w-fit flex-row items-center gap-2 rounded-full-700 px-2 py-[2px] text-[12px] font-medium text-[#0C7FDA]">
                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#E9F5FE]">
                              <FaCheck size={8} />
                            </div>
                            Published
                          </p>
                        )}

                        {priceStatus === "non-priced" && (
                          <p className="flex w-fit flex-row items-center gap-2 rounded-full px-2 py-[2px] text-[12px] font-medium bg-[#E9F5FE] text-[#0C7FDA] capitalize">
                            {priceStatus}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-sm font-medium">₹ {price}</td>
                  <td className="text-sm font-medium ">
                    <button
                      className="px-2 transition-all duration-200 hover:scale-110"
                      onClick={() => handleEditService(_id)}
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                      onClick={(e) =>
                        handleDeleteService(e, _id, subCategoryId)
                      }
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </div>
      </table>
    </>
  );
};

export default ServicesList;
