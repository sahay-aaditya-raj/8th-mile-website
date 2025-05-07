"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function InfinityScrollPage() {
  const containerRef = useRef(null);

  return (
    <div className="relative w-full bg-[#f9dd9c]">
      {/* Sticky Section */}
      <div ref={containerRef} className="h-[300vh] relative">
        {/* Sticky div inside */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with fade-in */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/landingpagecreme.png"
              alt="Background"
              fill
              className="object-cover h-screen blur-xs"
            />
          </motion.div>

          {/* Content: Logo + Text Side by Side */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="z-10 flex flex-col md:flex-row items-center justify-center gap-8"
          >
            {/* Logo */}
            <div>
              <Image
                src="/8thmilelogocolour.png"
                alt="8th Mile Logo"
                width={600}
                height={200}
                className="object-contain"
              />
            </div>

            {/* Ashtranga Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 2 }}
              className="text-[#870903] text-center md:text-left samarkan text-5xl md:text-9xl"
            >
              Ashtrang
              <div className="poppins text-2xl mt-4 text-black font-semibold">
                Roots of Culture | Wings of Technology
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Third Page */}
      <section className="h-screen bg-[#111] flex items-center justify-center text-white px-10 text-center">
        <div>
          <h1 className="text-5xl font-bold mb-6">Welcome to 8th Mile ✨</h1>
          <p className="text-lg leading-relaxed">
            The biggest techno-cultural fest is here! Join us for a celebration of innovation, art, and culture.
          </p>
        </div>
      </section>
    </div>
  );
}
