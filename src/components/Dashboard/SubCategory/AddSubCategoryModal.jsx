import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { addSubCategory } from "../../../slices/subCategorySlice";

const AddSubCategoryModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const { categories } = useSelector((state) => state.categories);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    file ? setImageName(file.name) : setImageName("");
  };

  const handleSave = () => {
    dispatch(addSubCategory({ categoryId, subCategoryName, icon: image }));
    setIsOpen(!isOpen);
  };

  const handleCancel = () => {
    setSubCategoryName("");
    setImage(null);
    setImageName("");
    setIsOpen(!isOpen);
  };

  console.log(categoryId);
  console.log(subCategoryName);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <main className="flex flex-col justify-center items-center px-4 py-8 bg-white rounded-xl w-[25%] shadow-sm transform transition-transform duration-300 scale-100">
        <div className="w-full flex items-center justify-center">
          <div className="w-full p-8">
            
            {/* CATEGORY NAME */}
            <div className="flex items-center justify-between mb-10">
              <label htmlFor="categoryName" className="text-[20px] font-[400]">
                Category
              </label>

              <select
                id="categoryName"
                onChange={(e) => setCategoryId(e.target.value)}
                className="shadow-[0_2px_5px_0px_rgba(2,96,73,0.2)_inset] border rounded-[5px] w-[60%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a category</option>
                {categories.map((category) => {
                  const { _id, name } = category;

                  return (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* SUB CATEGORY NAME */}
            <div className="flex items-center justify-between mb-10">
              <label htmlFor="categoryName" className="text-[20px] font-[400]">
                Sub Category
              </label>

              <input
                type="text"
                id="subCategoryName"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                className="shadow-[0_2px_5px_0px_rgba(2,96,73,0.2)_inset] appearance-none border rounded-[5px] w-[60%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Sub-Category Name"
              />
            </div>

            {/* UPLOAD IMAGE */}
            <div className="flex items-center justify-between mb-10">
              <label htmlFor="image" className="text-[20px] font-[400]">
                Upload Image
              </label>

              <div className="shadow-[0_2px_5px_0px_rgba(2,96,73,0.2)_inset] flex flex-col items-center w-[60%] rounded-[5px] p-10">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="image"
                  className="shadow border rounded-[5px] w-full py-2 px-2 block text-[20px] text-white font-[400] bg-[#E8C64C] hover:bg-[#e7bc1f] cursor-pointer text-center"
                >
                  Upload Image
                </label>
                <span className="text-gray-700 text-sm mt-2 block">
                  {imageName ? `Selected file: ${imageName}` : ""}
                </span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-center space-x-6">
              <button
                className="bg-[#006049] hover:bg-green-700 text-white text-[20px] font-[400] px-2 rounded-[5px] focus:outline-none focus:shadow-outline"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="border-solid border-2 border-[#E86558] hover:bg-gray-100 text-[#E86558] text-[20px] font-[400] px-2 rounded-[5px] focus:outline-none focus:shadow-outline"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddSubCategoryModal;
