/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Order from "@/lib/models/Orders";
import Registration from "@/lib/models/Registrations";
import { fetchCashfreeOrder } from "@/lib/cashfree";
import { sendEmail } from "@/lib/server-utils";

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
                        (member: any) =>
                            `<li style="margin-bottom: 8px;">${member.name}</li>`
                    )
                    .join("")}
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
    }

    await sendEmail(registration.email, String(subject), String(plainText), String(emailHtml));
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    // console.log("Received Cashfree webhook payload POST:", payload);

    // Extract order_id from webhook payload
    const orderId = payload?.data?.order?.order_id;

    if (!orderId) {
      console.error("No order_id in webhook payload");
      return NextResponse.json({ status: "error", message: "Missing order_id" }, { status: 400 });
    }

    // Fetch order data from Cashfree to verify payment status
    const cashfreeData = await fetchCashfreeOrder(orderId);
    // console.log("Fetched Cashfree order data:", cashfreeData);

    // Check if payment is successful (order_status should be 'PAID')
    if (cashfreeData.order_status !== 'PAID') {
      console.log(`Payment not successful. Order status: ${cashfreeData.order_status}`);
      return NextResponse.json({ status: "success", message: "Payment not completed" }, { status: 200 });
    }

    // Connect to database and fetch order from MongoDB
    await connectToDatabase();
    const order = await Order.findOne({ merchantOrderId: orderId });

    if (!order) {
      console.error(`Order not found in MongoDB: ${orderId}`);
      return NextResponse.json({ status: "error", message: "Order not found" }, { status: 404 });
    }

    // Check and update payment status if not already SUCCESS
    if (order.paymentStatus !== 'SUCCESS') {
      order.paymentStatus = 'SUCCESS';
      order.cashfreeStatus = cashfreeData.order_status;
      await order.save();
      console.log(`Order ${orderId} payment status updated to SUCCESS`);
    }

    // Check if registration already exists
    const existingRegistration = await Registration.findOne({ orderId: order._id });

    if (!existingRegistration) {
      // Create registration in MongoDB
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
      console.log(`Registration created for order ${orderId}`);

      // Send email if not already sent
      if (!order.mailSent) {
        await mailto(order.type, registration, order.cashfreeOrderId);
        order.mailSent = true;
        await order.save();
        console.log(`Email sent for order ${orderId}`);
      }
    } else {
      console.log(`Registration already exists for order ${orderId}`);

      // Still check if email needs to be sent
      if (!order.mailSent) {
        await mailto(order.type, existingRegistration, order.cashfreeOrderId);
        order.mailSent = true;
        await order.save();
        console.log(`Email sent for existing registration ${orderId}`);
      }
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error processing Cashfree webhook:", error);
    return NextResponse.json({ status: "error", message: "Invalid payload" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log("Received Cashfree webhook payload GET:", payload);
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error processing Cashfree webhook:", error);
    return NextResponse.json({ status: "error", message: "Invalid payload" }, { status: 500 });
  }
}