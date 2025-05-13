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
    
    // Verify the event exists
    const event = getEvent(eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 400 }
      );
    }
    
    // Get minimum required team size for this event
    const minTeamSize = parseInt(event.teamsize.split('-')[0]) || 1;
    
    // Ensure team size is at least the minimum required
    const teamSize = Math.max(minTeamSize, body.teamSize || 1);
    
    // Prepare team members array with required checks
    let teamMembers = body.teamMembers || [name];
    
    // Ensure we have the leader's name as the first entry
    if (!teamMembers[0] || teamMembers[0] === "") {
      teamMembers[0] = name;
    }
    
    // Ensure array size matches team size
    if (teamMembers.length < teamSize) {
      // Add empty slots if needed
      teamMembers = [...teamMembers, ...Array(teamSize - teamMembers.length).fill("")];
    } else if (teamMembers.length > teamSize) {
      // Trim to required size but keep at least minimum size
      teamMembers = teamMembers.slice(0, Math.max(minTeamSize, teamSize));
    }
    
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
    
    // Double check if registration is still open
    const registrationStatus = isRegistrationOpen(event);
    if (!registrationStatus.isOpen) {
      return NextResponse.json(
        { success: false, message: `Registration is closed: ${registrationStatus.reason}` },
        { status: 400 }
      );
    }

    // Create event registration record
    const registration = new EventRegistration({
      _id: razorpay_payment_id,
      name,
      email,
      phone,
      eventId,
      orderId: razorpay_order_id,
      signature: razorpay_signature, // Add the signature field that's required
      teamSize,
      teamMembers,
      timestamp: new Date()
    });

    await registration.save();
    
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