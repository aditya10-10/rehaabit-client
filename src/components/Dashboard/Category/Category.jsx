import Pagination from "../Pagination";
import CategoriesCards from "./CategoriesCards";
import CreateCategoryModal from "./CreateCategoryModal";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const { categories } = useSelector((state) => state.categories);
  const { isCategoryPage } = useSelector((state) => state.categories);

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const [filterText, setFilterText] = useState("");

  const uniqueCategoryNames = useMemo(() => {
    const names = categories.map((category) => category.name);
    return ["All", ...new Set(names)];
  }, [categories]);

  const filteredCategories =
    filterText === "All" || filterText === ""
      ? categories
      : categories.filter((category) => category.name === filterText);

  console.log(categories);

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-semibold">Category</h1>

      <div className="flex justify-between w-full items-center mt-4">
        <div className="flex items-center">
          <Pagination
            pageCount={Math.ceil(filteredCategories.length / cardsPerPage)}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />

          <select
            value={filterText}
            onChange={handleFilterChange}
            className="shadow-custom-shadow border-none rounded-[5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ml-6"
          >
            {uniqueCategoryNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-[#FFCC00] rounded-full py-2 px-6 font-[500] text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          Create
        </button>
      </div>

      {isOpen && <CreateCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} />}

      <CategoriesCards
        categories={filteredCategories}
        currentPage={currentPage}
        cardsPerPage={cardsPerPage}
      />
    </div>
  );
};

export default Category;