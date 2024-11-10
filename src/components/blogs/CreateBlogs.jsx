import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../slices/blogSlice";
import EditorContainer from "./EditorContainer";

export default function CreateBlogs() {
  // State for form fields
 const [formData, setFormData] = useState({
  title: "",
  slug: "",
  metaDescription: "",
  author: "",
 });
 const [content, setContent] = useState("");
 const dispatch = useDispatch();

  // Handle form field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // Handle editor content change
  const handleEditorChange = (content) => {
    setContent(content);
  };

  // Handle save draft
  const handleSaveDraft = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      slug: formData.slug,
      metaDescription: formData.metaDescription,
      author: formData.author,
      content,
    };
    console.log("Payload",payload);
    const response = await dispatch(createBlog(payload));
    if(response.meta.requestStatus === "fulfilled"){
      setFormData({
        title: "",
        slug: "",
        metaDescription: "",
        author: "",
      });
      setContent("");
    }

  };

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create a New Blog</h1>
      <form onSubmit={handleSaveDraft} className="space-y-6">
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter post title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Slug Input */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              placeholder="enter-post-slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Meta Description Input */}
          <div>
            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description
            </label>
            <input
              id="metaDescription"
              type="text"
              placeholder="Enter meta description"
              value={formData.metaDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

 {/* Author Input  */}
 <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              id="author"
              type="text"
              placeholder="Enter author name"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Editor */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <div className="prose max-w-none" style={{ minHeight: '400px', marginBottom: '60px' }}>
              <EditorContainer 
                content={content} 
                handleEditorChange={handleEditorChange} 
              />
            </div>
          </div>
        </div>

        {/* Submit Button - Add position relative and z-index */}
        <div className="relative z-10">
          <button 
            type="submit" 
            className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Draft
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}