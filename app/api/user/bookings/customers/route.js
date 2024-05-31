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
        place: {
          ownerId: user.id,
        },
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
        date: 'desc', // Sort by creation date in descending order
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
