/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Order from "@/lib/models/Orders";
import Registration from "@/lib/models/Registrations";
import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/server-utils";
import { fetchCashfreeOrder, fetchCashfreePaymentStatus } from "@/lib/cashfree";

async function mailto(type: string, registration: any, paymentId: string) {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify?payment_id=${registration.orderId}`;
    let emailHtml, subject, plainText;

    if (type === "pass") {
        subject = `Payment Confirmation: ${paymentId}`;
        plainText = `Your payment of ₹${registration.amount} has been successfully processed for ${registration.classId}.`;
        emailHtml = `
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2c2c2c; padding: 24px;">
            <h1 style="color: #5a3e2b; font-size: 28px; margin-bottom: 16px;">Payment Confirmation</h1>
            <p style="font-size: 16px; margin-bottom: 12px;">Dear <strong style="color: #3c2f1c;">${registration.name}</strong>,</p>
            <p style="font-size: 16px; margin-bottom: 20px;">
                We are pleased to inform you that your payment of 
                <strong style="color: #5a3e2b;">₹${registration.amount}</strong> has been successfully processed for 
                <strong style="color: #5a3e2b;">${registration.classId}</strong>.
            </p>
            <ul style="list-style: none; padding: 0; font-size: 15px; margin-bottom: 20px;">
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Name:</strong> ${registration.name}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Email:</strong> ${registration.email}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Phone:</strong> ${registration.phone || "Not provided"}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Payment ID:</strong> ${paymentId}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Order ID:</strong> ${registration.orderId}</li>
            </ul>
            <p style="font-size: 16px; margin-bottom: 24px;">Thank you for your registration. We're excited to have you on board.</p>
            <p style="font-size: 16px;">You can verify your registration by clicking the button below:</p>
            <div style="margin-top: 16px;">
                <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #5a3e2b; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
                    Verify Registration
                </a>
            </div>
            <p style="font-size: 14px; color: #777777; margin-top: 32px;">
                If you have any questions or need support, feel free to reply to this email.
            </p>
        </div>`;
    } else if (type === "event") {
        // Simplified event email handling
        subject = `Payment Confirmation: ${paymentId}`;
        plainText = `Your payment of ₹${Number(registration.amount)} has been successfully processed for ${registration.classId}.`;
        emailHtml = `
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2c2c2c; padding: 24px;">
            <h1 style="color: #5a3e2b; font-size: 28px; margin-bottom: 16px;">Payment Confirmation</h1>
            <p style="font-size: 16px; margin-bottom: 12px;">Dear <strong style="color: #3c2f1c;">${registration.name}</strong>,</p>
            <p style="font-size: 16px; margin-bottom: 20px;">
                We are pleased to inform you that your payment of 
                <strong style="color: #5a3e2b;">₹${registration.amount}</strong> has been successfully processed for 
                <strong style="color: #5a3e2b;">${registration.classId}</strong>.
            </p>
            <ul style="list-style: none; padding: 0; font-size: 15px; margin-bottom: 20px;">
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Name:</strong> ${registration.name}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Email:</strong> ${registration.email}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Phone:</strong> ${registration.phone || "Not provided"}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Payment ID:</strong> ${paymentId}</li>
                <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Order ID:</strong> ${registration.orderId}</li>
            </ul>
            <p style="font-size: 16px; margin-bottom: 12px;">
                <strong style="color: #4b3621;">Participants:</strong>
            </p>
            <ul style="list-style: none; padding: 0; font-size: 15px; margin-bottom: 20px;">
                ${registration.participantsData.map(
                        (memberName: string) =>
                            `<li style="margin-bottom: 8px;">${memberName.name}</li>`
                    )
                    .join("")}
            </ul>
            <p style="font-size: 16px; margin-bottom: 24px;">Thank you for your registration. We’re excited to have you on board.</p>

            <p style="font-size: 16px; margin-bottom: 24px;">Thank you for your registration. We're excited to have you on board.</p>
            <p style="font-size: 16px;">You can verify your registration by clicking the button below:</p>
            <div style="margin-top: 16px;">
                <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #5a3e2b; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
                    Verify Registration
                </a>
            </div>
            <p style="font-size: 14px; color: #777777; margin-top: 32px;">
                If you have any questions or need support, feel free to reply to this email.
            </p>
        </div>`;
    }

    await sendEmail(registration.email, String(subject), String(plainText), String(emailHtml));
}

// POST handler for Cashfree webhooks
export async function POST(request: Request) {
    try {
        const body = await request.json();
        // console.log('Cashfree webhook received:', body);

        // Cashfree webhook payload typically contains order_id or cf_order_id
        const orderId = body.data?.order?.order_id || body.order_id;
        
        if (!orderId) {
            console.error('No order ID in webhook payload');
            return NextResponse.json({ success: false, message: 'Missing order ID' }, { status: 400 });
        }

        await connectToDatabase();
        
        // Find and update the order
        const order = await Order.findOne({ merchantOrderId: orderId });
        if (order) {
            const status = await fetchCashfreePaymentStatus(order.merchantOrderId);
            
            if (status) {
                order.cashfreeStatus = status;
                
                if (status === 'SUCCESS') {
                    order.paymentStatus = 'SUCCESS';
                } else if (status === 'PENDING') {
                    order.paymentStatus = 'PENDING';
                } else {
                    order.paymentStatus = 'FAILED';
                }
                
                await order.save();
                console.log(`Order ${orderId} updated via webhook: ${status}`);
            } else {
                console.log(`No payment found for order ${orderId}`);
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
        return NextResponse.json(
            { success: false, status: 'FAILED', message: 'Missing payment_id parameter', payment_id: null },
            { status: 400 }
        );
    }

    try {
        await connectToDatabase();
        
        // Find the order first
        const order = await Order.findOne({ merchantOrderId: paymentId });
        if (!order) {
            return NextResponse.json(
                { success: false, status: 'FAILED', message: 'Order not found', payment_id: paymentId },
                { status: 404 }
            );
        }

        // Cashfree payment verification (sole payment provider)
        try {
            // Make direct API call to Cashfree to verify order status using merchantOrderId
            const cashfreeData = await fetchCashfreeOrder(order.merchantOrderId);
            console.log('Cashfree order status:', cashfreeData.order_status);

            // Update cashfree status in database
            order.cashfreeStatus = cashfreeData.order_status;
            await order.save();

            if (cashfreeData.order_status === 'ACTIVE') {
                await new Promise(resolve => setTimeout(resolve, 5000));
                
                // retrying to fetch order status
                try {
                    const retryData = await fetchCashfreeOrder(order.merchantOrderId);
                    console.log('Retry check - Order status:', retryData.order_status);
                    
                    // Update cashfree status again
                    order.cashfreeStatus = retryData.order_status;
                    
                    if (retryData.order_status === 'PAID') {
                        console.log('Payment verified as PAID after retry');
                    } else if (retryData.order_status === 'ACTIVE') {
                        // Still processing, return pending status
                        order.paymentStatus = 'PENDING';
                        await order.save();
                        console.log('Payment still processing after retry');
                        return NextResponse.json(
                            { success: false, status: 'PENDING', message: 'Payment is still processing', payment_id: paymentId },
                            { status: 200 }
                        );
                    } else {
                        // Any other status (FAILED, CANCELLED, etc.)
                        order.paymentStatus = 'FAILED';
                        await order.save();
                        console.log('Payment failed after retry:', retryData.order_status);
                        return NextResponse.json(
                            { success: false, status: 'FAILED', message: `Payment ${retryData.order_status.toLowerCase()}`, payment_id: paymentId },
                            { status: 200 }
                        );
                    }
                } catch (retryError) {
                    console.error('Cashfree retry verification error:', retryError);
                    return NextResponse.json({ 
                        success: false, 
                        status: 'FAILED',
                        message: 'Unable to verify payment status. Please try again.',
                        payment_id: paymentId
                    }, { status: 500 });
                }
            } else if (cashfreeData.order_status !== 'PAID') {
                // Handle all non-PAID statuses: FAILED, CANCELLED, EXPIRED, etc.
                order.paymentStatus = 'FAILED';
                await order.save();
                console.log('Payment failed or order status unknown:', cashfreeData.order_status);
                return NextResponse.json(
                    { success: false, status: 'FAILED', message: `Payment ${cashfreeData.order_status.toLowerCase()}`, payment_id: paymentId },
                    { status: 200 }
                );
            } else {
                console.log('Payment verified as PAID immediately');
            }
        } catch (cfError) {
            console.error('Cashfree verification error:', cfError);
            return NextResponse.json({ 
                success: false, 
                status: 'FAILED', 
                message: 'Payment verification failed', 
                payment_id: paymentId 
            }, { status: 500 });
        }        
        
        // Update order payment status
        if (order.paymentStatus !== 'SUCCESS') {
            order.paymentStatus = 'SUCCESS';
        }
        
        // Check for existing registration
        const existingRegistration = await Registration.findOne({ orderId: order._id });
        if (existingRegistration) {
            return NextResponse.json(
                { success: true, status: 'SUCCESS', message: 'Payment verified successfully', payment_id: order.merchantOrderId },
                { status: 200 }
            );
        }
        
        // Create new registration
        const registration = new Registration({
            _id: order.merchantOrderId,
            orderId: order._id,
            signature: order.cashfreeOrderId,
            name: order.name,
            email: order.email,
            phone: order.phone,
            amount: order.amount,
            type: order.type,
            classId: order.classId,
            noOfParticipants: order.noOfParticipants,
            participantsData: order.participantsData
        });
        
        await registration.save();
        
        // Send email if not already sent
        if (!order.mailSent) {
            console.log('Mail sent');
            await mailto(order.type, registration, order.cashfreeOrderId);
            order.mailSent = true;
        }
        
        await order.save();
        return NextResponse.json(
            { success: true, status: 'SUCCESS', message: 'Payment verified successfully', payment_id: order.merchantOrderId },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing payment verification:', error);
        return NextResponse.json(
            { success: false, status: 'FAILED', message: 'Failed to process payment verification', payment_id: paymentId },
            { status: 500 }
        );
    }
}