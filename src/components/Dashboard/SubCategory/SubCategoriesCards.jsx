import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
  deleteSubCategory,
  updateSubCategoryIcon,
  updateSubCategoryName,
} from "../../../slices/subCategorySlice";
import { useState } from "react";
import Swal from "sweetalert2";

const SubCategoriesCards = ({ subcategories, currentPage, cardsPerPage }) => {
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCategories = subcategories.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const [editedSubCategoryId, setEditedSubCategoryId] = useState(null);
  const [newName, setNewName] = useState("");

  const dispatch = useDispatch();

  const handleEditName = (subCategoryId, name) => {
    setEditedSubCategoryId(subCategoryId);
    setNewName(name);
  };

  const handleSaveName = (subCategoryId, categoryId) => {
    dispatch(
      updateSubCategoryName({
        categoryId,
        subCategoryId,
        subCategoryName: newName,
      })
    );
    setEditedSubCategoryId(null);
  };

  const handleCancelEdit = () => {
    setEditedSubCategoryId(null);
    setNewName("");
  };

  const handleEditIcon = (subCategoryId, categoryId, file) => {
    dispatch(updateSubCategoryIcon({ subCategoryId, categoryId, icon: file }));
  };

  const handleDelete = (categoryId, subCategoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06952c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSubCategory({ categoryId, subCategoryId }));

        Swal.fire({
          title: "Deleted!",
          text: "Your service has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          text: "Your service is safe :)",
          icon: "error",
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentCategories.map((category) => {
        const { _id, subCategoryName, icon, categoryId } = category;

        return (
          <div
            key={_id}
            className="flex items-center flex-col bg-white shadow-custom-shadow rounded-lg p-4"
          >
            {/* EDIT IMAGE/ICON BUTTON */}
            <div className="relative inline-block mb-6">
              <img
                src={icon}
                alt={subCategoryName}
                className="h-20 w-20 rounded-full"
              />
              <input
                type="file"
                id={`newImage-${_id}`}
                className="hidden"
                onChange={(e) =>
                  handleEditIcon(_id, categoryId, e.target.files[0])
                }
              />
              <label
                htmlFor={`newImage-${_id}`}
                className="absolute bottom-0 right-[10px] transform translate-x-1/2 bg-blue-500 rounded-full p-1 text-white text-sm cursor-pointer"
              >
                <FaRegEdit />
              </label>
            </div>

            {/* EDIT NAME BUTTON */}
            <div className="flex items-center justify-between mb-4">
              {editedSubCategoryId === _id ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-grow mr-2 border rounded p-2"
                  />
                  <button
                    className="bg-green-500 rounded-full p-1 text-white text-sm"
                    onClick={() => handleSaveName(_id, categoryId)}
                  >
                    <FaCircleCheck />
                  </button>
                  <button
                    className="bg-red-500 rounded-full p-1 text-white text-sm ml-2"
                    onClick={handleCancelEdit}
                  >
                    <MdCancel />
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-2 mr-2">
                    {subCategoryName}
                  </h3>
                  <button
                    className="bg-blue-500 rounded-full p-1 text-white text-sm"
                    onClick={() => handleEditName(_id, subCategoryName)}
                  >
                    <FaRegEdit />
                  </button>
                </>
              )}
            </div>

            {/* DELETE BUTTON */}
            <button
              className="bg-red-600 text-white rounded-[5px] py-2 px-4 text-sm"
              onClick={() => handleDelete(categoryId, _id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SubCategoriesCards;
