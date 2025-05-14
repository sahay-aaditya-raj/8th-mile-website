import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import { sendEmail } from '@/lib/server-utils';
import Razorpay from 'razorpay';
import Registration from '@/lib/models/Registrations';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: NextRequest) {
    try{
        await connectToDatabase();
        const body = await request.json();
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;
        const order = await razorpay.orders.fetch(razorpay_order_id);

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                { success: false, message: 'Missing payment verification parameters' },
                { status: 400 }
            );
        }
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
        if(order?.notes?.type === "pass"){
            const registration = new Registration({
                _id: razorpay_payment_id,
                orderId: razorpay_order_id,
                signature: razorpay_signature,
                name: order.notes.name,
                email: order.notes.email,
                phone: order.notes.phone,
                amount: order.amount,
                type: order.notes.type,
                classId: order.notes.passId,
                noOfParticipants: 1,
                participantsData: [{name: order.notes.name, arrived: false}]
            });

            await registration.save();
            console.log('Registration saved:', registration);

            const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify/${razorpay_payment_id}`;
            const emailHtml = `
            <h1>Payment Confirmation</h1>
            <p>Dear ${order.notes.name},</p>
            <p>Your payment of ${order.amount} has been successfully processed for ${order.notes.passId}.</p>
                <ul>
                    <li><strong>Name:</strong> ${order.notes.name}</li>
                    <li><strong>Email:</strong> ${order.notes.email}</li>
                    <li><strong>Phone:</strong> ${order.notes.phone || 'Not provided'}</li>
                    <li><strong>Payment ID:</strong> ${razorpay_payment_id}</li>
                    <li><strong>Order ID:</strong> ${razorpay_order_id}</li>
                </ul>
            <p>Thank you for your registration.</p>

            <p>
                You can verify your registration by clicking the link below:
                <a href="${url}">Verify Registration</a>
            </p>
            `
            try{
                await sendEmail(
                    `${order.notes.email}`,
                    `Payment Confirmation: ${razorpay_payment_id}`,
                    `Your payment of ${order.amount} has been successfully processed for ${order.notes.passId}.`,
                    emailHtml
                );
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
            }
            return NextResponse.json(
                { success: true, message: 'Payment verified successfully', data: registration },
                { status: 200 }
            );
        } else if(order?.notes?.type === "event"){}

        
    } catch(error) {
        console.error('Server Error:', error);
        return NextResponse.json(
            { success: false, message: 'Server Error' },
            { status: 500 }
        );
    }
}