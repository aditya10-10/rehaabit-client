import { useState } from "react";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    file ? setImageName(file.name) : setImageName("");
  };

  const handleSave = () => {
    //
  };

  const handleCancel = () => {
    setCategoryName("");
    setImage(null);
    setImageName("");
  };

  return (
    <div className="max-w-md max-h-[330] mx-auto p-8 rounded-[10px] shadow-custom-shadow bg-white">
      {/* CATEGORY NAME */}
      <div className="flex items-center justify-between mb-10">
        <label htmlFor="categoryName" className="text-[20px] font-[400]">
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="shadow-[0_2px_5px_0px_rgba(2,96,73,0.2)_inset] appearance-none border rounded-[5px] w-[60%] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Category Name"
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
  );
};

export default AddCategory;