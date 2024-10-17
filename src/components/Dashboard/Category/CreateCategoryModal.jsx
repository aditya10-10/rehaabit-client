import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../slices/categorySlice";
import ProgressBar from "../../ProgressBar";
import { IoIosClose } from "react-icons/io";
import ImageDropzone from "../../ImageDropzone"; 
import { toast } from "sonner";

const CreateCategoryModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const { isLoading } = useSelector((state) => state.categories);
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   if (!isLoading && progress === 100) setIsOpen(false);
  // }, [isLoading, progress]);

  const handleSave = (e) => {
    e.preventDefault();
    if (categoryName === "") {
      toast.error("Please enter a category name");
      return;
    }
    if (image === null) {
      toast.error("Please upload an image");
      return;
    }
    if(image.size > 80000) {
      toast.error("Image size should be less than 80kb");
      return;
    }
    dispatch(createCategory({ name: categoryName, icon: image, setProgress }));
    setIsOpen(!isOpen)
  };

  const handleCancel = () => {
    setCategoryName("");
    setImage(null);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <main className="relative flex flex-col justify-center items-center p-4 bg-white rounded-xl w-1/4 shadow-sm transform transition-transform duration-300 scale-100">
        <IoIosClose
          className="absolute top-4 right-4 text-2xl cursor-pointer bg-red-600 text-white rounded-full"
          onClick={handleCancel}
        />
        <h1 className="text-4xl font-semibold mb-4">Category</h1>

        <div className="w-full flex">
          <div className="w-full p-4">
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoryName"
                >
                  Category Name*
                </label>
                <input
                  id="categoryName"
                  name="categoryName"
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Category Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image"
                >
                  Category Icon*
                </label>
                <ImageDropzone onDrop={setImage} image={image} />
              </div>

              {/* {isLoading && <ProgressBar progress={progress} />} */}

              <div className="flex justify-center space-x-6 mt-8">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  disabled={isLoading}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCategoryModal;
