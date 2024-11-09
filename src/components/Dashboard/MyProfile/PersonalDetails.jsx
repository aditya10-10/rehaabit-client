import React from "react";
import EditButton from "./EditButton";
import { useSelector } from "react-redux";

function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col flex-1 text-sm leading-5 max-sm:text-xs">
      <div className="text-neutral-500">{label}</div>
      <div className="font-medium text-black">{value || "N/A"}</div>
    </div>
  );
}

function PersonalDetails() {
  const { user } = useSelector((state) => state.profile);
  const contactStr = user?.contactNumber + "";
  let contact = contactStr.substring(0, 3) + " " + contactStr.substring(3);

  return (
    <section className="flex flex-col justify-center p-6 max-sm:p-3 mt-6 w-full bg-amber-50 rounded-lg shadow-custom-shadow max-md:px-5">
      <header className="flex justify-between items-start max-sm:flex-col max-sm:items-center max-sm:gap-2">
        <h2 className="flex-1 text-lg font-semibold text-violet-900 max-sm:text-base max-sm:text-center">
          Personal Details
        </h2>
        <div className="max-sm:self-center">
          <EditButton className="p-2 max-sm:p-1 max-sm:text-xs max-sm:w-20 max-sm:h-8" />
        </div>
      </header>
      <div className="mt-5 w-full">
        <div className="flex flex-col gap-5 max-sm:gap-3">
          <div className="flex w-full justify-between gap-10 max-sm:flex-col max-sm:gap-3">
            <DetailItem
              label="First Name"
              value={user?.additionalDetails?.firstName}
            />
            <DetailItem
              label="Last Name"
              value={user?.additionalDetails?.lastName}
            />
          </div>

          <div className="flex w-full justify-between gap-10 max-sm:flex-col max-sm:gap-3">
            <DetailItem label="Email" value={user?.additionalDetails?.email} />
            <DetailItem label="Phone Number" value={contact} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalDetails;
