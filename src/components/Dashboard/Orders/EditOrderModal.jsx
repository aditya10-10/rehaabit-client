import React from 'react';
import { IoMdClose } from 'react-icons/io';

const EditOrderModal = ({ isOpen, onClose, onConfirm ,status}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Confirm Order Edit</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose />
          </button>
        </div>
        <div className="p-4 text-black-600">
          <p>Are you sure you want to edit this order's status to <span className='text-black-900'>{status.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</span> ?</p>
        </div>
        <div className="flex justify-end p-4 space-x-2 border-t">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
