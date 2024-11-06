import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function EditButton() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 my-auto text-sm font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-600 transition-all duration-200 ease-in-out max-sm:px-3 max-sm:py-1 max-sm:text-xs"
      onClick={() => navigate("/dashboard/edit-profile")}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dd493d7bb07d7c84451d03e73565ade9a14c60e99ba1b32978636603ec4565f?apiKey=1c1c6b64ebb646aabb735b41207b50a2&"
        alt="Edit Icon"
        className="w-4 h-4 max-sm:w-3 max-sm:h-3"
      />
      <span className="max-sm:hidden">Edit</span>
    </button>
  );
}

export default EditButton;
