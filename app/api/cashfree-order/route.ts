import { NextRequest, NextResponse } from 'next/server';
import { getPass } from '@/data/passes';
import { createCashfreeOrder, CashfreeOrderRequest } from '@/lib/cashfree';
import Order from '@/lib/models/Orders';
import { connectToDatabase } from '@/lib/db';
import Event from '@/lib/models/Event';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();
    
        if (body?.type === "pass") {
            const { passId, name, email, phone, merchantOrderId } = body?.data;
            const pass = getPass(passId);

            if (!pass) {
                return NextResponse.json(
                { success: false, message: 'Invalid pass selected' },
                { status: 400 }
                );
            }
        
            const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?payment_id=${merchantOrderId}`;

            const orderRequest: CashfreeOrderRequest = {
                order_id: merchantOrderId,
                order_amount: Number(pass.price),
                order_currency: 'INR',
                customer_details: {
                    customer_id: email.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, ""),
                    customer_name: name,
                    customer_email: email.toLowerCase(),
                    customer_phone: phone.trim(),
                },
                order_meta: {
                    return_url: redirectUrl,
                    notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/verify`,
                },
                order_note: `Pass purchase: ${pass.name}`,
            };

            const response = await createCashfreeOrder(orderRequest);

            if (!response?.payment_session_id) {
                console.error('Invalid Cashfree response:', response);
                return NextResponse.json(
                    { success: false, message: 'Failed to create Cashfree order', details: response },
                    { status: 500 }
                );
            }

            const paymentMode = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' ? 'production' : 'sandbox';

            const order = new Order({
                _id: response.order_id,
                merchantOrderId,
                cashfreeOrderId: response.cf_order_id,
                paymentSessionId: response.payment_session_id,
                currency: response.order_currency,
                mode: paymentMode,
                amount: Number(pass.price),
                paymentStatus: 'PENDING',
                cashfreeStatus: response.order_status,
                mailSent: false,
                name,
                email,
                phone,
                type: 'pass',
                classId: pass.id,
                noOfParticipants: 1,
                participantsData: [{ name, arrived: false }],
                rawPaymentResponse: response,
            });

            await order.save();

            return NextResponse.json(
                {
                    success: true,
                    paymentSessionId: response.payment_session_id,
                    orderId: response.order_id
                },
                { status: 200 }
            );
        } else if(body?.type === "event"){
            const { eventId, name, email, phone, teamSize, teamMembers, feeType, totalAmount, merchantOrderId } = body?.data;
            const eventval = await Event.findById(eventId);
            if(!eventval){
                return NextResponse.json({success: false, message: "Invalid event selected"},{status: 400});
            }
            if(feeType!=eventval.feetype){
                return NextResponse.json({success: false, message: "Invalid fee type"},{status: 400});
            }
            if(feeType === 'individual'? (teamSize*eventval.registrationFee!=totalAmount):(eventval.registrationFee!=totalAmount)){
                return NextResponse.json({success: false, message: "Invalid total amount"},{status: 400});
            }
            const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?payment_id=${merchantOrderId}`;
            
            const orderRequest: CashfreeOrderRequest = {
                order_id: merchantOrderId,
                order_amount: Number(totalAmount),
                order_currency: 'INR',
                customer_details: {
                    customer_id: email.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, ""),
                    customer_name: name,
                    customer_email: email.toLowerCase(),
                    customer_phone: phone.trim(),
                },
                order_meta: {
                    return_url: redirectUrl,
                    notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/verify`,
                },
                order_note: `Event registration: ${eventval.name}`,
            };

            const response = await createCashfreeOrder(orderRequest);

            if (!response?.payment_session_id) {
                console.error('Invalid Cashfree response:', response);
                return NextResponse.json(
                    { success: false, message: 'Failed to create Cashfree order', details: response },
                    { status: 500 }
                );
            }

            const paymentMode = process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' ? 'production' : 'sandbox';

            const order = new Order({
                _id: response.order_id,
                merchantOrderId,
                cashfreeOrderId: response.cf_order_id,
                paymentSessionId: response.payment_session_id,
                currency: response.order_currency,
                mode: paymentMode,
                amount: Number(totalAmount),
                paymentStatus: 'PENDING',
                cashfreeStatus: response.order_status,
                mailSent: false,
                name,
                email,
                phone,
                type: 'event',
                classId: eventval.id,
                noOfParticipants: teamSize,
                participantsData: teamMembers.map((member: string) => ({ name: member, arrived: false })),
                rawPaymentResponse: response,
            });

            await order.save();

            return NextResponse.json(
                {
                    success: true,
                    paymentSessionId: response.payment_session_id,
                    orderId: response.order_id
                },
                { status: 200 }
            );

        } else {
            return NextResponse.json({success: false, message: "Bad Req"},{status: 500})
        }

    } catch (error) {
        console.error('Error creating order:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message || 'Failed to create order' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Failed to create order' },
            { status: 500 }
        );
    }
}
