import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getBlogs, publishBlog } from '../../slices/blogSlice'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const ViewBlogs = () => {

    const { blogs, isLoading } = useSelector((state) => state.blog);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();


    
    const handlePublish = async (blogId) => {
        await dispatch(publishBlog(blogId));
        dispatch(getBlogs());
    }


    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);
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

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs?.map((blog) => {
                    return (
                        <div key={blog?.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-3 text-gray-800">{blog?.title}</h2>
                                <p className="text-gray-600 mb-4">{blog?.content?.substring(0, 100)}...</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-500">By {blog?.author} </p>
                                    <Link
                                        to={`/blog/view-blog/${blog?.slug}`}
                                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Read More
                                    </Link>
                                    
                                    {user?.accountType === "Admin" && (
                                        <>
                                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">Delete</button>
                                            {blog?.status === "draft" && (
                                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer" onClick={() => handlePublish(blog?.id)}>Publish</button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ViewBlogs
