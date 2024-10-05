import { IoMdClose } from "react-icons/io";

const CancelOrderModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          <IoMdClose size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Confirm Cancellation</h2>
        <p className="mb-4 text-lg">
          Are you sure you want to cancel this order? 
        </p>

        <div className="bg-gray-100 p-3 rounded mb-4 text-xs">
          <h3 className="font-semibold mb-2">Cancellation Policy</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>If canceled within 3 hours of placing the order, no charges will be deducted.</li>
            <li>
              If the professional is assigned, ₹50 per hour will be deducted after 3 hours of order placement.
            </li>
            <li>If the professional is not assigned, no charges will be deducted.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
            onClick={onClose}
          >
            No, Keep Order
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Yes, Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
