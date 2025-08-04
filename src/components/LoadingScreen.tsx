// src/components/LoadingScreen.tsx

"use client";

import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 9000); // Hide after 9 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        src="/loading.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LoadingScreen;
