import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormatter";

const services = [
  {
    _id: "669b2868bb6a0a90598d65f5",

    serviceName: "Premium Home Cleaning",
    serviceDescription:
      "A comprehensive home cleaning service that covers all rooms, floors, and surfaces.",
    timeToComplete: "3 hours",
    price: 150,
    thumbnail:
      "https://res.cloudinary.com/deku3jiec/image/upload/v1721444456/rehaabit/uf4scuec21otm5zawi0o.jpg",
    warranty: "7 days satisfaction guarantee",
    howDoesItWorks: [],
    includes: [],
    excludes: [],
    faqs: [],
    ratingAndReviews: [],
    status: "Draft",
    createdAt: "2024-07-20T03:00:56.987Z",

    __v: 0,
  },
  {
    _id: "669cec91ddc8a269cec61c3e",
    serviceName: "dfgh",
    serviceDescription: "fdzg",
    timeToComplete: "fzdg",
    price: 3000,
    thumbnail:
      "https://res.cloudinary.com/deku3jiec/image/upload/v1721560207/rehaabit/zg6gjutfykddzapwbh1p.jpg",
    howDoesItWorks: [],
    includes: [],
    excludes: [],
    faqs: [],
    ratingAndReviews: [],
    status: "Published",
    createdAt: "2024-07-21T11:10:09.691Z",

    __v: 0,
  },
  {
    _id: "669ceff3ddc8a269cec61d03",
    serviceName: "cvnb",
    serviceDescription: "xcvnb",
    timeToComplete: "7",
    price: 6575,
    thumbnail:
      "https://res.cloudinary.com/deku3jiec/image/upload/v1721561073/rehaabit/sgrh8kjkoknpwuuc46un.jpg",
    howDoesItWorks: [],
    includes: [],
    excludes: [],
    faqs: [],
    ratingAndReviews: [],
    status: "Draft",
    createdAt: "2024-07-21T11:24:35.687Z",

    __v: 0,
  },
  {
    _id: "669cf0b7ddc8a269cec61d43",
    serviceName: "ijhvgkl",
    serviceDescription: "asdfg ",
    timeToComplete: "5",
    price: 3423423,
    thumbnail:
      "https://res.cloudinary.com/deku3jiec/image/upload/v1721561269/rehaabit/a0fikdy0l3zy9jt0kg5s.jpg",
    howDoesItWorks: ["669de42f792f7c3bbcf20399"],
    includes: ["669ddbafddc8a269cec61edb", "669ddd7f22d3cc64882b64f6"],
    excludes: ["669ddf790cf78412995c473c"],
    faqs: ["669de359792f7c3bbcf20393"],
    ratingAndReviews: [],
    status: "Draft",
    createdAt: "2024-07-21T11:27:51.780Z",

    __v: 0,
  },
];

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

        <div className="max-h-[85vh] overflow-y-auto w-full">
          <tbody className="flex flex-col w-full">
            {services.map((service) => {
              const {
                _id,
                serviceName,
                serviceDescription,
                thumbnail,
                timeToComplete,
                createdAt,
                status,
                price
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
                    </div>
                  </td>
                  <td className="text-sm font-medium">₹ {price}</td>
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
              );
            })}
          </tbody>
        </div>
      </table>
    </>
  );
};

export default ServicesList;
