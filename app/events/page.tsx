"use client";

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { eventCategories } from '@/data/events'; // Keep importing categories
import { motion } from 'framer-motion';

// Define interface based on Event model
interface Contact {
    name: string;
    phone: string;
}

interface Event {
    _id: string;
    photoPath?: string;
    slug: string;
    name: string;
    description?: string;
    date?: string;
    time?: string;
    venue?: string;
    category?: 'Cultural' | 'Technical' | 'Gaming';
    prizes?: string[];
    teamsize?: string;
    registrationFee: number;
    feetype: 'individuals' | 'team';
    guidelines?: string[];
    contact?: Contact[];
    registrationDeadline?: string;
    registrationOpen: boolean;
    currentRegistrations?: number;
    maxParticipants?: number;
    id?: string; // For backward compatibility
}

const EventsPage = () => {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchEventsFromAPI = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/events');

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const data = await response.json();

                // Ensure each event has an id property (for backward compatibility)
                const eventsWithIds = data.map((event: Event) => ({
                    ...event,
                    id: event._id || event.slug, // Use _id or slug as id if needed for existing code
                    currentRegistrations: event.currentRegistrations || 0,
                    maxParticipants: event.maxParticipants || 100
                }));

                setEvents(eventsWithIds);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventsFromAPI();
    }, []);

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

    const filteredEvents = events.filter(event => {
        const matchesCategory =
            selectedCategory === 'All' ||
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
        <div className="squiggly-bg min-h-screen text-white py-32 px-6">
            {/* Page Heading */}
            <motion.div
                className="seasons text-7xl text-black text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                Events
            </motion.div>


            {/* Search Bar */}
            <div className="flex mx-auto justify-center items-center mb-6 bg-transparent w-full max-w-md hidden">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-full border border-[#f9dd9c] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f9dd9c] bg-black"
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-10 hidden">
                {eventCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`cursor-pointer px-3 py-1.5 md:px-4 md:py-2 border rounded-2xl md:rounded-full transition hover:scale-105 ${selectedCategory === cat
                            ? 'bg-[#f9dd9c] text-black font-bold'
                            : 'border-[#f9dd9c] text-[#f9dd9c]'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            {/* Loading state */}
            {loading && (
                <div className="text-center py-10">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
                    <p className="mt-2 text-black">Loading events...</p>
                </div>
            )}

            {/* Event Cards grouped by category */}
            {Object.entries(
                filteredEvents.reduce((acc: Record<string, Event[]>, event) => {
                    const cat = event.category || 'Other';
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(event);
                    return acc;
                }, {})
            ).map(([category, events]) => (
                <div key={category} className="mb-12">
                    {/* Category Heading */}
                    <h2 className="text-3xl sora font-extrabold text-gray-800 mb-6 text-center">
                        {category}
                    </h2>

                    {/* Event Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-6 md:gap-8">
                        {events.map((event, index) => (
                            <motion.div
                                key={event.id || event._id || event.slug}
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                onClick={() => router.push(`/events/${event.slug}`)}
                                className="group cursor-pointer aspect-[4/5] w-full perspective"
                            >
                                <div className="relative h-full w-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">

                                    {/* FRONT – IMAGE */}
                                    <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden">
                                        <Image
                                            src={event.photoPath || '/images/event-placeholder.jpg'}
                                            alt={event.name}
                                            fill
                                            className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* BACK – CONTENT */}
                                    <div className="absolute inset-0 bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden shadow-md">
                                        <p className="sora text-xl font-bold text-black mb-2">{event.name}</p>
                                        <p className="text-sm text-gray-700 line-clamp-4">{event.description}</p>
                                    </div>

                                    {/* CLOSED REGISTRATION OVERLAY */}
                                    {/* {!event.registrationOpen && (
                                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white text-lg font-bold rounded-xl z-20">
                                            Registrations Opening Soon
                                        </div>
                                    )} */}
                                </div>
                            </motion.div>

                        ))}
                    </div>
                </div>
            ))}


            {filteredEvents.length === 0 && !loading && (
                <div className="text-center py-20 text-gray-800">
                    <p className="text-xl">No events found matching your criteria</p>
                    <p className="mt-2">Try changing your search or category filter</p>
                </div>
            )}
        </div>
    );
};

export default EventsPage;