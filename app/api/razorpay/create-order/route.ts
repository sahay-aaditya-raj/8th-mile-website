// src/app/api/razorpay/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getPass } from '@/data/passes';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      passId, 
      name, 
      email, 
      phone, 
      noOfParticipants = 1, 
      participantsName = [] 
    } = body;

    if (!passId || !name || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const pass = getPass(passId);
    if (!pass) {
      return NextResponse.json(
        { success: false, message: 'Invalid pass selected' },
        { status: 400 }
      );
    }

    // Calculate amount based on pass type and number of participants
    let amount = pass.price;
    if (pass.isTeamEvent && pass.paymentType === 'per_person') {
      amount = pass.price * noOfParticipants;
    }

    const receipt = `receipt_${Date.now()}`;
    
    const options = {
      amount,
      currency: 'INR',
      receipt,
      notes: {
        passId,
        name,
        email,
        phone: phone || '',
        noOfParticipants: String(noOfParticipants),
        participantsName: JSON.stringify(participantsName)
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
      pass
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    );
  }
}