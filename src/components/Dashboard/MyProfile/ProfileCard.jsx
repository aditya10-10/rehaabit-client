import React from "react";
import EditButton from "./EditButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function ProfileCard() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <section className="flex gap-5 p-6 max-sm:p-2 mt-9 max-sm:mt-2 w-full bg-amber-50 rounded-lg shadow-custom-shadow max-md:flex-wrap max-md:px-5">
      <div className="flex flex-1 gap-5 max-md:flex-wrap">
        {user?.image ? (
          <img
            loading="lazy"
            src={user?.image}
            alt="ProfilePicture"
            className="aspect-square w-[78px] rounded-full object-cover"
          />
        ) : (
          <CgProfile size={50} className="text-purple-600" />
        )}

        <div className="flex flex-col flex-1 my-auto max-md:max-w-full">
          <h2 className="text-lg font-semibold leading-6 text-black max-md:max-w-full">
            {user?.additionalDetails?.firstName
              ? user?.additionalDetails?.firstName +
                " " +
                user?.additionalDetails?.lastName
              : "Your Name"}
          </h2>
          <p className="text-sm leading-5 text-neutral-500 max-md:max-w-full">
            {user?.additionalDetails?.email
              ? user?.additionalDetails?.email
              : "Please Enter Your Email"}
          </p>
        </div>
      </div>
      <EditButton />
    </section>
  );
}

export default ProfileCard;
