import React from 'react';

const ShimmerEffect = () => {
  return (
    <div className="animate-pulse space-y-4 w-full">
      <div className="h-48 bg-gray-200 rounded-lg w-full"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="h-24 bg-gray-200 rounded-lg w-full"></div>
      <div className="h-32 bg-gray-200 rounded-lg w-full"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
      </div>
    </div>
  );
};

export default ShimmerEffect;
