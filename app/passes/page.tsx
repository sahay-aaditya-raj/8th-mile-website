"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { eventPasses } from "@/data/passes";
import { Pass } from "@/types";

// Map custom types to allowed badge variants
const badgeVariantMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  basic: "secondary",
  standard: "default",
  premium: "destructive"
};

export default function PassesPage() {
  const [, setSelectedPass] = useState<Pass | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});

  const handlePassSelect = (pass: Pass) => {
    setSelectedPass(pass);
    // Redirect to checkout page with the selected pass
    window.location.href = `/checkout?passId=${pass.id}`;
  };

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
  <div className="bg-black text-white min-h-screen pt-24">
    <section className="py-10 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="text-4xl font-bold mb-4 text-[#f9dd9c] text-center">Event Passes</div>
      <p className="text-lg text-gray-100 mb-10 text-center">
        Choose the perfect pass for your 8th Mile experience
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventPasses.map(pass => (
          <Card
            key={pass.id}
            className="bg-[#111] border border-gray-700 rounded-xl overflow-hidden flex flex-col transition-transform hover:scale-[1.01]"
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
              <div className="flex gap-2 p-3 justify-center bg-black/50">
                <div
                  className={`h-12 w-12 rounded cursor-pointer border-2 ${
                    activeImageIndex[pass.id] === undefined
                      ? 'border-[#f9dd9c]'
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
                    className={`h-12 w-12 rounded cursor-pointer border-2 ${
                      activeImageIndex[pass.id] === idx
                        ? 'border-[#f9dd9c]'
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

            <CardHeader>
              <div className="flex items-center justify-between mb-3">
                <Badge variant={badgeVariantMap[pass.type as string]}>
                  {pass.type}
                </Badge>
                <span className="text-xl font-semibold text-[#f9dd9c]">
                  ₹{pass.price / 100}
                </span>
              </div>
              <CardTitle className="text-white">{pass.name}</CardTitle>
              <p className="text-gray-400 text-sm">{pass.description}</p>
            </CardHeader>

            <CardContent className="pt-0 flex-grow">
              <ul className="space-y-1 pl-4 text-gray-400 text-sm">
                {pass.features?.map((feature, index) => (
                  <li key={index} className="list-disc">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                variant="default"
                className="w-full bg-[#f9dd9c] text-black hover:bg-[#fbe8b3]"
                onClick={() => handlePassSelect(pass)}
              >
                Get {pass.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Hackathon Promo */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-[#f9dd9c] mb-4">
          Looking for Hackathons?
        </h2>
        <p className="text-gray-400 mb-6">
          Check out our exciting hackathon events in the events section
        </p>
        <Link href="/events?category=Hackathon">
          <Button
            variant="outline"
            className="border-[#f9dd9c] text-[#f9dd9c] hover:bg-[#f9dd9c]/10"
            size="lg"
          >
            View Hackathon Events
          </Button>
        </Link>
      </div>
    </section>
  </div>
);


}