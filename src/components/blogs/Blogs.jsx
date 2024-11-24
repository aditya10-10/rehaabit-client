import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPublishedBlogs } from "../../slices/blogSlice";
import { Link } from "react-router-dom";

const defaultBlogImages = [
  "https://res.cloudinary.com/duizbchmz/image/upload/v1732435966/defaultblogpost4_mnqknt.webp",
  "https://res.cloudinary.com/duizbchmz/image/upload/v1732435966/defaultblogpost5_whewoa.jpg",
  "https://res.cloudinary.com/duizbchmz/image/upload/v1732435965/defaultblogpost2_n9srvb.jpg",
  "https://res.cloudinary.com/duizbchmz/image/upload/v1732435965/defaultblogpost3_v5f1z2.jpg",
  "https://res.cloudinary.com/duizbchmz/image/upload/v1732435965/defaultblogpost1_xwuqs0.jpg",
];
const BlogSkeleton = () => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="flex items-center mt-4">
          <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};
const getRandomDefaultBlogImage = () => {
  return defaultBlogImages[
    Math.floor(Math.random() * defaultBlogImages.length)
  ];
};
const extractFirstImageUrl = (content) => {
  if (!content) return null;
  const div = document.createElement("div");
  div.innerHTML = content;
  const firstImg = div.querySelector("img");
  return firstImg ? firstImg.src : null;
};

const BlogCard = ({ blog, expandedBlogs, toggleReadMore }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const imageUrl =
    extractFirstImageUrl(blog?.content) || getRandomDefaultBlogImage();

  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <Link to={`/library/${blog?.slug}`}>
        <img
          src={imageUrl}
          alt={blog?.title}
          className="w-full h-40 object-cover"
          onError={(e) => {
            e.target.src = getRandomDefaultBlogImage();
          }}
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/library/${blog?.slug}`}
          className="text-lg font-bold text-gray-800 hover:text-blue-500 block"
        >
          {blog?.title}
        </Link>
        <p className="text-gray-600 mt-2">
          {expandedBlogs.has(blog?.id)
            ? blog?.metaDescription
            : blog?.metaDescription.substring(0, 70)}
          {blog?.metaDescription.length > 70 && (
            <span>
              {!expandedBlogs.has(blog?.id) && "... "}
              <button
                onClick={() => toggleReadMore(blog.id)}
                className="text-blue-500 hover:underline"
              >
                {expandedBlogs.has(blog?.id) ? "Show Less" : "Read More"}
              </button>
            </span>
          )}
        </p>
        <div className="flex items-center mt-4">
          <img
            src="https://res.cloudinary.com/duizbchmz/image/upload/v1732435965/dummypic_sm1zok.jpg"
            alt="Author"
            className="w-6 h-6 rounded-full mr-2"
          />
          <p className="text-sm text-gray-500">
            {blog?.author} • {formatDate(blog?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const dispatch = useDispatch();
  const { publishedBlogs, isLoading, totalPublishedBlogs } = useSelector(
    (state) => state.blog
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedBlogs, setExpandedBlogs] = useState(new Set());
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const toggleReadMore = (blogId) => {
    setExpandedBlogs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(blogId)) {
        newSet.delete(blogId);
      } else {
        newSet.add(blogId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    dispatch(getPublishedBlogs({ page: 1, limit: 13 }));
  }, [dispatch]);

  const loadMore = () => {
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    dispatch(getPublishedBlogs({ page: nextPage, limit: 8 })).then((action) => {
      if (action.payload.blogs.length === 0) {
        setHasMore(false);
      }
      setCurrentPage(nextPage);
      setIsLoadingMore(false);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const remainingBlogs = publishedBlogs.slice(1);
    const filtered = remainingBlogs.filter(
      (blog) =>
        blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog?.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [publishedBlogs, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-4 text-center">Blog Page</h1>

      {publishedBlogs?.[0] && (
        <Link to={`/library/${publishedBlogs[0].slug}`} className="block">
          <div className="relative mb-8">
            <img
              src={
                publishedBlogs[0].coverImage ||
                extractFirstImageUrl(publishedBlogs[0].content) ||
                getRandomDefaultBlogImage()
              }
              alt={publishedBlogs[0].title}
              className="w-full h-72 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = getRandomDefaultBlogImage();
              }}
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 text-white rounded-lg">
              <h1 className="text-3xl font-bold">{publishedBlogs[0].title}</h1>
              <div className="flex items-center mt-2">
                <img
                  src="https://res.cloudinary.com/duizbchmz/image/upload/v1732435965/dummypic_sm1zok.jpg"
                  alt="Author"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <p className="text-sm">
                  {publishedBlogs[0].author} •{" "}
                  {formatDate(publishedBlogs[0].createdAt)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Search Section */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by blog title or author..."
          className="px-4 py-2 border rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Blog List - Using filtered remaining blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && publishedBlogs.length === 0
          ? Array(8)
              .fill()
              .map((_, index) => <BlogSkeleton key={`skeleton-${index}`} />)
          : filteredBlogs?.map((blog, index) => (
              <BlogCard
                key={`blog-${blog.id}-${index}`}
                blog={blog}
                expandedBlogs={expandedBlogs}
                toggleReadMore={toggleReadMore}
              />
            ))}
        {isLoadingMore &&
          Array(8)
            .fill()
            .map((_, index) => (
              <BlogSkeleton key={`loading-skeleton-${index}`} />
            ))}
      </div>

      {!isLoading &&
        hasMore &&
        !searchTerm &&
        publishedBlogs.length < totalPublishedBlogs && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-white text-gray-800 
            border-2 border-gray-300 
            rounded-lg 
            hover:bg-gray-50 
            hover:border-gray-400
            hover:scale-105
            hover:shadow-md
            transition-all duration-200 ease-in-out
            disabled:opacity-50
            disabled:hover:scale-100
            disabled:hover:shadow-none"
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
    </div>
  );
};

export default Blogs;
