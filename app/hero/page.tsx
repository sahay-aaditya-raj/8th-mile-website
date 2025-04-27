"use client";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import Image from "next/image";
import logo from "../../public/8thmilelogocolour.png";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function ThreeDMarqueeDemo() {
    const images = [
        "/homepageimages/1.png",
        "/homepageimages/2.png",
        "/homepageimages/3.png",
        "/homepageimages/4.png",
        "/homepageimages/5.png",
        "/homepageimages/6.png",
        "/homepageimages/7.png",
        "/homepageimages/8.png",
        "/homepageimages/9.png",
        "/homepageimages/10.png",
        "/homepageimages/11.png",
        "/homepageimages/12.png",
        "/homepageimages/13.png",
        "/homepageimages/14.png",
        "/homepageimages/14.png",
        "/homepageimages/13.png",
        "/homepageimages/12.png",
        "/homepageimages/11.png",
        "/homepageimages/10.png",
        "/homepageimages/9.png",
        "/homepageimages/8.png",
        "/homepageimages/7.png",
        "/homepageimages/6.png",
        "/homepageimages/5.png",
        "/homepageimages/4.png",
        "/homepageimages/3.png",
        "/homepageimages/2.png",
        "/homepageimages/1.png",
        "/homepageimages/14.png",
        "/homepageimages/13.png",
        "/homepageimages/12.png",
        "/homepageimages/11.png",
        "/homepageimages/10.png",
        "/homepageimages/9.png",
        "/homepageimages/8.png",
        "/homepageimages/7.png",
        "/homepageimages/6.png",
        "/homepageimages/5.png",
        "/homepageimages/4.png",


    ];
    return (
        <div className="mx-auto bg-black">
            
            <div className="relative z-10 flex flex-col justify-center items-center h-screen w-full">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-7xl md:text-[220px] font-bold flex flex-row items-end"
                >
                    <Image src={logo} alt="logo" width={300} height={600} className="hidden md:flex" />
                    <Image src={logo} alt="logo" width={200} height={400} className="md:hidden" />
                </motion.div>
                <motion.div initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }} className="samarkan text-7xl md:text-9xl">Ashtrang</motion.div>
                <TextGenerateEffect className="fraunces" duration={2} filter={false} words={"Roots of Culture | Wings of Technology"} />

                <motion.p initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-6xl text-xl md:text-4xl mt-8 font-sans text-center fraunces text-white">
                    Are you ready to be a part of <br /><span className="font-semibold text-[#e90c00] fraunces">Bengaluru&apos;s </span> biggest <span className="font-semibold fraunces text-[#418b24]">techno-cultural extravaganza</span>
                </motion.p>
            </div>
            <div className="relative z-10 bg-black py-6 md:py-24 px-6 md:px-24">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0 }}
                    className="font-sans font-bold text-[#418b24] text-4xl md:text-6xl border-b-2 w-fit border-[#e90c00] mb-4">About RVCE</motion.div>
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
            <div className="relative z-10 bg-black px-6 py-6 md:py-24 md:px-24">
                <div className="flex justify-end w-full">
                    <motion.div initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0 }} className="font-sans font-bold text-[#418b24] text-4xl md:text-6xl border-b-2 w-fit border-[#e90c00] mb-4">
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
        </div>
    );
}
