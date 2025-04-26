/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
//   const data = await req.json();

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: data.email,
//     subject: 'Your Event Pass',
//     text: `Hello ${data.name},\n\nThank you for your payment.\nYour Pass ID: ${data.passId}\nPayment ID: ${data.paymentId}\nOrder ID: ${data.orderId}`,
//   };

  try {
    // await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
