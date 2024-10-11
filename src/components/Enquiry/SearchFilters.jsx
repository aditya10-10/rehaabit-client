import React from "react";
import { FaSearch } from "react-icons/fa"; // Importing an icon for the search input

const SearchFilters = ({
  searchEnquiry,
  handleEnquirySearch,
  statusFilter,
  handleStatusFilter,
  priorityFilter,
  handlePriorityFilter,
  handleClearFilters, // Added clear filters function
}) => {
  return (
    <div className="flex gap-4 mb-6 items-center">
      <div className="relative flex-1">
        <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          value={searchEnquiry}
          onChange={handleEnquirySearch}
          placeholder="Search by Enquiry ID or Phone Number..."
          className="shadow-md border rounded-md py-2 pl-10 pr-3 w-2/5 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
        />
      </div>
      <select
        value={statusFilter}
        onChange={handleStatusFilter}
        className="shadow-md border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>
      <select
        value={priorityFilter}
        onChange={handlePriorityFilter}
        className="shadow-md border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <button
        onClick={handleClearFilters} // Clear button implementation
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchFilters;
