"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Parallax } from 'react-scroll-parallax';


type GalleryItem = {
  id: number;
  image: string;
  caption: string;
};
type Category = "Events" | "Workshops" | "Performances";

const galleryCategories: Category[] = ["Events", "Workshops", "Performances"];

const galleryItems: Record<Category, GalleryItem[]> = {
  Events: [
    { id: 1, image: "/images/gallery/event1.jpeg", caption: "Opening Ceremony" , bgColor: "bg-pink-300"  },
    { id: 2, image: "/images/gallery/event2.jpeg", caption: "Hackathon Day 1" , bgColor: "bg-purple-300"},
    { id: 3, image: "/images/gallery/event3.jpeg", caption: "Awards Night" , bgColor: "bg-blue-300" },
  ],
  Workshops: [
    { id: 1, image: "/images/gallery/event1.jpeg", caption: "AI Workshop" , bgColor: "bg-blue-200"},
    { id: 2, image: "/images/gallery/event2.jpeg", caption: "Web Development" , bgColor: "bg-teal-200" },
    { id: 3, image: "/images/gallery/event3.jpeg", caption: "Design Session" , bgColor: "bg-emerald-200"},
  ],
  Performances: [
    { id: 1, image: "/images/gallery/event1.jpeg", caption: "Dance Performance" , bgColor: "bg-rose-300" },
    { id: 2, image: "/images/gallery/event2.jpeg", caption: "Music Concert" , bgColor: "bg-pink-300" },
    { id: 3, image: "/images/gallery/event3.jpeg", caption: "Theater Show" , bgColor: "bg-orange-300"},
  ],
};


export default function GalleryPage() {
  return (
    <div className="bg-gradient-to-br from-rose-100 via-orange-100 to-yellow-100 text-foreground min-h-screen">
      <section className="py-10 px-6 md:px-20">
      <Parallax translateY={[-20, 20]} opacity={[0, 1]} easing="easeInOut">
        <h1 className="text-4xl font-bold mb-10 ">Gallery</h1>
        </Parallax>

        <Tabs defaultValue="Events" className="w-full">
          <TabsList className="w-full justify-start bg-pink-100 p-2 rounded-xl shadow-inner">
            {galleryCategories.map((category) => (
              <TabsTrigger key={category} value={category}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-purple-400 data-[state=active]:text-white 
                 px-4 py-2 rounded-lg text-sm font-medium text-pink-600 transition-all hover:bg-pink-200">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {galleryCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {galleryItems[category].map((item) => (
                  <Parallax key={`${category}-${item.id}`}  scale={[0.9, 1]} opacity={[0.7, 1]} easing="easeInOut">
                  <Card className={`overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 ${item.bgColor}`}>
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={item.image}
                        alt={item.caption}
                        className="object-cover rounded-md"
                        fill
                      />
                    </AspectRatio>
                    <CardHeader className={`p-4 backdrop-blur-md  ${item.bgColor}`}>
                      <CardTitle className="text-sm">{item.caption}</CardTitle>
                    </CardHeader>
                  </Card>
                  
                  </Parallax>
                ))}
                
              </div>
              
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
