import React from "react";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import CourseBuilder from "./CourseBuilder";
import CoursePublish from "./CoursePublish";
import CreateService from "./CreateService";

const Service = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />

      <Routes>
        <Route path="/" element={<CreateService />} />
        <Route path="course-builder" element={<CourseBuilder />} />
        <Route path="course-publish" element={<CoursePublish />} />
      </Routes>
    </div>
  );
};

export default Service;
