import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug, updateBlog } from "../../slices/blogSlice";

const EditBlog = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        slug: "",
        metaDescription: "",
        author: "",
    });
    const [content, setContent] = useState("");
    const { slug } = useParams();
    const { blog, isBlogLoading } = useSelector((state) => state.blog);
    useEffect(() => {
        dispatch(getBlogBySlug(slug));
    }, [dispatch, slug]);

    useEffect(() => {
        if (blog) {
            setFormData({
                id: blog.id,
                title: blog.title,
                slug: blog.slug,
                metaDescription: blog.metaDescription,
                author: blog.author,
            });
            setContent(blog.content || '');
        }
    }, [blog]);

    // Add this modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    // Handle form field change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    // Handle editor content change
    const handleEditorChange = (content, editor) => {
        setContent(content);
    };

    // Handle edit draft
    const handleEditDraft = async (e) => {
        e.preventDefault();
        const payload = {
            title: formData.title,
            slug: formData.slug,
            metaDescription: formData.metaDescription,
            author: formData.author,
            content,
            id: formData.id,
        };
        console.log(payload);
        const response = await dispatch(updateBlog(payload));
        if (response.meta.requestStatus === "fulfilled") {
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
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Blog</h1>
                {isBlogLoading ?
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                    : (
                        <form onSubmit={handleEditDraft} className="space-y-6">
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

                                {/* Editor */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Content
                                    </label>
                                    <div className="prose max-w-none h-64">
                                        <ReactQuill
                                            value={content}
                                            onChange={handleEditorChange}
                                            modules={modules}
                                            theme="snow"
                                            className="h-64"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Author Input  */}
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1 mt-24">
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Draft
                            </button>
                        </form>
                    )}
            </div>
        </div>
    );
}

export default EditBlog;
