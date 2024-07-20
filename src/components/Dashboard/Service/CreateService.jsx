import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategoriesByCategory } from "../../../slices/subCategorySlice";

const CreateService = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const { subCategoriesByCategory } = useSelector(
    (state) => state.subcategories
  );

  // console.log(categories)
  // console.log(subcategories)
  console.log(subCategoriesByCategory);

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDescription: "",
    timeToComplete: "",
    price: "",
    categoryId: "",
    subCategoryId: "",
    thumbnail: null,
    inclusions: "",
    exclusions: "",
    warrantyDetails: "",
    howDoesItWorks: "",
  });

  console.log(formData.categoryId);

  useEffect(() => {
    if (formData.categoryId) {
      dispatch(getSubCategoriesByCategory({ categoryId: formData.categoryId }));
    }
  }, [dispatch, formData.categoryId]);

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

      <div className="mb-4">
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
      </div>

      <div className="mb-4">
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
      </div>

      <div className="mb-4">
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
      </div>

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

      <div className="mb-4">
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
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="inclusions"
        >
          Inclusions
        </label>
        <textarea
          id="inclusions"
          name="inclusions"
          type="text"
          value={formData.inclusions}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder=""
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="exclusions"
        >
          Exclusions
        </label>
        <textarea
          id="exclusions"
          name="exclusions"
          type="text"
          value={formData.exclusions}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder=""
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="warrantyDetails"
        >
          Warranty Details*
        </label>
        <textarea
          id="warrantyDetails"
          name="warrantyDetails"
          type="text"
          value={formData.warrantyDetails}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder=""
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="howDoesItWorks"
        >
          How Does It Works?
        </label>
        <textarea
          id="howDoesItWorks"
          name="howDoesItWorks"
          type="text"
          value={formData.howDoesItWorks}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder=""
        />
      </div>

      <div className="flex mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default CreateService;