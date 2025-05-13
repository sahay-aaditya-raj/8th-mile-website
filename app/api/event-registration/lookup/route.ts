import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { EventRegistration } from '@/lib/models/EventRegistration';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const url = new URL(request.url);
    const paymentId = url.searchParams.get('payment_id');
    
    if (!paymentId) {
      return NextResponse.json(
        { success: false, message: 'Payment ID is required' },
        { status: 400 }
      );
    }
    
    // Find the registration by payment ID
    const registration = await EventRegistration.findById(paymentId);
    
    if (!registration) {
      return NextResponse.json(
        { success: false, message: 'Registration not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        paymentId: registration._id,
        orderId: registration.orderId,
        eventId: registration.eventId,
        teamSize: registration.teamSize,
        teamMembers: registration.teamMembers,
        createdAt: registration.createdAt
      }
    });
    
  } catch (error: any) {
    console.error('Error looking up registration:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}