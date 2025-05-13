import { Event } from '@/types';

// Function to fetch all events from API
export async function fetchEvents(): Promise<Event[]> {
  try {
    // Determine if we're in a browser or server environment
    const isClient = typeof window !== 'undefined';
    
    // Create appropriate URL based on environment
    const url = isClient 
      ? '/api/events' // Browser can handle relative URLs
      : `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/events`; // Server needs absolute URL
    
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.error('Failed to fetch events:', response.status);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Export allEvents for client components that need synchronous access
export let allEvents: Event[] = [];

// Initialize events data on the client side
if (typeof window !== 'undefined') {
  // Immediately load events when this module is imported
  fetchEvents().then(events => {
    allEvents = events;
  });
}

// Get all events with optional category filter
export async function getEvents(category?: string): Promise<Event[]> {
  const events = await fetchEvents();
  
  if (!category || category === 'All') {
    return events;
  }
  
  return events.filter(event => event.category === category);
}

// Get a specific event by ID
export async function getEvent(id: string): Promise<Event | undefined> {
  const events = await fetchEvents();
  return events.find(event => event.id === id);
}

// Get a specific event by slug
export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const events = await fetchEvents();
  return events.find(event => event.slug === slug);
}

// Dynamically extract unique categories from events
export async function getEventCategories(): Promise<string[]> {
  const events = await fetchEvents();
  const uniqueCategories = [...new Set(events.map(event => event.category))];
  return ['All', ...uniqueCategories];
}

// For backward compatibility and static exports
export const eventCategories = ['All', 'Cultural', 'Technical', 'Gaming'];