import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts } from "../../slices/contactSlice";
import { formattedDate } from "../../utils/dateFormatter";

const Contact = () => {
  const dispatch = useDispatch();
  const { contacts, isLoading, error } = useSelector((state) => state.contact);

  const [searchContact, setSearchContact] = useState("");

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  const handleContactSearch = (e) => {
    setSearchContact(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.phoneNumber.includes(searchContact)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchContact}
          onChange={handleContactSearch}
          placeholder="Search by Contact..."
          className="shadow-custom-shadow border rounded-[5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching contacts: {error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Phone Number</th>
              <th className="border p-2 text-left">Subject</th>
              <th className="border p-2 text-left">Message</th>
              <th className="border p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredContacts) &&
              filteredContacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-100">
                  <td className="border p-2">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="border p-2">{contact.email}</td>
                  <td className="border p-2">{contact.phoneNumber}</td>
                  <td className="border p-2">{contact.subject}</td>
                  <td className="border p-2">{contact.message}</td>
                  <td className="border p-2">
                    {formattedDate(contact.createdAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Contact;
