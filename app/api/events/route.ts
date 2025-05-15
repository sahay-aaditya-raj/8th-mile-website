import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Event from '@/lib/models/Event';

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();
    // Fetch all events
    const events = await Event.find({}).lean();
    return NextResponse.json(events, { status: 200 });
    
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events from database' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    
    await connectToDatabase();
    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch event by slug:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event from database' },
      { status: 500 }
    );
  }
}