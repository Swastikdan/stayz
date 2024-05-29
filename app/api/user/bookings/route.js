import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
export async function GET() {
  const session = await getServerSession();

  const user = session?.user;
  const userEmail = user?.email;

  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }
  try {
    const user = await prisma.User.findUnique({
      where: {
        email: userEmail,
      },
    });
    const bookings = await prisma.bookings.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        place: {
          select: {
            id: true,
            title: true,
            photos: true,
            state: true,
            city: true,
          },
        },
        payment: {
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        date: 'desc', // Sort by creation date in ascending order
      },
    });

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ code: 404, message: 'No Bookings Found' });
    }
    const modifiedBookings = bookings.map((booking) => ({
      ...booking,
      payment: booking.payment[0] ? booking.payment[0] : { status: 'notfound' },
    }));
    return NextResponse.json(modifiedBookings);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ code: 500, message: 'Internal Server Error' });
  }
}

export async function POST(request) {
  const session = await getServerSession();

  //   const user = session?.user;
  //   const userEmail = user?.email;

  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  const data = await request.json();
  const bookingId = data.id;
  if (!bookingId) {
    return NextResponse.json({ code: 400, message: 'Booking ID is required' });
  }

  try {
    const booking = await prisma.bookings.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      return NextResponse.json({ code: 404, message: 'Booking not found' });
    }

    // if (booking.userId !== session?.user.id) {
    //   return NextResponse.json({ code: 403, message: 'Forbidden' });
    // }

    if (booking.status !== 'processing') {
      return NextResponse.json({
        code: 400,
        message: 'Booking is not in processing state',
      });
    }

    await prisma.bookings.update({
      where: {
        id: bookingId,
      },
      data: {
        cancelRequest: true,
      },
    });

    const user = await prisma.User.findUnique({
      where: {
        email: session?.user.email,
      },
    });
    const bookings = await prisma.bookings.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        place: {
          select: {
            id: true,
            title: true,
            photos: true,
            state: true,
            city: true,
          },
        },
        payment: {
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        date: 'desc', // Sort by creation date in ascending order
      },
    });

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({
        code: 404,
        message: 'No Bookings Found',
      });
    }
    const modifiedBookings = bookings.map((booking) => ({
      ...booking,
      payment: booking.payment[0] ? booking.payment[0] : { status: 'notfound' },
    }));
    return NextResponse.json(modifiedBookings);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
