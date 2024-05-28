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
    const listings = await prisma.Places.findMany({
      where: {
        ownerId: user.id,
      },
      select: {
        id: true,
        title: true,
        photos: true,
        state: true,
        city: true,
        price: true,
        status: true,
        deleterequst: true,
      },
    });
    if (!listings || listings.length === 0) {
      return NextResponse.json({ code: 404, message: 'No Listings Found' });
    }
    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ code: 500, message: 'Internal Server Error' });
  }
}

export async function POST(request) {
    const session = await getServerSession();
    
    const user = session?.user;
    const userEmail = user?.email;
    if (!session) {
      return NextResponse.json({ code: 401, message: 'Unauthorized' });
    }

    const { id } = await request.json();

    try {
      const user = await prisma.User.findUnique({
        where: {
          email: userEmail,
        },
      });
      const listing = await prisma.Places.findUnique({
        where: {
          id: id,
        },
      });
      if (!listing) {
        return NextResponse.json({ code: 404, message: 'Listing not found' });
      }
      if (listing.ownerId !== user.id) {
        return NextResponse.json({
          code: 403,
          message: 'You are not authorized to remove this listing',
        });
      }
        // update the place deleterequst to true
        const updatedListing = await prisma.Places.update({
          where: {
            id: id,
          },
          data: {
            deleterequst: true,
          },
        });

      const listings = await prisma.Places.findMany({
        where: {
          ownerId: user.id,
        },
        select: {
          id: true,
          title: true,
          photos: true,
          state: true,
          city: true,
          price: true,
          status: true,
          deleterequst: true,
        },
      });
      return NextResponse.json(listings);
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ code: 500, message: 'Internal Server Error' });
    }


}