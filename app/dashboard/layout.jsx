
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SecondaryNav from '@/components/SecondaryNav';
export default async function layout({ children }) {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }

  const navItems = [
    {
      name: 'Bookings',
      href: '/dashboard/bookings',
    },
    // {
    //   name: 'Favorites',
    //   href: '/dashboard/favorites',
    // },
    {
      name: 'Listings',
      href: '/dashboard/listings',
    },
    {
      name:'Customers',
      href:'/dashboard/customers'
    }
  ];
  return (
    <section className="mx-auto h-full min-h-screen w-full max-w-screen-xl items-center  justify-center px-2">
      <SecondaryNav navItems={navItems} pageName="User Dashboard" />

      {children}
    </section>
  );
}
