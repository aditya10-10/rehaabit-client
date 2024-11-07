import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogBySlug } from '../../slices/blogSlice'

const BlogContent = ({ content }) => {
    const contentRef = useRef(null);
  
    useEffect(() => {
      const links = contentRef.current.querySelectorAll('a');
      links.forEach((link) => {
        link.style.color = '#1D4ED8'; 
        link.style.textDecoration = 'underline';
        link.addEventListener('mouseenter', () => {
          link.style.color = '#1E40AF'; 
        });
        link.addEventListener('mouseleave', () => {
          link.style.color = '#1D4ED8'; 
        });
      });
    }, [content]);
  
    return (
      <div
        ref={contentRef}
        className="blog-content text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };
  

const ViewBlog = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { blog, isLoading } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getBlogBySlug(slug));
  }, [dispatch, slug]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp._seconds * 1000).toLocaleDateString();
  };

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
          <div className="prose prose-lg">
          <BlogContent content={blog?.content} />
          </div>
          <p className="text-gray-600 mt-4">{blog?.author}</p>
          <p className="text-gray-500">{formatDate(blog?.createdAt)}</p>
        </div>
      )}
    </>
  );
}

export default ViewBlog
