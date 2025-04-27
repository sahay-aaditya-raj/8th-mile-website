// app/api/verifypass/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Payment from '@/lib/models/Payment';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
      return NextResponse.json(
        { success: false, message: 'Missing payment_id parameter' },
        { status: 400 }
      );
    }

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return NextResponse.json(
        { success: false, message: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      payment: {
        name: payment.name,
        email: payment.email,
        phone: payment.phone,
        orderId: payment.orderId,
        paymentId: payment._id,
        basePrice: payment.basePrice,
        gstAmount: payment.gstAmount
      }
    });
  } catch (error) {
    console.error('Error retrieving payment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}