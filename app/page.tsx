'use client';

import { BlurFade } from '@/components/magicui/blur-fade';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';
import { FaInstagram } from 'react-icons/fa6';

const images = [
  { id: 1, image: "/aman.png", caption: "" },
  { id: 2, image: "/niharika.jpg", caption: "" },
  { id: 3, image: "/amaal.jpeg", caption: "" },
  { id: 4, image: "/Prajakta.jpg", caption: "" }
]

export default function HomePage() {

  return (
    <>
      <div className="w-full hidden md:block">

        <section className="top-0 thick-waves-bg h-screen flex text-4xl font-bold overflow-hidden relative">
          {/* considering the width of the navbar is 84px */}

          <div className='flex justify-center w-full'>
            <div className='flex mt-12 flex-col w-fit'>
              <div className="seasons text-[120px] md:text-[190px] max-[1024px]:text-[150px] text-black">
                ASHTRANG
              </div>
              <div className='w-full'>
                <div className='sora font-extrabold text-black'>4<sup>TH</sup>, 5<sup>TH</sup> & 6<sup>TH</sup><br />DECEMBER, 2025</div>
              </div>
            </div>
          </div>
          <img src="/collage.svg" alt="" className='absolute -bottom-40 flex z-20' />
          <img src="/orange_bg.svg" alt="" className='absolute bottom-0 flex z-10' />
        </section>

        {/* Section 2 */}
        <section className="relative top-0 h-screen squiggly-bg flex items-center justify-center text-4xl font-bold overflow-hidden">

          {/* Yellow Star stays inside this section */}
          <img
            src="/shape_star.svg"
            alt="star"
            className="absolute bottom-0 -right-90"
            style={{ animationDuration: '12s' }}
          />

          {/* RVCE Layer */}
          <img
            src="/college.svg"
            alt=""
            className="w-full z-10"
          />

          <div className="absolute z-20 top-4 left-4 w-1/3 text-right">
            <p className="sora font-extrabold text-black text-[144px]">ABOUT</p>
            <p className="seasons text-black text-[144px] -my-8">RVCE</p>
            <p className="text-base sora text-gray-800 mt-10">
              RV College of Engineering participated in the Rising Bharat Summit 2025,
              which was organised by CNN News18. During an interactive session with
              Hon’ble Prime Minister Shri Narendra Modi, our students presented their
              ideas, receiving a lot of praises.
            </p>
          </div>

        </section>


        {/* Section 3 */}
        <section className="sticky top-0 h-screen w-full squiggly-bg flex items-center justify-between overflow-hidden">

          {/* Background yellow shape */}
          <img
            src="/shape_flow.svg"
            alt="background-shape"
            className="absolute -left-150 scale-150 top-60 h-full w-auto object-cover z-0"
          />
          0
          {/* KK image (big, left aligned) */}
          <img
            src="/kk.svg"
            alt="KK"
            className="scale-75 absolute -left-40 -bottom-150 z-10"
          />

          {/* Right side text */}
          <div className="absolute z-20 top-10 right-12 w-[45%]">
            <p className="sora font-extrabold text-black text-[120px] md:text-[144px] leading-none">
              ABOUT
            </p>

            <p className="seasons text-black text-[120px] md:text-[144px] leading-none mt-4">
              8<sup>TH</sup> MILE
            </p>

            <p className="sora text-gray-800 mt-16 leading-relaxed">
              RV College of Engineering participated in the Rising Bharat Summit 2025,
              which was organised by CNN News18. During an interactive session with
              Hon’ble Prime Minister Shri Narendra Modi, our students presented their
              ideas, receiving appreciation and a personal invitation to share a
              detailed implementation plan. RVCE was represented by a team of three
              students from the B.E. Artificial Intelligence and Machine Learning
              (AIML) Department, guided by Dr. B. Sathish Babu and mentored by
              Dr. K.N. Subramanya, the Principal of RVCE.
            </p>
          </div>
        </section>


        {/* Section 4 */}
        <section className="sticky bg-white top-0 h-screen pink-grid-bg flex items-center justify-center text-4xl font-bold">
          <div className="text-[#fc03a8] text-[150px] seasons top-8 left-8 absolute tracking-tight">
            SOCIALS
          </div>

          {/* Top-right star */}
          <img
            src="/star.svg"
            alt=""
            className="absolute top-0 right-0 scale-50 transform origin-top-right block"
          />

          {/* Bottom-left star */}
          <img
            src="/star.svg"
            alt=""
            className="absolute bottom-0 left-0 scale-50 transform origin-bottom-left block"
          />

          <a href="https://www.instagram.com/8th.mile"><img src="/cards.svg" alt="" className="scale-75 mt-16" /></a>
        </section>


        {/* Section 5 */}
        <section className="sticky top-0 h-screen past-perform-bg">

          {/* RIGHT ALIGNED TEXT BLOCK */}
          <div className="text-right pr-12 pt-12 z-20">
            <div className="text-9xl sora font-extrabold text-white">
              PAST
            </div>
            <div className="text-[150px] seasons leading-none text-white">
              PERFORMERS
            </div>
          </div>

          <div className="hidden lg:flex gap-4 xl:gap-6 mx-16 z-20">
            {[0, 1, 2, 3].map((colIndex) => (
              <div key={colIndex} className="flex flex-col gap-6 flex-1">
                {images
                  .filter((_, idx) => idx % 4 === colIndex)
                  .map((image, idx) => (
                    <BlurFade key={image.id} delay={0.25 + idx * 0.05} inView>
                      <div className="group relative overflow-hidden rounded-lg w-full">
                        <Image
                          className="object-cover rounded-lg w-full border-8 border-white"
                          src={image.image}
                          width={500}
                          height={800}
                          alt={image.caption || `Gallery image ${image.id}`}
                        />

                        {/* Vignette overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

                        {/* Caption */}
                        <div className="sora font-extrabold absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white text-xl opacity-0 group-hover:opacity-100 transition-all duration-500">
                          {image.caption}
                        </div>
                      </div>
                    </BlurFade>
                  ))}
              </div>
            ))}
          </div>
        </section>
        <section className='sticky top-0 h-screen bg-white text-black overflow-hidden'>
          <img src="/spiral.svg" alt="" className='absolute scale-75 -z-10' />
          <div className="flex flex-row justify-between mx-20 pt-12">
            <div>
              <div className='sora text-4xl font-extrabold'>Contact Us</div>
              <div className='text-2xl z-20 justify-start'>
                <a href="mailto:8thmile@rvce.edu.in" className="underline hover:text-blue-600">
                  8thmile@rvce.edu.in
                </a>
              </div>
            </div>
            <div>
              <div className='sora text-4xl font-extrabold'>Discover</div>
              <a href="https://www.instagram.com/8th.mile" className='text-2xl hover:scale-110 transition-all duration-300'>
                <div className='cursor-pointer text-2xl z-20 text-right flex flex-row gap-2 justify-center items-center'>
                  <div>
                    <FaInstagram />
                  </div>
                  <div>8th.mile</div>
                </div>
              </a>
            </div>
          </div>
          <div className='text-[360px] sora font-extrabold z-20 absolute -bottom-35'>8<sup>TH</sup> MILE
          </div>
          <img src="/fade.svg" alt="" className='absolute -bottom-100' />
        </section>
      </div>
      <div className="w-full md:hidden">
        <section className="top-0 thick-waves-bg h-screen flex text-4xl font-bold overflow-hidden relative">
          {/* considering the width of the navbar is 84px */}

          <div className='flex justify-center w-full z-50'>
            <div className='flex mt-36 flex-col w-fit items-center'>
              <div className="sora text-2xl text-black">
                8<sup>TH</sup> MILE
              </div>
              <div className="seasons text-7xl text-black text-shadow-lg">
                ASHTRANG
              </div>
              <div className='sora font-extrabold text-3xl text-black flex flex-col items-center'><div>
                4<sup>TH</sup>, 5<sup>TH</sup> & 6<sup>TH</sup></div><div>
                  DECEMBER, 2025</div></div>
            </div>
          </div>
          <img src="/phone-orange.svg" alt="" className='absolute z-10 bottom-0' />
          <img src="/phone-collage.svg" alt="" className='absolute bottom-0 flex z-20' />
        </section>

        {/* Section 2 */}
        <section className="relative top-0 h-screen squiggly-bg flex items-center justify-center text-4xl overflow-hidden">

          {/* Yellow Star stays inside this section */}
          <img
            src="/shape_star.svg"
            alt="star"
            className="absolute bottom-10 scale-[2.2]"
          />

          {/* RVCE Layer */}
          <img
            src="/college.svg"
            alt=""
            className="absolute w-full z-10 bottom-15 h-1/3 scale-200"
          />

          <div className="absolute z-20 top-4 mx-4 text-left">
            <p className="sora font-extrabold text-black text-[90px] tracking-tight">ABOUT</p>
            <p className="seasons text-black text-[90px] -mt-6">RVCE</p>
            <p className="text-base sora text-gray-800 mt-3 text-left ">
              R V College of Engineering is one of India’s premier institutions, renowned for academic excellence, innovation, and holistic development. With strong achievements in academics, and extracurriculars, RVCE is shaping talented engineers who contribute meaningfully to society.
            </p>
          </div>
        </section>
        {/* Section 3 */}
        <section className="sticky top-0 h-screen w-full squiggly-bg flex items-center justify-between overflow-hidden">
          <div className="absolute z-20 top-4 mx-4 text-right">
            <p className="sora font-extrabold text-black text-[90px] tracking-tight">ABOUT</p>
            <p className="seasons text-black text-[80px] -mt-10">8<sup>TH</sup>MILE</p>
            <p className="text-base sora text-gray-800 mt-3 text-right">
              R V College of Engineering’s 8th Mile is a national techno-cultural festival where students showcase diverse talents while fostering camaraderie and sportsmanship.
            </p>
          </div>
          {/* Background yellow shape */}
          <img
            src="/shape_flow.svg"
            alt="background-shape"
            className="absolute scale-[2.5] -bottom-80 -left-40 h-full w-auto z-0"
          />
          {/* KK image (big, left aligned) */}
          <img
            src="/kk.svg"
            alt="KK"
            className="scale-75 absolute -left-20 -bottom-40 z-10"
          />
        </section>
        {/* Section 4 */}
        <section className="sticky bg-white top-0 h-screen pink-grid-bg flex items-center justify-center text-4xl font-bold">
          <div className="text-[#fc03a8] text-[80px] seasons top-8 mx-auto absolute tracking-tight">
            SOCIALS
          </div>

          {/* bottom-right star */}
          <img
            src="/star.svg"
            alt=""
            className="absolute -bottom-25 -right-45 transform origin-bottom-right block"
          />

          {/* Bottom-left star */}
          <img
            src="/star.svg"
            alt=""
            className="absolute -bottom-25 -left-45 transform origin-bottom-left block"
          />

          <div className='w-screen flex justify-center items-center'>
            <a href="https://www.instagram.com/8thmile.rvce/"><img src="/cards.svg" alt="" className="w-full object-cover hover:scale-110 scale-125 transition-all duration-100" /></a>
          </div>
        </section>


        {/* Section 5 */}
        <section className="sticky top-0 h-screen past-perform-bg">

          {/* RIGHT ALIGNED TEXT BLOCK */}
          <div className="mx-4 pt-12 z-20">
            <div className="text-6xl sora font-extrabold text-white">
              PAST
            </div>
            <div className="text-[60px] seasons leading-none text-white">
              PERFORMERS
            </div>
          </div>
          <div className="flex lg:hidden gap-4 m-4">
            {[0, 1].map((colIndex) => (
              <div key={colIndex} className="flex flex-col gap-4 flex-1">
                {images
                  .filter((_, idx) => idx % 2 === colIndex)
                  .slice(0, 15)
                  .map((image, idx) => (
                    <BlurFade key={image.id} delay={0.2 + idx * 0.05} inView>
                      <div className="group relative overflow-hidden rounded-lg w-full">
                        <Image
                          className="object-cover rounded-lg w-full border-8 border-white"
                          src={image.image}
                          width={500}
                          height={700}
                          alt={image.caption || `Gallery image ${image.id}`}
                        />
                        {/* Vignette overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                        {/* Caption */}
                        <div className="sora absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white text-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {image.caption}
                        </div>
                      </div>
                    </BlurFade>
                  ))}
              </div>
            ))}
          </div>
        </section>
        <section className='sticky top-0 h-screen bg-white text-black overflow-hidden'>
          <img src="/spiral.svg" alt="" className='absolute rotate-270 h-screen scale-200 -z-10' />
          <div className="flex flex-row justify-between mx-auto px-4 pt-12 z-20 w-full">
            <div>
              <div className='sora text-xl font-extrabold z-20 justify-start'>Contact Us</div>
              <div className='text-base z-20 justify-start'>
                <a href="mailto:8thmile@rvce.edu.in" className="underline hover:text-blue-600">
                  8thmile@rvce.edu.in
                </a>
              </div>
            </div>
            <div>
              <div className='sora text-xl font-extrabold z-20 text-right'>Discover</div>
              <a href="https://www.instagram.com/8th.mile">
                <div className='cursor-pointer text-base z-20 text-right flex flex-row gap-2 justify-center items-center'>
                  <div>
                    <FaInstagram />
                  </div>
                  <div>8th.mile</div>
                </div>
              </a>
            </div>
          </div>
          <div className="text-[170px] sora font-extrabold z-20 absolute bottom-0 leading-[0.85]">
            8<sup className="text[120px]">TH</sup>MILE
            <br />MILE 8
          </div>
          <img src="/fade.svg" alt="" className='absolute bottom-0 z-30 opacity-75' />
        </section>
      </div>
    </>
  );
}
