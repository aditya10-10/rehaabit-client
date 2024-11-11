import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getBlogs} from '../../slices/blogSlice'
import { Link} from 'react-router-dom'

const Blogs = () => {
    const { blogs, isLoading, totalCount } = useSelector((state) => state.blog);
    console.log(blogs);
    const dispatch = useDispatch();

    const [expandedBlogs, setExpandedBlogs] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const blogsPerPage = 10;

    useEffect(() => {
        dispatch(getBlogs({ 
            page: 1, 
            limit: blogsPerPage
        }));
    }, [dispatch]);

    useEffect(() => {
        setFilteredBlogs(blogs?.filter(blog => 
            blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog?.author?.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [searchTerm, blogs]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(getBlogs({ 
            page: pageNumber, 
            limit: blogsPerPage,
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <h1 className="text-3xl font-bold mb-8 text-center">
                Blogs
            </h1>

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
            </div>

            {/* Blog List */}
            {isLoading ? (
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
                                    <Link to={`/library/${blog?.slug}`} className="text-xl font-semibold text-gray-800 cursor-pointer">{blog?.title}</Link>
                                    
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
                        
                        {[...Array(Math.ceil(totalCount / blogsPerPage))].map((_, index) => (
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
                            disabled={currentPage === Math.ceil(totalCount / blogsPerPage)}
                            className={`px-4 py-2 rounded ${
                                currentPage === Math.ceil(totalCount / blogsPerPage)
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blogs;
