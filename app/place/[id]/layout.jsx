'use server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
export async function generateMetadata({ params }) {
      const { id } = params;
    const place = await prisma.places.findUnique({
      where: { id: String(id) },
      select: {
        id: true,
        status: true,
        ownerId: true,
        title: true,
        description: true,
        photos: true,
      },
    });

   return {
     title: `${place.title} - Urban Utopia` ,
     description: place.description
       ? `${place.description.split('.')[0]}.`
       : '',
     openGraph: {
       title: `${place.title} - Urban Utopia`,
       description: place.description
         ? `${place.description.split('.')[0]}.`
         : '',
       url: `https://urbanutopia.vercel.app/place/${place.id}`,
       images: [
         {
           url:
             place.photos && place.photos.length > 0
               ? `${place.photos[0].replace(
                     'upload/',
                     'upload/w_1200,q_30,c_fill/'
                  )
               }`
               : '',
           width: 1200,
           height: 630,
           alt: `${place.title} - Urban Utopia`,
         },
       ],
     },
   };
}

export default async function layout({ params, children }) {
  const session = await getServerSession();
  const { id } = params;

  if (!id || String(id).length !== 24) {
    return notFound();
  }

    const place = await prisma.places.findUnique({
      where: { id: String(id) },
      select: {
        id: true,
        status: true,
        ownerId: true,
      },
    });

  if (!place) return notFound();
    
  if (place.status != 'approved' && (!session || !session.user.email)) {
    return notFound();
  }
  if(session && session.user.email) {
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      role: true,
    },
  });

  if (
    place.status != 'approved' &&
    user.id !== place.ownerId &&
    user.role !== 'admin'
  ) {
    return notFound();
  }
}

  return <main className='min-h-screen'>{children}</main>;
}

