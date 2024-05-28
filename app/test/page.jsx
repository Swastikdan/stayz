'use client'
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutButton() {
  const redirectToCheckout = async () => {
    try {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY);

      if (!stripe) throw new Error('Stripe failed to initialize.');

      const line_items = [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Room Booking',
          },
          unit_amount: 1000, // Rs. 1000
        },
        quantity: 1,
      }];

      const customer_email = 'customer@example.com'; // replace with the actual customer email

      const checkoutResponse = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ line_items, customer_email }),
      });

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={redirectToCheckout}
      className="rounded-md border border-transparent bg-sky-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 mr-2">
      Checkout
    </button>
  );
}