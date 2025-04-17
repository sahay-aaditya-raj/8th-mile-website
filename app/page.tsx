"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
      <Landing />
    </main>
  );
}

function Landing() {
  const headerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fullText = '8th Mile ...';
  const baseText = '8th Mile';            // stop-deletion target
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // TYPE → PAUSE → DELETE ELLIPSIS → DONE
  useEffect(() => {
    let idx = 0;
    let deleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (!deleting) {
        setDisplayText(fullText.slice(0, idx + 1));
        idx++;
        if (idx === fullText.length) {
          // after typing the dots, pause then switch to deleting
          timer = setTimeout(() => {
            deleting = true;
            tick();
          }, 500);
          return;
        }
        timer = setTimeout(tick, 100);
      } else {
        // delete only until baseText length
        if (idx > baseText.length) {
          idx--;
          setDisplayText(fullText.slice(0, idx));
          timer = setTimeout(tick, 100);
        } else {
          // done deleting the "..."
          setCursorVisible(false);
          setIsTypingComplete(true);
        }
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, []);

  // lock/unlock scroll
  useEffect(() => {
    document.body.style.overflow = isTypingComplete ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isTypingComplete]);

  // scroll → zoom & fade
  useEffect(() => {
    const onScroll = () => {
      if (!isTypingComplete) return;
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isTypingComplete]);

  const scale = 1 + scrollProgress * 2;
  const opacity = 1 - scrollProgress;

  return (
    <div className="relative">
      <div className="h-[200vh]" />

      {/* Heading */}
      <div
        ref={headerRef}
        className="fixed inset-0 flex items-center justify-center bg-background text-foreground z-50 overflow-hidden"
        style={{ opacity, visibility: opacity === 0 ? 'hidden' : 'visible' }}
      >
        <h1
          className="text-4xl md:text-8xl font-bold"
          style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease-out' }}
        >
          {displayText}
          {cursorVisible && <span className="inline-block ml-1 animate-blink">|</span>}
        </h1>
      </div>

      {/* Video Reveal */}
      <div
        className="fixed inset-0 bg-background"
        style={{
          opacity: isTypingComplete ? Math.max(scrollProgress * 2 - 1, 0) : 0,
          visibility: isTypingComplete ? 'visible' : 'hidden',
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/8thmile_demo_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* blink animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.1%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s steps(1) infinite; }
      `}</style>
    </div>
  );
}
