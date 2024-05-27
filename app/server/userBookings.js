// 'use server';
// import prisma from '@/lib/prisma';
// import { getServerSession } from 'next-auth';

// export default async function userBookings() {
//   const session = await getServerSession();

//   const userEmail = session?.user?.email;

//   if (!session) {
//     return { code: 401, message: 'Unauthorized' };
//   }
//   try {
//     // Find the user by their email
//     const user = await prisma.user.findUnique({
//       where: {
//         email: userEmail,
//       },
//     });

//     // Find all places owned by the user
//     const bookings = await prisma.booking.findMany({
//       where: {
//         userId: user.id,
//       },
//       include: {
//         user: {
//           select: {
//             name: true,
//             image: true,
//           },
//         },
//         place: true,
//       },
//     });
//     if (!bookings || bookings.length === 0) {
//       return { code: 404, message: 'Bookings not found' };
//     }
//     console.log('bookings', bookings);
//     return bookings;
//   } catch (error) {
//     console.error('Error:', error);
//     return { code: 500, message: 'Internal Server Error' };
//   }
// }

'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function userBookings() {
  const session = await getServerSession();

  const userEmail = session?.user?.email;

  if (!session) {
    return { code: 401, message: 'Unauthorized' };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return { code: 404, message: 'User not found' };
  }
  const useerid = user.id;

  const bookings = await prisma.bookings.findMany({
    where: {
      userId: useerid,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      place: true,
      payment: {
        select: {
          status: true,
        },
      }, // include the entire payment object
    },
  });
  if (!bookings || bookings.length === 0) {
    return { code: 404, message: 'Bookings not found' };
  }

  if (bookings) {
    bookings.forEach((booking, index) => {
      if (booking.payment && booking.payment.length > 0) {
        booking.payment = booking.payment[0]; // Take the first payment object
      } else {
        booking.payment = null; // Set payment to null if there are no payments
      }
    });
  }

  return bookings;
  // const bookings = await prisma.bookings.findMany({
  //   where: {
  //     userId: user.id
  //   },
  //   include: {
  //     user: {
  //       select: {
  //         name: true,
  //         image: true
  //       }
  //     },
  //     place: true
  //   }
  // });

  // if (!bookings || bookings.length === 0) {
  //   return { code: 404, message: 'Bookings not found' };
  // }

  // return bookings;
}
