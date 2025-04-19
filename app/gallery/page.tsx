"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

type GalleryItem = {
  id: number;
  image: string;
  caption: string;
};

type Category = "Events" | "Workshops" | "Performances";

const galleryCategories: Category[] = ["Events", "Workshops", "Performances"];

const galleryItems: Record<Category, GalleryItem[]> = {
  Events: [
    { id: 1, image: "/images/gallery/event1.jpeg", caption: "Opening Ceremony" },
    { id: 2, image: "/images/gallery/event2.jpeg", caption: "Hackathon Day 1" },
    { id: 3, image: "/images/gallery/event3.jpeg", caption: "Awards Night" },
  ],
  Workshops: [
    { id: 1, image: "/images/gallery/event1.jpeg", caption: "AI Workshop" },
    { id: 2, image: "/images/gallery/event2.jpeg", caption: "Web Development" },
    { id: 3, image: "/images/gallery/event3.jpeg", caption: "Design Session" },
  ],
  Performances: [
    { id: 1, image: "/images/gallery/event1.jpeg", caption: "Dance Performance" },
    { id: 2, image: "/images/gallery/event2.jpeg", caption: "Music Concert" },
    { id: 3, image: "/images/gallery/event3.jpeg", caption: "Theater Show" },
  ],
};

export default function GalleryPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-10 px-6 md:px-20">
        <h1 className="text-4xl font-bold mb-10">Gallery</h1>

        <Tabs defaultValue="Events" className="w-full">
          <TabsList className="w-full justify-start">
            {galleryCategories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {galleryCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {galleryItems[category].map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={item.image}
                        alt={item.caption}
                        className="object-cover"
                        fill
                      />
                    </AspectRatio>
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">{item.caption}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
