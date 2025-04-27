"use client";

import { BlurFade } from "../../components/magicui/blur-fade";
import Image from "next/image";

const technical = [
  { id: 2, image: "/images/gallery/event2.jpeg", caption: "Event 2" },
];

const cultural = [
  { id: 55, image: "/gallery/cultural/55.JPG", caption: "Cola" },
]; // Added missing closing bracket here

const images = [
  { id: 2, image: "/gallery/cultural/2.png", caption: "Verve" },
  { id: 70, image: "/gallery/technical/6.jpg", caption: "Hackathon" },
  { id: 28, image: "/gallery/cultural/28.png", caption: "Clash of Cords" },
  { id: 41, image: "/gallery/cultural/41.JPG", caption: "Performance" },
  { id: 3, image: "/gallery/cultural/3.png", caption: "Footprints" },
  { id: 65, image: "/gallery/technical/1.jpg", caption: "Hackathon" },
  { id: 31, image: "/gallery/cultural/31.png", caption: "Bike Performance" },
  { id: 50, image: "/gallery/cultural/50.JPG", caption: "Footprints" },
  { id: 69, image: "/gallery/technical/5.jpg", caption: "Guest Speech" },
  { id: 58, image: "/gallery/cultural/58.JPG", caption: "Amaal Mallik" },
  { id: 19, image: "/gallery/cultural/19.png", caption: "Open Mic" },
  { id: 24, image: "/gallery/cultural/24.png", caption: "Verve" },
  { id: 71, image: "/gallery/technical/7.jpg", caption: "Hackathon" },
  { id: 21, image: "/gallery/cultural/21.png", caption: "" },
  { id: 46, image: "/gallery/cultural/46.JPG", caption: "Footprints" },
  { id: 10, image: "/gallery/cultural/10.png", caption: "Rangataranga" },
  { id: 74, image: "/gallery/technical/10.jpg", caption: "Hackathon" },
  { id: 44, image: "/gallery/cultural/44.JPG", caption: "Stage" },
  { id: 73, image: "/gallery/technical/9.jpg", caption: "Hackathon" },
  { id: 34, image: "/gallery/cultural/34.png", caption: "Concert" },
  { id: 6, image: "/gallery/cultural/6.png", caption: "DJ Night" },
  { id: 1, image: "/gallery/cultural/1.png", caption: "Amaal Malik" },
  { id: 43, image: "/gallery/cultural/43.JPG", caption: "Comedy" },
  { id: 76, image: "/gallery/technical/12.jpg", caption: "Hackathon" },
  { id: 11, image: "/gallery/cultural/11.png", caption: "Footprints" },
  { id: 39, image: "/gallery/cultural/39.JPG", caption: "Perfromance" },
  { id: 17, image: "/gallery/cultural/17.png", caption: "Verve" },
  { id: 36, image: "/gallery/cultural/36.jpg", caption: "Procession" },
  { id: 68, image: "/gallery/technical/4.jpg", caption: "Hackathon " },
  { id: 22, image: "/gallery/cultural/22.png", caption: "Inauguration" },
  { id: 56, image: "/gallery/cultural/56.JPG", caption: "Amaal Mallik" },
  { id: 30, image: "/gallery/cultural/30.jpg", caption: "Procession" },
  { id: 13, image: "/gallery/cultural/13.png", caption: "Mr. & Ms. 8th Mile" },
  { id: 32, image: "/gallery/cultural/32.png", caption: "Bike Performance" },
  { id: 75, image: "/gallery/technical/11.jpg", caption: "Hackathon" },
  { id: 45, image: "/gallery/cultural/45.JPG", caption: "Bike" },
  { id: 59, image: "/gallery/cultural/59.JPG", caption: "Amaal Mallik" },
  { id: 4, image: "/gallery/cultural/4.png", caption: "Verve" },
  { id: 8, image: "/gallery/cultural/29.png", caption: "Verve" },
  { id: 38, image: "/gallery/cultural/38.JPG", caption: "Footprints" },
  { id: 23, image: "/gallery/cultural/23.png", caption: "Footprints" },
  { id: 52, image: "/gallery/cultural/52.JPG", caption: "Open mic" },
  { id: 42, image: "/gallery/cultural/42.JPG", caption: "Footprints" },
  { id: 20, image: "/gallery/cultural/20.png", caption: "Open Mic" },
  { id: 7, image: "/gallery/cultural/7.png", caption: "Alaap" },
  { id: 9, image: "/gallery/cultural/9.png", caption: "Footprints" },
  { id: 72, image: "/gallery/technical/8.jpg", caption: "Hackathon" },
  { id: 47, image: "/gallery/cultural/47.JPG", caption: "Footprints" },
  { id: 5, image: "/gallery/cultural/5.png", caption: "DJ Night" },
  { id: 64, image: "/gallery/cultural/64.JPG", caption: "Amaal Mallik" },
  { id: 16, image: "/gallery/cultural/16.png", caption: "Mr. & Ms. 8th Mile" },
  { id: 77, image: "/gallery/technical/13.jpg", caption: "Hackathon" },
  { id: 26, image: "/gallery/cultural/26.png", caption: "Footprints" },
  { id: 15, image: "/gallery/cultural/15.png", caption: "Alaap" },
  { id: 61, image: "/gallery/cultural/61.JPG", caption: "Amaal Mallik" },
  { id: 35, image: "/gallery/cultural/35.png", caption: "Footprints" },
  { id: 62, image: "/gallery/cultural/62.JPG", caption: "Amaal Mallik" },
  { id: 57, image: "/gallery/cultural/57.JPG", caption: "Amaal Mallik" },
  { id: 25, image: "/gallery/cultural/25.png", caption: "Inauguration" },
  { id: 48, image: "/gallery/cultural/48.JPG", caption: "Footprints" },
  { id: 49, image: "/gallery/cultural/49.JPG", caption: "Footprints" },
  { id: 40, image: "/gallery/cultural/40.JPG", caption: "Principal" },
  { id: 78, image: "/gallery/technical/14.jpg", caption: "Hackathon" },
  { id: 18, image: "/gallery/cultural/18.png", caption: "Footprints" },
  { id: 66, image: "/gallery/technical/2.jpg", caption: "Hackathon" },
  { id: 33, image: "/gallery/cultural/33.png", caption: "Verve" },
  { id: 60, image: "/gallery/cultural/60.JPG", caption: "Amaal Mallik" },
  { id: 14, image: "/gallery/cultural/14.png", caption: "Verve" },
  { id: 12, image: "/gallery/cultural/12.png", caption: "Concert" },
  { id: 63, image: "/gallery/cultural/63.JPG", caption: "Amaal Mallik" },
  { id: 67, image: "/gallery/technical/3.jpg", caption: "Hack the night" },
  { id: 27, image: "/gallery/cultural/27.png", caption: "Verve" },
  { id: 53, image: "/gallery/cultural/53.JPG", caption: "Open mic" },
  { id: 54, image: "/gallery/cultural/54.JPG", caption: "Open mic" },
  { id: 37, image: "/gallery/cultural/37.JPG", caption: "Procession" }
];

