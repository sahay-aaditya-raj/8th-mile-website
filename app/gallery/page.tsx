"use client";

import { BlurFade } from "../../components/magicui/blur-fade";
import Image from "next/image";

const images = [
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
  { id: 30, image: "/gallery/cultural/30.png", caption: "Event 30" },
  { id: 31, image: "/gallery/cultural/31.png", caption: "Bike Performance" },
  { id: 32, image: "/gallery/cultural/32.png", caption: "Bike Performance" },
  { id: 33, image: "/gallery/cultural/33.png", caption: "Verve" },
  { id: 34, image: "/gallery/cultural/34.png", caption: "Concert" },
  { id: 35, image: "/gallery/cultural/35.png", caption: "Event 35" }
];

export default function GallerySection() {



  return (
    <section className="bg-black py-26 px-6 md:px-24 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="py-8 text-4xl md:text-6xl font-bold text-[#f9dd9c] drop-shadow-lg">
          Our Vibrant Gallery
        </h2>
      </div>

      <div className="flex gap-8">
  {/* Create 4 columns */}
  {[0, 1, 2, 3].map((colIndex) => (
    <div key={colIndex} className="flex flex-col gap-8 flex-1">
      {images
        .filter((_, idx) => idx % 4 === colIndex) // distribute images
        .map((image, idx) => (
          <BlurFade key={image.image} delay={0.25 + idx * 0.05} inView>
            <div className="group relative overflow-hidden rounded-lg w-full">
              <Image
                className="object-cover rounded-lg"
                src={image.image}
                width={500}
                height={800}
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
  ))}
</div>


    </section>
  );
}