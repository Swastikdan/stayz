import { NextResponse, NextRequest } from "next/server";
import stripe from "@/utils/stripe";

// Custom middleware to get raw body
const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      resolve(data);
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

export async function POST(request) {
  const sig = request.headers.get('stripe-signature');
  let event;

  // Get raw body
  const rawBody = await getRawBody(request);

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
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

export { config };