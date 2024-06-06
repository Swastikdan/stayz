import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  //console.log("POST request received");
  const data = await request.json();
  const { sessionId, type } = data;
  //console.log(`Session ID: ${sessionId}, Type: ${type}`);
  const session = await getServerSession();
  if (!session) {
    //console.log("No session found");
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!sessionId || !type) {
    //console.log("Session ID or type missing");
    return NextResponse.json(
      {
        message: 'All fields are required',
      },
      { status: 400 },
    );
  }

  const tempBooking = await prisma.tempbookings.findUnique({
    where: { sessionId: sessionId },
  });

  const errorurl = `/place/${tempBooking.placeId}?bookingStatus=error`;

  if (!tempBooking) {
    //console.log("Temp booking not found");
    return NextResponse.json(
      {
        message: 'Temp booking not found',
        errorurl,
      },
      { status: 404 },
    );
  }

  if (session && session.user) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      //console.log("User not found");
      return NextResponse.json(
        {
          message: 'User not found',
          errorurl,
        },
        { status: 404 },
      );
    }

    if (user.id !== tempBooking.userId) {
      //console.log("User not matched");
      return NextResponse.json(
        {
          message: 'User not matched',
          errorurl,
        },
        { status: 404 },
      );
    }
  }

  const booking = await prisma.bookings.findUnique({
    where: { sessionId },
  });

  if (booking && type === 'cancel') {
    //console.log("Booking already exists");
    return NextResponse.json(
      {
        message: 'Booking already exists',
        errorurl,
      },
      { status: 400 },
    );
  }

  if (!booking && type === 'success') {
    //console.log("Booking not found");
    return NextResponse.json(
      {
        message: 'Booking not found',
        errorurl,
      },
      { status: 404 },
    );
  }

  const redirecturl = booking
    ? `/place/${booking.placeId}?bookingStatus=${type}`
    : `/place/${tempBooking.placeId}?bookingStatus=${type}`;

  if (type === 'cancel') {
    try {
      await prisma.tempbookings.delete({
        where: { sessionId },
      });

      //console.log("Order Cancelled");
      return NextResponse.json(
        { redirecturl, message: 'Order Cancelled' },
        { status: 200 },
      );
    } catch (e) {
      //console.log("Error cancelling booking: ", e);
      return NextResponse.json(
        {
          message: 'Error cancelling booking',
          errorurl,
        },
        { status: 500 },
      );
    }
  }

  if (type === 'success') {
    try {
      const paymentinfo = await prisma.payments.findUnique({
        where: { bookingId: booking.id },
      });

      if (paymentinfo) {
        //console.log("Order Successfully Processed");
        return NextResponse.json(
          { redirecturl, message: 'Order Sucessfully Processed' },
          { status: 200 },
        );
      } else {
        //console.log("Payment info not found");
        return NextResponse.json(
          {
            redirecturl,
            message: 'Payment info not found',
          },
          { status: 200 },
        );
      }
    } catch (e) {
      //console.log("Error verifying booking: ", e);
      return NextResponse.json(
        {
          message: 'Error verifying booking',
          errorurl,
        },
        { status: 500 },
      );
    } finally{
      // delte the temp booking
      await prisma.tempbookings.delete({
        where: { sessionId },
      });
    }
  }
}

// export async function POST(request) {

//     const data = await request.json();
//     const { sessionId, type } = data;
//     const session = await getServerSession();
//     if (!session) {

//         return NextResponse.json({message: "Unauthorized" } , {status: 401});
//     }

//     if (!sessionId || !type) {
//         return NextResponse.json({
//             message: "All fields are required",
//         }, { status: 400 });
//     }

//     const tempBooking = await prisma.tempbookings.findUnique({
//         where: { sessionId: sessionId },
//     });

//     if (!tempBooking) {
//         return NextResponse.json({
//             message: "Temp booking not found",
//         }, { status: 404 });
//     }

//     if (session && session.user) {
//         const user = await prisma.user.findUnique({
//             where: { email: session.user.email },
//         });

//         if (!user) {
//             return NextResponse.json({
//                 message: "User not found",
//             }, { status: 404 });
//         }

//         if (user.id !== tempBooking.userId) {
//             return NextResponse.json({
//                 message: "User not matched",
//             }, { status: 404 });
//         }
//     }

//         const booking = await prisma.bookings.findUnique({
//             where: { sessionId },
//         });
// const redirecturl = `/place/${tempBooking.placeId}?bookingStatus=${type}` || `/place/${booking.placeId}?bookingStatus=${type}`;
//         if(booking && type === 'cancel') {
//             return NextResponse.json({
//                 message: "Booking already exists",
//             }, { status: 400 });
//         }

//         if(!booking && type === 'success') {
//             return NextResponse.json({
//                 message: "Booking not found",
//             }, { status: 404 });
//         }

//     if(type === 'cancel') {
//  try
//     {
//         await prisma.tempbookings.delete({
//             where: { sessionId },
//         });

//         return NextResponse.json({redirecturl , message:"Order Cancelled"} , {status: 200});
//     } catch (e) {
//         //console.log(e);
//         return NextResponse.json({
//             message: "Error cancelling booking",
//         }, { status: 500 });

//     }

// }

// if(type === 'success') {
//     try {

//            const paymentinfo = await prisma.payments.findUnique({
//         where: { bookingId: booking.id },
//     });

//         if(paymentinfo) {

//             return NextResponse.json({redirecturl , message:"Order Sucessfully Processed"}, { status: 200 });

//         } else {

//             return NextResponse.json({
//                 message: "Payment info not found",
//             }, { status: 200 });

//         }
//     }   catch (e) {
//         //console.log(e);
//         return NextResponse.json({
//             message: "Error verifying booking",
//         }, { status: 500 });
//     }
// }

//     }

// if(type === 'cancel') {

//   // delete the temp booking

//   await prisma.tempbookings.delete({
//     where: { sessionId },
//   });

//   return redirect(`/place/${placeId}?bookingStatus=cancelled`);
// }

// if(type === 'success') {

//   // first find the booking if the detabase if found then  delete the temp booking and redirect to the booking page

//   const booking = await prisma.bookings.findUnique({
//     where: { sessionId },
//   });

//   if(booking) {
//     await prisma.tempbookings.delete({
//       where: { sessionId },
//     });

//     return redirect(`/place/${placeId}?bookingStatus=success`);
//   }
