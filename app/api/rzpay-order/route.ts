import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getPass } from '@/data/passes';


const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: NextRequest) {
    try{
        const body = await request.json();
        if(body?.type === "pass"){
            const { passId, name, email, phone } = body?.data;
            const pass = getPass(passId);
            if (!pass) {
                return NextResponse.json(
                    { success: false, message: 'Invalid pass selected' },
                    { status: 400 }
                );
            }
            const options = {
                amount: pass.price*100,
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                notes: {
                    type: 'pass',
                    passId,
                    name,
                    email,
                    phone: phone || '',
                }
            }
            const order = await razorpay.orders.create(options);
            console.log('Order created:', order);
            return NextResponse.json({success: true, order}, {status: 200});

        }
        else if(body?.type === "event"){
            const { eventId, name, email, phone, teamSize, teamMembers, feeType, registrationFee, totalAmount } = body?.data;
            const options = {
                amount: totalAmount*100, // Convert to paise
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                notes: {
                    type: 'event',
                    eventId,
                    name,
                    email,
                    phone: phone || '',
                    teamSize,
                    teamMembers,
                    feeType,
                    registrationFee,
                    totalAmount
                }
            }
            const order = await razorpay.orders.create(options);
            console.log('Order created:', order);
            return NextResponse.json({success: true, order}, {status: 200});
        }
    }catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create order' },
            { status: 500 }
        );
    }
}