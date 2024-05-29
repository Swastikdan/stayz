import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(request) {
  const session = await getServerSession();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  if (!id || String(id).length !== 24) {
    return NextResponse.json('Invalid ID', { status: 401 });
  }

  try {
    const place = await prisma.places.findUnique({
      where: { id: String(id) },
      include: { owner:{
        select: { name : true, image: true, id: true }
      
      } },
    });

    if (!place) return new Response('Place not found', { status: 404 });

    let bookingWindows = await getBookingWindows(id);

    // iterate the bookingWindows  and take the first available window [
    //   {
    //     availableFrom: 2024-05-29T13:06:12.671Z,
    //     availableTo: 2024-05-30T12:58:28.836Z
    //   },
    //   {
    //     availableFrom: 2024-05-30T18:30:00.000Z,
    //     availableTo: 2027-12-31T00:00:00.000Z
    //   }
    // ]

    let firstbookingWindow = bookingWindows.find((window) => {
      let now = new Date();
      let availableFrom = new Date(window.availableFrom);
      return now < availableFrom;
    });

    if (session && session.user.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (user && (user.id === place.ownerId || user.role === 'admin')) {
        return NextResponse.json(
          { place, firstbookingWindow },
          { status: 200 },
        );
      }
      return NextResponse.json('Unauthorized', { status: 401 });
    } else {
      if (place.status === 'approved') {
        return NextResponse.json(
          { place, firstbookingWindow },
          { status: 200 },
        );
      } else {
        return NextResponse.json('Unauthorized', { status: 401 });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 500 });
  }
}

async function getBookingWindows(id) {
  const place = await prisma.places.findUnique({
    where: { id: String(id), status: 'approved' },
  });

  if (!place) return [];

  const listTillDate = place.listTillDate
    ? new Date(place.listTillDate)
    : new Date('2027-12-31');

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
