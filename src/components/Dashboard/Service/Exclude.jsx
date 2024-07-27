import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createExclude,
  deleteExclude,
  updateExclude,
} from "../../../slices/serviceSlice";
import { FiEdit2 } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

const Exclude = () => {
  const dispatch = useDispatch();

  const { serviceId } = useSelector((state) => state.service);
  const { excludes } = useSelector((state) => state.service.service);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    serviceId: serviceId,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch(updateExclude({ ...formData, id: editId }));
    } else {
      dispatch(createExclude({ formData }));
    }

    setFormData({ serviceId, content: "" });
    setEditId(null);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteExclude({ id, serviceId }));
  };

  const handleEdit = (e, id) => {
    e.preventDefault();

    const excludeToEdit = excludes.find((exclude) => exclude._id === id);
    if (excludeToEdit) {
      setFormData({ ...formData, content: excludeToEdit.content });
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
          htmlFor="content"
        >
          Exclusions
        </label>

        <textarea
          id="content"
          name="content"
          type="text"
          value={formData.content}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder=""
        />
      </div>

      {excludes &&
        excludes
          .filter((exclude) => exclude._id !== editId)
          .map((exclude) => {
            const { _id, content } = exclude;

            return (
              <div
                key={_id}
                className="flex items-center w-fit bg-[#E9F5FE] mb-1 rounded-full px-2 text-sm text-[#0C7FDA]"
              >
                <span className="flex mr-2">{content}</span>
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

export default Exclude;
