import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount / 100);
}

/**
 * Check if registration for an event is still open
 */
interface Event {
  registrationOpen: boolean;
  registrationDeadline: string;
  currentRegistrations: number;
  maxParticipants: number;
}

export function isRegistrationOpen(event: Event): { isOpen: boolean; reason: string | null } {
  // Check manual override
  if (!event.registrationOpen) {
    return { isOpen: false, reason: 'Registration is closed by organizers' };
  }
  
  // Check registration deadline
  if (new Date(event.registrationDeadline) < new Date()) {
    return { isOpen: false, reason: 'Registration deadline has passed' };
  }
  
  // Check if event is full
  if (event.currentRegistrations >= event.maxParticipants) {
    return { isOpen: false, reason: 'Event has reached maximum capacity' };
  }
  
  // Registration is open
  return { isOpen: true, reason: null };
}