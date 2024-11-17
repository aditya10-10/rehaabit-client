import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogBySlug } from '../../slices/blogSlice';
import { Helmet } from 'react-helmet-async';
import "./viewblog.css";
import { getUserDetails } from '../../services/operations/profileAPI';
import { usersEndpoints } from '../../services/apis'

const TableOfContents = ({ content }) => {
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const tocItems = Array.from(headings).map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id; // Adds an ID to each heading for smooth scrolling
        return {
          id,
          text: heading.textContent,
          level: parseInt(heading.tagName[1]),
        };
      });
      setToc(tocItems);
    }
  }, [content]);

  const handleClick = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
    setIsOpen(false); // Close TOC on click for small screens
  };

  return (
    <div>
      {/* TOC for Mobile Screens */}
      <button
        className="sm:hidden fixed bottom-0 right-4 bg-blue-500 text-white p-2 rounded-md z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close TOC' : 'Open TOC'}
      </button>

      <div
        className={`fixed sm:relative top-0 left-0 h-full bg-white p-4 shadow-md border border-gray-300 max-w-xs transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 sm:max-w-none md:sticky md:top-4 md:bg-white md:shadow-none md:border md:border-gray-300 md:rounded-lg md:max-w-xs z-40`}
      >
        <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Table of Contents</h2>
        <nav className="text-sm">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.id);
              }}
              className={`block mb-2 cursor-pointer border border-gray-300 rounded-md p-2 ${
                activeId === item.id
                  ? 'text-blue-600 font-medium border-blue-600'
                  : 'text-gray-600 hover:text-blue-600 hover:border-blue-400'
              }`}
              style={{
                paddingLeft: `${item.level * 8}px`,
                fontWeight: item.level === 1 ? 'bold' : 'normal',
              }}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay for small screens when TOC is open */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
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
        switch (heading.tagName.toLowerCase()) {
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

      // Style links with hover effects
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


  useEffect(() => {
    if (contentRef.current) {
      // Add IDs and heading styles
      const tables = contentRef.current.querySelectorAll('table');
      tables.forEach((table) => {
        table.classList.add('table-class'); // Add class for styling
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
  const navigate = useNavigate();
  const { blog, isLoading } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  console.log(blog);
  const allowedRoles = ['Admin', 'Content Writer'];
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateAndFetchBlog = async () => {
      setIsValidating(true);
      const isPreviewRoute = window.location.pathname.startsWith('/blog/preview/');
      
      if (isPreviewRoute) {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser || !allowedRoles.includes(currentUser?.accountType)) {
          setIsValid(false);
          setIsValidating(false);
          navigate('*');
          return;
        }
      }
      await dispatch(getBlogBySlug(slug));
      setIsValidating(false);
    };
    validateAndFetchBlog();
  }, [slug, navigate, dispatch]);
  useEffect(() => {
    const isPreviewRoute = window.location.pathname.startsWith('/blog/preview/');
    if (!isLoading && 
        !isValidating && 
        Object.keys(blog || {}).length > 0 && 
        !isPreviewRoute && 
        blog?.status !== 'published') {
      setIsValid(false);
      navigate('*');
    } else if (!isLoading && Object.keys(blog || {}).length > 0) {
      setIsValid(true);
    }
  }, [blog, isLoading, navigate, isValidating]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    dispatch(getBlogBySlug(slug));
  }, [slug, dispatch]);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp._seconds * 1000);
    return (
      date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      }) + ' IST'
    );
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
            <meta name="description" content={`${blog?.metaDescription}`} />
          </Helmet>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Table of Contents Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <TableOfContents content={blog?.content} />
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
              <div className="bg-green-100 px-3 py-1 rounded-md inline-block mb-6">
                <p className="text-green-800 text-sm">
                  Last updated: {formatLastUpdated(blog?.updatedAt)}
                </p>
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 font-bold">Author:</p>
                  <p className="text-gray-500">{blog?.author}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 font-bold">Published On:</p>
                  <p className="text-gray-500">{formatDate(blog?.createdAt)}</p>
                </div>
              </div>
              <BlogContent content={blog?.content} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBlog;
