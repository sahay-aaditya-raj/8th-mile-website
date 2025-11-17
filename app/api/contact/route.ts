import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/server-utils";

// Rate limiting store: email -> last submission timestamp
const rateLimitStore = new Map<string, number>();
const RATE_LIMIT_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Rate limiting check
    const email = body.email?.toLowerCase();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const now = Date.now();
    const lastSubmission = rateLimitStore.get(email);

    if (lastSubmission && (now - lastSubmission) < RATE_LIMIT_DURATION) {
      const remainingTime = Math.ceil((RATE_LIMIT_DURATION - (now - lastSubmission)) / 60000);
      return NextResponse.json(
        { error: `Please wait ${remainingTime} minutes before sending another message.` },
        { status: 429 }
      );
    }
    
    console.log("Received contact form data:", body.name, body.email, body.message);

    await sendEmail(
      "8thmile@rvce.edu.in",
      "Contact Form Submission",
      `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}\nHave a look at the query`,
      ""

    );
    await sendEmail(
      body.email,
      "Contact Form Submission",
      `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
      ""
    );

    // Update rate limit store after successful submission
    rateLimitStore.set(email, now);

    // Clean up old entries (older than 1 hour)
    for (const [storedEmail, timestamp] of rateLimitStore.entries()) {
      if (now - timestamp > RATE_LIMIT_DURATION) {
        rateLimitStore.delete(storedEmail);
      }
    }

    return NextResponse.json(
      { message: "Message received!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);

    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
