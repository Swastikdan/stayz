import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

async function getPlaces() {
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
      const places = await prisma.Places.findMany({
        select: {
          id: true,
          state: true,
          city: true,
          price: true,
          photos: true,
          status: true,
          title: true,
          owner: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
      if (!places) {
        return NextResponse.json(
          { message: 'places not found' },
          { status: 401 },
        );
      }
      return NextResponse.json({ places }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}

async  function updateListing(request){

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

    try{

      const {status , id } = await request.json();

      const place = await prisma.Places.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });

      let places = await prisma.Places.findMany({
        select: {
          id: true,
          state: true,
          city: true,
          price: true,
          photos: true,
          status: true,
          title: true,
          owner: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
      return NextResponse.json({ places }, { status: 200 });
    
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }


}




export { getPlaces as GET , updateListing as POST};
