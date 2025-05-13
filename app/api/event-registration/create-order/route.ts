/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectToDatabase } from '@/lib/db';
import { getEvent } from '@/data/events';
import { isRegistrationOpen } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const { 
      eventId, 
      name, 
      email, 
      phone, 
      textsize = 1,
      teamMembers = []
    } = body;

    if (!eventId || !name || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const event = await getEvent(eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 400 }
      );
    }
    
    // Check if registration is still open
    const registrationStatus = isRegistrationOpen(event);
    if (!registrationStatus.isOpen) {
      return NextResponse.json(
        { success: false, message: `Registration is closed: ${registrationStatus.reason}` },
        { status: 400 }
      );
    }

    // Parse registration fee from string
    const feeStr = event.registrationFee.replace(/[^0-9]/g, '');
    let amount = parseInt(feeStr) * 100; // Convert to paise
    
    // If fee is per person, multiply by team size
    if (!event.registrationFee.includes('per team')) {
      amount *= textsize;
    }

    const receipt = `receipt_${Date.now()}`;
    
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!
    });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt,
      notes: {
        eventId,
        name,
        email,
        phone,
        textsize: textsize.toString(),
        teamMembers: JSON.stringify(teamMembers)
      }
    });

    return NextResponse.json({
      success: true,
      order,
      event
    });
  } catch (error: any) {
    console.error('Error creating event registration order:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}