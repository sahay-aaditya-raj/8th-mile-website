"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function InfinityScrollPage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Infinity animation
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const translateXInfinity = useTransform(scrollYProgress, [0.4, 0.6], [0, -300]);
  const imageOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Ashtranga animation
  const ashtrangaOpacity = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const ashtrangaTranslateX = useTransform(scrollYProgress, [0.45, 0.6], [0, 150]);

  return (
    <div className="relative w-full bg-[#f9dd9c]">
      {/* Sticky Section */}
      <div ref={containerRef} className="h-[300vh] relative">
        {/* Sticky div inside */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/landingpagecreme.png"
              alt="Background"
              fill
              className="object-cover h-screen opacity-20 blur-xs"
            />
          </div>

          {/* Infinity Symbol */}
          <motion.div
            style={{
              rotate,
              scale,
              x: translateXInfinity,
              opacity: imageOpacity,
            }}
            className="absolute z-10"
          >
            <Image
              src="/8thmilelogocolourrotate.png"
              alt="Infinity Symbol"
              width={700}
              height={300}
              className="object-contain "
            />
          </motion.div>

          {/* Ashtranga Text */}
          <motion.div
            style={{
              opacity: ashtrangaOpacity,
              x: ashtrangaTranslateX,
            }}
            className="absolute z-10 text-[#870903] ml-36  samarkan text-5xl md:text-9xl"
          >
            Ashtranga
            <div className="poppins text-2xl text-center mt-4 text-black font-semibold">Roots of Culture | Wings of Technology</div>
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
