/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import { getEvent } from '@/data/events';
import { EventRegistration } from '@/lib/models/EventRegistration';
import { isRegistrationOpen } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const razorpay_order_id = body.razorpay_order_id;
    const razorpay_payment_id = body.razorpay_payment_id;
    const razorpay_signature = body.razorpay_signature;
    const name = body.name;
    const email = body.email;
    const phone = body.phone;
    const eventId = body.eventId;
    const teamSize = body.teamSize || 1;
    const teamMembers = body.teamMembers || [name];

    // Verify Razorpay signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');
      
    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }
    
    const event = getEvent(eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 400 }
      );
    }
    
    // Double check if registration is still open
    const registrationStatus = isRegistrationOpen(event);
    if (!registrationStatus.isOpen) {
      return NextResponse.json(
        { success: false, message: `Registration is closed: ${registrationStatus.reason}` },
        { status: 400 }
      );
    }

    // Create event registration record
    await EventRegistration.create({
      _id: razorpay_payment_id, // Use payment ID as document ID
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      name,
      email,
      phone,
      eventId,
      teamSize,
      teamMembers,
      createdAt: new Date()
    });
    
    // Update event registration count
    // Note: In a real implementation, you might want to do this atomically in a database
    // For now, we'll just pretend we're updating a counter
    event.currentRegistrations += parseInt(teamSize);
    
    return NextResponse.json({
      success: true,
      message: 'Payment verified and registration saved'
    });
  } catch (error: any) {
    console.error('Error verifying event registration payment:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}