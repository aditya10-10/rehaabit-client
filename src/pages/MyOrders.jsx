import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { OrdersList } from "../components/Orders";

const MyOrders = () => {
    const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const { orders } = useSelector((state) => state.order);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("All");
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const filteredServices = orders.filter((service) => {
    const categoryMatch =
      selectedCategory === "All" || service.categoryId === selectedCategory;

    const subcategoryMatch =
      selectedSubcategory === "All" ||
      service.subCategoryId === selectedSubcategory;

    return categoryMatch && subcategoryMatch;
  });

  return (
    <div className="flex flex-col items-center w-full p-10">
      <nav className="flex w-full justify-between">
        <div className="flex items-center">
          <h1 className="text-4xl font-semibold">My Orders</h1>

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
      </nav>

      {/* ORDERS LIST */}
      <div className="mt-6 w-full border rounded-lg">
        <OrdersList orders={orders} />
      </div>
    </div>
  )
}

export default MyOrders