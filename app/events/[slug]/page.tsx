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
        const eventData = getEventBySlug(slug);

        if (eventData) {
            setEvent(eventData);
            setRegistrationStatus(isRegistrationOpen(eventData));
        }

        setLoading(false);
    }, [params]);

    if (loading) return <div className="text-white text-center py-20">Loading...</div>;
    if (!event) return <div className="text-white text-center py-20">Event not found</div>;

    return (
        <div className="bg-black min-h-screen text-white pt-32 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 items-start">
                {/* Left Side: Image */}
                <div className="overflow-hidden shadow-md flex items-center justify-center flex-col ml-[100px] fixed">
                    <Image
                        src={event.photoPath}
                        alt={event.name}
                        width={440}
                        height={400}
                        className="h-auto object-cover rounded-xl"
                    />
                    <div className="mt-4 max-w-5xl mx-auto">
                <div className="flex flex-col items-center space-y-2">
                    {registrationStatus.isOpen ? (
                        <Link
                            href={`/event-registration?eventId=${event.id}`}
                            className="bg-[#418b24] hover:bg-[#2d6719] text-white py-1 px-2 rounded-lg text-xl font-semibold transition-colors"
                        >
                            Register Now
                        </Link>
                    ) : (
                        <>
                            <button
                                disabled
                                className="bg-gray-700 text-white cursor-not-allowed py-2 px-4 rounded-lg font-semibold"
                            >
                                Registration Closed
                            </button>
                            <p className="text-red-400">{registrationStatus.reason}</p>
                        </>
                    )}

                    {/* Show remaining spots if registration is open */}
                    {registrationStatus.isOpen && (
                        <p className="text-yellow-300 text-sm">
                            {event.maxParticipants - event.currentRegistrations} spots remaining out of {event.maxParticipants}
                        </p>
                    )}

                    <p className="text-gray-400 text-sm">
                        Registration deadline: {new Date(event.registrationDeadline).toLocaleDateString()}
                        ({new Date(event.registrationDeadline).toLocaleTimeString()})
                    </p>
                </div>
            </div>
                </div>

                {/* Right Side: Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full auto-rows-auto ml-[650px]">

                    {/* Box 1: Event Name */}
                    <div className="col-span-2 bg-black p-4 rounded-lg border border-gray-700">
                        <div className="text-center text-3xl font-bold text-yellow-300">{event.name}</div>
                        <div className="mt-2 text-white text-sm">{event.description}</div>
                    </div>

                    <div className="bg-black p-4 rounded-lg border border-gray-700 col-span-2">
                        <div className="text-center font-semibold text-lg mb-2 text-white">Guidelines</div>
                        <ul className="list-disc list-inside text-sm text-white space-y-1">
                            {event.guidelines.map((g, i) => <li key={i}>{g}</li>)}
                        </ul>
                    </div>

                    {/* Box 2: Date, Time, Venue */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="font-semibold text-lg mb-2 text-white">Schedule</div>
                        <p className="text-sm text-white">Date: {event.date}</p>
                        {
                            event.time!="X" && (
                                <p className="text-sm text-white">Time: {event.time}</p>
                            )
                        }
                        {
                            event.venue!="X" && (
                                <p className="text-sm text-white">Venue: {event.venue}</p>
                            )
                        }
                    </div>

                    {/* Box 3: Prizes */}
                    <div className="bg-black p-4 rounded-lg border border-yellow-600 shadow-lg">
                        <div className="font-semibold text-lg mb-2 text-yellow-400">🏆 Prizes</div>
                        <ul className="text-sm text-white list-disc list-inside space-y-1">
                            {event.prizes.map((prize, index) => (
                                <li key={index}>{prize}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Box 4: Registration Info */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="text-center font-semibold text-lg mb-2 text-white">Registration Fee</div>
                        <p className="text-sm text-white mt-2">Amount: <strong>{event.registrationFee}</strong></p>
                        <p className="text-sm text-white mt-1">Team Size: {event.teamsize}</p>
                    </div>

                    {/* Box 5: Contact Details */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="text-center font-semibold text-lg mb-2 text-white">Contact Details</div>
                        {
                            event.contact.map((contact, index) => (
                                <div key={index} className="text-sm text-white mt-1">
                                    <p><strong>{contact.name}</strong> - {contact.phone}</p>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default EventDetail;