import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFAQ, deleteFAQ, updateFAQ } from "../../../slices/serviceSlice";
import { FiEdit2 } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

const FAQ = () => {
  const dispatch = useDispatch();

  const { serviceId } = useSelector((state) => state.service);
  const { faqs } = useSelector((state) => state.service.service);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    serviceId: serviceId,
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch(updateFAQ({ ...formData, id: editId }));
    } else {
      dispatch(createFAQ({ formData }));
    }

    setFormData({ serviceId, question: "", answer: "" });
    setEditId(null);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteFAQ({ id, serviceId }));
  };

  const handleEdit = (e, id) => {
    e.preventDefault();

    const faqsToEdit = faqs.find((faq) => faq._id === id);
    if (faqsToEdit) {
      setFormData({
        ...formData,
        question: faqsToEdit.question,
        answer: faqsToEdit.answer,
      });
      setEditId(id);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50%] mx-auto mt-4 bg-white p-6 shadow-custom-shadow rounded-lg"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="question"
        >
          Question*
        </label>
        <input
          id="question"
          name="question"
          type="text"
          value={formData.question}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter Service Name"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="answer"
        >
          Answer*
        </label>
        <textarea
          id="answer"
          name="answer"
          type="text"
          value={formData.answer}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter Service Details"
          required
        />
      </div>

      {faqs &&
        faqs.map((faq) => {
          const { _id, question, answer } = faq;

          return (
            <div
              key={_id}
              className="flex items-center w-fit bg-[#E9F5FE] mb-1 rounded-full px-2 text-sm text-[#0C7FDA]"
            >
              <div className="flex flex-col">
                <span className="flex mr-2">
                  <span className="mr-1 text-gray-700">Question:</span>{" "}
                  {question}
                </span>
                <span className="flex mr-2">
                  <span className="mr-1 text-gray-700">Answer:</span> {answer}
                </span>
              </div>
              <button onClick={(e) => handleEdit(e, _id)}>
                <FiEdit2 />
              </button>
              <button
                className="text-red-600"
                onClick={(e) => handleDelete(e, _id)}
              >
                <IoIosClose size={25} />
              </button>
            </div>
          );
        })}

      <div className="flex mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default FAQ;
