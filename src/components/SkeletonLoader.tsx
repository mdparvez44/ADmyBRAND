import React from "react";

interface SkeletonLoaderProps {
  height?: string;
  width?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ height = "h-24", width = "w-full" }) => {
  return (
    <div
      className={`animate-pulse bg-muted rounded-md ${height} ${width}`}
    />
  );
};

export default SkeletonLoader;
