const Pagination = ({ pageCount, currentPage, onPageChange }) => {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex p-4">
      <button
        className="p-2 text-[#4600A9] text-xs"
        onClick={() => {
          const prevPage = currentPage > 1 ? currentPage - 1 : pageCount;
          onPageChange(prevPage);
        }}
      >
        Previous
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`border-none px-3 rounded-[5px] text-xs transition-colors duration-200 ${
            pageNumber === currentPage
              ? "bg-[#4600A9] text-white"
              : "text-[#4600A9]"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="p-2 text-[#4600A9] text-xs"
        onClick={() => {
          const nextPage = currentPage < pageCount ? currentPage + 1 : 1;
          onPageChange(nextPage);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
