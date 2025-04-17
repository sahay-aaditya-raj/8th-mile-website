import React, { useEffect, useRef, useState } from 'react';

function Landing() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        new window.YT.Player('youtube-player', {
          videoId: '80SIY-ijMVw',
          playerVars: {
            autoplay: 1,
            loop: 1,
            controls: 0,
            showinfo: 0,
            mute: 1,
            playlist: '80SIY-ijMVw', // Required for looping
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
            },
          },
        });
      }
    };

    const handleScroll = () => {
      if (headerRef.current) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const progress = Math.min(scrollPosition / windowHeight, 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = 1 + scrollProgress * 2; // Zoom effect
  const opacity = 1 - scrollProgress; // Fade out effect

  return (
    <div className="relative">
      {/* Spacer for scrolling */}
      <div className="h-[200vh]" />

      {/* Header Section */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-background text-foreground"
        style={{
          opacity,
          visibility: opacity === 0 ? 'hidden' : 'visible',
        }}
      >
        <h1
          className="text-6xl md:text-8xl font-bold"
          style={{
            transform: `scale(${scale})`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          8th Mile
        </h1>
      </div>

      {/* YouTube Video Section */}
      <div
        ref={playerRef}
        className="fixed top-0 left-0 w-full h-screen bg-background"
        style={{
          opacity: Math.max(scrollProgress * 2 - 1, 0),
          visibility: scrollProgress === 0 ? 'hidden' : 'visible',
        }}
      >
        <div
          id="youtube-player"
          className="w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}

// Add YouTube IFrame API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default Landing;