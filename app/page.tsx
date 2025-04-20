"use client";

import React, { useEffect, useState, useRef } from "react";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Page() {
  const { setVisibleSidebar } = useSidebar();
  const { setVisibleNavbar } = useNavbar();
  const fullText = "8th Mile ...";
  const baseText = "8th Mile";
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Scroll effect for heading
  const [headingStyle, setHeadingStyle] = useState({
    transform: "scale(1)",
    opacity: 1,
  });

  // Scroll effect for About section
  const [aboutStyle, setAboutStyle] = useState({
    opacity: 0,
    transform: "translateY(100px)",
  });

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
          setVisibleNavbar(false);
          setVisibleSidebar(false); // Hide navbar when video is in view
        } else {
          setVisibleNavbar(true);
          setVisibleSidebar(true); // Show navbar when video is not in view
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

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrollY(scrollY); // Set scrollY state to use for parallax effect

      // Heading animation effect (scale and opacity)
      const scale = 1 + scrollY / 1000; // Scale increases as you scroll down
      const opacity = Math.max(1 - scrollY / 400, 0); // Opacity fades out as you scroll down
      setHeadingStyle({
        transform: `scale(${scale})`,
        opacity: opacity,
      });

      // About section fade-in, fade-out, parallax, and enlarge effect
      const aboutOpacity = Math.min(1, scrollY / 400); // Fade in as we scroll to the "About" section
      const aboutScale = 1 + scrollY / 2000; // Enlarge effect
      const aboutTransform = `translateY(${Math.max(0, 100 - scrollY * 0.2)}px)`; // Parallax effect
      setAboutStyle({
        opacity: aboutOpacity,
        transform: `${aboutTransform} scale(${aboutScale})`,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-background text-foreground font-sans">
      {/* Hero Section with background image */}
      <section className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat">
        {/* Background element with parallax effect and fade-in */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity"
          style={{
            backgroundImage: "url('/home-bg.png')",
            opacity: 1 - scrollY / 800, // Fade-in effect as you scroll
            transform: `translateY(${scrollY * 0.3}px)`, // Parallax effect for background
          }}
        ></div>

        {/* Text content */}
        <div className="relative z-10">
          <h1
            className="text-4xl md:text-8xl font-bold akaya text-white drop-shadow-md transition-all"
            style={{
              transform: headingStyle.transform,
              opacity: headingStyle.opacity,
            }}
          >
            {displayText}
            {cursorVisible && <span className="inline-block ml-1 animate-blink">|</span>}
          </h1>
        </div>

        <style jsx>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            50.1%, 100% { opacity: 0; }
          }
          .animate-blink { animation: blink 1s steps(1) infinite; }
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

      {/* About Section with Parallax, Fade In, Fade Out, and Enlarge Effects */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center"
        style={{
          opacity: aboutStyle.opacity,
          transform: aboutStyle.transform,
          transition: "opacity 0.5s, transform 0.5s, scale 0.5s",
         
        }}
      >
        <h2 className="text-4xl font-semibold mb-6">About the Event</h2>
        <p className="max-w-xl text-muted-foreground text-xl">
          8th Mile is the annual techno-cultural fest of RV College of Engineering. It brings together
          innovation, creativity, and fun through a variety of events and performances.
        </p>
      </section>
    </div>
  );
}