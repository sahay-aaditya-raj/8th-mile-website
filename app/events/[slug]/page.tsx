'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { isRegistrationOpen } from '@/lib/utils';
import { Event } from '@/types';

const EventDetail = () => {
    const params = useParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [registrationStatus, setRegistrationStatus] = useState<{ isOpen: boolean; reason: string | null }>({
        isOpen: false,
        reason: null
    });

    useEffect(() => {
        if (!params.slug) return;

        const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
        const loadEvent = async () => {
            try {
                // Use the new POST API endpoint to get event by slug
                const response = await fetch('/api/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ slug }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch event');
                }

                const eventData = await response.json();
                if (eventData) {
                    // Ensure the event has an id for backwards compatibility
                    eventData.id = eventData._id || eventData.slug;

                    setEvent(eventData);

                    // This checks multiple conditions including registrationOpen
                    const status = isRegistrationOpen(eventData);
                    setRegistrationStatus(status);
                }
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [params]);

    if (loading) return (
        <div className="white-spotted-bg min-h-screen text-white pt-32 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
                <p className="mt-2 text-black">Loading event details...</p>
            </div>
        </div>
    );

    if (!event) return (
        <div className="white-spotted-bg min-h-screen text-white pt-32 flex items-center justify-center">
            <div className="text-center">
                <p className="sora extrabold text-3xl font-bold text-black">Event not found</p>
                <p className="mt-2 text-gray-800">The event you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Link href="/events" className="mt-4 inline-block bg-[#418b24] hover:bg-[#2d6719] text-white py-2 px-4 rounded-lg transition-all duration-100">
                    Back to Events
                </Link>
            </div>
        </div>
    );

    return (
        <div className="white-spotted-bg min-h-screen text-black pt-32 pb-10 px-4 md:px-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
                {/* Left Side: Image & Registration */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <Image
                        src={event.photoPath || '/images/event-placeholder.jpg'}
                        alt={event.name}
                        width={400}
                        height={300}
                        className="w-full max-w-sm rounded-xl object-cover shadow-md"
                    />

                    <div className="sora extrabold mt-6 w-full max-w-md text-center space-y-3">
                        {registrationStatus.isOpen ? (
                            <Link
                                href={`/event-checkout?slug=${event.slug}`}
                                className="block bg-[#418b24] hover:bg-[#2d6719] text-white py-2 px-4 rounded-lg text-lg font-semibold transition-colors"
                            >
                                Register Now
                            </Link>
                        ) : (
                            <>
                                <button
                                    disabled
                                    className="w-full bg-gray-400 text-black cursor-not-allowed py-2 px-4 rounded-lg font-semibold"
                                >
                                    Registration Closed
                                </button>
                                <p className="text-red-400 text-sm">{registrationStatus.reason}</p>
                            </>
                        )}

                        {/* {event.registrationDeadline && (
                            <p className="text-gray-400 text-sm">
                                Deadline: {new Date(event.registrationDeadline).toLocaleDateString()} (
                                {new Date(event.registrationDeadline).toLocaleTimeString()})
                            </p>
                        )} */}
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-1/2 grid grid-cols-1 gap-6">
                    {/* Event Name & Description */}
                    <div className="bg-transparent backdrop-blur-2xl p-4 rounded-lg border border-gray-700">
                        <p className="text-black seasons text-2xl md:text-4xl text-center">{event.name}</p>
                        <p className="mt-2 text-sm text-center">{event.description}</p>
                    </div>

                    <div className="flex flex-col md:flex-row w-full gap-6">
                        {/* Schedule */}
                        <div className="w-full md:w-1/2 bg-transparent backdrop-blur-2xl p-4 rounded-lg border border-gray-700">
                            <p className="sora text-center font-extrabold text-lg mb-2 text-[#25ae80]">Schedule</p>
                            <p className="text-sm text-center md:text-left">Date: {event.date || 'TBA'}</p>
                            {event.time && event.time !== 'X' && <p className="text-sm text-center md:text-left">Time: {event.time}</p>}
                            {event.venue && event.venue !== 'X' && <p className="text-sm text-center md:text-left">Venue: {event.venue}</p>}
                        </div>

                        {/* Prizes */}
                        {event.prizes && event.prizes.length > 0 && (
                            <div className="w-full md:w-1/2 bg-white p-4 rounded-lg border border-[#f6921e] shadow-lg">
                                <p className="text-center sora font-extrabold text-lg mb-2 text-[#f6921e]">Prizes</p>
                                <p className="list-disc list-inside text-sm space-y-1 text-center md:text-left">
                                    {event.prizes.map((prize, index) => (
                                        <p key={index}>{prize}</p>
                                    ))}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Registration Info */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/2 bg-white p-4 border border-gray-700">
                            <p className="text-center font-extrabold sora text-lg mb-2 text-[#fc03a8]">Registration Info</p>
                            <p className="text-sm text-center md:text-left">Amount: <strong>₹{event.registrationFee}</strong> {event.feetype === 'individuals' ? 'per person' : 'per team'}</p>
                            <p className="text-sm mt-1 text-center md:text-left">Team Size: {event.teamsize || '1'}</p>
                        </div>

                        {/* Contacts */}
                        {event.contact && event.contact.length > 0 && (
                            <div className="w-full md:w-1/2 bg-white p-4 rounded-lg border border-gray-700">
                                <p className="text-[#007dc9] text-center font-extrabold sora text-lg mb-2">Contact Details</p>
                                {event.contact.map((contact, index) => (
                                    <div key={index} className="text-sm mt-1 text-center md:text-left">
                                        <strong>{contact.name}</strong> - {contact.phone}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Guidelines */}
                    {event.guidelines && event.guidelines.length > 0 && (
                        <div className="bg-white p-4 rounded-lg border border-gray-700">
                            <p className="font-extrabold sora text-lg mb-2 text-[#be1e2d] text-center">Guidelines</p>
                            <ul className="list-disc list-inside text-sm space-y-1">
                                {event.guidelines.map((g, i) => (
                                    <li key={i}>{g}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EventDetail;
