import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategoriesByCategory } from "../../../slices/subCategorySlice";
import { createService } from "../../../slices/serviceSlice";
import ImageDropzone from "../../ImageDropzone";

const CreateService = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { service } = useSelector((state) => state.service);

  const { subCategoriesByCategory } = useSelector(
    (state) => state.subcategories
  );

  console.log(service);

  const [preview, setPreview] = useState(null || service.thumbnail);

  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    serviceName: "" || service.serviceName,
    serviceDescription: "" || service.serviceDescription,
    timeToComplete: "" || service.timeToComplete,
    price: "" || service.price,
    categoryId: "" || service.categoryId,
    subCategoryId: "" || service.subCategoryId,
    thumbnail: null || service.thumbnail,
    warranty: "" || service.warranty,
  });

  formData.thumbnail = thumbnail;

  useEffect(() => {
    if (formData.categoryId) {
      dispatch(getSubCategoriesByCategory({ categoryId: formData.categoryId }));
    }

    if (thumbnail) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(thumbnail);
    } else {
      setPreview(null);
    }
  }, [dispatch, formData.categoryId, thumbnail]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    dispatch(createService({ formData }));
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
            type="number"
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
        <ImageDropzone onDrop={setThumbnail} image={thumbnail} />

        {preview && <img src={preview} alt="thumbnail" />}
      </div>

      <div className="mb-4">
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
