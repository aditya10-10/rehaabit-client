import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getBlogs, publishBlog, deleteBlog } from '../../slices/blogSlice'
import { Link, useNavigate } from 'react-router-dom'

const ViewBlogs = () => {
    const { blogs, isLoading } = useSelector((state) => state.blog);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [expandedBlogs, setExpandedBlogs] = useState(new Set());

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showModal && 
                !event.target.closest('.modal-content') && 
                !event.target.closest('.modal-toggle-button')) {
                setShowModal(false);
                setSelectedBlog(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showModal]);

    const handlePublish = async (blogId) => {
        await dispatch(publishBlog(blogId));
        dispatch(getBlogs());
    };

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    const handleEdit = (blogSlug) => {
        navigate(`/dashboard/blog/edit-blog/${blogSlug}`);
    };

    const handleDelete = async (blogId) => {
        const response = await dispatch(deleteBlog(blogId));
        if (response.meta.requestStatus === "fulfilled") {
            dispatch(getBlogs());
        }
    };

    const openModal = (blog) => {
        setSelectedBlog(blog);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedBlog(null);
    };

    const toggleReadMore = (blogId) => {
        setExpandedBlogs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(blogId)) {
                newSet.delete(blogId);
            } else {
                newSet.add(blogId);
            }
            return newSet;
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">View Blogs</h1>

            {/* Search Section */}
            <div className="flex gap-4 mb-8 justify-center">
                <input
                    type="text"
                    placeholder="Search blogs..."
                    className="px-4 py-2 border rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Blog List */}
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="space-y-6">
                    {blogs?.map((blog) => (
                        <div 
                            key={blog?.id} 
                            className={`rounded-lg shadow-md p-4 relative hover:shadow-lg transition-shadow 
                                ${blog?.status === "published" ? "bg-green-100" : "bg-yellow-100"}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => navigate(`/blog/view-blog/${blog?.slug}`)}>{blog?.title}</h2>
                                    <div className="relative">
                                        <button
                                            onClick={() => openModal(blog)}
                                            className="modal-toggle-button text-gray-500 hover:text-gray-700"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6 10a2 2 0 114-0 2 2 0 01-4 0zm-4 0a2 2 0 114-0 2 2 0 01-4 0zm8 0a2 2 0 114-0 2 2 0 01-4 0z" />
                                            </svg>
                                        </button>

                                        {showModal && selectedBlog?.id === blog?.id && (
                                            <div className="modal-content absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                                                <ul className="py-1">
                                                        <li>
                                                            <button
                                                                onClick={() => handlePublish(blog?.id)}
                                                                className="w-full px-4 py-2 text-left text-green-500 hover:bg-gray-100"
                                                            >
                                                                {blog?.status === "published" ? "UnPublish" : "Publish"}
                                                            </button>
                                                        </li>
                                                
                                                    <li>
                                                        <button
                                                            onClick={() => handleEdit(blog?.slug)}
                                                            className="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                                                        >
                                                            Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() => navigate(`/blog/view-blog/${blog?.slug}`)}
                                                            className="w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-100"
                                                        >
                                                            Preview
                                                        </button>
                                                    </li>
                                                    {user?.accountType === "Admin" && (
                                                        <li>
                                                            <button
                                                                onClick={() => handleDelete(blog?.id)}
                                                                className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                                                            >
                                                                Delete
                                                            </button>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                            
                            </div>
                            <p className="text-gray-600 mb-4">
                                
                                        {expandedBlogs.has(blog?.id) 
                                            ? blog?.metaDescription
                                            : blog?.metaDescription.substring(0, 70)
                                        }
                                        {blog?.metaDescription.length > 70 && (
                                            <span className="inline-block">
                                                {!expandedBlogs.has(blog?.id) && "... "}
                                            <button
                                                onClick={() => toggleReadMore(blog.id)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {expandedBlogs.has(blog?.id) ? 'Show Less' : 'Read More'}
                                                </button>
                                            </span>
                                        )}
                                
                            </p>
                            <div className="flex items-center">
                                <p className="text-sm text-gray-500">By {blog?.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewBlogs;
