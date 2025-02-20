import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogBySlug } from "../../slices/blogSlice";
import { Helmet } from "react-helmet-async";
import "./viewblog.css";
import { getUserDetails } from "../../services/operations/profileAPI";
import { usersEndpoints } from "../../services/apis";
import Footer from "../Home/Footer";
import PageNotFound from "../../pages/PageNotFound";

const TableOfContents = ({ content }) => {
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const tocRef = useRef(null);

  useEffect(() => {
    if (content) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;

      const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const tocItems = [];
      let numbering = [0, 0, 0, 0, 0, 0]; // Track numbering for each heading level

      Array.from(headings).forEach((heading) => {
        const level = parseInt(heading.tagName[1]) - 1;
        numbering[level]++;
        for (let i = level + 1; i < numbering.length; i++) {
          numbering[i] = 0;
        }

        const number =
          numbering
            .slice(0, level + 1)
            .filter((num) => num !== 0)
            .join(".") + ".";

        const id = `heading-${number}`;
        heading.id = id;
        tocItems.push({
          id,
          text: `${number} ${heading.textContent}`,
          level: level + 1,
        });
      });

      setToc(tocItems);

      // Set the first item as active by default
      if (tocItems.length > 0) {
        setActiveId(tocItems[0].id);
      }
    }
  }, [content]);

  const handleClick = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
    setIsOpen(false); // Close TOC on click for small screens
  };

  return (
    <div>
      {/* TOC Button for Mobile and Tablet */}
      <button
        className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-[100] font-medium text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Table of Contents" : "Table of Contents"}
      </button>

      <div
        className={`bg-white p-4 shadow-lg border border-gray-200 rounded-lg ${
          isOpen
            ? "fixed top-0 left-0 h-[600px] w-full md:w-80 transform translate-x-0 z-[90]"
            : "fixed top-0 left-0 h-[600px] w-full md:w-80 transform -translate-x-full"
        } md:relative md:transform-none`}
      >
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close table of contents"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
          Table of Contents
        </h2>
        <nav className="text-sm overflow-y-auto h-[calc(100%-80px)] pr-2 scrollbar-hide">
          {toc.map((item, index) => (
            <div key={item.id} className="relative">
              <div
                className={`absolute left-2 top-1/2 w-0.5 h-full -translate-y-1/2 bg-blue-600 ${
                  activeId === item.id ? "opacity-100" : "opacity-0"
                }`}
              ></div>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.id);
                }}
                className={`block mb-1 cursor-pointer px-4 py-2 rounded-md transition-all duration-200 ${
                  activeId === item.id || (index === 0 && activeId === null)
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                }`}
                style={{
                  paddingLeft: `${item.level * 12 + 16}px`,
                }}
              >
                {item.text}
              </a>
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-[80] md:hidden"
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
      const headings = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      let numbering = [0, 0, 0, 0, 0, 0]; // Add numbering tracking

      headings.forEach((heading) => {
        const level = parseInt(heading.tagName[1]) - 1;
        numbering[level]++;
        for (let i = level + 1; i < numbering.length; i++) {
          numbering[i] = 0;
        }

        const number = numbering
          .slice(0, level + 1)
          .filter((num) => num !== 0)
          .join(".");

        heading.id = `heading-${number}`;

        if (["h1", "h2"].includes(heading.tagName.toLowerCase())) {
          const container = document.createElement("div");
          container.style.display = "flex";
          container.style.alignItems = "flex-end";
          container.style.gap = "1rem";
          container.style.width = "100%";
          container.style.margin = "1rem 0";

          heading.style.wordBreak = "break-word";
          heading.style.overflowWrap = "break-word";
          heading.style.maxWidth = "100%";

          const line = document.createElement("div");
          line.style.height = "4px";
          line.style.backgroundColor = "#E5E7EB";
          line.style.flex = "1";
          line.style.marginLeft = "1rem";
          line.style.marginBottom = "0.5rem";

          heading.parentNode.insertBefore(container, heading);
          container.appendChild(heading);
          container.appendChild(line);
        } else {
          heading.style.margin = "1.5rem 0 1rem 0";
          heading.style.wordBreak = "break-word";
          heading.style.overflowWrap = "break-word";
          heading.style.maxWidth = "100%";
        }

        switch (heading.tagName.toLowerCase()) {
          case "h1":
            heading.classList.add("text-4xl", "font-bold");
            break;
          case "h2":
            heading.classList.add("text-3xl", "font-bold");
            break;
          case "h3":
            heading.classList.add("text-2xl", "font-semibold");
            heading.style.color = "#374151";
            break;
          case "h4":
            heading.classList.add("text-xl", "font-semibold");
            heading.style.color = "#4B5563";
            break;
          case "h5":
            heading.classList.add("text-lg", "font-medium");
            heading.style.color = "#4B5563";
            break;
          case "h6":
            heading.classList.add("text-base", "font-medium");
            heading.style.color = "#4B5563";
            break;
          default:
            break;
        }
      });

      // Add spacing between paragraphs
      const paragraphs = contentRef.current.querySelectorAll("p");
      paragraphs.forEach((p) => {
        p.style.marginBottom = "1rem"; // Add spacing between paragraphs
        p.style.lineHeight = "1.6"; // Improve readability
      });

      // Fix bullet points (unordered list)
      const uls = contentRef.current.querySelectorAll("ul");
      uls.forEach((ul) => {
        ul.style.paddingLeft = "1.5rem";
        ul.style.marginBottom = "1rem";
        ul.style.listStyleType = "disc"; // Ensure bullet points are visible
        ul.style.display = "block"; // Fix for hidden bullet points
      });

      // Fix ordered lists (numbered lists)
      const ols = contentRef.current.querySelectorAll("ol");
      ols.forEach((ol) => {
        ol.style.paddingLeft = "1.5rem";
        ol.style.marginBottom = "1rem";
        ol.style.listStyleType = "decimal"; // Ensure numbered lists appear correctly
        ol.style.display = "block"; // Fix for hidden numbered lists
      });

      // Fix list items (both ul and ol)
      const lis = contentRef.current.querySelectorAll("li");
      lis.forEach((li) => {
        li.style.marginBottom = "0.5rem"; // Add spacing between list items
        li.style.display = "list-item"; // Ensure list items render properly
      });

      // Add styles for images
      const images = contentRef.current.querySelectorAll("img");
      images.forEach((img) => {
        img.classList.add("w-full", "rounded-lg", "my-8", "object-cover");
        img.style.maxHeight = "500px";
      });

      // Style bold text
      const boldElements = contentRef.current.querySelectorAll("b, strong");
      boldElements.forEach((bold) => {
        bold.style.fontWeight = "bold"; // Ensure bold styling
      });

      // Style links without underlines
      const links = contentRef.current.querySelectorAll("a");
      links.forEach((link) => {
        link.style.color = "#1D4ED8";
        link.style.textDecoration = "none";
        link.addEventListener("mouseenter", () => {
          link.style.color = "#1E40AF";
        });
        link.addEventListener("mouseleave", () => {
          link.style.color = "#1D4ED8";
        });
      });

      // Update table styles
      const tables = contentRef.current.querySelectorAll("table");
      tables.forEach((table) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflowX = "auto";
        wrapper.style.marginBottom = "1rem";

        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);

        table.style.removeProperty("width");
        table.style.minWidth = "100%";
        table.style.borderCollapse = "collapse";
        table.style.width = "auto";
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
  // console.log(blog);
  const allowedRoles = ["Admin", "Content Writer"];
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateAndFetchBlog = async () => {
      setIsValidating(true);
      const isPreviewRoute =
        window.location.pathname.startsWith("/blog/preview/");

      if (isPreviewRoute) {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser || !allowedRoles.includes(currentUser?.accountType)) {
          setIsValid(false);
          setIsValidating(false);
          navigate("*");
          return;
        }
      }
      try {
        await dispatch(getBlogBySlug(slug)); // Fetch blog by slug
      } catch (error) {
        setIsValid(false); // Set validation to false if error occurs
        console.error("Error fetching blog:", error);
      } finally {
        setIsValidating(false);
      }
    };
    validateAndFetchBlog();
  }, [slug, navigate, dispatch]);

  useEffect(() => {
    const isPreviewRoute =
      window.location.pathname.startsWith("/blog/preview/");
    if (
      !isLoading &&
      !isValidating &&
      Object.keys(blog || {}).length > 0 &&
      !isPreviewRoute &&
      blog?.status !== "published"
    ) {
      setIsValid(false);
      navigate("*");
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
    if (!timestamp) return "";
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp._seconds * 1000);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!isValid) {
    return <PageNotFound />; // Show PageNotFound if not valid
  }

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
            <Helmet>
              <title>{`${blog?.title} | Rehaabit`}</title>
              <meta name="description" content={`${blog?.metaDescription}`} />
            </Helmet>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Table of Contents Sidebar */}
              <div className="hidden md:block md:w-80 shrink-0">
                <div className="sticky top-4">
                  <TableOfContents content={blog?.content} />
                </div>
              </div>

              {/* Mobile TOC */}
              <div className="md:hidden w-full">
                <TableOfContents content={blog?.content} />
              </div>

              {/* Main Content */}
              <div className="flex-1 max-w-3xl">
                <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
                <div className="bg-blue-100 px-3 py-1 rounded-md inline-block mb-6">
                  <p className="text-blue-800 text-sm">
                    Last updated: {formatLastUpdated(blog?.updatedAt)}
                  </p>
                </div>
                <div className="flex flex-col gap-4 mb-6">
                  {/* Author Section */}
                  <div className="flex items-center gap-2">
                    <img
                      src="https://res.cloudinary.com/duizbchmz/image/upload/v1732602197/Screenshot_2024-11-26_at_11.52.02_AM_q8jmdj.png"
                      alt="Author"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs text-gray-500">Author</p>
                      <p className="text-sm font-medium text-gray-700">
                        {blog?.author}
                      </p>
                    </div>
                  </div>
                </div>

                <BlogContent content={blog?.content} />
              </div>
            </div>
          </div>
          {!isLoading && <Footer />}
        </div>
      )}
    </>
  );
};

export default ViewBlog;
