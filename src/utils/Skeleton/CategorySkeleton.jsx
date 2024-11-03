const CategorySkeleton = ({ className, ...props }) => {
    return (
      <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
        {...props}
      />
    );
  };
  
  export { CategorySkeleton };