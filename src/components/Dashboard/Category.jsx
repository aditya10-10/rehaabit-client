import Pagination from "./Pagination";
import CategoriesCards from "./CategoriesCards";
import CreateCategoryModal from "./CreateCategoryModal";
import { useState } from "react";
import { useSelector } from "react-redux";

const Category = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const { categories } = useSelector((state) => state.categories);

  console.log(categories);

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-semibold">Category</h1>
      <div className="flex justify-between w-full items-center mt-4">
        <Pagination
          pageCount={Math.ceil(categories.length / cardsPerPage)}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <button
          className="bg-[#FFCC00] rounded-full py-2 px-6 font-[500] text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          Create
        </button>
      </div>

      {isOpen && <CreateCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} />}

      <CategoriesCards
        categories={categories}
        currentPage={currentPage}
        cardsPerPage={cardsPerPage}
      />
    </div>
  );
};

export default Category;
