import { Event } from '@/types';

export const hackathonEvents: Event[] = [
  {
    id: 'code-fusion',
    slug: 'code-fusion',
    name: 'Code Fusion',
    description: 'A 48-hour intensive coding challenge to build innovative solutions',
    date: 'September 15-17, 2023',
    time: '9:00 AM - 9:00 AM (48 hours)',
    venue: 'Main Auditorium, RVCE',
    category: 'Technical',
    primaryImage: '/images/events/hackathon-main.jpg',
    galleryImages: [
      '/images/events/hackathon-1.jpg',
      '/images/events/hackathon-2.jpg',
      '/images/events/hackathon-3.jpg'
    ],
    prizes: [
      'First Prize: ₹50,000',
      'Second Prize: ₹30,000',
      'Third Prize: ₹20,000',
      'Best UI/UX: ₹10,000'
    ],
    teamSize: '2-4',
    maxParticipants: 100,
    registrationFee: '₹1,500 per team',
    guidelines: [
      'Teams must consist of 2-4 members',
      'All team members must be present during the entire duration',
      'Code must be original and created during the hackathon',
      'Submission includes source code and presentation'
    ],
    contact: [
      { name: 'Aditya Sharma', phone: '+91 9876543210' },
      { name: 'Priya Patel', phone: '+91 8765432109' }
    ],
    registrationDeadline: '2023-09-10T23:59:59Z',  // Fixed deadline
    currentRegistrations: 72,                       // Added initial registrations
    registrationOpen: true                         // Set to open
  },
  {
    id: 'ai-challenge',
    slug: 'ai-innovation-challenge',
    name: 'AI Innovation Challenge',
    description: 'Develop cutting-edge AI solutions to address real-world problems',
    date: 'September 16-17, 2023',
    time: '10:00 AM - 6:00 PM',
    venue: 'CS Department, RVCE',
    category: 'Technical',
    primaryImage: '/images/events/ai-hackathon-main.jpg',
    galleryImages: [
      '/images/events/ai-hackathon-1.jpg',
      '/images/events/ai-hackathon-2.jpg'
    ],
    prizes: [
      'First Prize: ₹40,000',
      'Second Prize: ₹25,000',
      'Best Use of ML: ₹15,000'
    ],
    teamSize: '2-3',
    maxParticipants: 50,
    registrationFee: '₹1,200 per team',
    guidelines: [
      'Focus on AI/ML solutions only',
      'Pre-trained models are allowed with proper attribution',
      'Live demo required during presentation',
      'Solutions will be judged on innovation, impact and technical depth'
    ],
    contact: [
      { name: 'Raj Mehta', phone: '+91 9876543211' },
      { name: 'Divya S', phone: '+91 8765432108' }
    ],
    registrationDeadline: '2023-09-14T23:59:59Z',  // Fixed deadline
    currentRegistrations: 45,                       // Added initial registrations
    registrationOpen: true                          // Set to open
  }
];