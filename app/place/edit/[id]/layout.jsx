import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
export default async function layout({ children, params }) {
  // Get the session
  const session = await getServerSession();

  // If there's no session, redirect to login
  if (!session) {
    redirect('/login');
    return;
  }

  // Get the id from params
  const id = params.id;

  // If there's no session, or no id, or the id is not 24 characters long, return not found
  if (!session || !id || String(id).length !== 24) {
    return notFound();
  }

  // Find the place with the given id
  const place = await prisma.places.findUnique({ where: { id: String(id) } });

  // If there's no place, return not found
  if (!place) {
    return notFound();
  }

  // Find the user with the given email
  const user = await prisma.User.findUnique({
    where: {
      email: session.user.email,
    },
    select:{
      role: true
    }
  });

  console.log(user);

  // If the user is not the owner of the place and is not an admin, return not found
  if (place.ownerId !== session.user.id && user?.role !== 'admin') {
    return notFound();
  }
  return (
    <section className="mx-auto flex w-full max-w-screen-xl flex-col px-4 md:px-8">
      <div className="flex flex-col space-y-2 pb-10 pt-5">
        <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl xl:text-5xl">
          Edit Place Details
        </h2>
        <span className="px-3 text-right text-sm text-gray-600">
          For more information visit{' '}
          <a
            href="#"
            className="font-semibold text-black underline-offset-4 hover:underline"
          >
            here
          </a>{' '}
        </span>
      </div>

      {children}
    </section>
  );
}
