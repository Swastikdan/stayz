import { NextResponse } from "next/server";
import stripe from "@/utils/stripe";

export async function POST(request) {
  const sig = request.headers.get('stripe-signature');
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ received: false, error: err.message });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Print session data
    console.log(`💰 Payment received! ${session}`);

    // Here you can retrieve the customer email and other session details
    const customerEmail = session.customer_details.email;
    console.log(`Customer email: ${customerEmail}`);
  }

  return NextResponse.json({ received: true });
}