import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getBlogs, publishBlog, deleteBlog } from '../../slices/blogSlice'
import { Link, useNavigate } from 'react-router-dom'

const ViewBlogs = () => {
    const { blogs, isLoading, totalCount } = useSelector((state) => state.blog);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [expandedBlogs, setExpandedBlogs] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [blogToPublish, setBlogToPublish] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);
    const blogsPerPage = 10;

    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        setIsInitialLoading(true);
        dispatch(getBlogs({ 
            page: 1, 
            limit: blogsPerPage,
        })).finally(() => {
            setIsInitialLoading(false);
        });
    }, [dispatch]);
    
    useEffect(() => {
        setFilteredBlogs(blogs?.filter(blog => 
            blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog?.author?.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm, blogs]);

    const totalPages = Math.ceil(totalCount / blogsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(getBlogs({ 
            page: pageNumber, 
            limit: blogsPerPage,
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
        const response = await dispatch(publishBlog(blogId));
        if (response.meta.requestStatus === "fulfilled") {
            const updatedBlogs = blogs.map(blog => {
                if (blog.id === blogId) {
                    return {
                        ...blog,
                        status: blog.status === "published" ? "draft" : "published"
                    };
                }
                return blog;
            });
            setFilteredBlogs(updatedBlogs);
            
            dispatch(getBlogs({ 
                page: currentPage, 
                limit: blogsPerPage,
            }));
            setShowPublishModal(false);
            setBlogToPublish(null);
        }
    };

    const handleEdit = (blogSlug) => {
        navigate(`/dashboard/blog/edit-blog/${blogSlug}`);
    };

    const handleDelete = async (blogId) => {
        const response = await dispatch(deleteBlog(blogId));
        if (response.meta.requestStatus === "fulfilled") {
            dispatch(getBlogs());
            setShowDeleteModal(false);
            setBlogToDelete(null);
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

    const openDeleteModal = (blog) => {
        setBlogToDelete(blog);
        setShowDeleteModal(true);
        closeModal();
    };

    const openPublishModal = (blog) => {
        setBlogToPublish(blog);
        setShowPublishModal(true);
        closeModal();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">View Blogs</h1>

            {/* Search Section */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex-1 max-w-2xl">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search by blog title or author..."
                            className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="bg-[#FFCC00] rounded-lg py-2 px-6 font-medium text-sm hover:bg-[#e6b800] transition-colors ml-4"
                    onClick={() => navigate("/dashboard/blog/create-blog")}
                >
                    Create Blog
                </button>
            </div>

            {/* Blog List */}
            {isInitialLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredBlogs
                        ?.map((blog) => (
                            <div 
                                key={blog?.id} 
                                className={`rounded-lg shadow-md p-4 relative hover:shadow-lg transition-shadow 
                                    ${blog?.status === "published" ? "bg-green-100" : "bg-yellow-100"}`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-semibold text-gray-800 cursor-pointer" onClick={() => navigate(`/blog/preview/${blog?.slug}`)}>{blog?.title}</h2>
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
                                                                    onClick={() => openPublishModal(blog)}
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
                                                                onClick={() => navigate(`/blog/preview/${blog?.slug}`)}
                                                                className="w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-100"
                                                            >
                                                                Preview
                                                            </button>
                                                        </li>
                                                        {user?.accountType === "Admin" && (
                                                            <li>
                                                                <button
                                                                    onClick={() => openDeleteModal(blog)}
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

            {totalCount > blogsPerPage && (
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${
                                currentPage === 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            Previous
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded ${
                                    currentPage === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded ${
                                currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(blogToDelete?.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showPublishModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">Confirm {blogToPublish?.status === "published" ? "Unpublish" : "Publish"}</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to {blogToPublish?.status === "published" ? "unpublish" : "publish"} "{blogToPublish?.title}"?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowPublishModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handlePublish(blogToPublish?.id)}
                                className={`px-4 py-2 ${
                                    blogToPublish?.status === "published" 
                                    ? "bg-yellow-500 hover:bg-yellow-600" 
                                    : "bg-green-500 hover:bg-green-600"
                                } text-white rounded`}
                            >
                                {blogToPublish?.status === "published" ? "Unpublish" : "Publish"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBlogs;
