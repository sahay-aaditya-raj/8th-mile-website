// src/data/passes.ts
import { Pass } from '@/types';

export const eventPasses: Pass[] = [
  {
    id: 'one-day-pass',
    name: 'One Day Pass',
    description: 'Access to all events on a single day',
    price: 510, // in paise (₹50)
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
      'Any changes will not make attendees eligible for refunds.',
      'Consumption of alcohol, cigarette or any narcotic substances are prohibited.',
      'Management has final right to admission, people found drunk or consumed of any prohibited substances shall be escorted out of campus and their passes shall be revoked.',
      'Backpacks are strictly prohibited and management is not responsible for your personal belongings or articles confiscated during frisking NOTE: Ladies handbags will be checked thoroughly for carrying the bag inside the campus.',
      'Display of ID card is mandatory near the entry gate.',
      'Everyone are requested to co-operate with the checking process held during the event .',
      'List of prohibited items- lighter, perfume, matchbox, makeup kit, talcum powder, alcohol, cigarettes, vapes, narcotic substances, tools, unprescribed medicine.',
      'Outside food and drinks are prohibited inside the campus.'

    ]
  },
  {
    id: 'two-day-pass',
    name: 'Two Day Pass',
    description: 'Unlimited access to two days',
    price: 816, // in paise (₹120)
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
      'Any changes will not make attendees eligible for refunds.',
      'Consumption of alcohol, cigarette or any narcotic substances are prohibited.',
      'Management has final right to admission, people found drunk or consumed of any prohibited substances shall be escorted out of campus and their passes shall be revoked.',
      'Backpacks are strictly prohibited and management is not responsible for your personal belongings or articles confiscated during frisking NOTE: Ladies handbags will be checked thoroughly for carrying the bag inside the campus.',
      'Display of ID card is mandatory near the entry gate.',
      'Everyone are requested to co-operate with the checking process held during the event .',
      'List of prohibited items- lighter, perfume, matchbox, makeup kit, talcum powder, alcohol, cigarettes, vapes, narcotic substances, tools, unprescribed medicine.',
      'Outside food and drinks are prohibited inside the campus.'

    ]
  },
  {
    id: 'three-day-pass',
    name: 'Three Day Pass',
    description: 'Premium experience across all three days',
    price: 1122, // in paise (₹250)
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
      'Any changes will not make attendees eligible for refunds.',
      'Consumption of alcohol, cigarette or any narcotic substances are prohibited.',
      'Management has final right to admission, people found drunk or consumed of any prohibited substances shall be escorted out of campus and their passes shall be revoked.',
      'Backpacks are strictly prohibited and management is not responsible for your personal belongings or articles confiscated during frisking NOTE: Ladies handbags will be checked thoroughly for carrying the bag inside the campus.',
      'Display of ID card is mandatory near the entry gate.',
      'Everyone are requested to co-operate with the checking process held during the event .',
      'List of prohibited items- lighter, perfume, matchbox, makeup kit, talcum powder, alcohol, cigarettes, vapes, narcotic substances, tools, unprescribed medicine.',
      'Outside food and drinks are prohibited inside the campus.'

    ]
  }
];

export function getPass(id: string): Pass | undefined {
  return eventPasses.find(pass => pass.id === id);
}
