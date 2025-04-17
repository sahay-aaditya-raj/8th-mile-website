"use client";

import { useEffect, useRef, useState } from "react";

export default function Loading() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      setVideoLoaded(true);
    };

    video.addEventListener("canplaythrough", handleLoaded);
    return () => video.removeEventListener("canplaythrough", handleLoaded);
  }, []);
  console.log("Loading component mounted");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white z-50">
      {!videoLoaded ? (
        <div className="text-center animate-pulse">
          <h1 className="text-3xl font-bold mb-4">Loading 8th Mile...</h1>
          <div className="h-2 w-48 bg-white/30 rounded overflow-hidden">
            <div className="h-full w-1/3 bg-white animate-loading-bar" />
          </div>

          {/* Hidden video just for preload */}
          <video
            ref={videoRef}
            className="hidden"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/8thmile_demo_video.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="text-xl">Almost there...</div>
      )}

      {/* Loading bar animation */}
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 2s infinite linear;
        }
      `}</style>
    </div>
  );
}
