import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { getSubCategoriesByCategory } from "../../../slices/subCategorySlice";

const ShowSubCategoriesModal = ({ isOpen, setIsOpen, modalCategoryId }) => {
  const dispatch = useDispatch();

  const { subCategoriesByCategory } = useSelector(
    (state) => state.subcategories
  );

  useEffect(() => {
    dispatch(getSubCategoriesByCategory({ categoryId: modalCategoryId }));
  }, [dispatch, modalCategoryId]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <main className="relative flex flex-col justify-center items-center p-4 bg-white rounded-xl w-[25%] shadow-sm transform transition-transform duration-300 scale-100">
        <IoIosClose
          className="absolute top-4 right-4 text-2xl cursor-pointer bg-red-600 text-white rounded-full"
          onClick={handleCancel}
        />
        <h1 className="text-4xl font-semibold mb-4">Sub Categories</h1>

        <div className="flex flex-col w-full items-start h-80 overflow-y-auto">
          {subCategoriesByCategory.map((subcategory) => {
            const { _id, subCategoryName, icon } = subcategory;

            return (
              <div
                key={_id}
                className="flex items-center justify-start h-10 w-full mb-4 p-8 gap-8 border rounded-lg"
              >
                <img src={icon} alt="icon" className="h-10 w-10 rounded-full" />
                <h1>{subCategoryName}</h1>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ShowSubCategoriesModal;
