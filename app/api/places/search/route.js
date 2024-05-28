import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(request) {
  const session = await getServerSession();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  if(!id || String(id).length !== 24) {
    return NextResponse.json('Invalid ID', { status: 401 });
  }

  try {
    const place = await prisma.places.findUnique({
      where: { id: String(id)},
    });

    if (!place) return new Response('Place not found', { status: 404 });

    // const bookingWindows = await getBookingWindows(id);

    if(session && session.user.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if(user && (user.id === place.ownerId || user.role === 'admin')) {
        return NextResponse.json(place,{status: 200});
      }
      return NextResponse.json('Unauthorized', { status: 401 });
    } else {
      if(place.status === 'approved') {
        return NextResponse.json({place, bookingWindows}, {status: 200});
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

  const bookings = await prisma.bookings.findMany({
    where: { placeId: String(id) },
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