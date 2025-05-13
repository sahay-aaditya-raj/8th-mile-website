import { Event } from '@/types';

export const allEvents: Event[] = [
  // Regular events
  {
    id: "mr-ms-8th-mile",
    photoPath: "/events/mr-ms-8th-mile.png",
    slug: "mrms8thmile",
    name: "Mr & Ms 8th Mile",
    description: "We present Mr. and Ms. 8th Mile, an evening of glamour, and the celebration of true confidence. This extraordinary event will showcase the talents, charm, and elegance of the remarkable individuals in our college community. Featuring three captivating rounds, Mr. and Ms. 8th Mile is designed to bring out the very best in each participant, offering them a platform to shine and mesmerize the audience with their unique abilities and personalities.",
    date: "29th, 30th 31st May, 2025",
    time: "X",
    venue: "ECE Seminar Hall & Main Stage",
    registrationFee: "₹250",
    teamsize: "1",
    prizes: [
      "Mr. 8th Mile: ₹5000 + Trophy + Coupon worth ₹2000",
      "Ms 8th Mile: ₹5000 + Trophy + Coupon worth ₹2000"
    ],
    contact: [
      { name: "Mukund Verma", phone: "9413848700" },
      { name: "Pedada Tarun", phone: "9448329694" }
    ],
    maxParticipants: 20,
    guidelines: [
      "Individual registration is required for all contestants.",
      "Vulgarity of any kind will not be encouraged and will result in disqualification",
      "Participants are expected to bring their own materials/props required for the talent hunt.",
      "Decision of the jury is final and binding."
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: true,
  },
  {
    id: "mooru-mathondu",
    photoPath: "/events/mooru-mathondu.png",
    slug: "moorumathondu",
    name: "Mooru Mathondu",
    description: "Mooru Mathondu is a vibrant event organized by Kannada CARV that features three dynamic formats of performance: Mad Ads, Mime, and Mono Acting. At the heart of this event is Mad Ads — the flagship segment known for its humor, creativity, and high-energy performances that leave audiences entertained and engaged. Alongside Mad Ads, participants showcase their talent through the silent storytelling of Mime and the emotional depth of Mono Acting. Together, these formats offer a unique blend of theatrical expression, encouraging performers to think on their feet, adapt quickly, and deliver impactful narratives.",
    date: "30th May, 2025",
    time: "10 a.m. - 12 p.m.",
    venue: "New Library Area",
    registrationFee: "₹700 per team",
    teamsize: "Refer Guidelines",
    prizes: [
      "Madads: 1st - ₹5000 & 2nd - ₹3000",
      "Mime: 1st - ₹5000 & 2nd - ₹3000",
      "Mono Acting: 1st - ₹2000 & 2nd - ₹1000"
    ],
    contact: [
      { name: "Pushkar", phone: "7760334929" },
      { name: "Raksha", phone: "8296991378" }
    ],
    maxParticipants: 0,
    guidelines: [
      "Madads | Team size: 7+1 or 6+2 minutes Duration: 5 minutes + 2 minutes Any language of your choice",
      "Mime | Team size: Maximum 8 members per team Duration: 6+2 Minutes Audio file must be provided prior to the event",
      "Mono acting | Language: Kannada, Hindi, English Duration: 3+1 minutes Minimal props and appropriate costume are allowed Background music can be played Performance must be solo, no accompanist for any prop or music"
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: false
  },
  {
    id: "photo-com",
    photoPath: "/events/photocom.png",
    slug: "photocom",
    name: "PhotoCom",
    description: "Unleash your creativity by turning fest memories into a unique comic strip! Use candid or staged photos to tell a fun, engaging story filled with humor, emotion, or drama. Let your pictures speak louder than words in this visual storytelling challenge!",
    date: "30th & 31st May, 2025",
    time: "10 a.m. - 12 p.m.",
    venue: "Ground",
    registrationFee: "₹250 per team",
    teamsize: "1-2",
    prizes: ["1st Place - ₹3000", "2nd Place - ₹2000"],
    contact: [
      { name: "Asiya Banu", phone: "7349388324" },
      { name: "Naanya Sharma", phone: "9465070789 " }
    ],
    maxParticipants: 0,
    guidelines: [
      "Participants must bring their own cameras or smartphones.",
      "All photos used must be clicked within the college campus during the event.",
      "Photos must be relevant to the ongoing fest activities.",
      "No AI-generated content or stock images are allowed.",
      "Basic editing (like color correction, cropping, adding speech bubbles) is permitted.",
      "Only one page (A4 or 1:1) comic strip submission per participant/team."
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: false
  },
  {
    id: "shaurya",
    photoPath: "/events/shaurya.png",
    slug: "shaurya",
    name: "Shaurya",
    description: "Teams are assigned five tasks to be completed simultaneously, with each cadet handling only one task at a time. Tasks can be repeated by different members if needed, but no individual may multitask. After completing all five tasks, the team must collectively analyze a map, interpret coordinates, and identify a final destination. They then use navigation and teamwork skills to reach the designated point. This event evaluates cadets' coordination, strategic thinking, time management, and navigation abilities under simulated operational conditions, challenging their efficiency and cooperation in a high-pressure, mission-like scenario.",
    date: "30th May, 2025",
    time: "1430hrs",
    venue: "ISE Ground Floor, EC Seminar Hall",
    registrationFee: "₹500 per team",
    teamsize: "4",
    prizes: ["Prize Pool - ₹5000"],
    contact: [
      { name: "Preetish Mishra", phone: "8667372477" },
      { name: "Chinmaya R", phone: "8151039114 " }
    ],
    maxParticipants: 0,
    guidelines: [
      "SD and SW cadets of all the three wings namely Army, Navy and Air Force can participate.",
      "Cadets should attend the event in full NCC uniform.",
      "Multiple registrations from the same college or unit is allowed.",
      "Cadets should know the basics of map reading.",
      "Cadets will be required to perform Obstacle Training during the event."
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: false
  },
  {
    id: "verve-fashion",
    photoPath: "/events/verve-fashion.png",
    slug: "vervefashion",
    name: "Verve - Fashion Competition",
    description: "Evoke is RVCE's official fashion club, where style meets creativity. From bold runway performances to innovative photoshoots, the club empowers students to express themselves through fashion, modeling, and design. Evoke is all about confidence, art, and making a statement. ",
    date: "31st May, 2025",
    time: "X",
    venue: "Main Stage",
    registrationFee: "₹2500 per team",
    teamsize: "Maximum 15 (10 Models + 5 Crew)",
    prizes: ["Prize Pool - ₹15000"],
    contact: [
      { name: "Medhavi Srivastava", phone: "6303970499" },
      { name: "Surabi Naveen", phone: "9341966336" }
    ],
    maxParticipants: 0,
    guidelines: [
      "Team Composition: Max 15 members per team (10 models + 5 crew).",
      "Dress Code: Outfits must be decent, non-revealing, and lined if transparent; vulgarity or nudity is not allowed.",
      "Performance Time: 8 minutes for performance + 2 minutes setup; exceeding the limit may lead to deductions.",
      "Content & Conduct: No offensive music, language, or gestures; misbehavior results in disqualification.",
      "Judging Criteria: Creativity, costumes, coordination, theme, and confidence will be evaluated.",
      "Technical & Final Rules: Submit music/tech needs 3 days in advance; no fire/water props; punctuality is mandatory; judges' decision is final."
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: false
  },
  {
    id: "couture",
    photoPath: "/events/couture.png",
    slug: "couture",
    name: "Couture",
    description: "Unleash your creativity at the Designing Competition by Evoke, RVCE's Fashion Club. From sketches to runway-ready concepts, showcase your flair for style and innovation. Blend trends with imagination, compete with fellow designers, and let your vision redefine fashion. It's your moment to design, dazzle, and dominate the spotlight.",
    date: "31st May, 2025",
    time: "2 p.m. - 4 p.m.",
    venue: "Chemical Seminar Hall",
    registrationFee: "₹500 per team",
    teamsize: "2-4",
    prizes: ["Prize Pool - ₹5000"],
    contact: [
      { name: "Medhavi Srivastava", phone: "6303970499" },
      { name: "Surabi Naveen", phone: "9341966336" }
    ],
    maxParticipants: 0,
    guidelines: [
      "Dress Code: Attire must be decent; nudity or vulgarity is strictly prohibited.",
      "Performance Guidelines: Each team gets 5-10 minutes and must speak about their designs; exceeding the time limit may lead to point deductions.",
      "Content & Conduct: No offensive language, gestures, or music; respectful behavior is mandatory—misconduct leads to disqualification.",
      "Judging Criteria: Teams will be evaluated on creativity, costumes, coordination, theme, and confidence.",
      "Technical & General Rules: Submit music/tech requests 3 days in advance; no hazardous props allowed; punctuality is essential; judge's decision is final."
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: false
  },
  {
    id: "soul-train",
    photoPath: "/events/soultrain.png",
    slug: "soultrain",
    name: "Soul Train",
    description: "SoulTrain is the ultimate group dance competition where rhythm meets energy and teams light up the stage with synchronized moves, creativity, and passion. From hip-hop to classical fusion, bring your crew, bring your vibe, and let your performance speak louder than words.",
    date: "30th May, 2025",
    time: "10 a.m. - 1 p.m.",
    venue: "Main Stage",
    registrationFee: "₹1500 per team",
    teamsize: "6-20",
    prizes: ["1st Place - ₹10000", "2nd Place - ₹8000"],
    contact: [
      { name: "Sloke", phone: "8603955071" },
      { name: "Dhruva Kumar S", phone: "9902847516" }
    ],
    maxParticipants: 0,
    guidelines: [
      "Style: Open category (any dance form, including Indian Classical, Contemporary and Western)",
      "Time Limit: 4-8 minutes",
      "Any form of vulgarity will be disqualified",
      "All props allowed other than any flammable substances.",
      "The event will be conducted in two rounds:",
      "Preliminary Round : Online video submission (Minimum duration - 3 Minutes) on or before 15th May, 2025",
      "Final Round : Selected teams from Round 1 will compete on the day of event at RVCE.",
      "Online Video Submission to footprints.rvce@gmail.com with details of your college, Team Name and number of Members."
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: false
  },
  {
    id: "dance-battle",
    photoPath: "/events/dance-battle.png",
    slug: "dancebattle",
    name: "Dance Battle",
    description: "Hip-Hop and house, flips and stunts, this crazy dance battle has everything to get your feet moving. Welcome to Flare, where a good sense of musicality and the perfect sense of groove can get you right to the top of this competition. Does your team have what it takes to be at the top in this All Styles battle! ",
    date: "30th May, 2025",
    time: "2 p.m. - 5 p.m.",
    venue: "BioTech Quadrangle",
    registrationFee: "1 vs 1 - Rs. 400 (Early Bird) & Rs. 600 (onspot) | 2 vs 2 - Rs. 800 (Early Bird) & Rs. 1000 (onspot)",
    teamsize: "6-20",
    prizes: ["Prize Pool - ₹5000"],
    contact: [
      { name: "Sloke", phone: "8603955071" },
      { name: "Madhushree", phone: "9742457070 " }
    ],
    maxParticipants: 0,
    guidelines: [
      "1 vs 1 - Battle it out one-on-one to win the ultimate solo Hip-Hop title.",
      "2 vs 2 - Face off against Dynamic Duos in this All Styles Duet Battle.",
      "7 to Smoke"
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: true
  },
  {
    id: "slam poetry",
    photoPath: "/events/poetry-slam.png",
    slug: "slampoetry",
    name: "Slam Poetry",
    description: "A spoken word poetry competition where participants perform their original poems with passion. Judges will score performances based on relevance, creativity and originality. Mics will be provided for clarity. Prize distribution for outstanding poets.",
    date: "31st May, 2025",
    time: "X",
    venue: "ISE Ground Floor, ECE Seminar Hall",
    registrationFee: "₹100",
    teamsize: "1 (individual)",
    prizes: ["Prize Pool - ₹2000"],
    contact: [
      { name: "Ranjana Prabhudas", phone: "8861572755" },
      { name: "Umang Mishra", phone: "6366062850 " }
    ],
    maxParticipants: 0,
    guidelines: [
      "Only original work is allowed.",
      "No use of offensive language or hate speech.",
      "Exceeding time limit will lead to point deduction.",
      "Judging Criteria: Originality (30%), Delivery (30%), Content (40%).",
      "Single Round Performance: Each participant gets 3-5 minutes to perform."
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: false
  },
  {
    id: "canvas-painting",
    photoPath: "/events/canvas-painting.png",
    slug: "canvaspainting",
    name: "Canvas Painting",
    description: "A spoken word poetry competition where participants perform their original poems with passion. Judges will score performances based on relevance, creativity and originality. Mics will be provided for clarity. Prize distribution for outstanding poets.",
    date: "31st May, 2025",
    time: "X",
    venue: "ISE Ground Floor, ECE Seminar Hall",
    registrationFee: "₹100",
    teamsize: "1 (individual)",
    prizes: ["Prize Pool - ₹2000"],
    contact: [
      { name: "Ranjana Prabhudas", phone: "8861572755" },
      { name: "Umang Mishra", phone: "6366062850 " }
    ],
    maxParticipants: 0,
    guidelines: [
      "Only original work is allowed.",
      "No use of offensive language or hate speech.",
      "Exceeding time limit will lead to point deduction.",
      "Judging Criteria: Originality (30%), Delivery (30%), Content (40%).",
      "Single Round Performance: Each participant gets 3-5 minutes to perform."
    ],
    category: "Cultural",
    registrationDeadline: '',
    currentRegistrations: 0,
    registrationOpen: true
  },
  // Technical events (including hackathons)
  {
    id: 'code-fusion',
    slug: 'code-fusion',
    name: 'Code Fusion',
    description: 'A 48-hour intensive coding challenge to build innovative solutions',
    date: 'September 15-17, 2023',
    time: '9:00 AM - 9:00 AM (48 hours)',
    venue: 'Main Auditorium, RVCE',
    category: 'Gaming',
    photoPath: '/images/events/hackathon-main.jpg',
    prizes: [
      'First Prize: ₹50,000',
      'Second Prize: ₹30,000',
      'Third Prize: ₹20,000',
      'Best UI/UX: ₹10,000'
    ],
    teamsize: '2-4',
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
    registrationDeadline: '2025-09-10T23:59:59Z',
    currentRegistrations: 72,
    registrationOpen: true
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
    photoPath: '/images/events/ai-hackathon-main.jpg',
    prizes: [
      'First Prize: ₹40,000',
      'Second Prize: ₹25,000',
      'Best Use of ML: ₹15,000'
    ],
    teamsize: '2-3',
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
    registrationDeadline: '2023-09-14T23:59:59Z',
    currentRegistrations: 45,
    registrationOpen: true
  }
];

// Dynamically extract unique categories from events
const uniqueCategories = [...new Set(allEvents.map(event => event.category))];
export const eventCategories = ['All', ...uniqueCategories];

export function getTechnicalEvents(): Event[] {
  return allEvents.filter(event => event.category === 'Technical');
}

export function getCulturalEvents(): Event[] {
  return allEvents.filter(event => event.category === 'Cultural');
}

export function getSportsEvents(): Event[] {
  return allEvents.filter(event => event.category === 'Sports');
}

export function getEvent(id: string): Event | undefined {
  return allEvents.find(event => event.id === id);
}

export function getEventBySlug(slug: string): Event | undefined {
  return allEvents.find(event => event.slug === slug);
}