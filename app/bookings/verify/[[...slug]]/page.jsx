
'use client'
import React , {useState , useEffect} from 'react'
import { useRouter , notFound} from 'next/navigation';
export default function BookingVerify({params}) {
  const [loading, setLoading] = useState(true);
const [message, setMessage] = useState('Order Processing , Pleae Wait');
const [redirecturl, setRedirecturl] = useState(null);
const router = useRouter();
useEffect(() => {
  const fetchData = async () => {
    const { slug } = params;
    const sessionId = slug[0];
    const type = slug[1];

    const response = await fetch(`/api/booking/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        type,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      setLoading(false);
      router.push(data.redirecturl);
    } else {
      setMessage(data.message);
      setLoading(false);
      router.push(data.errorUrl || '/');
    }
  };

  fetchData();
});
  return (
    <div>
      <div className="flex min-h-[90vh] flex-col">
        <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
          <div className="flex justify-center space-x-5 text-lg font-s">
            <div
              className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
              role="status"
              aria-label="loading"
            ></div>
            <span>{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// import React from 'react';
// import { getServerSession } from 'next-auth';
// import prisma from '@/lib/prisma';
// import { notFound, redirect } from 'next/navigation';

// export default async function page({params}) {
  
//     const session = await getServerSession();
    
//     if (!session) {
//       console.log('session not found');
//         return redirect('/login');
        
//     }

//     const {slug} = params;

//     const sessionId = slug[0];
//     const type = slug[1];

//     const tempBooking = await prisma.tempbookings.findUnique({
//         where: { sessionId: sessionId },
//     });
//     console.log(tempBooking);
//     if (!tempBooking) {
//       console.log('temp booking not found');
//       return notFound();
//     }
//     if(session && session.user) {

//       const user = await prisma.user.findUnique({
//         where: { email: session.user.email },
//       });

//       console.log(user);

//       if(!user) {
//         console.log('user not found');
//         return notFound();
//       }

//       if (user.id !== tempBooking.userId) {
//         console.log(user.id , tempBooking.userId);
//         console.log('user not matched');
//         return notFound();
//       }

//     }


//     const { placeId  } = tempBooking;
    // if(type === 'cancel') {

    //   // delete the temp booking

    //   await prisma.tempbookings.delete({
    //     where: { sessionId },
    //   });

    //   return redirect(`/place/${placeId}?bookingStatus=cancelled`);
    // }

    // if(type === 'success') {

    //   // first find the booking if the detabase if found then  delete the temp booking and redirect to the booking page

    //   const booking = await prisma.bookings.findUnique({
    //     where: { sessionId },
    //   });

    //   if(booking) {
    //     await prisma.tempbookings.delete({
    //       where: { sessionId },
    //     });

    //     return redirect(`/place/${placeId}?bookingStatus=success`);
    //   }

 
//     }

//   return (
//     <div>
//       <div className="flex min-h-[90vh] flex-col">
//         <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
//           <div className="flex justify-center">
//             <div
//               className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
//               role="status"
//               aria-label="loading"
//             >
//               <span>Order Processing , Pleae Wait </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
