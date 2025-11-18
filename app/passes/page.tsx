"use client";

import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from "next/image";
import { eventPasses } from "@/data/passes";
import { Pass } from "@/types";

// Map custom types to allowed badge variants
const badgeVariantMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  basic: "secondary",
  standard: "default",
  premium: "destructive"
};

const SvgPatternBackground = () => (
  <div
    className="absolute inset-0 z-0 opacity-20"
    style={{
      backgroundImage: `url("/squiggly.svg")`,
      backgroundRepeat: "repeat",
    }}
  />
);

export default function PassesPage() {
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});

  const switchImage = (passId: string, index: number) => {
    setActiveImageIndex({
      ...activeImageIndex,
      [passId]: index
    });
  };

  const getDisplayImage = (pass: Pass): string => {
    const currentIndex = activeImageIndex[pass.id] ?? -1;
    if (currentIndex === -1 || !pass.galleryImages || pass.galleryImages.length <= currentIndex) {
      return pass.primaryImage;
    }
    return pass.galleryImages[currentIndex];
  };

  return (
  <div className="white-spotted-bg text-black min-h-screen pt-24 relative">
    <section className="py-10 px-6 md:px-20 max-w-7xl mx-auto relative z-10">
      <div className="text-7xl seasons mb-4 text-black text-center">Get Your Passes</div>
      <p className="text-lg text-gray-900 mb-10 text-center">
        Choose the perfect pass for your 8th Mile experience
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventPasses.map(pass => (
          <div
            key={pass.id}
            className="bg-white border-1 border-black rounded-xl overflow-hidden flex flex-col transition-transform hover:scale-[1.01] text-center"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={getDisplayImage(pass)}
                alt={pass.name}
                fill
                className="object-cover transition-all duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            {pass.galleryImages && pass.galleryImages.length > 0 && (
              <div className="flex gap-2 p-3 justify-center bg-gray-100">
                <div
                  className={`h-12 w-12 rounded cursor-pointer border-2 ${
                    activeImageIndex[pass.id] === undefined
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                  onClick={() => switchImage(pass.id, -1)}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={pass.primaryImage}
                      alt="Main"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </div>

                {pass.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`h-12 w-12 rounded cursor-pointer border-2 hover:scale-110 transition-all duration-300 ${
                      activeImageIndex[pass.id] === idx
                        ? 'border-black'
                        : 'border-transparent'
                    }`}
                    onClick={() => switchImage(pass.id, idx)}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-center mb-3">
                <span className="text-xl sora font-extrabold text-[#C48C5C]">
                  ₹{pass.price}
                </span>
              </div>
              <h3 className="text-brown text-xl font-extrabold [font-family:sora!important]">{pass.name}</h3>
              <p className="text-gray-600 text-sm">{pass.description}</p>
            </div>
            <div className="p-6 pt-0 mt-auto">
              <Link
                className="w-full px-4 py-2 text-center rounded-2xl bg-[#ff7809] text-white"
                href={`/checkout?passId=${pass.id}`}
              >
                Get Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);


}
