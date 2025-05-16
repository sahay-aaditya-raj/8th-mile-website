"use client";

import { BlurFade } from "../../components/magicui/blur-fade";
import Image from "next/image";

const images = [
  { id: 1, image: "/gallery/cultural/1.png", caption: "Amaal Malik" },
  { id: 65, image: "/gallery/technical/1.JPG", caption: "Hackathon" },
  { id: 31, image: "/gallery/cultural/31.png", caption: "Bike Performance" },
  { id: 2, image: "/gallery/cultural/2.png", caption: "Verve" },
  { id: 66, image: "/gallery/technical/2.JPG", caption: "Hackathon" },
  { id: 15, image: "/gallery/cultural/15.png", caption: "Open mic" },
  { id: 36, image: "/gallery/cultural/36.JPG", caption: "Procession" },
  { id: 67, image: "/gallery/technical/3.JPG", caption: "Hack the night" },
  { id: 5, image: "/gallery/cultural/5.png", caption: "DJ Night" },
  { id: 23, image: "/gallery/cultural/23.png", caption: "Footprints" },
  { id: 68, image: "/gallery/technical/4.JPG", caption: "Hackathon " },
  { id: 42, image: "/gallery/cultural/42.JPG", caption: "Rangataranga" },
  { id: 19, image: "/gallery/cultural/19.png", caption: "Open Mic" },
  { id: 30, image: "/gallery/cultural/30.JPG", caption: "Procession" },
  { id: 69, image: "/gallery/technical/5.jpg", caption: "Guest Talk" },
  { id: 10, image: "/gallery/cultural/10.png", caption: "Rangataranga" },
  { id: 48, image: "/gallery/cultural/48.JPG", caption: "Footprints" },
  { id: 7, image: "/gallery/cultural/7.png", caption: "Naveen Sajju" },
  { id: 70, image: "/gallery/technical/6.jpg", caption: "Hackathon" },
  { id: 27, image: "/gallery/cultural/27.png", caption: "Verve" },
  { id: 12, image: "/gallery/cultural/12.png", caption: "Concert" },
  { id: 45, image: "/gallery/cultural/45.JPG", caption: "Bike" },
  { id: 71, image: "/gallery/technical/7.JPG", caption: "Hackathon" },
  { id: 14, image: "/gallery/cultural/14.png", caption: "Verve" },
  { id: 44, image: "/gallery/cultural/44.JPG", caption: "Stage" },
  { id: 24, image: "/gallery/cultural/24.png", caption: "Verve" },
  { id: 72, image: "/gallery/technical/8.JPG", caption: "Hackathon" },
  { id: 35, image: "/gallery/cultural/35.png", caption: "Footprints" },
  { id: 16, image: "/gallery/cultural/16.png", caption: "Mr. & Ms. 8th Mile" },
  { id: 3, image: "/gallery/cultural/3.png", caption: "Footprints" },
  { id: 73, image: "/gallery/technical/9.JPG", caption: "Hackathon" },
  { id: 38, image: "/gallery/cultural/38.JPG", caption: "Footprints" },
  { id: 8, image: "/gallery/cultural/8.png", caption: "Alaap" },
  { id: 47, image: "/gallery/cultural/47.JPG", caption: "Footprints" },
  { id: 26, image: "/gallery/cultural/26.png", caption: "Footprints" },
  { id: 74, image: "/gallery/technical/10.JPG", caption: "Hackathon" },
  { id: 37, image: "/gallery/cultural/37.JPG", caption: "Procession" },
  { id: 4, image: "/gallery/cultural/4.png", caption: "Verve" },
  { id: 50, image: "/gallery/cultural/50.JPG", caption: "Footprints" },
  { id: 11, image: "/gallery/cultural/11.png", caption: "Footprints" },
  { id: 75, image: "/gallery/technical/11.JPG", caption: "Hackathon" },
  { id: 17, image: "/gallery/cultural/17.png", caption: "Verve" },
  { id: 46, image: "/gallery/cultural/46.JPG", caption: "Footprints" },
  { id: 20, image: "/gallery/cultural/20.png", caption: "Open Mic" },
  { id: 49, image: "/gallery/cultural/49.JPG", caption: "Footprints" },
  { id: 76, image: "/gallery/technical/12.JPG", caption: "Hackathon" },
  { id: 52, image: "/gallery/cultural/52.JPG", caption: "Open mic" },
  { id: 9, image: "/gallery/cultural/9.png", caption: "Footprints" },
  { id: 41, image: "/gallery/cultural/41.jpg", caption: "Performance" },
  { id: 43, image: "/gallery/cultural/43.JPG", caption: "Comedy" },
  { id: 77, image: "/gallery/technical/13.JPG", caption: "Hackathon" },
  { id: 18, image: "/gallery/cultural/18.png", caption: "Footprints" },
  { id: 39, image: "/gallery/cultural/39.jpg", caption: "Perfromance" },
  { id: 13, image: "/gallery/cultural/13.png", caption: "Mr. & Ms. 8th Mile" },
  { id: 53, image: "/gallery/cultural/53.JPG", caption: "Open mic" },
  { id: 22, image: "/gallery/cultural/22.png", caption: "Inauguration" },
  { id: 6, image: "/gallery/cultural/6.png", caption: "DJ Night" },
  { id: 74, image: "/gallery/technical/14.JPG", caption: "Hackathon" },
  { id: 40, image: "/gallery/cultural/40.jpg", caption: "Principal" },
  { id: 25, image: "/gallery/cultural/25.png", caption: "Inauguration" },
  { id: 34, image: "/gallery/cultural/34.png", caption: "Concert" },
  { id: 28, image: "/gallery/cultural/28.png", caption: "Clash of Chords" },
  { id: 32, image: "/gallery/cultural/32.png", caption: "Bike Performance" },
  { id: 56, image: "/gallery/cultural/56.jpg", caption: "Amaal Mallik" },
  { id: 29, image: "/gallery/cultural/29.png", caption: "Verve" },
  { id: 58, image: "/gallery/cultural/58.jpg", caption: "Amaal Mallik" },
  { id: 57, image: "/gallery/cultural/57.jpg", caption: "Amaal Mallik" },
  { id: 59, image: "/gallery/cultural/59.jpg", caption: "Amaal Mallik" },
  { id: 60, image: "/gallery/cultural/60.jpg", caption: "Amaal Mallik" },
  { id: 61, image: "/gallery/cultural/61.jpg", caption: "Amaal Mallik" },
  { id: 62, image: "/gallery/cultural/62.jpg", caption: "Amaal Mallik" },
  { id: 63, image: "/gallery/cultural/63.jpg", caption: "Amaal Mallik" },
  { id: 64, image: "/gallery/cultural/64.JPG", caption: "Amaal Mallik" },
 // { id: 21, image: "/gallery/cultural/21.png", caption: "Rangataranga" },
  //{ id: 78, image: "/gallery/cultural/65.png", caption: "DJ Night" },
 // { id: 79, image: "/gallery/cultural/67.png", caption: "Clash of Chords" },
  
];





// Removed duplicate entries that were at the end of the array

export default function GallerySection() {
  return (
    <section className="py-24 px-4 md:py-26 md:px-12 lg:px-24 min-h-screen bg-[#0d0d0d] ">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="py-8 text-3xl md:text-5xl lg:text-6xl font-bold text-[#f9dd9c] drop-shadow-lg">
          Our Vibrant Gallery
        </h2>
      </div>

      {/* Mobile gallery (1 column) */}

      {/* Tablet gallery (2 columns) */}
      <div className="flex lg:hidden gap-4">
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