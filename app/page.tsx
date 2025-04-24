/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Fixed Background */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-transparent dark:from-black/90"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative z-10">
        <div className="bg-background/50 p-4 rounded-xl backdrop-blur-sm">
          <h1 className="text-4xl sm:text-6xl font-bold font-cursive text-white drop-shadow-lg">
            Welcome to Our Universe
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white drop-shadow">
            Scroll down to explore more
          </p>
        </div>
      </section>

      {/* Cultural Fest Section */}
      <section className="relative z-20 bg-white/40 dark:bg-white/10 backdrop-blur-md py-16 px-4 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Cultural Fest Highlights
          </h2>

          {/* Dance Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Dance Performances</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                It wouldn&apos;t be a cultural fest without getting to witness some mind blowing dance performances...
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img src="/images/image1.jpeg" alt="Dance Performance" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Music Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-2xl">
              <img src="/images/image2.jpeg" alt="Music Performance" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 md:order-2 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Musical Nights</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our musical nights featured breathtaking performances from classical instrumentalists...
              </p>
            </div>
          </div>

          {/* Art Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Art Exhibition</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The art exhibition showcased incredible talent from our student community...
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/image1.jpeg" alt="Art Exhibit 1" className="rounded-lg shadow-md h-48 w-full object-cover" />
              <img src="/images/image2.jpeg" alt="Art Exhibit 2" className="rounded-lg shadow-md h-48 w-full object-cover" />
              <img src="/images/image3.jpeg" alt="Art Exhibit 3" className="rounded-lg shadow-md h-48 w-full object-cover" />
              <img src="/images/eventshero.png" alt="Art Exhibit 4" className="rounded-lg shadow-md h-48 w-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
