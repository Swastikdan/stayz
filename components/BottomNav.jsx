'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  Home,
  LayoutDashboard,
  ShieldCheck,
  Plus,
  UserRoundPlus,
  LogIn,
  BookHeart,
  CircleUser,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserContext } from '@/providers/UserProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
export default function BottomNav() {
  const { data: session } = useSession();
  const { userData: user } = useUserContext();
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
      <div className="mx-auto flex  h-full  max-w-[15rem] justify-center  py-2 ">
        <Link
          href="/"
          className={`inline-flex flex-col items-center justify-center rounded-full px-6 ${pathname === '/' ? ' text-primary ' : 'font-light'}}`}
        >
          <Home size={28} className="my-1" />
          <span className="pt-1 text-xs ">Home</span>
        </Link>

        <Link
          href={session?.user ? '/account/favorites' : '/login'}
          className={`inline-flex flex-col items-center justify-center rounded-xl px-6 ${pathname === '/account/favorites' ? ' text-primary ' : 'font-light'}'}`}
        >
          <BookHeart size={28} className="my-1" />
          <span className="pt-1 text-xs ">Favorites</span>
        </Link>

        {session?.user && user && user?.image && user?.name ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="m-auto items-center rounded-3xl "
            >
              <div
                className={`inline-flex flex-col items-center justify-center rounded-xl px-6 ${pathname === '/account' || pathname === '/dashboard' || pathname === '/admin' || pathname === '/place/new' ? ' text-primary ' : 'font-light'}`}
              >
                <Avatar
                  className={`p-.5 h-7 w-7  ${pathname === '/account' || pathname === '/dashboard' || pathname === '/admin' || pathname === '/place/new' ? ' ring-[2px] ring-primary ' : ''}`}
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
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className=" min-w-[60vw] rounded-2xl  py-4  drop-shadow-xl "
            >
              {user && user?.role === 'admin' ? (
                <Link href="/admin">
                  <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
                    <ShieldCheck width={15} />
                    <span className="pl-2">Admin Pannel</span>
                  </DropdownMenuItem>
                </Link>
              ) : (
                <div></div>
              )}

              <Link href="/account">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
                  <CircleUser width={15} />
                  <span className="pl-2">Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
                  <LayoutDashboard width={15} />{' '}
                  <span className="pl-2">Dashboard</span>
                </DropdownMenuItem>
              </Link>

              <Link href="/place/new">
                <DropdownMenuItem className="flex cursor-pointer items-center rounded-md ">
                  <Plus width={15} />
                  <span className="pl-2">
                    List Your Property‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
                  </span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className="inline-flex flex-col items-center  justify-center px-6  "
          >
            <Avatar className="p-.5 h-7 w-7">
              <AvatarImage
                src="https://res.cloudinary.com/dp5tomvwb/image/upload/placeholder_guest.jpg"
                alt="Guest profile image"
                className="rounded-full grayscale"
              />
              <AvatarFallback>
                <div className="p-.5 h-7 w-7 animate-pulse rounded-full bg-gray-200"></div>
              </AvatarFallback>
            </Avatar>
            <span className="pt-1 text-xs font-light">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
