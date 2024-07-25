import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosImage } from "react-icons/io";

const ImageDropzone = ({ onDrop, image }) => {
  const onDropCallback = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles[0]);
      }
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: "image/*",
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer 
      ${isDragActive ? "border-blue-500" : "border-gray-300"} 
      hover:border-blue-500`}
    >
      <input {...getInputProps()} />
      <div className="text-gray-500">
        <IoIosImage size={50} className="mx-auto mb-2" />
        <p className="text-sm">
          {isDragActive
            ? "Drop the files here ..."
            : image
            ? image.name
            : "Drag 'n' drop an image here, or click to select one"}
        </p>
      </div>
    </div>
  );
};

export default ImageDropzone;
