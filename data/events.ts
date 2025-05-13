import { Event } from '@/types';
import { hackathonEvents } from './hackathons';

export const regularEvents: Event[] = [
  {
    id: 'dance-off',
    slug: 'rhythm-revolution',
    name: 'Rhythm Revolution',
    description: 'Inter-college dance competition featuring various styles and forms',
    date: 'September 15, 2023',
    time: '5:00 PM - 9:00 PM',
    venue: 'Main Auditorium, RVCE',
    category: 'Cultural',
    primaryImage: '/images/events/dance-main.jpg',
    galleryImages: [
      '/images/events/dance-1.jpg',
      '/images/events/dance-2.jpg',
      '/images/events/dance-3.jpg'
    ],
    prizes: [
      'First Prize: ₹30,000',
      'Second Prize: ₹20,000',
      'Third Prize: ₹10,000',
      'Best Choreography: ₹5,000'
    ],
    teamSize: '5-15',
    maxParticipants: 20,
    registrationFee: '₹1,000 per team',
    guidelines: [
      'Performance time: 5-8 minutes',
      'Music track must be submitted 2 days before the event',
      'Props allowed with prior permission',
      'Both western and classical dance forms accepted'
    ],
    contact: [
      { name: 'Neha Sharma', phone: '+91 9876543213' },
      { name: 'Karan Johar', phone: '+91 8765432106' }
    ],
    registrationDeadline: '2023-09-12T23:59:59Z',
    currentRegistrations: 15,
    registrationOpen: true
  },
  {
    id: 'battle-bands',
    slug: 'battle-of-the-bands',
    name: 'Battle of the Bands',
    description: 'Live music competition for college bands across all genres',
    date: 'September 16, 2023',
    time: '6:00 PM - 10:00 PM',
    venue: 'Open Air Theatre, RVCE',
    category: 'Cultural',
    primaryImage: '/images/events/band-main.jpg',
    galleryImages: [
      '/images/events/band-1.jpg',
      '/images/events/band-2.jpg'
    ],
    prizes: [
      'First Prize: ₹35,000',
      'Second Prize: ₹20,000',
      'Third Prize: ₹10,000'
    ],
    teamSize: '3-8',
    maxParticipants: 15,
    registrationFee: '₹1,200 per team',
    guidelines: [
      'Performance time: 12-15 minutes',
      'At least one original composition required',
      'Bands must bring their own instruments',
      'Drum kit and sound system will be provided'
    ],
    contact: [
      { name: 'Arjun Nair', phone: '+91 9876543214' },
      { name: 'Tanya Mehta', phone: '+91 8765432105' }
    ],
    registrationDeadline: '2026-09-14T23:59:59Z',
    currentRegistrations: 8,
    registrationOpen: true
  },
  {
    id: 'robotics',
    slug: 'robo-rumble',
    name: 'Robo Rumble',
    description: 'Robotics competition featuring autonomous and manual robot challenges',
    date: 'September 17, 2023',
    time: '11:00 AM - 7:00 PM',
    venue: 'Mechanical Block, RVCE',
    category: 'Technical',
    primaryImage: '/images/events/robotics-main.jpg',
    galleryImages: [
      '/images/events/robotics-1.jpg',
      '/images/events/robotics-2.jpg'
    ],
    prizes: [
      'First Prize: ₹25,000',
      'Second Prize: ₹15,000',
      'Third Prize: ₹10,000'
    ],
    teamSize: '2-5',
    maxParticipants: 30,
    registrationFee: '₹1,200 per team',
    guidelines: [
      'Robot weight limit: 5kg',
      'Maximum dimensions: 30cm x 30cm x 30cm',
      'Battery powered only, no combustion engines',
      'Pre-registration of robot specifications required'
    ],
    contact: [
      { name: 'Vikram Singh', phone: '+91 9876543212' },
      { name: 'Aditi Kumar', phone: '+91 8765432107' }
    ],
    registrationDeadline: '2023-09-15T23:59:59Z',
    currentRegistrations: 12,
    registrationOpen: true
  },
  {
    id: 'gaming-tournament',
    slug: 'pixel-playoff',
    name: 'Pixel Playoff',
    description: 'Competitive gaming tournament featuring popular esports titles',
    date: 'September 15-17, 2023',
    time: '10:00 AM - 8:00 PM',
    venue: 'Gaming Arena, RVCE',
    category: 'Gaming',
    primaryImage: '/images/events/gaming-main.jpg',
    galleryImages: [
      '/images/events/gaming-1.jpg',
      '/images/events/gaming-2.jpg'
    ],
    prizes: [
      'Valorant Tournament: ₹20,000',
      'CS:GO Tournament: ₹20,000',
      'FIFA Tournament: ₹10,000',
      'Mobile Legends: ₹10,000'
    ],
    teamSize: 'Varies by game',
    maxParticipants: 200,
    registrationFee: '₹500 per person',
    guidelines: [
      'Players must bring their own peripherals',
      'Gaming systems will be provided',
      'Tournament rules will be shared upon registration',
      'Unsportsmanlike behavior will lead to disqualification'
    ],
    contact: [
      { name: 'Gamers Club', phone: '+91 9876543217' },
      { name: 'Akash Verma', phone: '+91 8765432103' }
    ],
    registrationDeadline: '2026-09-13T23:59:59Z',
    currentRegistrations: 167,
    registrationOpen: true
  }
];

export const allEvents = [...regularEvents, ...hackathonEvents];
export const eventCategories = ['All', 'Technical', 'Cultural', 'Gaming', 'Hackathon'];

export function getEvent(id: string): Event | undefined {
  return allEvents.find(event => event.id === id);
}

export function getEventBySlug(slug: string): Event | undefined {
  return allEvents.find(event => event.slug === slug);
}

export function getEventsByCategory(category: string): Event[] {
  if (category === 'All') return allEvents;
  if (category === 'Hackathon') return hackathonEvents;
  return allEvents.filter(event => event.category === category);
}