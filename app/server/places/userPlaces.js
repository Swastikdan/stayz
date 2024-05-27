'use server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
export default async function userPlaces() {
  const session = await getServerSession();

  const user = session?.user;
  const userEmail = user?.email;

  if (!session) {
    return { code: 401, message: 'Unauthorized' };
  }
  try {
    // Find the user by their email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    // // If the user is not found, return an error
    // if (!user) {
    //   return { code: 404, message: 'User not found' };
    // }

    // Find all places owned by the user
    const places = await prisma.places.findMany({
      where: {
        ownerId: user.id,
      },
    });

    if (!places || places.length === 0) {
      return { code: 404, message: 'Places not found' };
    }

    return places;
  } catch (error) {
    console.error('Error:', error);
    return { code: 500, message: 'Internal Server Error' };
  }
}
