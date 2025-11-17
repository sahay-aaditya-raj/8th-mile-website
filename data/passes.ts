// src/data/passes.ts
import { Pass } from '@/types';

export const eventPasses: Pass[] = [
  {
    id: 'day-pass',
    name: 'One Day Pass',
    description: 'Access to all events on a single day',
    price: 500, // in paise (₹50)
    primaryImage: "/gallery/cultural/4.png",
    galleryImages: [
      "/gallery/technical/3.JPG",
      "/gallery/cultural/58.jpg"
    ]
  },
  {
    id: 'full-pass',
    name: 'Two Day Pass',
    description: 'Unlimited access to two days',
    price: 800, // in paise (₹120)
    primaryImage: "/gallery/cultural/007A1602.JPG",
    galleryImages: [
      "/gallery/technical/10.JPG",
      "/gallery/cultural/45.JPG"
    ]
  },
  {
    id: 'vip-pass',
    name: 'Three Day Pass',
    description: 'Premium experience across all three days',
    price: 1100, // in paise (₹250)
    primaryImage: "/gallery/cultural/51.JPG",
    galleryImages: [
      "/gallery/technical/14.JPG",
      "/gallery/cultural/14.png"
    ]
  }
];

export function getPass(id: string): Pass | undefined {
  return eventPasses.find(pass => pass.id === id);
}