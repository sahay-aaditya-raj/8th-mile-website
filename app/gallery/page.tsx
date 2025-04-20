import React from "react";
import { GalleryCard, GalleryItem as ItemType } from "@/components/ui/3d-gallery-card"; // adjust path as needed

type Category = "Events" | "Workshops" | "Performances";

const galleryCategories: Category[] = ["Events", "Workshops", "Performances"];

const galleryItems: Record<Category, ItemType[]> = {
  Events: [
    {
      id: 1,
      image: "/images/gallery/event1.jpeg",
      caption: "Opening Ceremony",
      description: "The grand start of 8th Mile with traditional lights and speeches."
    },
    {
      id: 2,
      image: "/images/gallery/event2.jpeg",
      caption: "Hackathon Day 1",
      description: "Teams brainstormed ideas and began coding their innovative projects."
    },
    {
      id: 3,
      image: "/images/gallery/event3.jpeg",
      caption: "Awards Night",
      description: "Finale with prize distribution, performances, and celebration."
    },
  ],
  Workshops: [
    {
      id: 1,
      image: "/images/gallery/event1.jpeg",
      caption: "AI Workshop",
      description: "Introduction to machine learning and AI models with hands-on projects."
    },
    {
      id: 2,
      image: "/images/gallery/event2.jpeg",
      caption: "Web Development",
      description: "Build responsive websites using modern frameworks like React and Tailwind."
    },
    {
      id: 3,
      image: "/images/gallery/event3.jpeg",
      caption: "Design Session",
      description: "UI/UX design session for budding creatives and developers."
    },
  ],
  Performances: [
    {
      id: 1,
      image: "/images/gallery/event3.jpeg",
      caption: "Dance Performance",
      description: "Energetic group dance by our talented students."
    },
    {
      id: 2,
      image: "/images/gallery/event2.jpeg",
      caption: "Music Concert",
      description: "Live music performance featuring student bands and guest artists."
    },
    {
      id: 3,
      image: "/images/gallery/event1.jpeg",
      caption: "Theater Show",
      description: "A dramatic play with engaging storyline and acting."
    },
  ],
};

export default function GalleryPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-10 px-4 md:px-12 lg:px-20">
        <h1 className="text-5xl font-bold mb-10 text-left">Gallery</h1>

        {galleryCategories.map((category, index) => (
          <div key={category} className="mb-14">
            <h2 className="text-3xl font-semibold mb-6 text-left">{category}</h2>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems[category].map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </div>

            {/* Separator */}
            {index < galleryCategories.length - 1 && (
              <hr className="my-10 border-t border-gray-300 dark:border-gray-700" />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
