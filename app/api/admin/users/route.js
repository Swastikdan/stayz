import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

async function getUser() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'you have to login' }, { status: 401 });
  }
  if (session && session.user) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user.role != 'admin') {
      return NextResponse.json({ message: 'admin not found' }, { status: 401 });
    }

    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          image: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({ users }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}

async function deleteUser(request, { params }) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'you have to login' }, { status: 401 });
  }
  if (session && session.user) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user.role != 'admin') {
      return NextResponse.json({ message: 'admin not found' }, { status: 401 });
    }

    try {
      const searchParams = request.nextUrl.searchParams;
      const id = searchParams.get('id');

      if (!id) {
        return NextResponse.json(
          { message: 'User id is required' },
          { status: 400 },
        );
      }

      // Delete the user based on the id
      await prisma.user.delete({
        where: { id: id },
      });

      // Fetch all users after the deletion
      const users = await prisma.user.findMany({
        select: {
          id: true,
          image: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json(
        { message: 'User deleted successfully', users },
        { status: 200 },
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
  }
}

async function updateUserStatus(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { message: 'Authentication failed. Please log in.' },
      { status: 401 },
    );
  }
  let sessionuser = null;
  if (session && session.user) {
    sessionuser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (sessionuser.role != 'admin') {
      return NextResponse.json(
        { message: 'Access denied. You do not have admin privileges.' },
        { status: 401 },
      );
    }
  }

  // just take the id from request body and update the status to admin and if admin then update to user

  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    let message = '';

    if (sessionuser.id == user.id) {
      return NextResponse.json(
        { message: 'You cannot change your own role' },
        { status: 400 },
      );
    }



    if (user.role === 'admin') {
      message = 'Updated to User';
      await prisma.user.update({
        where: { id: id },
        data: {
          role: 'user',
        },
      });
    } else {
      message = 'Updated to Admin';
      await prisma.user.update({
        where: { id: id },
        data: {
          role: 'admin',
        },
      });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ message, users });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export { getUser as GET, deleteUser as DELETE, updateUserStatus as POST };
