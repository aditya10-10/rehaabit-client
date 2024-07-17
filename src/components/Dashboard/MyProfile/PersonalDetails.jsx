import React from "react";
import EditButton from "./EditButton";
import { useSelector } from "react-redux";

function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col flex-1 text-sm leading-5">
      <div className="text-neutral-500">{label}</div>
      <div className="font-medium text-black">{value}</div>
    </div>
  );
}

function PersonalDetails() {
  const {user} = useSelector((state) => state.profile);
  const contactStr = user?.contactNumber + "";
  let contact = contactStr.substring(0, 3) + " " + contactStr.substring(3);

  return (
    <section className="flex flex-col justify-center p-6 mt-6 max-w-full bg-amber-50 rounded-lg shadow-sm w-[792px] max-md:px-5">
      <header className="flex gap-5 max-md:flex-wrap">
        <h2 className="flex-1 my-auto text-lg font-semibold leading-6 text-violet-900 max-md:max-w-full">
          Personal Details
        </h2>
        <EditButton />
      </header>
      <div className="mt-5 w-full">
        <div className="flex flex-col gap-5">
            <div className="flex w-full justify-evenly gap-10">
                <DetailItem label="First Name" value={user?.additionalDetails?.firstName} />
                <DetailItem label="Last Name" value={user?.additionalDetails?.lastName} />
            </div>

            <div className="flex w-full justify-evenly gap-10">
                <DetailItem label="Email" value={user?.additionalDetails?.email} />
                <DetailItem label="Phone Number" value={contact} />
            </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalDetails;