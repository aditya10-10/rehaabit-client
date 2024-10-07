import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formattedDate } from "../../utils/dateFormatter";
import { adminResponse } from "../../slices/contactSlice";

const PreviousResponsesModal = ({ contact, onClose }) => {
  const dispatch = useDispatch();
  const [newResponse, setNewResponse] = useState("");
  const [newStatus, setNewStatus] = useState(contact.status);
  const [newPriority, setNewPriority] = useState(contact.priority);
  const responsesEndRef = useRef(null); // Ref to scroll to the end

  useEffect(() => {
    setNewStatus(contact.status);
    setNewPriority(contact.priority);
    // Scroll to the bottom whenever contact changes
    scrollToBottom();
  }, [contact]);

  useEffect(() => {
    // Scroll to the bottom whenever new response is added
    scrollToBottom();
  }, [newResponse]);

  const handleSubmitResponse = () => {
    if (!newResponse) return;

    const payload = {
      id: contact._id,
      adminId: contact.assignedAdmin?.additionalDetails?._id,
      response: newResponse,
      newStatus,
      newPriority,
    };

    dispatch(adminResponse({ payload }))
      .then(() => {
        setNewResponse("");
      })
      .catch((error) => {
        console.error("Error responding to contact:", error);
      });
  };

  const scrollToBottom = () => {
    if (responsesEndRef.current) {
      responsesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Previous Responses
        </h2>

        <div className="max-h-64 overflow-y-auto mb-4 bg-gray-100 p-4 rounded-lg shadow-inner">
          {contact.responseLog && contact.responseLog.length > 0 ? (
            <ul className="space-y-4">
              {[...contact.responseLog].reverse().map(
                (
                  response,
                  index // Reverse the order of responses
                ) => (
                  <li
                    key={index}
                    className={`flex ${
                      response.adminId ===
                      contact.assignedAdmin?.additionalDetails?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-3xl shadow-md max-w-xs text-sm ${
                        response.adminId ===
                        contact.assignedAdmin?.additionalDetails?._id
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-800"
                      }`}
                    >
                      <p style={{ fontFamily: "Roboto, sans-serif" }}>
                        {response.response}
                      </p>
                      <p
                        className="text-xs text-right mt-2 opacity-70"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {formattedDate(response.respondedAt)}
                      </p>
                    </div>
                  </li>
                )
              )}
              <div ref={responsesEndRef} /> {/* Reference for scrolling */}
            </ul>
          ) : (
            <p className="text-gray-500">No previous responses available.</p>
          )}
        </div>

        <div className="mt-6">
          <h3
            className="text-xl font-semibold mb-2"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Add New Response
          </h3>
          <textarea
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            placeholder="Write your response here..."
            style={{ fontFamily: "Roboto, sans-serif" }}
          />
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
            onClick={handleSubmitResponse}
          >
            Send
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviousResponsesModal;
