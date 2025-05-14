import Registration from "@/lib/models/Registrations";
import { connectToDatabase } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest){
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
        return NextResponse.json(
            { success: false, message: 'Missing payment_id parameter' },
            { status: 400 }
        );
    }
    const reg_det = await Registration.findById(paymentId);
    if (!reg_det) {
        return NextResponse.json(
            { success: false, message: 'Payment not found' },
            { status: 404 }
        );
    }
    return NextResponse.json(
        { success:true, data: reg_det},
        { status:200 }
    )
    
}