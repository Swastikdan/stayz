"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Home, LayoutDashboard, ShieldCheck ,  Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserContext } from '@/providers/UserProvider';
export default function BottomNav() {

  const { data: session } = useSession();
  // const [user, setUser] = useState(null);
  const { userData: user } = useUserContext();
  // useEffect(() => {
  //   if (session) {
  //     fetch(`/api/user/${session.user.id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUser(data);
  //       });
  //   }
  // }, [session]);

   const pathname = usePathname();

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const isScrollingUp = scrollY < lastScrollTop;

      setLastScrollTop(scrollY);
      setIsVisible(isScrollingUp || scrollY <= 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div
      className={`fixed bottom-0  left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700 md:hidden ${
        isVisible ? 'slide-down' : 'slide-up'
      }`}
    >
      <div className="mx-auto flex  h-full  max-w-[15rem] justify-center space-x-10 py-2 ">
        <Link
          href="/"
          className={`inline-flex flex-col items-center justify-center ${pathname === '/' ? ' text-primary ' : 'font-light'}`}
        >
          <Home size={28} className="my-1" />
          <span className="pt-1 text-xs ">Home</span>
        </Link>

        <Link
          href={user ? '/dashboard' : '/login'}
          className={`inline-flex flex-col items-center justify-center ${pathname === '/dashboard' ? ' text-primary ' : 'font-light'}`}
        >
          <LayoutDashboard size={28} className="my-1" />
          <span className="pt-1 text-xs ">Dashboard</span>
        </Link>

        {user && user.role === 'admin' && (
          <Link
            href="/admin"
            className={`inline-flex flex-col items-center justify-center ${pathname === '/admin/bookings' ? ' text-primary ' : 'font-light'}`}
          >
            <ShieldCheck size={28} className="my-1" />
            <span className="pt-1 text-xs ">Admin</span>
          </Link>
        )}

        {user && user.image && user.name ? (
          <Link
            href="/account"
            className={`inline-flex flex-col items-center justify-center ${pathname === '/account' ? ' text-primary ' : 'font-light'}`}
          >
            <Avatar
              className={`h-8 w-8  ${pathname === '/account' ? ' ring-[2px] ring-primary ' : ''}`}
            >
              <AvatarImage
                src={user?.image.replace(
                  '/upload/',
                  '/upload/w_200,h_200,c_fill,g_auto/q_auto/f_auto/',
                )}
                alt={`${user.name || 'user'} profile image`}
              />
              <AvatarFallback className="bg-black text-white">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="pt-1 text-xs ">Profile</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex flex-col  items-center justify-center  "
          >
            <Avatar className="h-8 w-8 ">
              <AvatarImage
                src="https://res.cloudinary.com/dp5tomvwb/image/upload/placeholder_guest.jpg"
                alt="Guest profile image"
                className="rounded-full grayscale"
              />
              <AvatarFallback>
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
              </AvatarFallback>
            </Avatar>
            <span className="pt-1 text-xs font-light">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
