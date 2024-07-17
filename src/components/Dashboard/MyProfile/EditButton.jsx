import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditButton() {
  const navigate = useNavigate();

  return (
    <button 
      className="flex gap-2 px-5 py-2 my-auto text-base font-medium leading-6 text-center text-white whitespace-nowrap bg-emerald-700 rounded-lg"
      onClick={() => navigate("/dashboard/edit-profile")}
    >
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dd493d7bb07d7c84451d03e73565ade9a14c60e99ba1b32978636603ec4565f?apiKey=1c1c6b64ebb646aabb735b41207b50a2&" alt="" className="shrink-0 my-auto aspect-square w-[18px]" />
      <span>Edit</span>
    </button>
  );
}

export default EditButton;