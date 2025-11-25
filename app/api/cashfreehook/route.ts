import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log("Received Cashfree webhook payload POST:", payload);
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