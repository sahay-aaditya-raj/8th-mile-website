// src/data/passes.ts
import { Pass } from '@/types';

export const eventPasses: Pass[] = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    description: 'Access to all events on a single day',
    price: 5000, // in paise (₹50)
    features: ["Entry to all events", "Lunch and refreshments", "Digital badge"],
    type: "basic"
  },
  {
    id: 'full-pass',
    name: 'Full Pass',
    description: 'Unlimited access to all three days',
    price: 12000, // in paise (₹120)
    features: ["Entry to all events", "Daily lunch and refreshments", "Physical badge", "Exclusive merchandise"],
    type: "standard"
  },
  {
    id: 'vip-pass',
    name: 'VIP Pass',
    description: 'Premium experience across all three days',
    price: 25000, // in paise (₹250)
    features: ["Priority access to all events", "VIP lounges", "Special networking events", "Exclusive merchandise", "Dinner with speakers"],
    type: "premium"
  },
];

export function getPass(id: string): Pass | undefined {
  return eventPasses.find(pass => pass.id === id);
}