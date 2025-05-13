/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/razorpay/verify-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import Payment from '@/lib/models/Payment';
import { sendEmail } from '@/lib/server-utils';

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || 
                (host.includes('localhost') ? 'http' : 'https');
  return `${protocol}://${host}`;
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // support both snake_case (backend-style) and camelCase (frontend-style)
    const razorpay_order_id      = body.razorpay_order_id      ?? body.orderId;
    const razorpay_payment_id    = body.razorpay_payment_id    ?? body.paymentId;
    const razorpay_signature     = body.razorpay_signature     ?? body.signature;
    const name                   = body.name;
    const email                  = body.email;
    const phone                  = body.phone;
    const amount                 = body.amount;
    const passId                 = body.passId;
    const basePrice              = body.basePrice;
    const gstAmount              = body.gstAmount;
    const noOfParticipants       = body.noOfParticipants ?? 1;
    const participantsName       = body.participantsName ?? [name];
    const participantsStatus     = body.participantsStatus ?? Array(noOfParticipants).fill(false);
    
    // 1) Required Razorpay params
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Missing payment verification parameters' },
        { status: 400 }
      );
    }
    
    // 2) Your own required metadata
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing customer name or email' },
        { status: 400 }
      );
    }
    
    // 3) Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(text)
      .digest('hex');
      
    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Payment verification failed (bad signature)' },
        { status: 400 }
      );
    }
    
    // 4) Insert into MongoDB
    const newPayment = new Payment({
      _id: razorpay_payment_id, // Using payment ID as the document ID
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      name,
      email,
      phone: phone ?? undefined,
      amount,
      passId,
      basePrice,
      gstAmount,
      noOfParticipants,
      participantsName,
      participantsStatus,
    });
    
    await newPayment.save();
    
    // Get base URL for dynamic links
    const baseUrl = getBaseUrl(request);
    
    // Create more detailed email content
    const participantsList = participantsName.map((name: any) => `<li>${name}</li>`).join('');
    const emailHtml = `
      <h2>Payment Confirmation</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your payment of ₹${amount} for ${passId}.</p>
      
      <h3>Your Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
        <li><strong>Payment ID:</strong> ${razorpay_payment_id}</li>
        <li><strong>Order ID:</strong> ${razorpay_order_id}</li>
      </ul>
      
      <h3>Participants:</h3>
      <ol>
        ${participantsList}
      </ol>
      
      <p>
        <a href="${baseUrl}/getpass?payment_id=${razorpay_payment_id}" style="padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">View Your Pass</a>
      </p>
      
      <p>If you have any questions, please contact our support team.</p>
    `;

    try{
      await sendEmail(
      email,
      `Payment Confirmation: ${razorpay_payment_id}`,
      `Thank you ${name} for your payment of ₹${amount} for ${passId}. Your payment ID is ${razorpay_payment_id}. View your pass at: ${baseUrl}/getpass?payment_id=${razorpay_payment_id}`,
      emailHtml
    )
    console.log('Email sent successfully');
    }catch (error) {
      console.error('Error sending email:', error);
    }


    return NextResponse.json({
      success: true,
      message: 'Payment verified and stored',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}