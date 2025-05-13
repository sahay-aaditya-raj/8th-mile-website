/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import { getEvent } from '@/data/events';
import { EventRegistration } from '@/lib/models/EventRegistration';
import { isRegistrationOpen } from '@/lib/utils';
import { sendEmail } from '@/lib/server-utils';

// Helper function to get base URL from request
function getBaseUrl(request: NextRequest): string {
  // Get host from headers
  const host = request.headers.get('host') || 'localhost:3000';
  // Determine protocol based on headers or default (localhost = http, otherwise https)
  const protocol = request.headers.get('x-forwarded-proto') || 
                (host.includes('localhost') ? 'http' : 'https');
  return `${protocol}://${host}`;
}

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
    const event = await getEvent(eventId);
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
    
    // Get base URL for dynamic links
    const baseUrl = getBaseUrl(request);
    
    // Create detailed email content for event registration
    const teamMembersList = teamMembers.map((member, index) => 
      `<li>${index === 0 ? `${member} (Team Leader)` : member || 'Not provided'}</li>`
    ).join('');
    
    const emailHtml = `
      <h2>Event Registration Confirmation</h2>
      <p>Dear ${name},</p>
      <p>Thank you for registering for <strong>${event.name}</strong>!</p>
      
      <h3>Registration Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
        <li><strong>Payment ID:</strong> ${razorpay_payment_id}</li>
        <li><strong>Order ID:</strong> ${razorpay_order_id}</li>
        <li><strong>Event:</strong> ${event.name}</li>
      </ul>
      
      <h3>Team Members:</h3>
      <ol>
        ${teamMembersList}
      </ol>
      
      <p>
        <a href="${baseUrl}/events/${eventId}/registration?payment_id=${razorpay_payment_id}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">View Your Registration</a>
      </p>
      
      <p>Please save this email for future reference. We look forward to seeing you at the event!</p>
    `;
    
    try{
    await sendEmail(
      email,
      `Registration Confirmation: ${event.name}`,
      `Thank you ${name} for registering for ${event.name}. Your payment ID is ${razorpay_payment_id}. View your registration at: ${baseUrl}/events/${eventId}/registration?payment_id=${razorpay_payment_id}`,
      emailHtml
    )
    console.log('Email sent successfully');
    }catch (error) {
      console.error('Error sending email:', error);
    }
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