// Removed duplicate entries that were at the end of the array

export default function GallerySection() {
  return (
    <section className="py-16 px-4 md:py-26 md:px-12 lg:px-24 min-h-screen bg-[#f9dd9c]">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="py-6 md:py-8 text-3xl md:text-5xl lg:text-6xl font-bold text-[#870903] drop-shadow-lg">
          Our Vibrant Gallery
        </h2>
      </div>

      {/* Mobile gallery (1 column) */}
      <div className="flex flex-col gap-4 md:hidden">
        {images.slice(0, 20).map((image, idx) => (
          <BlurFade key={image.id} delay={0.15 + idx * 0.05} inView>
            <div className="group relative overflow-hidden rounded-lg w-full">
              <Image
                className="object-cover rounded-lg w-full"
                src={image.image}
                width={500}
                height={600}
                alt={image.caption || `Gallery image ${image.id}`}
              />
              {/* Vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              {/* Caption */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-[#f9dd9c] text-lg opacity-100 transition-all duration-300">
                {image.caption}
              </div>
            </div>
          </BlurFade>
        ))}
        
        
      </div>

      {/* Tablet gallery (2 columns) */}
      <div className="hidden md:flex lg:hidden gap-4">
        {[0, 1].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4 flex-1">
            {images
              .filter((_, idx) => idx % 2 === colIndex)
              .slice(0, 15)
              .map((image, idx) => (
                <BlurFade key={image.id} delay={0.2 + idx * 0.05} inView>
                  <div className="group relative overflow-hidden rounded-lg w-full">
                    <Image
                      className="object-cover rounded-lg w-full"
                      src={image.image}
                      width={500}
                      height={700}
                      alt={image.caption || `Gallery image ${image.id}`}
                    />
                    {/* Vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                    {/* Caption */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-[#f9dd9c] text-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {image.caption}
                    </div>
                  </div>
                </BlurFade>
              ))}
          </div>
        ))}
      </div>

      {/* Desktop gallery (4 columns) */}
      <div className="hidden lg:flex gap-4 xl:gap-6">
        {[0, 1, 2, 3].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6 flex-1">
            {images
              .filter((_, idx) => idx % 4 === colIndex)
              .map((image, idx) => (
                <BlurFade key={image.id} delay={0.25 + idx * 0.05} inView>
                  <div className="group relative overflow-hidden rounded-lg w-full">
                    <Image
                      className="object-cover rounded-lg w-full"
                      src={image.image}
                      width={500}
                      height={800}
                      alt={image.caption || `Gallery image ${image.id}`}
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