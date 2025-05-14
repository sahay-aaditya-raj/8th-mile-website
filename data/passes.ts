// src/data/passes.ts
import { Pass } from '@/types';

export const eventPasses: Pass[] = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    description: 'Access to all events on a single day',
    price: 50, // in paise (₹50)
    features: ["Entry to all events", "Lunch and refreshments", "Digital badge"],
    type: "basic",
    primaryImage: "/images/passes/day-pass-main.jpg",
    galleryImages: [
      "/images/passes/day-pass-1.jpg",
      "/images/passes/day-pass-2.jpg"
    ]
  },
  {
    id: 'full-pass',
    name: 'Full Pass',
    description: 'Unlimited access to all three days',
    price: 120, // in paise (₹120)
    features: ["Entry to all events", "Daily lunch and refreshments", "Physical badge", "Exclusive merchandise"],
    type: "standard",
    primaryImage: "/images/passes/full-pass-main.jpg",
    galleryImages: [
      "/images/passes/full-pass-1.jpg",
      "/images/passes/full-pass-2.jpg",
      "/images/passes/full-pass-3.jpg"
    ]
  },
  {
    id: 'vip-pass',
    name: 'VIP Pass',
    description: 'Premium experience across all three days',
    price: 250, // in paise (₹250)
    features: ["Priority access to all events", "VIP lounges", "Special networking events", "Exclusive merchandise", "Dinner with speakers"],
    type: "premium",
    primaryImage: "/images/passes/vip-pass-main.jpg",
    galleryImages: [
      "/images/passes/vip-pass-1.jpg",
      "/images/passes/vip-pass-2.jpg"
    ]
  }
];

export function getPass(id: string): Pass | undefined {
  return eventPasses.find(pass => pass.id === id);
}