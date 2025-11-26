'use client';

import { BlurFade } from '@/components/magicui/blur-fade';
import { MarqueeDemo } from '@/components/MarqueeDemo';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';
import { FaInstagram } from 'react-icons/fa6';

const images = [
    { id: 1, image: "/aman.png", caption: "Aman Dhattarwal" },
    { id: 2, image: "/niharika.jpg", caption: "Niharika" },
    { id: 3, image: "/amaal.jpeg", caption: "Amaal Mallik" },
    { id: 4, image: "/Prajakta.jpg", caption: "Prajakta Koli" }
]

export default function HomePage() {

    return (
        <>
            <div className="w-full hidden md:block">

                <section className="top-0 thick-waves-bg h-screen flex text-4xl font-bold overflow-hidden relative">
                    {/* considering the width of the navbar is 84px */}

                    <div className='flex justify-center w-full'>
                        <div className='flex mt-12 flex-col w-fit'>
                            <div className="seasons text-[120px] md:text-[190px] max-[1024px]:text-[150px] text-black z-20">
                                ASHTRANG
                            </div>
                            <div className='w-full'>
                                <div className='sora font-extrabold text-black'>4<sup>TH</sup>, 5<sup>TH</sup> & 6<sup>TH</sup><br />DECEMBER, 2025</div>
                            </div>
                        </div>
                    </div>
                    <img src="/collage-new.svg" alt="" className='absolute -bottom-40 flex z-20 w-full' />
                    {/* <img src="/collage.svg" alt="" className='absolute -bottom-40 flex z-20 w-full' /> */}
                    <img src="/orange_bg.svg" alt="" className='absolute bottom-0 flex z-10 w-full' />
                </section>

                {/* Section 2 */}
                <section className="relative top-0 h-screen squiggly-bg flex items-center justify-center text-4xl overflow-hidden">

                    {/* Yellow Star stays inside this section */}
                    <img
                        src="/shape_star.svg"
                        alt="star"
                        className="absolute bottom-10 -right-90"
                    />

                    {/* RVCE Layer */}
                    <img
                        src="/college.svg"
                        alt=""
                        className="w-full z-10"
                    />

                    <div className="absolute z-20 top-4 left-4 w-1/3 text-left">
                        <p className="sora font-extrabold text-black text-[6rem]">ABOUT</p>
                        <p className="seasons text-black text-[6rem] -my-8">RVCE</p>
                        <p className="sora text-gray-800 mt-16 leading-relaxed text-[1rem]">
                            R V College of Engineering is one of India’s premier institutions, renowned for academic excellence, innovation, and holistic development. With strong achievements in academics, and extracurriculars, RVCE is shaping talented engineers who contribute meaningfully to society.
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
                        className="scale-50 absolute -left-80 -bottom-150 z-10"
                    />

                    {/* Right side text */}
                    <div className="absolute z-20 top-10 right-12 text-right w-[45%]">
                        <p className="sora font-extrabold text-black text-[120px] md:text-[6rem] leading-none">
                            ABOUT
                        </p>

                        <p className="seasons text-black text-[120px] md:text-[6rem] leading-none mt-0">
                            8<sup>TH</sup> MILE
                        </p>

                        <p className="sora text-gray-800 mt-16 leading-relaxed text-[1rem]">
                            R V College of Engineering’s 8th Mile is a national techno-cultural festival where students showcase diverse talents while fostering camaraderie and sportsmanship.
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

                    <a href="https://www.instagram.com/8thmile.rvce"><img src="/cards.svg" alt="" className="scale-75 mt-16 hover:scale-[0.8] transition-all duration-200" /></a>
                </section>

                <section className='sticky top-0 h-screen bg-[#25ae80] green-spotted-bg overflow-hidden'>
                    <div className='rounded-full bg-white border-green-900 border-4 w-[100vw] h-[175vh] absolute bottom-[50vh]'></div>
                    <div className='seasons text-black text-[150px] text-center w-screen relative z-50 top-20 font-bold'>SPONSORS</div>
                    <div className='absolute bottom-20'>
                        <MarqueeDemo/>
                    </div>
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
                    <img src="/spiral.svg" alt="" className='absolute scale-75 -z-10 w-full' />

                    <div className="flex flex-row justify-between mx-20 pt-36">
                        <div>
                            <div className='sora text-4xl font-extrabold'>Contact Us</div>
                            <div className='text-2xl'>
                                <a href="mailto:8thmile@rvce.edu.in" className="underline hover:text-blue-600">
                                    8thmile@rvce.edu.in
                                </a>
                            </div>
                        </div>

                        <div>
                            <div className='sora text-4xl font-extrabold'>Discover</div>
                            <a href="https://www.instagram.com/8thmile.rvce" className='text-2xl hover:scale-110 transition-all duration-300'>
                                <div className='cursor-pointer text-2xl flex flex-row gap-2 justify-center items-center'>
                                    <FaInstagram />
                                    <div>8thmile.rvce</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* HERO WORD */}
                    <div
                        className="
      sora font-extrabold absolute bottom-0 left-1/2 -translate-x-1/2
      whitespace-nowrap
      leading-none
      text-[25rem]
      tracking-[-0.04em]
    "
                    >
                        8<sup>TH</sup> MILE
                    </div>

                    <img src="/fade.svg" alt="" className='absolute -bottom-100 w-full' />
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

                <section className='sticky top-0 h-screen'>
                    <MarqueeDemo />
                    jkbef
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
