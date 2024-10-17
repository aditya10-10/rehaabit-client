import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
  deleteCategory,
  updateCategoryIcon,
  updateCategoryName,
} from "../../../slices/categorySlice";
import { useState } from "react";
import Swal from "sweetalert2";
import ShowSubCategoriesModal from "./ShowSubCategoriesModal";
import { MdCategory } from "react-icons/md";
import { toast } from "sonner";
const CategoriesCards = ({ categories, currentPage, cardsPerPage }) => {
  // console.log(categories)
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCategories = categories.slice(indexOfFirstCard, indexOfLastCard);

  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalCategoryId, setModalCategoryId] = useState(null);

  const dispatch = useDispatch();

  const handleEditName = (categoryId, name) => {
    setEditedCategoryId(categoryId);
    setNewName(name);
  };

  const handleSaveName = (categoryId) => {
    dispatch(updateCategoryName({ categoryId, name: newName }));
    setEditedCategoryId(null);
  };

  const handleCancelEdit = () => {
    setEditedCategoryId(null);
    setNewName("");
  };

  const handleEditIcon = (categoryId, file) => {
    if (file.size > 80000) {
      toast.error("Image size should be less than 80kb");
      return;
    }
    setNewImage(file);

    dispatch(updateCategoryIcon({ categoryId, icon: file }));
  };

  const handleDelete = (categoryId) => {
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
        dispatch(deleteCategory(categoryId));

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

  const handleModal = (categoryId) => {
    setIsOpen(!isOpen);
    setModalCategoryId(categoryId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {isOpen && (
        <ShowSubCategoriesModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalCategoryId={modalCategoryId}
        />
      )}

      {currentCategories.map((category) => {
        const { _id, name, icon, subCategory } = category;

        return (
          <div
            key={_id}
            className="flex items-center flex-col bg-white shadow-custom-shadow rounded-lg p-4"
          >
            {/* EDIT IMAGE/ICON BUTTON */}
            <div className="relative inline-block mb-6">
              <img src={icon} alt={name} className="h-20 w-20 rounded-full" />
              <input
                type="file"
                id={`newImage-${_id}`}
                className="hidden"
                onChange={(e) => handleEditIcon(_id, e.target.files[0])}
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
              {editedCategoryId === _id ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-grow mr-2 border rounded p-2"
                  />
                  <button
                    className="bg-green-500 rounded-full p-1 text-white text-sm"
                    onClick={() => handleSaveName(_id)}
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
                  <h3 className="text-xl font-bold mb-2 mr-2">{name}</h3>
                  <button
                    className="bg-blue-500 rounded-full p-1 text-white text-sm"
                    onClick={() => handleEditName(_id, name)}
                  >
                    <FaRegEdit />
                  </button>
                </>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2">
              {/* DELETE BUTTON */}
              <button
                className="bg-red-600 text-white rounded-[5px] py-2 px-4 text-sm"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>

              {/* SHOW SUBCATEGORIES BUTTON */}
              {subCategory.length > 0 && <button
                className="bg-[#0C7FDA] text-white rounded-[5px] py-2 px-4 text-sm"
                onClick={() => handleModal(_id)}
              >
                <MdCategory />
              </button>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesCards;
