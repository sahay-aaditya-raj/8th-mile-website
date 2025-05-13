'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getEventBySlug } from '@/data/events';
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
            const eventData = await getEventBySlug(slug);
            if (eventData) {
                setEvent(eventData);
                setRegistrationStatus(isRegistrationOpen(eventData));
            }
            setLoading(false);
        };
        loadEvent();
    }, [params]);

    if (loading) return <div className="text-white text-center py-20">Loading...</div>;
    if (!event) return <div className="text-white text-center py-20">Event not found</div>;

    return (
        <div className="bg-black min-h-screen text-white pt-32 pb-10 px-4 md:px-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
                {/* Left Side: Image & Registration */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <Image
                        src={event.photoPath}
                        alt={event.name}
                        width={400}
                        height={300}
                        className="w-full max-w-sm rounded-xl object-cover shadow-md"
                    />

                    <div className="mt-6 w-full max-w-md text-center space-y-3">
                        {registrationStatus.isOpen ? (
                            <Link
                                href={`/event-registration?eventId=${event.id}`}
                                className="block bg-[#418b24] hover:bg-[#2d6719] text-white py-2 px-4 rounded-lg text-lg font-semibold transition-colors"
                            >
                                Register Now
                            </Link>
                        ) : (
                            <>
                                <button
                                    disabled
                                    className="w-full bg-gray-700 text-white cursor-not-allowed py-2 px-4 rounded-lg font-semibold"
                                >
                                    Registration Closed
                                </button>
                                <p className="text-red-400 text-sm">{registrationStatus.reason}</p>
                            </>
                        )}

                        {registrationStatus.isOpen && (
                            <p className="text-yellow-300 text-sm">
                                {event.maxParticipants - event.currentRegistrations} spots remaining out of {event.maxParticipants}
                            </p>
                        )}

                        <p className="text-gray-400 text-sm">
                            Deadline: {new Date(event.registrationDeadline).toLocaleDateString()} (
                            {new Date(event.registrationDeadline).toLocaleTimeString()})
                        </p>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-1/2 grid grid-cols-1 gap-6">
                    {/* Event Name & Description */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <h2 className="text-yellow-300 text-2xl md:text-3xl font-bold text-center">{event.name}</h2>
                        <p className="mt-2 text-sm">{event.description}</p>
                    </div>

                    {/* Guidelines */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <h3 className="font-semibold text-lg mb-2 text-white text-center">Guidelines</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {event.guidelines.map((g, i) => (
                                <li key={i}>{g}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Schedule */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <h3 className="font-semibold text-lg mb-2">Schedule</h3>
                        <p className="text-sm">Date: {event.date}</p>
                        {event.time !== 'X' && <p className="text-sm">Time: {event.time}</p>}
                        {event.venue !== 'X' && <p className="text-sm">Venue: {event.venue}</p>}
                    </div>

                    {/* Prizes */}
                    <div className="bg-black p-4 rounded-lg border border-yellow-600 shadow-lg">
                        <h3 className="font-semibold text-lg mb-2 text-yellow-400">🏆 Prizes</h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {event.prizes.map((prize, index) => (
                                <li key={index}>{prize}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Registration Info */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <h3 className="text-center font-semibold text-lg mb-2">Registration Info</h3>
                        <p className="text-sm">Amount: <strong>{event.registrationFee}</strong></p>
                        <p className="text-sm mt-1">Team Size: {event.teamsize}</p>
                    </div>

                    {/* Contacts */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <h3 className="text-center font-semibold text-lg mb-2">Contact Details</h3>
                        {event.contact.map((contact, index) => (
                            <div key={index} className="text-sm mt-1">
                                <strong>{contact.name}</strong> - {contact.phone}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
