import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { payments } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // support both snake_case (backend-style) and camelCase (frontend-style)
    const razorpay_order_id      = body.razorpay_order_id      ?? body.orderId;
    const razorpay_payment_id    = body.razorpay_payment_id    ?? body.paymentId;
    const razorpay_signature     = body.razorpay_signature     ?? body.signature;
    const name                   = body.name;
    const email                  = body.email;
    const phone                  = body.phone;
    const amount                 = body.amount;
    const basePrice              = body.basePrice;
    const gstAmount              = body.gstAmount;
    const passId                 = body.passId;

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

    // 4) Insert into SQLite
    await db.insert(payments).values({
      id: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      name,
      email,
      phone: phone ?? null,
      amount,
      passId: passId,
      basePrice,
      gstAmount,
    });

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
