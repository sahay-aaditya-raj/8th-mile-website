"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import data from "./data.json"

const categories = ['All', 'Cultural', 'Technical', 'Innovative', 'Gaming'];

const EventsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const filteredEvents = data.filter(event => {
        const matchesCategory =
            selectedCategory === 'All' || event.category === selectedCategory;
        const matchesSearch = event.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-black min-h-screen text-white pt-32 px-6">
            {/* Page Heading */}
            <div className="samarkan text-7xl text-[#f9dd9c] text-center mb-6">
                Events
            </div>

            {/* Search Bar */}
            <div className="flex mx-auto justify-center items-center mb-6 sticky top-32 z-50 bg-transparent w-[350px]">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-xl px-4 py-2 rounded-full border border-[#f9dd9c] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f9dd9c] bg-black"
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1 md:gap-4 justify-center mb-10">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`cursor-pointer px-2 py-1 md:px-4 md:py-2 border rounded-2xl md:rounded-full transition hover:scale-105 ${selectedCategory === cat
                                ? 'bg-[#f9dd9c] text-black font-bold'
                                : 'border-[#f9dd9c] text-[#f9dd9c]'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Event Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredEvents.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => router.push(`/events/${event.slug}`)}
                        className="cursor-pointer bg-black rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-sm shadow-[#418b24]"
                    >
                        <div
                            className="relative w-full"
                            style={{ paddingBottom: '125%' /* 4:5 aspect ratio */ }}
                        >
                            <Image
                                src={event.photoPath}
                                alt={event.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <div className="text-base md:text-xl font-bold text-[#f9dd9c]">
                                {event.name}
                            </div>
                            <p className="text-sm text-gray-400">{event.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;