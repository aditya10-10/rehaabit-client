import React from "react";
import { formattedDate } from "../../utils/dateFormatter";

const ViewEnquiryModal = ({ enquiry, onClose }) => {
  // console.log(enquiry)
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg mx-4 lg:max-w-2xl animate-fadeIn">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 border-b pb-4">
          Enquiry Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <p>
            <strong className="text-lg text-gray-700">Enquiry ID:</strong>{" "}
            <span className="text-gray-600">{enquiry?.enquiryId}</span>
          </p>
          <p>
            <strong className="text-lg text-gray-700">Name:</strong>{" "}
            <span className="text-gray-600">
              {enquiry?.firstName} {enquiry?.lastName}
            </span>
          </p>
          <p>
            <strong className="text-lg text-gray-700">Email:</strong>{" "}
            <span className="text-gray-600">{enquiry?.email}</span>
          </p>
          <p>
            <strong className="text-lg text-gray-700">Phone Number:</strong>{" "}
            <span className="text-gray-600">{enquiry?.contactNumber}</span>
          </p>
          <p>
            <strong className="text-lg text-gray-700">Service Name:</strong>{" "}
            <span className="text-gray-600">{enquiry?.serviceName}</span>
          </p>
        </div>

        {/* Full width message */}
        <div className="mb-6">
          <p className="text-lg text-gray-700">
            <strong>Query:</strong>
          </p>
          <p className="whitespace-pre-line bg-gray-100 p-4 rounded-lg border border-gray-300 mt-2">
            {enquiry?.query}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <p>
            <strong className="text-lg text-gray-700">Status:</strong>
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                enquiry.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : enquiry.status === "in progress"
                  ? "bg-blue-100 text-blue-700"
                  : enquiry.status === "resolved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
                {enquiry?.status}
            </span>
          </p>
          <p>
            <strong className="text-lg text-gray-700">Priority:</strong>
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                    enquiry.priority === "low"
                  ? "bg-green-100 text-green-700"
                    : enquiry.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : enquiry.priority === "high"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {enquiry?.priority}
            </span>
          </p>
          <p>
            <strong className="text-lg text-gray-700">Assigned Admin:</strong>{" "}
            <span className="text-gray-600">
              {enquiry?.assignedAdmin && enquiry?.assignedAdmin?.additionalDetails
                ? `${enquiry?.assignedAdmin?.additionalDetails?.firstName} ${enquiry?.assignedAdmin?.additionalDetails?.lastName}`
                : "Not Assigned"}
            </span>
          </p>
          <p>
            <strong className="text-lg text-gray-700">Date:</strong>{" "}
            <span className="text-gray-600">
              {formattedDate(enquiry?.createdAt)}
            </span>
          </p>
        </div>

        <div className="flex justify-end mt-8 space-x-4">
          <button
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiryModal;
