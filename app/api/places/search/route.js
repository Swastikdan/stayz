import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function places(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const id = searchParams.get("id");
  if (id) {
    if (!id || String(id).length !== 24)
      return NextResponse.json("Invalid ID", { status: 401 });

    try {
  const place = await prisma.places.findUnique({
    where: { id: String(id), status: 'approved' },
  });

  if (!place) return new Response('Place not found', { status: 404 });

  // Find bookings for the place
  const bookings = await prisma.bookings.findMany({
    where: { placeId: String(id) },
    orderBy: { checkIn: 'asc' },
  });

  let bookingWindows = [];

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
  }

  place.bookingWindows = bookingWindows;

  return NextResponse.json(place);
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ status: 500 });
    }
  }
  try {
    const places = await prisma.places.findMany({
      where: {
        status: "approved",
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            city: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            state: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              hasSome: [query],
            },
          },
        ],
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(places);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500 });
  }
}

export { places as GET };
