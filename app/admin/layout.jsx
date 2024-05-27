import SecondaryNav from '@/components/SecondaryNav';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function layout({ children }) {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }
  if (session && session.user) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (user.role != 'admin') {
      notFound();
    }
  }

  const navItems = [
    {
      name: 'Bookings',
      href: '/admin/bookings',
    },
    {
      name: 'Users',
      href: '/admin/users',
    },
    {
      name: 'Listings',
      href: '/admin/listings',
    },
  ];

  return (
    <section className="mx-auto h-full min-h-screen w-full max-w-screen-xl items-center  justify-center px-2">
      <SecondaryNav navItems={navItems} pageName="Admin Dashboard" />

      {children}
    </section>
  );
}
