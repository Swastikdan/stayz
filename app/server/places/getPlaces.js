'use server';
import prisma from '@/lib/prisma';

import { getServerSession } from 'next-auth';
export default async function getPlaces(category, sort , sortType ){
  const session = await getServerSession();
  try {
    // Build where clause for filtering
    const whereClause = {};
    if (category) whereClause.category = { has: category };

    // Build orderBy clause for sorting
    const orderByClause = {};
    if (sort === 'price') orderByClause.price = sortType;
    if (sort === 'maxGuests') orderByClause.maxGuests = sortType;

    if(session && session.user){
      
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      
      const favoriteplaces = await prisma.userFavorites.findMany({
        where: {
          userId: user.id,
        },
      });

      const places = await prisma.places.findMany({
        where: {
          ...whereClause,
          status: 'approved',
        },
        orderBy: orderByClause,
      });

      const placesWithFavorite = places.map((place) => {
        const isFavorite = favoriteplaces.some((fav) => fav.placeId === place.id);
        return { ...place, isFavorite };
      });


      return placesWithFavorite;


    }
    else{
      const places = await prisma.places.findMany({
        where: {
          ...whereClause,
          status: 'approved',
        },
        orderBy: orderByClause,
      });

      return places;
    }
    
  } catch (error) {
    return { error: error.message };
  }

  
}
