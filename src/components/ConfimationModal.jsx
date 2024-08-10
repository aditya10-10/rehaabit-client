import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../slices/modalSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FcDeleteDatabase } from "react-icons/fc";

const ConfirmationModal = ({ text, onDelete }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="flex items-center flex-col">
              <FcDeleteDatabase size={100} />
              <h2 className="text-lg font-semibold mb-4 mt-4 text-center">
                Are you sure you want to {text} it?
              </h2>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <button
                  onClick={handleClose}
                  className="py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    handleClose();
                  }}
                  className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  {text}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
