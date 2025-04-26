// app/api/verifypass/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { payments } from '@/lib/schema';
import { eq } from 'drizzle-orm'; // Import eq from drizzle-orm


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
      return NextResponse.json(
        { success: false, message: 'Missing payment_id parameter' },
        { status: 400 }
      );
    }

    const payment = await db
      .select()
      .from(payments)
      .where(eq(payments.id, paymentId))
      .execute()
      .then((result) => result[0]);

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
        paymentId: payment.id,
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