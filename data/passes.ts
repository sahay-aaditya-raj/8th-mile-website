// src/data/passes.ts
import { Pass } from '@/types';

export const eventPasses: Pass[] = [
  {
    id: 'one-day-pass',
    name: 'One Day Pass',
    description: 'Access to all events on a single day',
    price: 500, // in paise (₹50)
    primaryImage: "/gallery/cultural/4.png",
    galleryImages: [
      "/gallery/technical/3.JPG",
      "/gallery/cultural/58.jpg"
    ],
    features: [
      'A valid QR code / physical pass must be shown at the gate.',
      'Students must carry a college ID or any valid government ID.',
      'Pass is non-transferable and can be used by only one person.',
      'Passes are non-refundable under any circumstances',
      'No refund will be issued for partial attendance (e.g., missing one day of a 2-day pass).',
      'Re-entry is not allowed unless explicitly permitted by the event organizers.',
      'Organizers reserve the right to change the schedule, performers, venues, or timings without prior notice.',
      'Any changes will not make attendees eligible for refunds.'
    ]
  },
  {
    id: 'two-day-pass',
    name: 'Two Day Pass',
    description: 'Unlimited access to two days',
    price: 800, // in paise (₹120)
    primaryImage: "/gallery/cultural/007A1602.JPG",
    galleryImages: [
      "/gallery/technical/10.JPG",
      "/gallery/cultural/45.JPG"
    ],
    features: [
      'A valid QR code / physical pass must be shown at the gate.',
      'Students must carry a college ID or any valid government ID.',
      'Pass is non-transferable and can be used by only one person.',
      'Passes are non-refundable under any circumstances',
      'No refund will be issued for partial attendance (e.g., missing one day of a 2-day pass).',
      'Re-entry is not allowed unless explicitly permitted by the event organizers.',
      'Organizers reserve the right to change the schedule, performers, venues, or timings without prior notice.',
      'Any changes will not make attendees eligible for refunds.'
    ]
  },
  {
    id: 'three-day-pass',
    name: 'Three Day Pass',
    description: 'Premium experience across all three days',
    price: 1100, // in paise (₹250)
    primaryImage: "/gallery/cultural/51.JPG",
    galleryImages: [
      "/gallery/technical/14.JPG",
      "/gallery/cultural/14.png"
    ],
    features: [
      'A valid QR code / physical pass must be shown at the gate.',
      'Students must carry a college ID or any valid government ID.',
      'Pass is non-transferable and can be used by only one person.',
      'Passes are non-refundable under any circumstances',
      'No refund will be issued for partial attendance (e.g., missing one day of a 2-day pass).',
      'Re-entry is not allowed unless explicitly permitted by the event organizers.',
      'Organizers reserve the right to change the schedule, performers, venues, or timings without prior notice.',
      'Any changes will not make attendees eligible for refunds.'
    ]
  }
];

export function getPass(id: string): Pass | undefined {
  return eventPasses.find(pass => pass.id === id);
}