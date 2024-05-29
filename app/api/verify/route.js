import stripe from '@/utils/stripe';
import { headers } from 'next/headers';
import prisma from '@/utils/prisma';
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
    try {
      // Find the booking with the same sessionId and update its status
      const updatedBooking = await prisma.bookings.update({
        where: { sessionId: checkoutSessionAsyncPaymentFailed.id },
        data: { status: 'paymentfalse' },
      });

      // Create a new payment
      const newPayment = await prisma.payments.create({
        data: {
          bookingId: updatedBooking.id,
          userId: updatedBooking.userId, // Assuming the userId is in the updatedBooking object
          amount: checkoutSessionAsyncPaymentFailed.amount_total / 100, // Convert amount from cents to dollars
          paymentId: checkoutSessionAsyncPaymentFailed.payment_intent, // Use payment_intent as paymentId
          paymentemail: checkoutSessionAsyncPaymentFailed.customer_email, // Use customer_email as paymentemail
          invoicename: checkoutSessionAsyncPaymentFailed.customer_details.name, // Use customer_details.name as invoicename
          status: 'failed',
          refundRequest: false,
        },
      });

      console.log('Booking status updated and payment created');
    } catch (e) {
      console.log(e);
    }
    break;
  case 'checkout.session.async_payment_succeeded':
  case 'checkout.session.completed':
    const checkoutSession = event.data.object;
    try {
      // Find the booking with the same sessionId and update its status
      const updatedBooking = await prisma.bookings.update({
        where: { sessionId: checkoutSession.id },
        data: { status: 'approved' },
      });

      // Create a new payment
      const newPayment = await prisma.payments.create({
        data: {
          bookingId: updatedBooking.id,
          userId: updatedBooking.userId, // Assuming the userId is in the updatedBooking object
          amount: checkoutSession.amount_total / 100, // Convert amount from cents to dollars
          paymentId: checkoutSession.payment_intent, // Use payment_intent as paymentId
          paymentemail: checkoutSession.customer_email, // Use customer_email as paymentemail
          invoicename: checkoutSession.customer_details.name, // Use customer_details.name as invoicename
          status: 'paid',
          refundRequest: false,
        },
      });

      console.log('Booking status updated and payment created');
    } catch (e) {
      console.log(e);
    }
    break;
  default:
    console.log(`Unhandled event type ${event.type}`);
}

  return new Response('RESPONSE EXECUTE', {
    status: 200,
  });
}
