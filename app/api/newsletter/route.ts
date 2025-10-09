// app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { serverClient } from "@/app/lib/sanity.server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await serverClient.fetch(
      `*[_type == "newsletterSubscriber" && email == $email][0]`,
      { email }
    );
    if (existing) {
      return NextResponse.json(
        { message: "You are already subscribed!" },
        { status: 200 }
      );
    }

    // Create new subscriber
    await serverClient.create({
      _type: "newsletterSubscriber",
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Try again later." },
      { status: 500 }
    );
  }
}
