// import Razorpay from 'razorpay';
// import { NextRequest, NextResponse } from 'next/server';

// const razorpay = new Razorpay({
//   key_id: process.env.key_id,
//   key_secret: process.env.key_secret,
// });

// export async function POST(request) {
//   const { amount, currency } = await request.json();

//   let options = {
//     amount: amount,
//     currency: currency,
//     receipt: 'rcp1',
//   };
//   const order = await razorpay.orders.create(options);
//   console.log(order);
//   return NextResponse.json({ orderId: order.id }, { status: 200 });
// }


import {NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import shortid from 'shortid';

export async function POST(request) {
//   const { amount } = await request.json();
const amount = 1;
const currency = 'INR'; 
  const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });

  const payment_capture = 1;
  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    return NextResponse.json(
      {
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}




// const Razorpay = require('razorpay');
// const shortid = require('shortid');

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     // Initialize razorpay object
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });

//     // Create an order -> generate the OrderID -> Send it to the Front-end
//     // Also, check the amount and currency on the backend (Security measure)
//     const payment_capture = 1;
//     const amount = 499;
//     const currency = 'INR';
//     const options = {
//       amount: (amount * 100).toString(),
//       currency,
//       receipt: shortid.generate(),
//       payment_capture,
//     };

//     try {
//       const response = await razorpay.orders.create(options);
//       res.status(200).json({
//         id: response.id,
//         currency: response.currency,
//         amount: response.amount,
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(400).json(err);
//     }
//   } else {
//     // Handle any other HTTP method
//   }
// }


