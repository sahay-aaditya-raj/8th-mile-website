"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Landing from '@/components/landing';

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    const fadeOutDelay = setTimeout(() => {
      setShowOverlay(false);
    }, 6000); // Adjust delay as needed

    return () => clearTimeout(fadeOutDelay);
  }, [isTypingComplete]);

  return (
    <>
      {showOverlay && (
        <motion.div
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 3 }} // Adjust duration and delay as needed
        >
          <h1 className="absolute text-foreground text-6xl md:text-8xl font-bold flex items-center translate-x-[8px] md:translate-x-[15px]">
            <Typewriter
              words={['8th Mile']}
              loop={1}
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={3000}
              onLoopDone={() => {
                setIsTypingComplete(true);
              }}
              cursor
              cursorColor="white"
            />
          </h1>
        </motion.div>
      )}

      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
        <Landing />
      </main>
    </>
  );
}