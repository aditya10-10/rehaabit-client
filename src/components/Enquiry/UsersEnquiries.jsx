import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnquiries, deleteEnquiry } from "../../slices/enquireSlice";
import { BallTriangle } from "react-loader-spinner";
import { setSelectedEnquiry } from "../../slices/enquireSlice";
import EnquiriesTable from "./EnquiriesTable";
import Pagination from "../../utils/Pagination";
import SearchFilters from "./SearchFilters";
import ViewEnquiryModal from "./ViewEnquiryModal";
import PreviousResponsesModal from "./PreviousResponsesModal";

const UsersEnquiries = () => {
  const dispatch = useDispatch();
  const { enquiries, isLoading, error,selectedEnquiry } = useSelector((state) => state.enquire);
  // console.log(enquiries);
  // State for Search, Filters, and Pagination
  const [searchEnquiry, setSearchEnquiry] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const enquiriesPerPage = 4;

  // State for modal
  // const [selectedContact, setSelectedContact] = useState(null);
  const [modalType, setModalType] = useState("");
  useEffect(() => {
    dispatch(getAllEnquiries());
  }, [dispatch]);

  // Filter contacts
  const filteredEnquiries = enquiries
    .filter(
      (enquiry) =>
        enquiry.contactNumber?.includes(searchEnquiry) ||
        enquiry._id?.includes(searchEnquiry)
    )
    .filter((enquiry) =>
      statusFilter ? enquiry.status === statusFilter : true
    )
    .filter((enquiry) =>
      priorityFilter ? enquiry.priority === priorityFilter : true
    );

  const indexOfLastEnquiry = currentPage * enquiriesPerPage;
  const indexOfFirstEnquiry = indexOfLastEnquiry - enquiriesPerPage;
  const currentEnquiries = filteredEnquiries.slice(
    indexOfFirstEnquiry,
    indexOfLastEnquiry
  );
// console.log(currentEnquiries);
  const totalPages = Math.ceil(filteredEnquiries.length / enquiriesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewDetails = (enquiry) => {
      dispatch(setSelectedEnquiry(enquiry));
    setModalType("view");
  };

  const handleUpdateDetails = (enquiry) => {
      dispatch(setSelectedEnquiry(enquiry));
    setModalType("update");
  };

  const handlePreviousResponses = (enquiry) => {
      dispatch(setSelectedEnquiry(enquiry));
    setModalType("responses");
  };

  const handleCloseModal = () => {
    dispatch(setSelectedEnquiry(null));
    setModalType("");
  };

  // Implement the delete contact functionality
  const handleDeleteEnquiry = (enquiry) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the enquiry with Enquiry ID: ${enquiry.enquiryId}?`
    );
    if (confirmed) {
      dispatch(deleteEnquiry(enquiry._id));
    }
  };

  // Clear filters function
  const handleClearFilters = () => {
      setSearchEnquiry("");
    setStatusFilter("");
    setPriorityFilter("");
    setCurrentPage(1); // Optionally reset to the first page
  };

  return (
    <div
      className="container mx-auto p-6 bg-white rounded-lg shadow-lg"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Enquiries
      </h1>

      <SearchFilters
        searchEnquiry={searchEnquiry}
        handleEnquirySearch={(e) => setSearchEnquiry(e.target.value)}
        statusFilter={statusFilter}
        handleStatusFilter={(e) => setStatusFilter(e.target.value)}
        priorityFilter={priorityFilter}
        handlePriorityFilter={(e) => setPriorityFilter(e.target.value)}
        handleClearFilters={handleClearFilters} // Pass the clear filters function
      />

      {isLoading ? (
        <div className="flex justify-center items-center w-100% h-100% bg-white">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : error ? (
        <p>Error fetching enquiries: {error}</p>
      ) : (
        <>
          <EnquiriesTable
            enquiries={currentEnquiries}
            handleViewDetails={handleViewDetails}
            handleUpdateDetails={handleUpdateDetails}
            handlePreviousResponses={handlePreviousResponses}
            handleDeleteEnquiry={handleDeleteEnquiry} // Pass delete handler
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </>
      )}

      {/* Modals */}
      {selectedEnquiry && modalType === "view" && (
        <ViewEnquiryModal
          enquiry={selectedEnquiry}
          onClose={handleCloseModal}
        />
      )}
        {selectedEnquiry && modalType === "responses" && (
        <PreviousResponsesModal
          enquiry={selectedEnquiry}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UsersEnquiries;
