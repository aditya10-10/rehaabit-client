import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createHowDoesItWorks,
  deleteHowDoesItWorks,
  updateHowDoesItWorks,
} from "../../../slices/serviceSlice";
import { RiDeleteBin6Line, RiFileEditLine } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import HIWCard from "../../HIWCard";
import ImageDropzone from "../../ImageDropzone";

const HowDoesItWorks = () => {
  const dispatch = useDispatch();
  const { serviceId, isLoading } = useSelector((state) => state.service);
  const { howDoesItWorks } = useSelector((state) => state.service.service);

  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [icon, setIcon] = useState(null);

  const [formData, setFormData] = useState({
    serviceId: serviceId,
    point: "",
    description: "",
    icon: null,
  });

  // Ensure formData is updated with the latest icon and serviceId
  formData.icon = icon;
  formData.serviceId = serviceId;

  useEffect(() => {
    if (icon) {
      if (typeof icon === "string") {
        // If the icon is a URL (string), set it as the preview directly
        setPreview(icon);
      } else {
        // If the icon is a file, create a data URL for preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(icon);
      }
    } else {
      setPreview(null);
    }
  }, [icon]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon") {
      setIcon(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch(updateHowDoesItWorks({ ...formData, id: editId }));
    } else {
      dispatch(createHowDoesItWorks({ formData }));
    }

    // Reset form and state
    setFormData({ serviceId, point: "", description: "", icon: null });
    setPreview(null);
    setIcon(null);
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
      setFormData({ ...howDoesItWorksToEdit });
      setIcon(howDoesItWorksToEdit.icon); // Set icon as the URL for preview
      setEditId(id);
    }
  };

  const handleClose = () => {
    setPreview(null);
    setIcon(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50%] mx-auto mt-4 bg-white p-6 shadow-custom-shadow rounded-lg"
    >
      <h1 className="text-gray-700 text-sm font-bold mb-2">
        How Does It Work?
      </h1>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="point"
        >
          Point
        </label>
        <input
          id="point"
          name="point"
          type="text"
          value={formData.point}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder=""
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder=""
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="icon"
        >
          Upload Image*
        </label>

        {preview ? (
          <div className="relative inline-block mb-4">
            <IoIosClose
              className="absolute top-2 right-2 text-2xl cursor-pointer text-red-600"
              onClick={handleClose}
            />
            <img
              src={preview}
              alt="icon"
              className="block max-w-full h-auto rounded-md"
            />
          </div>
        ) : (
          <div className="mb-4">
            <ImageDropzone onDrop={setIcon} image={icon} />
          </div>
        )}
      </div>

      {howDoesItWorks &&
        howDoesItWorks
          .filter((howDoesItWork) => howDoesItWork._id !== editId)
          .map((howDoesItWork) => {
            const { _id } = howDoesItWork;

            return (
              <div key={_id} className="flex items-center text-[#0C7FDA]">
                <HIWCard {...howDoesItWork} handleEdit={handleEdit} />

                <button
                  className="px-1 transition-all duration-200 hover:scale-110 mt-5"
                  onClick={(e) => handleEdit(e, _id)}
                >
                  <RiFileEditLine size={20} />
                </button>

                <button
                  className="px-1 transition-all duration-200 hover:scale-110 text-[#ff0000] mt-5"
                  onClick={(e) => handleDelete(e, _id)}
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            );
          })}

      <div className="flex mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
          disabled={isLoading}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default HowDoesItWorks;
