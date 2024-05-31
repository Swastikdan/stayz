import React from 'react';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
export default async function layout({ params, children }) {
  const session = await getServerSession();

  if (!session) {
    //console.log('session not found');
    return redirect('/login');
  }

  const { slug } = params;

  const sessionId = slug[0];
  const type = slug[1];

  const tempBooking = await prisma.tempbookings.findUnique({
    where: { sessionId: sessionId },
  });

  if (!tempBooking) {
    return notFound();
  }

  if (session && session.user) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    //console.log(user);

    if (!user) {
      //console.log('user not found');
      return notFound();
    }

    if (user.id !== tempBooking.userId) {
      //console.log(user.id, tempBooking.userId);
      //console.log('user not matched');
      return notFound();
    }
  }

  return <>{children}</>;
}
