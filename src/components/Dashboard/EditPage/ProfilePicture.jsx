import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../services/operations/SettingsAPI";
import { CgProfile } from "react-icons/cg";

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-yellow-50"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

const ProfilePicture = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      console.log("Uploading...");
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imageFile);
      console.log("formdata", formData);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="flex gap-5 p-6 text-base font-medium leading-6 bg-amber-50 rounded-lg shadow-sm max-md:flex-wrap max-md:px-5 max-xs:w-full max-xs:justify-center">
      {previewSource || user?.imaage ? (
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="shrink-0 aspect-square w-[78px] object-cover rounded-full"
        />
      ) : (
        <CgProfile size={50} className="text-purple-600" />
      )}
      <div className="flex flex-col flex-1 my-auto max-xs:w-full max-xs:justify-center">
        <span className="text-violet-900 max-md:max-w-full max-xs:text-center">
          Change Profile Picture
        </span>

        <div className="flex gap-3 self-start mt-3 text-center whitespace-nowrap max-xs:justify-center max-xs:w-full">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/gif, image/jpeg"
          />
          <button
            onClick={handleClick}
            disabled={loading}
            className="cursor-pointer justify-center px-5 py-1.5 text-white bg-emerald-700 rounded-lg"
          >
            Select
          </button>
          <IconBtn
            text={loading ? "Uploading..." : "Upload"}
            onClick={handleFileUpload}
            customClasses="px-5 py-1.5"
          >
            {!loading && <FiUpload className="text-lg text-richblack-900" />}
          </IconBtn>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
