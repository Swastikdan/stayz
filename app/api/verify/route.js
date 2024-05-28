import stripe from "@/utils/stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function POST(request) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = headers().get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err}`);
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  console.log(`Event: ${JSON.stringify(event)}`);

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log(`checkout.session.async_payment_failed: ${JSON.stringify(checkoutSessionAsyncPaymentFailed)}`);
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log(`checkout.session.async_payment_succeeded: ${JSON.stringify(checkoutSessionAsyncPaymentSucceeded)}`);
      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      console.log(`checkout.session.completed: ${JSON.stringify(checkoutSessionCompleted)}`);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}