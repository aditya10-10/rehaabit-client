import React from "react";
import EnquiryRow from "./EnquiryRow";

const EnquiriesTable = ({
  enquiries,
  handleViewDetails,
  handleUpdateDetails,
  handlePreviousResponses,
}) => {
  // console.log(enquiries);
  return (
    <div
      className="overflow-x-auto "
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="border-b-2 border-indigo-400 p-4 text-left">
              Enquiry ID
            </th>
            <th className="border-b-2 border-indigo-400 p-4 text-left">Name</th>
            <th className="border-b-2 border-indigo-400 p-4 text-left">
              Enquiry Info
            </th>
            <th className="border-b-2 border-indigo-400 p-4 text-left">
              Status
            </th>
            <th className="border-b-2 border-indigo-400 p-4 text-left">
              Priority
            </th>
            <th className="border-b-2 border-indigo-400 p-4 text-left">
              Assigned Admin
            </th>
            <th className="border-b-2 border-indigo-400 p-4 text-left">Date</th>
            <th className="border-b-2 border-indigo-400 p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {enquiries?.map((enquiry, index) => (
            <EnquiryRow
              key={enquiry?._id}
              index={index}
              enquiry={enquiry}
              handleViewDetails={handleViewDetails}
              handleUpdateDetails={handleUpdateDetails}
              handlePreviousResponses={handlePreviousResponses}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiriesTable;
