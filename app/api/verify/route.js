import stripe from '@/utils/stripe';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(request) {
  let body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = request.headers.get('stripe-signature');
  //console.log(sig);

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    //console.log(`Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      try {
        // Find the temp booking with the same sessionId
        const tempBooking = await prisma.tempbookings.findUnique({
          where: { sessionId: checkoutSessionAsyncPaymentFailed.id },
        });

        if (tempBooking) {
          // Create a new booking with the data from the temp booking
          const newBooking = await prisma.bookings.create({
            data: {
              ...tempBooking,
              status: 'paymentfalse',
              paymentLink: null, // Remove the payment link
            },
          });

          // Create a new payment
          const newPayment = await prisma.payments.create({
            data: {
              bookingId: newBooking.id,
              userId: newBooking.userId,
              amount: checkoutSessionAsyncPaymentFailed.amount_total / 100,
              paymentId: checkoutSessionAsyncPaymentFailed.payment_intent,
              paymentemail: checkoutSessionAsyncPaymentFailed.customer_email,
              invoicename:
                checkoutSessionAsyncPaymentFailed.customer_details.name,
              status: 'failed',
              refundRequest: false,
            },
          });

          //console.log('Booking created and payment failed');
        }
      } catch (e) {
        //console.log(e);
      }
      break;
    case 'checkout.session.async_payment_succeeded':
    case 'checkout.session.completed':
      const checkoutSession = event.data.object;
      try {
        // Find the temp booking with the same sessionId
        const tempBooking = await prisma.tempbookings.findUnique({
          where: { sessionId: checkoutSession.id },
        });

        if (tempBooking) {
          // Create a new booking with the data from the temp booking
          const newBooking = await prisma.bookings.create({
            data: {
              ...tempBooking,
              status: 'approved',
              paymentLink: null, // Remove the payment link
            },
          });

          // Create a new payment
          const newPayment = await prisma.payments.create({
            data: {
              bookingId: newBooking.id,
              userId: newBooking.userId,
              amount: checkoutSession.amount_total / 100,
              paymentId: checkoutSession.payment_intent,
              paymentemail: checkoutSession.customer_email,
              invoicename: checkoutSession.customer_details.name,
              status: 'paid',
              refundRequest: false,
            },
          });

          //console.log('Booking created and payment succeeded');
        }
      } catch (e) {
        //console.log(e);
      }
      break;
    default:
    //console.log(`Unhandled event type ${event.type}`);
  }

  return new Response('RESPONSE EXECUTE', {
    status: 200,
  });
}
