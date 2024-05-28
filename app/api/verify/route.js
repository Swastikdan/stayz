import stripe from '@/utils/stripe';
import { headers } from 'next/headers';

export async function POST(request) {
 let body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = request.headers.get('stripe-signature');
  console.log(sig);

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log(
        'checkoutSessionAsyncPaymentFailed',
        checkoutSessionAsyncPaymentFailed,
      );
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log(
        'checkoutSessionAsyncPaymentSucceeded',
        checkoutSessionAsyncPaymentSucceeded,
      );
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      console.log('checkoutSessionCompleted', checkoutSessionCompleted);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response('RESPONSE EXECUTE', {
    status: 200,
  });
}
