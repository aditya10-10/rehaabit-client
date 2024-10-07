import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:bg-gray-200 disabled:text-gray-500"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:bg-gray-200 disabled:text-gray-500"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
