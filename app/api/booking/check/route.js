import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;

  // const { placeid, checkin, checkout } = await request.json();
  const placeid = searchParams.get('placeid');
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');


  if (!placeid || !checkin || !checkout) {
    return NextResponse.json(
      {
        code: 400,
        message: 'All fields are required',
      },
      { status: 400 },
    );
  }

 try {
  const bookingWindows = await getBookingWindows(placeid);
  if (checkin && checkout) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (bookingWindows.length === 0) {
      return NextResponse.json({ isAvailable: true }, { status: 200 }); // The place is available as there are no booking windows
    }

    let isAvailable = true;
    for (let d = new Date(checkinDate); d <= checkoutDate; d.setDate(d.getDate() + 1)) {
      if (!bookingWindows.some(window => d >= new Date(window.availableFrom) && d <= new Date(window.availableTo))) {
        isAvailable = false;
        break;
      }
    }

    return NextResponse.json({ isAvailable: isAvailable }, { status: 200 });
  }

  return NextResponse.json(
    { error: 'Checkin and checkout dates are required' },
    { status: 400 },
  );
} catch (error) {
   return NextResponse.json({ error: error.message }, { status: 500 });
 }
}


async function getBookingWindows(id) {
  const place = await prisma.places.findUnique({
    where: { id: String(id), status: 'approved' },
  });

  if (!place) return [];

  const listTillDate = place.listTillDate ? new Date(place.listTillDate) : new Date('2027-12-31');

  const bookings = await prisma.bookings.findMany({
    where: { 
      placeId: String(id),
      NOT: [
        { status: 'canceled' },
        { status: 'rejected' },
        { status: 'paymentfalse' },
      ],
    },
    orderBy: { checkIn: 'asc' },
  });

  if (bookings.length === 0) {
    return [{ availableFrom: new Date(), availableTo: listTillDate }];
  }

  let bookingWindows = [];
  let lastCheckOut = new Date(bookings[0].checkIn);

  for (let i = 0; i < bookings.length; i++) {
    let availableFrom = new Date(lastCheckOut);
    let availableTo = new Date(bookings[i].checkIn);
    let diffTime = Math.abs(availableTo - availableFrom);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= place.minimumStay) {
      if (availableFrom > availableTo) {
        [availableFrom, availableTo] = [availableTo, availableFrom];
      }
      bookingWindows.push({ availableFrom, availableTo });
    }
    lastCheckOut = new Date(bookings[i].checkOut);
  }

  if (lastCheckOut < listTillDate) {
    bookingWindows.push({
      availableFrom: lastCheckOut,
      availableTo: listTillDate,
    });
  }

  return bookingWindows;
}



// async function getBookingWindows(id) {
//   const place = await prisma.places.findUnique({
//     where: { id: String(id), status: 'approved' },
//   });

//   if (!place) return [];

//   const listTillDate = place.listTillDate ? new Date(place.listTillDate) : new Date('2027-12-31');

//   const bookings = await prisma.bookings.findMany({
//     where: { 
//       placeId: String(id),
//       NOT: [
//         { status: 'canceled' },
//         { status: 'rejected' },
//         { status: 'paymentfalse' },
//       ],
//     },
//     orderBy: { checkIn: 'asc' },
//   });

//   if (bookings.length === 0) {
//     return [{ availableFrom: new Date(), availableTo: listTillDate }];
//   }

//   let bookingWindows = [];
//   let lastCheckOut = new Date(bookings[0].checkIn);

//   for (let i = 0; i < bookings.length; i++) {
//     const availableFrom = new Date(lastCheckOut);
//     const availableTo = new Date(bookings[i].checkIn);
//     let diffTime = Math.abs(availableTo - availableFrom);
//     let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays >= place.minimumStay && availableFrom < availableTo) {
//       bookingWindows.push({ availableFrom, availableTo });
//     }
//     lastCheckOut = new Date(bookings[i].checkOut);
//   }

//   if (lastCheckOut < listTillDate) {
//     bookingWindows.push({
//       availableFrom: lastCheckOut,
//       availableTo: listTillDate,
//     });
//   }

//   return bookingWindows;
// }























// async function getBookingWindows(id) {
//   const place = await prisma.places.findUnique({
//     where: { id: String(id), status: 'approved' },
//   });

//   if (!place) return [];

// const bookings = await prisma.bookings.findMany({
//   where: { 
//     placeId: String(id),
//     NOT: [
//       { status: 'canceled' },
//       { status: 'rejected' },
//       { status: 'paymentfalse' },
//     ],
//   },
//   orderBy: { checkIn: 'asc' },
// });

//   if (bookings.length === 0) {
//     return [];
//   }

//   let bookingWindows = [];
//   let lastCheckOut = new Date();

//   for (let i = 0; i < bookings.length; i++) {
//     const availableFrom = new Date(bookings[i].checkOut);
//     const availableTo =
//       i < bookings.length - 1
//         ? new Date(bookings[i + 1].checkIn)
//         : new Date(place.listTillDate);
//     let diffTime = Math.abs(availableTo - availableFrom);
//     let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays >= place.minimumStay) {
//       bookingWindows.push({ availableFrom, availableTo });
//     }
//     lastCheckOut = availableTo;
//   }

//   if (lastCheckOut < new Date(place.listTillDate)) {
//     bookingWindows.push({
//       availableFrom: lastCheckOut,
//       availableTo: new Date(place.listTillDate),
//     });
//   }

//   return bookingWindows;
// }


// http://localhost:3000/api/booking/check?checkin=2024-06-08T18:30:00.000Z&checkout=2024-06-26T18:30:00.000Z&placeid=664cdffac95197e78254bbce