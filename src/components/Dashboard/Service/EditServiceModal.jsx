import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../ProgressBar";
import { IoIosClose } from "react-icons/io";
import { editService } from "../../../slices/serviceSlice";

const EditServiceModal = ({ isOpen, setIsOpen, formData, setFormData }) => {
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      setFormData({ ...formData, [name]: files[0] });

      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editService({ formData }));
    setIsOpen(!isOpen);
  };

  const handleCancel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <main className="relative flex flex-col justify-center items-center p-4 bg-white rounded-xl w-1/4 shadow-sm transform transition-transform duration-300 scale-100">
        <IoIosClose
          className="absolute top-4 right-4 text-2xl cursor-pointer bg-red-600 text-white rounded-full"
          onClick={handleCancel}
        />
        <h1 className="text-4xl font-semibold mb-4">Edit Service</h1>

        <form onSubmit={handleSubmit} className="w-full p-2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="serviceName"
            >
              Name of Service*
            </label>
            <input
              id="serviceName"
              name="serviceName"
              type="text"
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              placeholder="Enter Service Name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="serviceDescription"
            >
              Service Description*
            </label>
            <textarea
              id="serviceDescription"
              name="serviceDescription"
              type="text"
              value={formData.serviceDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              placeholder="Enter Service Details"
              required
            />
          </div>

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="timeToComplete"
            >
              Time To Complete*
            </label>
            <input
              id="timeToComplete"
              name="timeToComplete"
              type="text"
              value={formData.timeToComplete}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              placeholder=""
              required
            />
          </div> */}

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="categoryId"
            >
              Category*
            </label>

            <select
              id="categoryId"
              name="categoryId"
              onChange={handleChange}
              value={formData.categoryId}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            >
              <option value="">Select a Category</option>
              {categories.map((category) => {
                const { _id, name } = category;

                return (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div> */}

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subCategoryId"
            >
              Sub-Category*
            </label>

            <select
              id="subCategoryId"
              name="subCategoryId"
              onChange={handleChange}
              value={formData.subCategoryId}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
            >
              <option value="">Select a Sub Category</option>
              {subCategoriesByCategory.map((subcategory) => {
                const { _id, subCategoryName } = subcategory;

                return (
                  <option key={_id} value={_id}>
                    {subCategoryName}
                  </option>
                );
              })}
            </select>
          </div> */}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price*
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                ₹
              </span>
              <input
                id="price"
                name="price"
                // type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-8 pr-3 py-2 border rounded-md shadow-sm"
                placeholder="Enter Price"
                required
              />
            </div>
          </div>

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="thumbnail"
            >
              Upload Image*
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="file"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              required
            />

            {preview && <img src={preview} alt="thumbnail" />}
          </div> */}

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="warranty"
            >
              Warranty Details*
            </label>
            <input
              id="warranty"
              name="warranty"
              type="text"
              value={formData.warranty}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              placeholder=""
              required
            />
          </div> */}

          <div className="flex mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md w-full"
            >
              Update
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditServiceModal;
