"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
      video.onended = () => setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center bg-black">
          <video
            ref={videoRef}
            src="/loading.mp4"
            className="w-full h-full object-cover"
            muted
          />
        </div>
      ) : (
        <>
          <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-zinc-900">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight drop-shadow-md">
              <span className="text-gray-500 dark:text-zinc-400">ADmyBRAND</span>{" "}
              <span className="text-[#2563eb] dark:text-blue-400">Insights</span>
            </h1>
          </header>
          <main className="p-6">{children}</main>
        </>
      )}
    </ThemeProvider>
  );
}
