import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogBySlug } from '../../slices/blogSlice'
import { Helmet } from "react-helmet-async";

const TableOfContents = ({ content }) => {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const tocItems = Array.from(headings).map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.textContent,
        level: parseInt(heading.tagName[1])
      }));
      setToc(tocItems);
    }
  }, [content]);

  return (
    <div className="toc-container sticky top-4 bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <nav>
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-gray-600 hover:text-blue-600 mb-2 ${
              item.level === 1 ? 'ml-0' : 
              item.level === 2 ? 'ml-4' : 
              'ml-8'
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

const BlogContent = ({ content }) => {
  const contentRef = useRef(null);
  
  useEffect(() => {
    if (contentRef.current) {
      // Add IDs to headings and ensure proper heading styles
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
        
        // Add appropriate heading styles
        switch(heading.tagName.toLowerCase()) {
          case 'h1':
            heading.classList.add('text-4xl', 'font-bold', 'my-6');
            break;
          case 'h2':
            heading.classList.add('text-3xl', 'font-bold', 'my-5');
            break;
          case 'h3':
            heading.classList.add('text-2xl', 'font-semibold', 'my-4');
            break;
          default:
            heading.classList.add('text-xl', 'font-semibold', 'my-3');
        }
      });

      // Add styles for table headings
      const tableHeadings = contentRef.current.querySelectorAll('table h2, table h3');
      tableHeadings.forEach(heading => {
        heading.classList.add('font-bold', 'text-lg', 'my-2');
      });

      // Existing link styling code
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
    }
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
        <div className="max-w-6xl mx-auto px-4 py-8">
        <Helmet>
          <title>{`${blog?.title} | Rehaabit`}</title>
          <meta
            name="description"
            content={`${blog?.metaDescription}`}
            />
          </Helmet>
          <div className="flex gap-8">
            {/* Table of Contents Sidebar */}
            <div className="w-64 shrink-0">
              <TableOfContents content={blog?.content} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
              <div className="prose prose-lg prose-table:mx-auto">
                <style>
                  {`
                    .blog-content table {
                      border-collapse: collapse;
                      width: 80%;
                      margin: 1em auto;
                      table-layout: fixed;
                      align-items: center;
                    }
                    .blog-content table td,
                    .blog-content table th {
                      border: 1px solid #ddd;
                      padding: 16px;
                      height: 50px !important;
                      min-height: 50px !important;
                      vertical-align: top;
                      position: relative;
                      overflow: visible;
                      word-wrap: break-word;
                    }
                    .blog-content table tr {
                      height: 50px !important;
                      min-height: 50px !important;
                    }
                    .blog-content .text-center { text-align: center; }
                    .blog-content .text-left { text-align: left; }
                    .blog-content .text-right { text-align: right; }

                    .blog-content h1, 
                    .blog-content h2, 
                    .blog-content h3, 
                    .blog-content h4, 
                    .blog-content h5, 
                    .blog-content h6 {
                      font-weight: bold;
                      line-height: 1.2;
                      color: #1a202c;
                    }

                    .blog-content img {
                      margin: 2em 0;
                      max-width: 100%;
                      height: auto;
                    }

                    .blog-content p + img {
                      margin-top: 2em;
                    }

                    .blog-content img + p {
                      margin-top: 2em;
                    }
                  `}
                </style>
                <BlogContent content={blog?.content} />
              </div>
              <p className="text-gray-600 mt-4">{blog?.author}</p>
              <p className="text-gray-500">{formatDate(blog?.createdAt)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewBlog
