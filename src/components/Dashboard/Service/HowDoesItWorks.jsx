import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createHowDoesItWorks,
  deleteHowDoesItWorks,
  updateHowDoesItWorks,
} from "../../../slices/serviceSlice";
import { FiEdit2 } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

const HowDoesItWorks = () => {
  const dispatch = useDispatch();

  const { serviceId } = useSelector((state) => state.service);
  const { howDoesItWorks } = useSelector((state) => state.service.service);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    serviceId: serviceId,
    point: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch(updateHowDoesItWorks({ ...formData, id: editId }));
    } else {
      dispatch(createHowDoesItWorks({ formData }));
    }

    setFormData({ serviceId, point: "" });
    setEditId(null);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteHowDoesItWorks({ id, serviceId }));
  };

  const handleEdit = (e, id) => {
    e.preventDefault();

    const howDoesItWorksToEdit = howDoesItWorks.find(
      (howDoesItWork) => howDoesItWork._id === id
    );
    if (howDoesItWorksToEdit) {
      setFormData({ ...formData, point: howDoesItWorksToEdit.point });
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
          htmlFor="howDoesItWorks"
        >
          How Does It Works?
        </label>
        <textarea
          id="point"
          name="point"
          type="text"
          value={formData.point}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder=""
        />
      </div>

      {howDoesItWorks &&
        howDoesItWorks
          .filter((howDoesItWork) => howDoesItWork._id !== editId)
          .map((howDoesItWork) => {
            const { _id, point } = howDoesItWork;

            return (
              <div
                key={_id}
                className="flex items-center w-fit bg-[#E9F5FE] mb-1 rounded-full px-2 text-sm text-[#0C7FDA]"
              >
                <span className="flex mr-2">{point}</span>
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

export default HowDoesItWorks;
