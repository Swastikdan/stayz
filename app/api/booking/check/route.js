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

     const isAvailable = bookingWindows.some(
       (window) =>
         checkinDate >= new Date(window.availableFrom) &&
         checkoutDate <= new Date(window.availableTo),
     );

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
    return [];
  }

  let bookingWindows = [];
  let lastCheckOut = new Date();

  for (let i = 0; i < bookings.length; i++) {
    const availableFrom = new Date(bookings[i].checkOut);
    const availableTo =
      i < bookings.length - 1
        ? new Date(bookings[i + 1].checkIn)
        : new Date(place.listTillDate);
    let diffTime = Math.abs(availableTo - availableFrom);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= place.minimumStay) {
      bookingWindows.push({ availableFrom, availableTo });
    }
    lastCheckOut = availableTo;
  }

  if (lastCheckOut < new Date(place.listTillDate)) {
    bookingWindows.push({
      availableFrom: lastCheckOut,
      availableTo: new Date(place.listTillDate),
    });
  }

  return bookingWindows;
}


// http://localhost:3000/api/booking/check?checkin=2024-06-08T18:30:00.000Z&checkout=2024-06-26T18:30:00.000Z&placeid=664cdffac95197e78254bbce