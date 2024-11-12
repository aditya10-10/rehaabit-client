const CategorySkeleton = ({ className, ...props }) => {
    return (
      <div
        className={`animate-pulse bg-gray-900 rounded ${className}`}
        {...props}
      />
    );
  };
  
  export { CategorySkeleton };