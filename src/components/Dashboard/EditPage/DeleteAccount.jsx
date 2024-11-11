import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../services/operations/SettingsAPI";
import ConfirmationModal from "../../ConfirmationModal";
import { openModal } from "../../../slices/modalSlice";

function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [onDelete, setOnDelete] = useState(null);

  const handleDeleteAccount = async () => {
    const deleteHandler = () => {
      try {
        dispatch(deleteProfile(token, navigate));
      } catch (error) {
        console.error("ERROR MESSAGE - ", error.message);
      }
    };

    setOnDelete(() => deleteHandler);
    dispatch(openModal("deleteConfirmation"));
  };

  return (
    <>
      <ConfirmationModal text="Delete Account" onDelete={onDelete} />

      <div className="flex gap-5 p-6 mt-6 bg-rose-200 rounded-lg shadow-md flex-wrap max-sm:pl-5 max-sm:flex-col max-sm:items-center">
        <div className="flex items-center justify-center w-10 h-10 p-2 bg-rose-50 rounded-full max-sm:w-12 max-sm:h-12">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3289887045046119419d1f47215c35674915583b02f0c38a313c637cfe4a016?apiKey=52bcba1d2cc448b4873671e81d06b3cd&"
            alt="Delete icon"
            className="w-6 h-6 max-sm:w-8 max-sm:h-8"
          />
        </div>

        <div className="flex flex-col flex-1 text-sm font-medium text-black max-sm:text-center">
          <h3 className="text-lg font-bold leading-6 text-yellow-900 max-sm:text-xl">
            Delete Account
          </h3>
          <p className="mt-2 leading-relaxed max-sm:leading-normal">
            Would you like to delete your account?
          </p>
          <p className="leading-relaxed max-sm:leading-normal">
            This account contains Paid Courses. Deleting your account will
            remove all content associated with it.
          </p>
          <button
            type="button"
            className="mt-4 text-base italic text-red-500 hover:text-red-600 max-sm:text-center"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteAccount;
