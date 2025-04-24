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
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative z-10 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold font-cursive">
          Welcome to Our Universe
        </h1>
        <p className="mt-4 text-lg sm:text-xl">Scroll down to explore more</p>
      </section>

      {/* Cultural Fest Section */}
      <section className="relative z-20 bg-white/20 backdrop-blur-sm py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-gray-800">
            Cultural Fest Highlights
          </h2>
          
          {/* Dance Performances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Dance Performances</h3>
              <p className="text-lg text-gray-600">
                It wouldn&apos;t be a cultural fest without getting to witness some mind blowing dance performances on stage. 
                We were engulfed in a sea of emotions expressed gracefully by classical dancers, but also couldn&apos;t stop 
                ourselves from grooving to the upbeat Hip Hop choreographies.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/images/image1.jpeg" 
                alt="Dance Performance" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Music Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/images/image2.jpeg" 
                alt="Music Performance" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Musical Nights</h3>
              <p className="text-lg text-gray-600">
                Our musical nights featured breathtaking performances from classical instrumentalists 
                to contemporary bands that had the entire crowd singing along. The fusion of traditional 
                and modern music created unforgettable moments.
              </p>
            </div>
          </div>

          {/* Art Exhibition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Art Exhibition</h3>
              <p className="text-lg text-gray-600">
                The art exhibition showcased incredible talent from our student community, featuring 
                everything from traditional paintings to digital art installations. Visitors were 
                mesmerized by the creativity on display.
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