'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

export default function HomePage() {

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Animate sun
  const sunY = useTransform(scrollYProgress, [0, 0.4], [0, 200]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const raysOpacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 0]);

  // Ashtrang text
  const ashtrangOpacity = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);
  const ashtrangY = useTransform(scrollYProgress, [0.35, 0.55], [40, 0]);

  // Elements disappear on 3rd screen
  const elementsOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const elementsY = useTransform(scrollYProgress, [0.7, 1], [0, -300]);

  return (
    <>
      <div ref={ref} className="md:hidden hidden lg:flex bg-black text-white relative overflow-x-hidden">
        {/* elements.svg as background */}
        <div>
          <motion.div
            className="fixed -top-32 inset-0 z-15"
            style={{ opacity: elementsOpacity, y: elementsY }}
          >
            <Image src="/elements.svg" alt="bg" layout="fill" objectFit="cover" />
          </motion.div>

          {/* sun.svg centered */}
          <motion.div
            style={{ y: sunY, opacity: sunOpacity }}
            className="fixed top-2/3 left-[825px] z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <Image src="/sun.svg" alt="sun" width={500} height={500} />
          </motion.div>
          <motion.div
            style={{ opacity: raysOpacity }}
            className="fixed top-0 left-0 w-screen z-5 pointer-events-none"
          >
            <Image src="/rays.svg" alt="sun" width={1000} height={500} className='w-full' />
          </motion.div>

          <motion.div
            className="fixed top-[375px] left-[550px] z-20"
            style={{ opacity: elementsOpacity, y: elementsY }}
          >
            <Image src="/birds.svg" alt="plane" width={200} height={200} />
          </motion.div>
          <motion.div
            className="fixed top-[325px] left-[850px] z-20"
            style={{ opacity: elementsOpacity, y: elementsY }}
          >
            <Image src="/plane.svg" alt="plane" width={300} height={200} />
          </motion.div>


          {/* First screen - 8th Mile */}
          <section className="h-screen relative z-0 p-10">
            <h1 className="pl-16 z-0 text-[150px] font-bold font-sans pt-16 delagothic">8<sup>th</sup> MILE</h1>
            <p className='delagothic font-bold pl-[370px] -mt-8 tracking-wider text-2xl'>TECHNO-CULTURAL FESTIVAL</p>
          </section>

          {/* Second screen - Ashtrang reveal */}
          <section className="min-h-screen py-36 z-10 relative flex flex-col justify-center items-center">
            {/* <motion.div
          className="text-[150px] text-[#f9dd9c] font-semibold samarkan px-4"
          style={{ opacity: ashtrangOpacity, y: ashtrangY }}
        >
          Ashtrang{' '}
        </motion.div>
        <motion.div className="text-xl text-[#f9dd9c] poppins tracking-widest"
          style={{ opacity: ashtrangOpacity, y: ashtrangY }}>
          ROOTS OF CULTURE | WINGS OF TECHNOLOGY
        </motion.div> */}
            <motion.div style={{ opacity: ashtrangOpacity, y: ashtrangY }}>
              <Image src={'/ashtrang.svg'} alt='ashtrang' width={800} height={200} />
            </motion.div>
          </section>

          {/* Third screen - Hide all elements and show welcome */}
          <section className="min-h-screen mt-56 flex flex-col items-center justify-center z-10 relative">
            <div className="flex flex-col px-24">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0 }}
                className="font-sans font-bold text-[#f9dd9c] text-4xl md:text-6xl w-fit mb-4">About RVCE</motion.div>
              <div className="flex flex-col md:flex-row gap-4">
                <motion.div initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0 }} className="fraunces text-sm md:text-2xl md:w-3/5">
                  Rashtreeya Vidyalaya College of Engineering was founded by Late Sri M.C. Shivananda Sharma in 1963. His mission was to Impart Quality Education to all sections of the society. This institution has been set up with the purpose of producing future leaders, innovators, and torchbearers of technology. <br /><br /> As the college completes more than 60 glorious years, it has grown into a place where excellence in instruction and all-around development from the cornerstones of education is imparted to the students. <br /><br />
                  One of the forefronts of quality education in the country, this institution has upheld its standard by training students as well as providing opportunities to those who seek to advance in the fields of science, technology, culture, and sports. It is justified to say that RVCE is a movement that has been in unhindered progress for more than half a century.
                </motion.div>
                <motion.div initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0 }} className="md:w-2/5 flex justify-center items-center">
                  <Image src={'/rvce.png'} alt="rvce college pic" width={500} height={200} className="rounded-xl" />
                </motion.div>
              </div>
            </div>
            <div className="flex flex-col px-24 py-10">
              <div className="flex justify-end w-full">
                <motion.div initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0 }} className="font-sans font-bold text-[#f9dd9c] text-4xl md:text-6xl w-fit mb-4">
                  About 8<sup>th</sup> Mile
                </motion.div>
              </div>
              <div className="flex md:flex-row flex-col gap-4">
                <motion.div initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0 }} className="hidden md:flex w-2/5 justify-center items-center">
                  <Image src={'/amaal.png'} alt="rvce college pic" width={500} height={200} className="rounded-xl" />
                </motion.div>
                <motion.div initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0 }} className="fraunces text-sm md:text-2xl md:w-3/5">
                  The illustrious R V College of Engineering in Bangalore, India, hosts the 8th Mile techno-cultural festival, showcasing the talents of students from across the country, and fostering camaraderie and excellence. This event serves as a platform for students from various educational institutions nationwide to showcase their exceptional talents in technical and non-technical domains. However, the festival&apos;s overarching objective is to promote a sense of camaraderie and sportsmanship among all its participants, inculcating in them a spirit of healthy competition and mutual respect.<br /><br /> R V College of Engineering has a distinguished legacy of excellence in all spheres of academics, athletics, and extracurricular activities. The college has always set the bar high and led the way, leaving an indelible mark on the country&apos;s academic landscape. The 8th Mile festival, which is a true reflection of the college&apos;s diverse and rich culture, serves as a beacon of hope and inspiration for the younger generation of students who aspire to emulate the college&apos;s success story.
                </motion.div>
                <motion.div initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0 }}
                  className="md:hidden flex justify-center items-center">
                  <Image src={'/amaal.png'} alt="rvce college pic" width={500} height={200} className="rounded-xl" />
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="min-h-screen bg-black text-white lg:hidden relative overflow-x-hidden">
        {/* Fixed Background Waves */}
        <Image
          src="/waves.svg"
          width={480}
          height={1080}
          alt="background waves"
          className="fixed top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Concentric Images */}
        <div className="relative w-full h-screen flex items-center justify-center z-10">
          <div className="relative w-[400px] h-[400px]">
            {/* Green Ring */}
            <div className="absolute inset-0 mx-auto my-auto z-10 w-[320px] h-[320px]">
              <Image
                src="/green.svg"
                alt="green ring"
                fill
                className="object-contain animate-[spin_30s_linear_infinite_reverse]"
              />
            </div>

            {/* Human Layer */}
            <div className="absolute inset-0 z-20 w-[400px] h-[400px]">
              <Image
                src="/human.svg"
                alt="human"
                fill
                className="object-contain"
                style={{ transform: 'translateX(-15px) translateY(-15px)' }}
              />
            </div>

            {/* Orange Ring */}
            <div className="absolute inset-0 mx-auto my-auto z-30 w-[275px] h-[275px]">
              <Image
                src="/orange.svg"
                alt="orange ring"
                fill
                className="object-contain translate-x-[0px] translate-y-[0px] animate-[spin_30s_linear_infinite]"
              />
            </div>

            <div className="absolute inset-0 mx-auto my-auto z-30 w-[240px] h-[240px]">
              <Image
                src="/centre.svg"
                alt="orange ring"
                fill
                className="object-contain"
                style={{ transform: 'translateX(1px) translateY(0px)' }}
              />
            </div>


          </div>
        </div>
      </div>


    </>
  );
}
