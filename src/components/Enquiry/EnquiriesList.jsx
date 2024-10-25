import { FaCheck } from "react-icons/fa";
import { formattedDate } from "../../utils/dateFormatter";
import { ServiceCard } from "../Dashboard/Service";

const EnquiriesList = ({ enquiries }) => {
  // console.log(enquiries);

  return (
    <table className="w-full bg-black">
      <thead>
        <tr className=" flex gap-x-10 rounded-t-md border-b px-6 py-2">
          <th className="flex-1 text-left text-sm font-medium uppercase ">
            Enquiries
          </th>
          {/* <th className="text-left text-sm font-medium uppercase">
            Total Price
          </th> */}
        </tr>
      </thead>

      <tbody className="flex flex-col w-full">
        {enquiries.map((enquiry) => {
          const {
            _id,
            firstName,
            lastName,
            query,
            email,
            contactNumber,
            createdAt,
            serviceId,
          } = enquiry;

          return (
            <tr key={_id} className="flex gap-x-10 border-b px-6 py-2">
              <td className="flex flex-1 flex-col gap-x-4">
                <ServiceCard {...serviceId} />
                <div className="flex flex-col justify-between">
                  <p className="text-lg font-semibold">
                    {firstName} {lastName}
                  </p>
                  <p>Query: {query}</p>
                  <p>Contact: {contactNumber}</p>
                  <p>Email: {email}</p>
                  <p className="text-[12px]">
                    Placed on: {formattedDate(createdAt)}
                  </p>
                </div>
              </td>
              {/* <td className="text-sm font-medium"> {query}</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EnquiriesList;
