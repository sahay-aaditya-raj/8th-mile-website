import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/server-utils";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
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
