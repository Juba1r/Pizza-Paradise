import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {
    apiVersion: "2026-02-25.clover",
  },
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return NextResponse.json(
      { error: "Webhook signature failed" },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;

        if (orderId) {
          await prisma.payment.updateMany({
            where: { stripePaymentIntentId: paymentIntent.id },
            data: { status: "SUCCEEDED" },
          });
          await prisma.order.update({
            where: { id: orderId },
            data: { status: "CONFIRMED" },
          });
        }
        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await prisma.payment.updateMany({
          where: { stripePaymentIntentId: paymentIntent.id },
          data: { status: "FAILED" },
        });
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
