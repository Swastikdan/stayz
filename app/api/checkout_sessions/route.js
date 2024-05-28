import {NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/utils/stripe";
import { getServerSession } from 'next-auth';
import prisma from "@/lib/prisma";

export async function POST(request) {

const session = await getServerSession();

  const headersList = headers();
  const { order  } = await request.json();
  if (!session) {
    return NextResponse.json({ error: 'You must be logged in to make a purchase' });
  }
  const user = session.user;

  try {
    // Check if customer already exists
    let customers = await stripe.customers.list({ email: user.email });
    let customerId;

    if (customers.data.length) {
      customerId = customers.data[0].id;
    } else {
      // Create customer if not exists
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      });

      console.log(customer); // log the customer data
      customerId = customer.id;
    }
      console.log(customers); // log the customer data
    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order,
      customer_email: user.email,
      mode: 'payment',
      // success_url: `${headersList.get('origin')}/thank-you`,
      cancel_url: `${headersList.get('origin')}/`,
    });

    // console.log(checkoutSession); // log the session data
    
    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating checkout session' });
  }
}



// import {NextResponse } from "next/server";
// import { headers } from "next/headers";
// import stripe from "@/utils/stripe";

// export async function POST(request) {
//   const headersList = headers();
//   const { line_items } = await request.json();

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: line_items,
//       mode: "payment",
//       success_url: `${headersList.get("origin")}/thank-you`,
//       cancel_url: `${headersList.get("origin")}/`,
//     });

//     return NextResponse.json({ sessionId: session.id });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ error: "Error creating checkout session" });
//   }
// }