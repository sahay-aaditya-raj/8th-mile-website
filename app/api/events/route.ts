import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { EventModel } from '@/lib/models/Events';

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Fetch all events
    const events = await EventModel.find({}).lean();
    
    // Transform the data to convert _id to id for frontend consumption
    const transformedEvents = events.map(event => {
      const { _id, ...rest } = event;
      return {
        ...rest,
        id: _id
      };
    });

    // Return successful response
    return NextResponse.json(transformedEvents, { status: 200 });
    
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events from database' },
      { status: 500 }
    );
  }
}