"use client";

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { allEvents, eventCategories } from '@/data/events';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { isRegistrationOpen } from '@/lib/utils';

const EventsPage = () => {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Update URL when category changes without full page reload
        const newParams = new URLSearchParams(searchParams);
        if (selectedCategory === 'All') {
            newParams.delete('category');
        } else {
            newParams.set('category', selectedCategory);
        }
        router.push(`/events?${newParams.toString()}`, { scroll: false });
    }, [selectedCategory, router, searchParams]);

    const filteredEvents = allEvents.filter(event => {
        const matchesCategory =
            selectedCategory === 'All' || 
            (selectedCategory === 'Hackathon' && (event.id.includes('hack') || event.slug.includes('hack'))) || 
            event.category === selectedCategory;
        
        const matchesSearch = event.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-black min-h-screen text-white pt-32 px-6">
            {/* Page Heading */}
            <motion.div 
                className="samarkan text-7xl text-[#f9dd9c] text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                Events
            </motion.div>

            {/* Search Bar */}
            <div className="flex mx-auto justify-center items-center mb-6 sticky top-32 z-50 bg-transparent w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-full border border-[#f9dd9c] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f9dd9c] bg-black"
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-10">
                {eventCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`cursor-pointer px-3 py-1.5 md:px-4 md:py-2 border rounded-2xl md:rounded-full transition hover:scale-105 ${
                            selectedCategory === cat
                                ? 'bg-[#f9dd9c] text-black font-bold'
                                : 'border-[#f9dd9c] text-[#f9dd9c]'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Highlight for Hackathons when selected */}
            {selectedCategory === 'Hackathon' && (
                <motion.div 
                    className="max-w-4xl mx-auto mb-10 bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 rounded-xl border border-purple-500/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-purple-300 mb-3">Hackathon Events</h2>
                    <p className="text-gray-300">
                        Challenge yourself with our cutting-edge hackathons! Collaborate with talented peers, solve real-world problems,
                        and compete for exciting prizes. Perfect for coders, designers, and innovators alike.
                    </p>
                </motion.div>
            )}

            {/* Event Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredEvents.map((event, index) => {
                    const registrationStatus = isRegistrationOpen(event);
                    const remainingSpots = event.maxParticipants - event.currentRegistrations;
                    const lowSpots = remainingSpots < event.maxParticipants * 0.2;
                    
                    return (
                        <motion.div
                            key={event.id}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            onClick={() => router.push(`/events/${event.slug}`)}
                            className={`cursor-pointer bg-black rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-sm shadow-[#418b24] border border-gray-800 h-full flex flex-col ${!registrationStatus.isOpen ? 'opacity-75' : ''}`}
                        >
                            <div className="relative w-full" style={{ paddingBottom: '65%' }}>
                                <Image
                                    src={event.primaryImage}
                                    alt={event.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 right-2">
                                    <Badge
                                        className={`px-2 py-1 text-xs font-medium ${
                                            event.category === 'Technical' ? 'bg-blue-500' :
                                            event.category === 'Cultural' ? 'bg-pink-500' :
                                            event.category === 'Gaming' ? 'bg-green-500' : 'bg-purple-500'
                                        }`}
                                    >
                                        {event.id.includes('hack') || event.slug.includes('hack') ? 'Hackathon' : event.category}
                                    </Badge>
                                </div>
                                
                                {/* Registration status indicator */}
                                <div className="absolute top-2 left-2">
                                    {registrationStatus.isOpen ? (
                                        <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                                            Registration Open
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full" 
                                              title={registrationStatus.reason || undefined}>
                                            Registration Closed
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-[#f9dd9c] mb-2 line-clamp-1">{event.name}</h3>
                                <p className="text-sm text-gray-300 mb-3 line-clamp-2 flex-grow">{event.description}</p>
                                
                                {/* Show remaining spots warning if low */}
                                {registrationStatus.isOpen && lowSpots && (
                                    <div className="text-xs text-yellow-400 mb-2">
                                        Only {remainingSpots} spot{remainingSpots !== 1 ? 's' : ''} left!
                                    </div>
                                )}
                                
                                <div className="flex justify-between items-center mt-auto">
                                    <span className="text-xs bg-[#418b24]/30 text-[#7ceb50] px-2 py-1 rounded">
                                        {event.registrationFee}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {event.date}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filteredEvents.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-xl">No events found matching your criteria</p>
                    <p className="mt-2">Try changing your search or category filter</p>
                </div>
            )}
        </div>
    );
};

export default EventsPage;