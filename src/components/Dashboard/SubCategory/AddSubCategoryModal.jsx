import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubCategory, showAllSubCategories } from "../../../slices/subCategorySlice";
import ProgressBar from "../../ProgressBar";
import { IoIosClose } from "react-icons/io";
import ImageDropzone from "../../ImageDropzone";

const AddSubCategoryModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const { categories } = useSelector((state) => state.categories);
  const { isLoading } = useSelector((state) => state.subcategories);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading && progress === 100) setIsOpen(false);
  }, [isLoading, progress]);

  const handleSave = (e) => {
    e.preventDefault();
    
    dispatch(
      addSubCategory({ categoryId, subCategoryName, icon: image, setProgress })
    );
  };

  const handleCancel = () => {
    setSubCategoryName("");
    setImage(null);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <main className="relative flex flex-col justify-center items-center p-4 bg-white rounded-xl w-[25%] shadow-sm transform transition-transform duration-300 scale-100">
        <IoIosClose
          className="absolute top-4 right-4 text-2xl cursor-pointer bg-red-600 text-white rounded-full"
          onClick={handleCancel}
        />
        <h1 className="text-4xl font-semibold mb-4">Sub Category</h1>
        
        <div className="w-full p-4">
          <form onSubmit={handleSave}>
            {/* Category Selection */}
            <div className="mb-4">
              <label
                htmlFor="categoryId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Category*
              </label>
              <select
                id="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category Name */}
            <div className="mb-4">
              <label
                htmlFor="subCategoryName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Sub Category Name*
              </label>
              <input
                type="text"
                id="subCategoryName"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Sub-Category Name"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Sub Category Icon*
              </label>
              <ImageDropzone onDrop={setImage} image={image} />
            </div>

            {/* Progress Bar */}
            {isLoading && <ProgressBar progress={progress} />}

            {/* Buttons */}
            <div className="flex justify-center space-x-6 mt-8">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddSubCategoryModal;
