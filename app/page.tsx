"use client";

import React, { useEffect, useState, useRef } from "react";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { Parallax } from 'react-scroll-parallax';

export default function Page() {
  const { setVisibleSidebar } = useSidebar();
  const { setVisibleNavbar } = useNavbar();
  const fullText = "8th Mile ...";
  const baseText = "8th Mile";
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let idx = 0;
    let deleting = false;
    let timer: NodeJS.Timeout;

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleNavbar(false)
          setVisibleSidebar(false); // Hide navbar when video is in view
        } else {
          setVisibleNavbar(true)
          setVisibleSidebar(true); // Show navbar when video is not in view
        }
      });
    }, { threshold: 0.9 }); // Trigger when 10% of video is visible

    const videoElement = videoRef.current; // Copy ref value to a variable

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [setVisibleNavbar,setVisibleSidebar]);

  return (
    <div className="bg-background text-foreground font-sans">
      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen">
        <h1 className="text-5xl md:text-8xl font-bold akaya text-pink-700 drop-shadow-lg animate-fadeInUp">
          {displayText}
          {cursorVisible && <span className="inline-block ml-1 animate-blink text-pink-500">|</span>}
        </h1>
      <Parallax translateY={[40, 0]} opacity={[0, 1]} easing="easeOutBack" scale={[0.95, 1]}></Parallax>

        <style jsx>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            50.1%, 100% { opacity: 0; }
          }
          .animate-blink { animation: blink 1s steps(1) infinite; 
       }
         @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out both;
          }
        `}</style>
      </section>

      {/* Full-Screen Video Section */}
      <section className="relative h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className="object-cover w-full h-full"
        >
          <source src="/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Scrollable Content */}
      <section className="min-h-screen px-6 py-20">
      <Parallax translateX={[-5,0]} opacity={[0.3, 1]} easing="easeOutCubic">
        <h2 className="text-3xl font-semibold mb-4">About the Event</h2>
        </Parallax>
        <Parallax translateX={[10,0]} opacity={[0.5, 1]} scale={[0.8, 1]} easing="easeInOut">
        <p className="max-w-2xl text-muted-foreground">
          8th Mile is the annual techno-cultural fest of RV College of Engineering. It brings together
          innovation, creativity, and fun through a variety of events and performances.
        </p>
        </Parallax>
      </section>

      {/* More sections... */}
    </div>
  );
}
