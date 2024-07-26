import Pagination from "../Pagination";
import CategoriesCards from "../Category/CategoriesCards";
import CreateCategoryModal from "../Category/CreateCategoryModal";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubCategoriesCards from "./SubCategoriesCards";
import AddSubCategoryModal from "./AddSubCategoryModal";
import { getSubCategoriesByCategory, showAllSubCategories } from "../../../slices/subCategorySlice";

const SubCategory = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const { subCategoriesByCategory } = useSelector(
    (state) => state.subcategories
  );
  const { isCategoryPage } = useSelector((state) => state.categories);

  console.log(subcategories);

  const handleFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const [filterId, setFilterId] = useState("");

  useEffect(() => {
    dispatch(getSubCategoriesByCategory({categoryId : filterId}));
  }, [dispatch, filterId])

  useEffect(() => {
    dispatch(showAllSubCategories());
}, [dispatch])

  const filteredSubCategories =
    filterId === "All" || filterId === ""
      ? subcategories
      : subCategoriesByCategory;

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-semibold">Sub Category</h1>

      <div className="flex justify-between w-full items-center mt-4">
        <div className="flex items-center">
          <Pagination
            pageCount={Math.ceil(filteredSubCategories.length / cardsPerPage)}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />

          <select
            value={filterId}
            onChange={handleFilterChange}
            className="shadow-custom-shadow border-none rounded-[5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ml-6"
          >
            <option value="All">All</option>
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

        <button
          className="bg-[#FFCC00] rounded-full py-2 px-6 font-[500] text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          Create
        </button>
      </div>

      {isOpen && <AddSubCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} />}

      <SubCategoriesCards
        subcategories={filteredSubCategories}
        currentPage={currentPage}
        cardsPerPage={cardsPerPage}
      />
    </div>
  );
};

export default SubCategory;
