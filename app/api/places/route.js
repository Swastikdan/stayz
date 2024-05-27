import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const sortType = searchParams.get('sortType') || '';
  const location = searchParams.get('location') || '';
  const checkin = searchParams.get('checkin') || '';
  const checkout = searchParams.get('checkout') || '';
  let adults = parseInt(searchParams.get('adults') || '0', 10);
  const children = parseInt(searchParams.get('children') || '0', 10);
  if (adults === 0 && children > 0) {
    adults++;
  }
  const totalGuests = adults + children;


  try {
    const whereClause = category ? { category: { has: category } } : {};

    const orderByClause = {};
    if (sort === 'price') orderByClause.price = sortType;
    if (sort === 'maxGuests') orderByClause.maxGuests = sortType;

    const locationFilter = location
      ? {
          OR: [
            { state: { contains: location } },
            { city: { contains: location } },
            { address: { contains: location } },
          ],
        }
      : {};


    const guestsFilter =
      totalGuests > 0
        ? {
            maxGuests: {
              gte: totalGuests,
            },
          }
        : {};

    const filters = {
      ...whereClause,
      ...locationFilter,
      ...guestsFilter,
      status: 'approved',
    };


    let places = await prisma.places.findMany({
      where: filters,
      orderBy: orderByClause,
    });

    if (checkin && checkout) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);

      places = await Promise.all(
        places.map(async (place) => {
          const bookingwindows = await getBookingWindows(place.id);
          if (bookingwindows.length === 0) {
            return place;
          }
          const isAvailable = bookingwindows.some(
            (window) =>
              checkinDate >= new Date(window.availableFrom) &&
              checkoutDate <= new Date(window.availableTo),
          );
          return isAvailable ? place : null;
        }),
      );

      places = places.filter(Boolean);
    }

    if (places.length === 0) {
      return NextResponse.json({ message: 'No places found' }, { status: 400 });
    }

    return NextResponse.json(places, { status: 200 });
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
