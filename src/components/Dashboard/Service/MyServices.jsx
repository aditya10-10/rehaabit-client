import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ServicesList from "./ServicesList";
import { useEffect, useState } from "react";
import { getAllServices } from "../../../slices/serviceSlice";

const MyService = () => {
  const dispatch = useDispatch();

  const { allServices } = useSelector((state) => state.service);
  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("All");
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const filteredServices = allServices.filter((service) => {
    const categoryMatch =
      selectedCategory === "All" || service.categoryId === selectedCategory;

    const subcategoryMatch =
      selectedSubcategory === "All" ||
      service.subCategoryId === selectedSubcategory;

    return categoryMatch && subcategoryMatch;
  });

  return (
    <div className="flex  flex-col items-center w-full p-10">
      <nav className="flex w-full justify-between">
        <div className="flex items-center">
          <h1 className="text-4xl font-semibold">My Services</h1>

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="shadow-custom-shadow border-none rounded-[5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ml-6"
          >
            <option value="All">All Categories</option>
            {categories.map(({ _id, name }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            className="shadow-custom-shadow border-none rounded-[5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ml-6"
          >
            <option value="All">All Subcategories</option>
            {subcategories.map(({ _id, subCategoryName }) => (
              <option key={_id} value={_id}>
                {subCategoryName}
              </option>
            ))}
          </select>
        </div>

        <NavLink
          to="/dashboard/service/create-service"
          className="bg-[#0C7FDA] text-white sm:w-14 sm:ml-4 sm:h-12 sm:mt-4 max-sm:ml-2 max-sm:h-11 max-sm:mt-4 rounded-md px-4 py-2 font-semibold"
        >
          New
        </NavLink>
      </nav>

      {/* SERVICESLIST */}
      <div className="mt-6 w-full border rounded-lg">
        <ServicesList allServices={filteredServices} />
      </div>
    </div>
  );
};

export default MyService;
