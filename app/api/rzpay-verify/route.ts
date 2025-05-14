import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import { sendEmail } from "@/lib/server-utils";
import Razorpay from "razorpay";
import Registration from "@/lib/models/Registrations";

const razorpay = new Razorpay({
	key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
	key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function POST(request: NextRequest) {
	try {
		await connectToDatabase();
		const body = await request.json();
		const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;
		const order = await razorpay.orders.fetch(razorpay_order_id);

		if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
			return NextResponse.json(
				{ success: false, message: "Missing payment verification parameters" },
				{ status: 400 }
			);
		}
		const text = `${razorpay_order_id}|${razorpay_payment_id}`;
		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
			.update(text)
			.digest("hex");

		if (expectedSignature !== razorpay_signature) {
			return NextResponse.json(
				{
					success: false,
					message: "Payment verification failed (bad signature)",
				},
				{ status: 400 }
			);
		}
		if (order?.notes?.type === "pass") {
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
				participantsData: [{ name: order.notes.name, arrived: false }],
			});

			await registration.save();
			console.log("Registration saved:", registration);

			const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify?payment_id=${razorpay_payment_id}`;
			const emailHtml = `
            <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2c2c2c; padding: 24px;">
    <h1 style="color: #5a3e2b; font-size: 28px; margin-bottom: 16px;">Payment Confirmation</h1>

    <p style="font-size: 16px; margin-bottom: 12px;">Dear <strong style="color: #3c2f1c;">${order.notes.name}</strong>,</p>

    <p style="font-size: 16px; margin-bottom: 20px;">
        We are pleased to inform you that your payment of 
        <strong style="color: #5a3e2b;">₹${order.amount}</strong> has been successfully processed for 
        <strong style="color: #5a3e2b;">${order.notes.passId}</strong>.
    </p>

    <ul style="list-style: none; padding: 0; font-size: 15px; margin-bottom: 20px;">
        <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Name:</strong> ${order.notes.name}</li>
        <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Email:</strong> ${order.notes.email}</li>
        <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Phone:</strong> ${order.notes.phone || "Not provided"}</li>
        <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Payment ID:</strong> ${razorpay_payment_id}</li>
        <li style="margin-bottom: 8px;"><strong style="color: #4b3621;">Order ID:</strong> ${razorpay_order_id}</li>
    </ul>

    <p style="font-size: 16px; margin-bottom: 24px;">Thank you for your registration. We’re excited to have you on board.</p>

    <p style="font-size: 16px;">
        You can verify your registration by clicking the button below:
    </p>

    <div style="margin-top: 16px;">
        <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #5a3e2b; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px;">
            Verify Registration
        </a>
    </div>

    <p style="font-size: 14px; color: #777777; margin-top: 32px;">
        If you have any questions or need support, feel free to reply to this email.
    </p>
</div>

            `;
			try {
				await sendEmail(
					`${order.notes.email}`,
					`Payment Confirmation: ${razorpay_payment_id}`,
					`Your payment of ${order.amount} has been successfully processed for ${order.notes.passId}.`,
					emailHtml
				);
				console.log("Email sent successfully");
			} catch (error) {
				console.error("Error sending email:", error);
			}
			return NextResponse.json(
				{
					success: true,
					message: "Payment verified successfully",
					data: registration,
				},
				{ status: 200 }
			);
		} else if (order?.notes?.type === "event") {
		}
	} catch (error) {
		console.error("Server Error:", error);
		return NextResponse.json(
			{ success: false, message: "Server Error" },
			{ status: 500 }
		);
	}
}
