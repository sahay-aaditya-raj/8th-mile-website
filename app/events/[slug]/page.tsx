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

    // Determine which contact to show (now handling array properly)
    const contactPerson = event.contact && event.contact.length > 0 ? event.contact[0] : null;

    return (
        <div className="bg-black min-h-screen text-white pt-32 pb-10 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
                {/* Left Side: Image */}
                <div className="rounded-xl overflow-hidden border border-gray-700 shadow-md">
                    {event.primaryImage ? (
                        <Image
                            src={event.primaryImage}
                            alt={event.name}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    ) : (
                        <div className="w-full h-80 bg-gray-800 flex items-center justify-center">
                            <p className="text-gray-400">No image available</p>
                        </div>
                    )}
                </div>

                {/* Right Side: Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full auto-rows-auto">

                    {/* Box 1: Event Name */}
                    <div className="col-span-2 bg-black p-4 rounded-lg border border-gray-700">
                        <div className="text-center text-3xl font-bold text-yellow-300">{event.name}</div>
                        <div className="mt-2 text-gray-300 text-sm">{event.description}</div>
                    </div>

                    <div className="bg-black p-4 rounded-lg border border-gray-700 col-span-2">
                        <div className="text-center font-semibold text-lg mb-2 text-white">Guidelines</div>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                            {event.guidelines.map((g, i) => <li key={i}>{g}</li>)}
                        </ul>
                    </div>

                    {/* Box 2: Date, Time, Venue */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="font-semibold text-lg mb-2 text-white">Schedule</div>
                        <p className="text-sm text-gray-300">📅 {event.date}</p>
                        <p className="text-sm text-gray-300">⏰ {event.time}</p>
                        <p className="text-sm text-gray-300">📍 {event.venue}</p>
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
                        <p className="text-sm text-gray-300 mt-2"><strong>{event.registrationFee}</strong></p>
                        <p className="text-sm text-gray-400 mt-1">Team Size: {event.teamSize}</p>
                    </div>

                    {/* Box 5: Contact Details */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="text-center font-semibold text-lg mb-2 text-white">Contact Details</div>
                        {contactPerson ? (
                            <>
                                <p className="text-sm text-gray-300">👤 {contactPerson.name}</p>
                                <p className="text-sm text-gray-300">📞 {contactPerson.phone}</p>
                            </>
                        ) : (
                            <p className="text-sm text-gray-400">No contact information available</p>
                        )}
                    </div>

                </div>
            </div>

            {/* Gallery Images */}
            {event.galleryImages && event.galleryImages.length > 0 && (
                <div className="mt-8 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-white">Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {event.galleryImages.map((img, index) => (
                            <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                                <Image
                                    src={img}
                                    alt={`${event.name} gallery image ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Registration Button Area */}
            <div className="mt-8 max-w-5xl mx-auto">
                <div className="flex flex-col items-center space-y-4">
                    {registrationStatus.isOpen ? (
                        <Link 
                            href={`/event-registration?eventId=${event.id}`}
                            className="bg-[#418b24] hover:bg-[#2d6719] text-white py-3 px-8 rounded-lg text-xl font-semibold transition-colors"
                        >
                            Register Now
                        </Link>
                    ) : (
                        <>
                            <button 
                                disabled
                                className="bg-gray-700 text-gray-300 cursor-not-allowed py-3 px-8 rounded-lg text-xl font-semibold"
                            >
                                Registration Closed
                            </button>
                            <p className="text-red-400">{registrationStatus.reason}</p>
                        </>
                    )}
                    
                    {/* Show remaining spots if registration is open */}
                    {registrationStatus.isOpen && (
                        <p className="text-yellow-300">
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
    );
};

export default EventDetail;