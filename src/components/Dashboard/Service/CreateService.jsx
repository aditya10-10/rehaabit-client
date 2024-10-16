import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategoriesByCategory } from "../../../slices/subCategorySlice";
import { createService, editService } from "../../../slices/serviceSlice";
import ImageDropzone from "../../ImageDropzone";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";

const CreateService = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { service, serviceId } = useSelector((state) => state.service);
  const { subCategoriesByCategory } = useSelector(
    (state) => state.subcategories
  );

  const [preview, setPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    serviceId: null,
    serviceName: "",
    serviceDescription: "",
    timeToComplete: "",
    price: "",
    categoryId: "",
    subCategoryId: "",
    thumbnail: null,
    warranty: "",
  });
   
  // formData.thumbnail = thumbnail;

  useEffect(() => {
    if (service && serviceId) {
      setFormData({
        serviceId: serviceId,
        serviceName: service.serviceName || "",
        serviceDescription: service.serviceDescription || "",
        timeToComplete: service.timeToComplete || "",
        price: service.price || "",
        categoryId: service.categoryId || "",
        subCategoryId: service.subCategoryId || "",
        thumbnail: service.thumbnail || null,
        warranty: service.warranty || "",
      });
      setPreview(service.thumbnail || null);
    }
  }, [service, serviceId]);

  useEffect(() => {
    if (formData.categoryId) {
      dispatch(getSubCategoriesByCategory({ categoryId: formData.categoryId }));
    }
  }, [dispatch, formData.categoryId]);

  useEffect(() => {
    if (thumbnail) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        // Update formData with the new thumbnail
        setFormData(prevData => ({...prevData, thumbnail}));
      };
      reader.readAsDataURL(thumbnail);
    } else {
      setPreview(formData.thumbnail);
    }
  }, [thumbnail]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      const file = files[0];
      if (file && file.size > 80 * 1024) { // 80 KB in bytes
        toast.error("File size should not exceed 80 KB");
        return;
      }
      setThumbnail(file);
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const file=formData.thumbnail;
    if(file){
      if (file.size > 80 * 1024) { // 80 KB in bytes
        toast.error("File size should not exceed 80 KB");
        return;
      }
    }
    if (serviceId) {
      dispatch(editService({ formData }));
    } else {
      dispatch(createService({ formData }));
    }
  };

  const handleClose = () => {
    setPreview(null);
    setThumbnail(null);
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
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="w-full pl-8 pr-3 py-2 border rounded-md shadow-sm"
            placeholder="Enter Price"
            required
          />
        </div>
      </div>

      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="thumbnail"
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
            src={
              typeof preview === "string"
                ? preview
                : URL.createObjectURL(preview)
            }
            alt="thumbnail"
            className="block max-w-full h-auto rounded-md"
          />
        </div>
      ) : (
        <div className="mb-4">
          <ImageDropzone onDrop={setThumbnail} image={thumbnail} />
        </div>
      )}

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
          {serviceId ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default CreateService;
