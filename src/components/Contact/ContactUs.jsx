import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts, deleteContact } from "../../slices/contactSlice";
import SearchFilters from "./SearchFilters";
import ContactTable from "./ContactTable";
import Pagination from "./Pagination";
import ViewContactModal from "./ViewContactModal";
import UpdateContactModal from "./UpdateContactModal";
import PreviousResponsesModal from "./PreviousResponsesModal";

const Contact = () => {
  const dispatch = useDispatch();
  const { contacts, isLoading, error } = useSelector((state) => state.contact);

  // State for Search, Filters, and Pagination
  const [searchContact, setSearchContact] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  // State for modal
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  // Filter contacts
  const filteredContacts = contacts
    .filter(
      (contact) =>
        contact.phoneNumber?.includes(searchContact) ||
        contact.caseId?.includes(searchContact)
    )
    .filter((contact) =>
      statusFilter ? contact.status === statusFilter : true
    )
    .filter((contact) =>
      priorityFilter ? contact.priority === priorityFilter : true
    );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setModalType("view");
  };

  const handleUpdateDetails = (contact) => {
    setSelectedContact(contact);
    setModalType("update");
  };

  const handlePreviousResponses = (contact) => {
    setSelectedContact(contact);
    setModalType("responses");
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
    setModalType("");
  };

  const handleUpdateContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.caseId === updatedContact.caseId ? updatedContact : contact
    );
    dispatch({ type: "contact/updateContacts", payload: updatedContacts });
  };

  // Implement the delete contact functionality
  const handleDeleteContact = (contact) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the contact with Case ID: ${contact.caseId}?`
    );
    if (confirmed) {
      dispatch(deleteContact(contact.caseId));
    }
  };

  // Clear filters function
  const handleClearFilters = () => {
    setSearchContact("");
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
        Contact Messages
      </h1>

      <SearchFilters
        searchContact={searchContact}
        handleContactSearch={(e) => setSearchContact(e.target.value)}
        statusFilter={statusFilter}
        handleStatusFilter={(e) => setStatusFilter(e.target.value)}
        priorityFilter={priorityFilter}
        handlePriorityFilter={(e) => setPriorityFilter(e.target.value)}
        handleClearFilters={handleClearFilters} // Pass the clear filters function
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching contacts: {error}</p>
      ) : (
        <>
          <ContactTable
            contacts={currentContacts}
            handleViewDetails={handleViewDetails}
            handleUpdateDetails={handleUpdateDetails}
            handlePreviousResponses={handlePreviousResponses}
            handleDeleteContact={handleDeleteContact} // Pass delete handler
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
      {selectedContact && modalType === "view" && (
        <ViewContactModal
          contact={selectedContact}
          onClose={handleCloseModal}
        />
      )}
      {selectedContact && modalType === "update" && (
        <UpdateContactModal
          contact={selectedContact}
          onUpdate={handleUpdateContact}
          onClose={handleCloseModal}
        />
      )}
      {selectedContact && modalType === "responses" && (
        <PreviousResponsesModal
          contact={selectedContact}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Contact;
