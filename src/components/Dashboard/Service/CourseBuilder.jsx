import { useState } from "react";

const CourseBuilder = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    price: "",
    category: "",
    tags: "",
    thumbnail: null,
    benefits: "",
    requirements: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50%] mx-auto mt-4 bg-white p-6 shadow-custom-shadow rounded-lg"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Course Builder*
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Add a section to build your course"
          required
        />
      </div>

      <div className="flex mt-6">
        <button
          type="submit"
          className="bg-[#E9F5FE] border-[#0C7FDA] text-[#0C7FDA] font-[400] py-2 px-4 rounded-md"
        >
          Create Section
        </button>
      </div>
    </form>
  )
}

export default CourseBuilder