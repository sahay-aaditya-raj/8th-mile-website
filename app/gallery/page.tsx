"use client";

import { useState } from "react";
import { BlurFade } from "../../components/magicui/blur-fade";

const technical = [
  { id: 2, image: "/images/gallery/event2.jpeg", caption: "Event 2" },
];

const cultural = [
  { id: 2, image: "/gallery/cultural/2.png", caption: "Verve" },
  { id: 3, image: "/gallery/cultural/3.png", caption: "Footprints" },
  { id: 5, image: "/gallery/cultural/5.png", caption: "DJ Night" },
  { id: 1, image: "/gallery/cultural/1.png", caption: "Amaal Malik" },
  { id: 7, image: "/gallery/cultural/7.png", caption: "Alaap" },
  { id: 8, image: "/gallery/cultural/29.png", caption: "Verve" },
  { id: 4, image: "/gallery/cultural/4.png", caption: "Verve" },
  { id: 6, image: "/gallery/cultural/6.png", caption: "DJ Night" },
  { id: 26, image: "/gallery/cultural/26.png", caption: "Footprints" },
  { id: 9, image: "/gallery/cultural/9.png", caption: "Footprints" },
  { id: 10, image: "/gallery/cultural/10.png", caption: "Rangataranga" },
  { id: 11, image: "/gallery/cultural/11.png", caption: "Footprints" },
  { id: 12, image: "/gallery/cultural/12.png", caption: "Concert" },
  { id: 13, image: "/gallery/cultural/13.png", caption: "Mr. & Ms. 8th Mile" },
  { id: 14, image: "/gallery/cultural/14.png", caption: "Verve" },
  { id: 15, image: "/gallery/cultural/15.png", caption: "Alaap" },
  { id: 16, image: "/gallery/cultural/16.png", caption: "Mr. & Ms. 8th Mile" },
  { id: 17, image: "/gallery/cultural/17.png", caption: "Verve" },
  { id: 18, image: "/gallery/cultural/18.png", caption: "Footprints" },
  { id: 19, image: "/gallery/cultural/19.png", caption: "Open Mic" },
  { id: 20, image: "/gallery/cultural/20.png", caption: "Open Mic" },
  { id: 21, image: "/gallery/cultural/21.png", caption: "" },
  { id: 22, image: "/gallery/cultural/22.png", caption: "Inauguration" },
  { id: 23, image: "/gallery/cultural/23.png", caption: "Footprints" },
  { id: 24, image: "/gallery/cultural/24.png", caption: "Verve" },
  { id: 25, image: "/gallery/cultural/25.png", caption: "Inauguration" },
  { id: 27, image: "/gallery/cultural/27.png", caption: "Verve" },
  { id: 28, image: "/gallery/cultural/28.png", caption: "Clash of Cords" },
  { id: 29, image: "/gallery/cultural/8.png", caption: "Clash of Cords" },
  // { id: 30, image: "/gallery/cultural/30.png", caption: "Event 30" },
  { id: 31, image: "/gallery/cultural/31.png", caption: "Bike Performance" },
  { id: 32, image: "/gallery/cultural/32.png", caption: "Bike Performance" },
  { id: 33, image: "/gallery/cultural/33.png", caption: "Verve" },
  { id: 34, image: "/gallery/cultural/34.png", caption: "Concert" },
  // { id: 35, image: "/gallery/cultural/35.png", caption: "Event 35" }
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<"technical" | "cultural">("technical");

  const images = activeTab === "technical" ? technical : cultural;

  return (
    <section className="bg-black py-26 px-6 md:px-24 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="py-8 text-4xl md:text-6xl font-bold text-[#f9dd9c] drop-shadow-lg">
          Our Vibrant Gallery
        </h2>
        <div className="flex justify-center gap-4 mt-6">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === "technical"
              ? "bg-gradient-to-r from-[#870903] to-[#e90c00] text-white shadow-lg"
              : "bg-[#1a4734] text-[#f9dd9c] hover:bg-[#418b24]"
              }`}
            onClick={() => setActiveTab("technical")}
          >
            Technical
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === "cultural"
              ? "bg-gradient-to-r from-[#870903] to-[#e90c00] text-white shadow-lg"
              : "bg-[#1a4734] text-[#f9dd9c] hover:bg-[#767975]"
              }`}
            onClick={() => setActiveTab("cultural")}
          >
            Cultural
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {images.map((image, idx) => (
          <BlurFade key={image.image} delay={0.25 + idx * 0.05} inView>
            <div className="group relative overflow-hidden rounded-lg w-full h-full">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={image.image}
                alt={`Random stock image ${idx + 1}`}
              />

              {/* Vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

              {/* Caption */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-[#f9dd9c] text-xl opacity-0 group-hover:opacity-100 transition-all duration-500">
                {image.caption}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

    </section>
  );
}