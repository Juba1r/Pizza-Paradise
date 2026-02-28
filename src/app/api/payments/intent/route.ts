import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {
    apiVersion: "2026-02-25.clover",
  },
);

export async function POST(request: NextRequest) {
  try {
    const { amount, orderId, currency = "usd" } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: { orderId: orderId || "" },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 },
    );
  }
}
