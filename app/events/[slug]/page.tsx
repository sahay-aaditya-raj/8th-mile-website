import Image from 'next/image'
import { notFound } from 'next/navigation'

const data = [
    {
        id: 1,
        photoPath: '/events/mrmrs8thmile.png',
        slug: 'mrmrs8thmile',
        name: 'Mr & Ms 8th Mile',
        description: 'A beauty pageant that celebrates talent, charisma, and confidence.',
        date: '29th May, 2025',
        time: '6:00 PM - 9:00 PM',
        venue: 'Auditorium',
        registrationFee: '₹100',
        prizes: ['Winner: ₹5000', 'Runner-Up: ₹3000'],
        contact: { name: 'Riya Sharma', phone: '9876543210' },
        maxParticipants: 50,
        guidelines: [
            'Participants must be students of 8th Mile College.',
            'Each participant will go through a preliminary round.',
            'Final round includes a Q&A and a talent showcase.',
            'Judging criteria: confidence, talent, presentation.',
            'Winners will be crowned Mr. and Ms. 8th Mile.'
        ],
        category: 'Cultural',
    },
    {
        id: 2,
        photoPath: '/events/hackathon.png',
        name: 'CodeStorm Hackathon',
        slug: 'sample',
        description: 'An overnight hackathon to build innovative tech solutions to real-world problems.',
        date: '30th May, 2025',
        time: '9:00 AM - 9:00 PM',
        venue: 'Tech Hall',
        registrationFee: '₹200/team',
        prizes: ['1st: ₹10000', '2nd: ₹5000', 'Best Innovation: ₹3000'],
        contact: { name: 'Aarav Mehta', phone: '9876509876' },
        maxParticipants: 25,
        guidelines: [
            'Teams of 2-4 participants allowed.',
            'Any tech stack can be used.',
            'Themes will be disclosed 1 day prior.',
            'Bring your own laptops and extension cords.',
            'Judging based on innovation, execution, and presentation.'
        ],
        category: 'Technical',
    },
    {
        id: 3,
        photoPath: '/events/fashionshow.png',
        name: 'Rampage - Fashion Show',
        slug: 'sample',
        description: 'Walk the ramp and set the stage on fire with your style and attitude.',
        date: '28th May, 2025',
        time: '7:00 PM - 9:00 PM',
        venue: 'Open Stage',
        registrationFee: '₹150',
        prizes: ['Best Model: ₹3000', 'Best Group: ₹5000'],
        contact: { name: 'Neha Kapoor', phone: '9876549876' },
        maxParticipants: 30,
        guidelines: [
            'Open to individual and group performances.',
            'Use of props and background music allowed.',
            'Time limit: 5 minutes per performance.',
            'Outfit must be appropriate and respectful.',
        ],
        category: 'Cultural',
    },
    {
        id: 4,
        photoPath: '/events/mockauction.png',
        name: 'Mock IPL Auction',
        slug: 'sample',
        description: 'Showcase your strategy and cricket knowledge in this thrilling auction game.',
        date: '27th May, 2025',
        time: '3:00 PM - 6:00 PM',
        venue: 'Room 204, B-Block',
        registrationFee: '₹100/team',
        prizes: ['Winning Team: ₹4000'],
        contact: { name: 'Siddharth Rao', phone: '9876581230' },
        maxParticipants: 20,
        guidelines: [
            'Teams of 2 participants.',
            'Each team will get a virtual purse.',
            'Bid for real players and form your team.',
            'Judging based on final team value and strategy.',
        ],
        category: 'Innovative',
    },
    {
        id: 5,
        photoPath: '/events/battledance.png',
        name: 'Dance Battle',
        slug: 'sample',
        description: 'From hip-hop to classical – let your moves speak louder than words.',
        date: '29th May, 2025',
        time: '2:00 PM - 5:00 PM',
        venue: 'Main Stage',
        registrationFee: '₹100',
        prizes: ['Solo: ₹2000', 'Group: ₹5000'],
        contact: { name: 'Tanvi Nair', phone: '9876598765' },
        maxParticipants: 40,
        guidelines: [
            'Solo or group (max 6 members).',
            'Time limit: 3 minutes (solo), 5 minutes (group).',
            'Use of props and recorded music allowed.',
            'Judging based on choreography, energy, and synchronicity.',
        ],
        category: 'Cultural',
    },
    {
        id: 6,
        photoPath: '/events/musictalent.png',
        name: 'SurSangam - Music Fest',
        slug: 'sursangam',
        description: 'Solo and group performances in vocal and instrumental categories.',
        date: '28th May, 2025',
        time: '10:00 AM - 1:00 PM',
        venue: 'Music Room',
        registrationFee: '₹50',
        prizes: ['Best Vocal: ₹2000', 'Best Instrumental: ₹2000'],
        contact: { name: 'Rahul Dey', phone: '9876501234' },
        maxParticipants: 35,
        guidelines: [
            'Solo or duo performances only.',
            'Time limit: 4 minutes.',
            'Participants must bring their own instruments.',
            'No vulgar or offensive content.',
        ],
        category: 'Cultural',
    },
    {
        id: 7,
        photoPath: '/events/codethon.png',
        slug: 'codethon',
        name: 'AlgoKnights - Coding Challenge',
        description: 'Competitive coding contest to solve algorithmic problems under pressure.',
        date: '27th May, 2025',
        time: '11:00 AM - 1:00 PM',
        venue: 'Lab 1',
        registrationFee: '₹50',
        prizes: ['1st: ₹3000', '2nd: ₹1500'],
        contact: { name: 'Ankit Das', phone: '9876512345' },
        maxParticipants: 60,
        guidelines: [
            'Individual participation.',
            '3 coding problems to be solved in 2 hours.',
            'Languages allowed: C++, Java, Python.',
            'Internet access prohibited.',
        ],
        category: 'Technical',
    },
    {
        id: 8,
        photoPath: '/events/gamingarena.png',
        slug: 'sample',
        name: 'Gaming Arena - BGMI & FIFA',
        description: 'Get your squad ready or dribble past your rivals in this gaming showdown.',
        date: '30th May, 2025',
        time: '10:00 AM - 4:00 PM',
        venue: 'GameZone Room',
        registrationFee: '₹100/player',
        prizes: ['BGMI Winner Squad: ₹5000', 'FIFA Champion: ₹2000'],
        contact: { name: 'Karan Singh', phone: '9876523456' },
        maxParticipants: 80,
        guidelines: [
            'BGMI: Squad of 4, devices provided.',
            'FIFA: Played on PlayStation, knockout format.',
            'No offensive behavior or foul language allowed.',
            'Headphones recommended.',
        ],
        category: 'Gaming',
    },
];

export async function generateStaticParams() {
    return data.map(event => ({ slug: event.slug }))
}

const EventDetail = ({ params }: { params: { slug: string } }) => {
    const event = data.find(e => e.slug === params.slug)
    if (!event) return notFound()

    return (
        <div className="bg-black text-white min-h-screen px-6 pt-32 font-sans">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
                {/* Left Side: Image */}
                <div className="rounded-xl overflow-hidden border border-gray-700 shadow-md">
                    <Image
                        src={event.photoPath}
                        alt={event.name}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                    />
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

                    {/* Box 4: Contact & Registration */}
                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className="text-center font-semibold text-lg mb-2 text-white">Registration Fee</div>
                        <p className="text-sm text-gray-300 mt-2"><strong>{event.registrationFee} per team</strong></p>
                        <p className="text-sm text-gray-400 mt-1">Team Size: {event.maxParticipants}</p>
                    </div>

                    <div className="bg-black p-4 rounded-lg border border-gray-700">
                        <div className=" text-center font-semibold text-lg mb-2 text-white">Contact Details</div>
                        <p className="text-sm text-gray-300">👤 {event.contact.name}</p>
                        <p className="text-sm text-gray-300">📞 {event.contact.phone}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default EventDetail
