"use client";

import React, { useEffect, useState, useRef } from "react";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { Parallax } from "react-scroll-parallax";

export default function Page() {
  const { setVisibleSidebar } = useSidebar();
  const { setVisibleNavbar } = useNavbar();
  const fullText = "8th Mile ...";
  const baseText = "8th Mile";
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const videoRef = useRef(null);
  
  // Check for horizontal overflow
  useEffect(() => {
    const checkOverflow = () => {
      const body = document.body;
      const html = document.documentElement;
      
      // Get the true width (including any overflow)
      const scrollWidth = Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
      );
      
      // Get the viewport width
      const windowWidth = window.innerWidth;
      
      if (scrollWidth > windowWidth) {
        console.log("Horizontal overflow detected:", scrollWidth - windowWidth, "pixels");
      }
    };
    
    // Check on mount and window resize
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let idx = 0;
    let deleting = false;
    let timer: string | number | NodeJS.Timeout | undefined;

    const tick = () => {
      if (!deleting) {
        setDisplayText(fullText.slice(0, idx + 1));
        idx++;
        if (idx === fullText.length) {
          timer = setTimeout(() => {
            deleting = true;
            tick();
          }, 1000);
          return;
        }
        timer = setTimeout(tick, 100);
      } else {
        if (idx > baseText.length) {
          idx--;
          setDisplayText(fullText.slice(0, idx));
          timer = setTimeout(tick, 100);
        } else {
          setCursorVisible(false);
        }
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, []);

  // Video section observer for navbar visibility
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleNavbar(false);
          setVisibleSidebar(false);
        } else {
          setVisibleNavbar(true);
          setVisibleSidebar(true);
        }
      });
    }, { threshold: 0.9 });

    const videoElement = videoRef.current;

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [setVisibleNavbar, setVisibleSidebar]);

  return (
    <>
      {/* Main wrapper with max-width to prevent horizontal scroll */}
      <div className="bg-background text-foreground font-sans relative mx-auto w-full max-w-full">
        {/* Hero Section with background image */}
        <section className="relative flex items-center justify-center h-screen w-full">
          {/* Background with parallax effect */}
          <Parallax translateY={[0, 50]} className="absolute inset-0 w-full h-full">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
              style={{ backgroundImage: "url('/home-bg.png')" }}
            />
          </Parallax>

          {/* Text content */}
          <Parallax opacity={[1, 0]} scale={[1, 1.3]} className="relative z-10 w-full px-4">
            <div className="flex justify-center items-center w-full">
              <h1 className="text-4xl md:text-8xl font-bold akaya text-white drop-shadow-md text-center break-words">
                {displayText}
                {cursorVisible && <span className="inline-block ml-1 animate-blink">|</span>}
              </h1>
            </div>
          </Parallax>

          <style jsx>{`
            @keyframes blink {
              0%, 50% { opacity: 1; }
              50.1%, 100% { opacity: 0; }
            }
            .animate-blink { animation: blink 1s steps(1) infinite; }
          `}</style>
        </section>

        {/* Full-Screen Video Section */}
        <section className="relative h-screen w-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            className="object-cover w-full h-full"
            playsInline // Added for better mobile support
          >
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        {/* About Section with Parallax Effects */}
        <Parallax
          translateY={[50, -30]}
          opacity={[0.2, 1.5]}
          scale={[0.8, 1]}
          className="min-h-screen flex flex-col items-center justify-center w-full"
        >
          <div className="px-6 py-10 text-center w-full max-w-4xl mx-auto">
            <h2 className="text-4xl font-semibold mb-6">About the Event</h2>
            <p className="text-muted-foreground text-xl">
              8th Mile is the annual techno-cultural fest of RV College of Engineering. It brings together
              innovation, creativity, and fun through a variety of events and performances.
            </p>
          </div>
        </Parallax>
      </div>
      

    </>
  );
}