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
        console.log("ERROR MESSAGE - ", error.message);
      }
    };

    setOnDelete(() => deleteHandler);
    dispatch(openModal("deleteConfirmation"));
  };

  return (
    <>
      <ConfirmationModal text="Delete Account" onDelete={onDelete} />

      <div className="flex gap-5 p-6 mt-6 bg-rose-200 rounded-lg max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col justify-center items-start self-start p-3.5 bg-rose-50 rounded-[200px] max-md:pr-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3289887045046119419d1f47215c35674915583b02f0c38a313c637cfe4a016?apiKey=52bcba1d2cc448b4873671e81d06b3cd&"
            alt=""
            className="w-6 aspect-square"
          />
        </div>
        <div className="flex flex-col flex-1 text-sm font-medium text-black max-md:max-w-full">
          <h3 className="text-lg font-bold leading-6 text-yellow-900 max-md:max-w-full">
            Delete Account
          </h3>
          <p className="mt-2 leading-[157%] max-md:max-w-full">
            Would you like to delete account?
          </p>
          <p className="leading-6 max-md:max-w-full">
            This account contains Paid Courses. Deleting your account will
            remove all the contain associated with it.
          </p>
          <button
            type="button"
            className="mt-2 flex text-base italic leading-6 text-red-400 max-md:max-w-full"
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
