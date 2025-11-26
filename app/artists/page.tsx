"use client";

import React from "react";
import { motion } from "framer-motion";

// ARTIST DATA WITH INSTAGRAM
const artists = [
    {
        name: "Raj B Shetty",
        dates: "4th December 2025",
        photo: "/artists/rajbshetty.jpg",
        instagram: "https://instagram.com/rajbshetty", // replace
        description:
            "A high–energy EDM artist known for electrifying drops and unforgettable stage presence.",
    },
    {
        name: "Nikhil D Souza",
        dates: "6th December 2025",
        photo: "/artists/nikhildsouza.jpg",
        instagram: "https://instagram.com/aaravmehta", // replace
        description:
            "A soulful indie-pop singer whose voice blends emotion and melody into a perfect harmony.",
    },
    {
        name: "MC Riva",
        dates: "7th–8th March 2025",
        photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=compress",
        instagram: "https://instagram.com/mcriva", // replace
        description:
            "A dynamic hip-hop artist known for powerful verses and unmatched crowd energy.",
    },
    {
        name: "The Mirage Band",
        dates: "8th March 2025",
        photo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=compress",
        instagram: "https://instagram.com/mirageband", // replace
        description:
            "A fusion band blending rock, jazz, and folk to create magical soundscapes.",
    },
];

export default function ArtistRevealPage() {
    return (
        <div className="min-h-screen thick-waves-bg px-6 py-16 text-black font-sora">
            {/* HEADER */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-8xl seasons text-center mb-20 text-slate-950"
            >
                Artists Timeline
            </motion.h1>

            <div className="relative max-w-6xl mx-auto">
                {/* Center timeline line */}
                <div className="absolute inset-0 flex justify-center">
                    <div className="w-1 bg-slate-700 rounded-full"></div>
                </div>

                <div className="space-y-24 relative z-10">
                    {artists.map((artist, idx) => {
                        const isLeft = idx % 2 === 0;

                        return (
                            <div key={idx} className="relative flex">
                                {/* LEFT SIDE */}
                                <div className="w-1/2 flex justify-end pr-10">
                                    {isLeft ? (
                                        <motion.div
                                            initial={{ opacity: 0, x: -40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5 }}
                                            className="bg-white p-6 rounded-3xl shadow-xl max-w-md"
                                        >
                                            <h2 className="text-3xl sora font-extrabold text-slate-800 mb-2">{artist.name}</h2>
                                            <p className="text-sm font-semibold text-gray-600 mb-3">{artist.dates}</p>
                                            <p className="text-gray-700 mb-4">{artist.description}</p>

                                            <a href="/passes">
                                                <button className="mt-2 px-4 py-2 bg-slate-600 text-white rounded-full shadow hover:bg-slate-800 transition cursor-pointer hover:scale-110 transition-all duration-300">
                                                    Get Passes
                                                </button>
                                            </a>
                                        </motion.div>
                                    ) : (
                                        <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
                                            <motion.img
                                                initial={{ opacity: 0, x: -40 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5 }}
                                                src={artist.photo}
                                                alt={artist.name}
                                                className="rounded-3xl shadow-xl w-80 h-64 object-cover cursor-pointer hover:scale-110 transition-all duration-300"
                                            />
                                        </a>
                                    )}
                                </div>

                                {/* Timeline dot */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-10 bg-white h-6 w-6 rounded-full border-4 border-slate-700 shadow-xl"></div>

                                {/* RIGHT SIDE */}
                                <div className="w-1/2 flex justify-start pl-10">
                                    {!isLeft ? (
                                        <motion.div
                                            initial={{ opacity: 0, x: 40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5 }}
                                            className="bg-white p-6 rounded-3xl shadow-xl max-w-md"
                                        >
                                            <h2 className="text-3xl sora font-extrabold text-slate-800 mb-2">{artist.name}</h2>
                                            <p className="text-sm font-semibold text-gray-600 mb-3">{artist.dates}</p>
                                            <p className="text-gray-700 mb-4">{artist.description}</p>

                                            <a href="/passes">
                                                <button className="mt-2 px-4 py-2 bg-slate-600 text-white rounded-full shadow hover:bg-slate-800 transition cursor-pointer hover:scale-110 transition-all duration-300">
                                                    Get Passes
                                                </button>
                                            </a>
                                        </motion.div>
                                    ) : (
                                        <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
                                            <motion.img
                                                initial={{ opacity: 0, x: 40 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5 }}
                                                src={artist.photo}
                                                alt={artist.name}
                                                className="rounded-3xl shadow-xl w-80 h-64 object-cover cursor-pointer hover:scale-110 transition-all duration-300"
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}