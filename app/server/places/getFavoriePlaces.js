import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
export default async function getFavorites() {
  const session = await getServerSession();

  if (!session) {
    return { code: 401, message: 'You must be signed in to view favorites' };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const favorites = await prisma.userFavorites.findMany({
    where: {
      userId: user.id,
    },
  });

  const placesWithFavoriteId = await Promise.all(
    favorites.map(async (favorite) => {
      const place = await prisma.places.findUnique({
        where: {
          id: favorite.placeId,
        },
        select: {
            id: true,
          title: true,
          state: true,
          city: true,
          price: true,
          photos: true,
        },
      });
      return {
       place,
      };
    }),
  );

  return placesWithFavoriteId;
}
