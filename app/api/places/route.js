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
      checkinDate.setDate(checkinDate.getDate() + 1);

      const checkoutDate = new Date(checkout);
      checkoutDate.setDate(checkoutDate.getDate() + 1);
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

  const listTillDate = place.listTillDate
    ? new Date(place.listTillDate)
    : new Date('2027-12-31');

  const bookings = await prisma.bookings.findMany({
    where: {
      placeId: String(id),
      NOT: [
        { status: 'cancelled' },
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
