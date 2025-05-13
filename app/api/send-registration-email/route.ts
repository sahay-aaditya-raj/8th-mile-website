import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log('Received registration data:', data); // Log the data

  const mailOptions = {
    from: "process.env.EMAIL_USER",
    to: "data.email",
    subject: `Registration Confirmed:`,
    text: 
      `Hello`,
  };

  try {
    // await transporter.sendMail(mailOptions); // Commented out for logging only
    console.log('Mail options prepared:', mailOptions); // Optional: Log mail content
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error preparing to send registration email:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
