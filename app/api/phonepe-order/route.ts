import { NextRequest, NextResponse } from 'next/server';
import { StandardCheckoutPayRequest } from 'pg-sdk-node';
import { getPass } from '@/data/passes';
import { client } from '@/lib/phonepay';
import Order from '@/lib/models/Orders';
import { connectToDatabase } from '@/lib/db';
import Event from '@/lib/models/Event'

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
        
            const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?payment_id=${merchantOrderId}`;
        
            // Create PhonePe payment request
            const request = StandardCheckoutPayRequest.builder()
                .merchantOrderId(merchantOrderId)
                .amount(pass.price * 100) // Convert to paise
                .redirectUrl(redirectUrl)
                .build();

            const response = await client.pay(request);
            console.log('Payment response:', response);

            // Create order in the database
            const order = new Order({
                _id: response.orderId,
                merchantOrderId,
                phonePayOrderId: response.orderId,
                amount: pass.price,
                paymentStatus: 'PENDING',
                mailSent: false,
                name,
                email,
                phone,
                type: 'pass',
                classId: pass.id,
                noOfParticipants: 1,
                participantsData: [{ name, arrived: false }],
            });

            await order.save();

            return NextResponse.json(
                {success: true, checkoutPageUrl: response.redirectUrl},
                { status: 200 });
        } else if(body?.type === "event"){
            const { eventId, name, email, phone, teamSize, teamMembers, feeType, registrationFee, totalAmount, merchantOrderId } = body?.data;
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
            const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?payment_id=${merchantOrderId}`;
            const request = StandardCheckoutPayRequest.builder()
                .merchantOrderId(merchantOrderId)
                .amount(totalAmount * 100) // Convert to paise
                .redirectUrl(redirectUrl)
                .build();

            const response = await client.pay(request);
            console.log('Payment response:', response);

            const order = new Order({
                _id: response.orderId,
                merchantOrderId,
                phonePayOrderId: response.orderId,
                amount: totalAmount,
                paymentStatus: 'PENDING',
                mailSent: false,
                name,
                email,
                phone,
                type: 'event',
                classId: eventval.id,
                noOfParticipants: teamSize,
                participantsData: teamMembers.map((member:string) => ({ name: member, arrived: false })),
            });

            await order.save();

            return NextResponse.json(
                {success: true, checkoutPageUrl: response.redirectUrl},
                { status: 200 });

        } else {
            return NextResponse.json({success: false, message: "Bad Req"},{status: 500})
        }

    } catch (error) {
        console.error('Error creating order:', error);
            return NextResponse.json(
                { success: false, message: 'Failed to create order' },
                { status: 500 }
            );
    }
}