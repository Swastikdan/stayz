import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

async function getBooking() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { message: 'Authentication failed. Please log in.' },
      { status: 401 },
    );
  }
  if (session && session.user) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user.role != 'admin') {
      return NextResponse.json(
        { message: 'Access denied. You do not have admin privileges.' },
        { status: 401 },
      );
    }
  }
  try {
    let bookings = await prisma.bookings.findMany({
      include: {
        place: {
          select: {
            id: true,
            title: true,
            photos: true,
            state: true,
            city: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json({ bookings }, { status: 200 });
    // return NextResponse.json({ message: 'hi' });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

async function statusUpdate(request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { message: 'Authentication failed. Please log in.' },
      { status: 401 },
    );
  }
  if (session && session.user) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user.role != 'admin') {
      return NextResponse.json(
        { message: 'Access denied. You do not have admin privileges.' },
        { status: 401 },
      );
    }
  }

  try {
    const { id, status } = await request.json();

    if (status === 'cancelrejected') {
      const booking = await prisma.bookings.update({
        where: { id: id },
        data: {
          cancelRejection: true,
        },
      });
    } else if (status === 'cancelled') {
      const booking = await prisma.bookings.update({
        where: { id: id },
        data: {
          status: status,
          cancelRequest: false,
        },
      });
    } else if ((status === 'approved', 'rejected')) {
      const place = await prisma.bookings.update({
        where: { id: id },
        data: {
          status: status,
        },
      });
    }

    let bookings = await prisma.bookings.findMany({
      include: {
        place: {
          select: {
            id: true,
            title: true,
            photos: true,
            state: true,
            city: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export { getBooking as GET, statusUpdate as POST };
