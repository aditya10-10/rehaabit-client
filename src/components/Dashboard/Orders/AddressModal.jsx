import React from "react";

const AddressModal = ({ address, onClose }) => {
  if (!address) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-purple-700 text-center">
          Order Address
        </h2>

        {/* Address Details */}
        <div className="space-y-3 text-gray-700 text-sm sm:text-base">
          <div>
            <span className="font-medium">Name:</span> {address.name}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {address.phoneNo}
          </div>
          <div>
            <span className="font-medium">Alternative Phone:</span>{" "}
            {address.alternativePhone || "N/A"}
          </div>
          <div>
            <span className="font-medium">Address:</span> {address.address},{" "}
            {address.locality}, {address.city}, {address.state},{" "}
            {address.pincode}
          </div>
          <div>
            <span className="font-medium">Landmark:</span>{" "}
            {address.landmark || "N/A"}
          </div>
          <div>
            <span className="font-medium">Address Type:</span>{" "}
            {address.addressType}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Additional CSS for Responsiveness */}
      <style jsx>{`
        @media (max-height: 600px) {
          .overflow-y-auto {
            max-height: 85%; /* Ensure scrolling on small viewports */
          }
        }
      `}</style>
    </div>
  );
};

export default AddressModal;
