import Image from 'next/image'
import { notFound } from 'next/navigation'

import data from "../data.json"

export async function generateStaticParams() {
    return data.map(event => ({ slug: event.slug }))
}

const EventDetail = ({ params }: { params: { slug: string } }) => {
    const event = data.find(e => e.slug === params.slug)
    if (!event) return notFound()

    return (
        <div className="bg-black text-white min-h-screen px-6 pt-32 font-sans">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-start">
                {/* Left Side: Image */}
                <div className="overflow-hidden shadow-md flex justify-center">
                    <Image
                        src={event.photoPath}
                        alt={event.name}
                        width={500}
                        height={100}
                        className="h-auto object-cover rounded-xl fixed"
                    />
                </div>

                {/* Right Side: Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full auto-rows-auto">

                    {/* Box 1: Event Name */}
                    <div className="col-span-2 bg-black p-4 rounded-lg border border-gray-700">
                        <div className="text-center text-3xl font-bold text-[#f9dd9c]">{event.name}</div>
                        <div className="mt-2  text-sm">{event.description}</div>
                    </div>

                    <div className="bg-black p-4 rounded-lg border border-gray-700 col-span-2">
                        <div className="text-center font-semibold text-lg mb-2 text-white">Guidelines</div>
                        <ul className="list-disc list-inside text-sm  space-y-1">
                            {event.guidelines.map((g, i) => <li key={i}>{g}</li>)}
                        </ul>
                    </div>

                    {/* Box 2: Date, Time, Venue */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="text-center font-semibold text-lg mb-2 text-white">Schedule</div>
                        <p className="text-sm ">Date: {event.date}</p>
                        {
                            event.time!='X' && (<p className="text-sm ">Time: {event.time}</p>)
                        }
                        <p className="text-sm ">Venue: {event.venue}</p>
                    </div>

                    {/* Box 3: Prizes */}
                    <div className="bg-black p-4 rounded-lg border border-[#418b24] shadow-lg">
                        <div className="text-center font-semibold text-lg mb-2 text-[#f9dd9c]">Prizes</div>
                        <ul className="text-sm text-white list-disc list-inside space-y-1">
                            {event.prizes.map((prize, index) => (
                                <li key={index}>{prize}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Box 4: Contact & Registration */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="text-center font-semibold text-lg mb-2 text-white">Registration Fee</div>
                        <p className="text-sm mt-2">Amount: <strong>{event.registrationFee} per person</strong></p>
                        <p className="text-sm mt-2">Team Size: <strong>{event.teamsize} </strong></p>
                        {
                            event.maxParticipants!=0 && (<p className="text-sm text-gray-400 mt-1">Max Participants: {event.maxParticipants}</p>)
                        }
                    </div>

                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className=" text-center font-semibold text-lg mb-2 text-white">Contact Details</div>
                        {
                            event.contact.map((contact, index) => (
                                <div key={index} className="text-sm mt-1">
                                    <strong>{contact.name}</strong> - {contact.phone}
                                </div>
                            ))
                        }
                    </div>
                    <button className='bg-gray-500 col-span-2 py-2 text-xl font-semibold text-white rounded-md'>
                        Coming Soon
                    </button>
                </div>
            </div>
        </div>
    )
}
export default EventDetail
