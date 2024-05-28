import {NextResponse } from "next/server";
import { headers } from "next/headers";
import stripe from "@/utils/stripe";

export async function POST(request) {
  const headersList = headers();
  const { line_items, customer_email } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      customer_email: customer_email,
      mode: "payment",
      success_url: `${headersList.get("origin")}/thank-you`,
      cancel_url: `${headersList.get("origin")}/`,
    });

    console.log(session); // log the session data

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error creating checkout session" });
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