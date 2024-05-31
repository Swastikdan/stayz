'use client';
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import CatagoryWithSort from './CatagoryWithSort';
import { useSession, signOut } from 'next-auth/react';
import { useUserContext } from '@/providers/UserProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  UserRoundPlus,
  CircleUser,
  LayoutDashboard,
  LogIn,
  LogOut,
  Plus,
  ShieldCheck,
  AlignJustify,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export default function NavBar({ className }) {
  const { data: session } = useSession();

  const user = session?.user;
  const { userData } = useUserContext();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 200;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  return (
    <header
      className={cn(
        ' sticky top-0 z-50 mx-auto flex w-full  flex-col  items-center bg-white   dark:bg-black',
        { ' shadow-md': scrolled },
        className,
      )}
    >
      <nav className=" flex h-full w-full max-w-screen-xl items-center justify-between  px-2">
        <Link
          href="/"
          className="hidden items-center space-x-2 text-sm font-bold md:flex   "
        >
          <Image
            src="/Logo_Transparent.png"
            alt="Stayz"
            width={512}
            height={512}
            priority={true}
            className="h-12 w-12"
          />
          <h1 className="text-2xl xl:text-3xl">Stayz</h1>
        </Link>

        {path === '/' ? (
          <div className="w-full md:w-auto">
            <Suspense
              fallback={
                <>
                  <div className="hidden w-auto md:flex">
                    <div className="hidden w-full  items-center justify-between  rounded-full border-2 border-gray-300 p-1 md:flex ">
                      <div className="  flex justify-between text-sm  ">
                        <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
                          <div className="h-6 w-20  animate-pulse   rounded-l-full rounded-r-md bg-gray-200"></div>
                        </div>

                        <div className="items-center  border-r-2 border-gray-300 px-2 py-1 ">
                          <div className="h-6 w-20  animate-pulse rounded-md bg-gray-200"></div>
                        </div>

                        <div className=" items-center border-gray-300  py-1 pl-2 ">
                          <div className="h-6 w-20  animate-pulse rounded-md bg-gray-200"></div>
                        </div>
                      </div>

                      <div className="ml-3 rounded-full bg-blue-600 p-2.5 text-white  ">
                        <Search width={20} height={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Mobile SearchBar   */}
                  <div className="flex w-full pt-4 md:hidden">
                    <div className="ml-2 flex w-full items-center  rounded-full bg-gray-100  p-1 md:hidden md:w-auto">
                      <div className="mr-2 rounded-full bg-white px-3 py-3">
                        <Search width={20} height={20} />
                      </div>
                      <div className="my-1 mr-4 h-8 w-full animate-pulse rounded-sm bg-gray-200"></div>
                    </div>
                  </div>
                </>
              }
            >
              <SearchBar />
            </Suspense>
          </div>
        ) : (
          <div className="w-full md:w-auto "></div>
        )}

        <div className="hidden select-none py-5 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="m-auto items-center rounded-3xl"
            >
              <div className="flex cursor-pointer items-center rounded-full shadow-black ring-1 ring-gray-300  hover:shadow-xl dark:shadow-white/10 dark:ring-white md:space-x-3 md:px-2  md:py-1 md:pl-3 ">
                <AlignJustify
                  width={18}
                  height={18}
                  strokeWidth={2.5}
                  className="hidden text-gray-600 md:flex"
                />
                <Avatar>
                  {userData && userData.image && userData.name ? (
                    <>
                      <AvatarImage
                        src={userData.image.replace(
                          '/upload/',
                          '/upload/w_200,h_200,c_fill,g_auto/q_auto/f_auto/',
                        )}
                        alt={`${userData.name || 'user'} profile image`}
                      />
                      <AvatarFallback className="bg-gray-200 text-black">
                        {userData.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage
                        src="https://res.cloudinary.com/dp5tomvwb/image/upload/placeholder_guest.jpg"
                        width={20}
                        height={20}
                        className=" h-10 w-10 items-center grayscale"
                        alt="Guest profile image"
                      />
                      <AvatarFallback>
                        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-400"></div>
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className=" rounded-xl    drop-shadow-xl "
            >
              <DropdownMenuLabel className="text-md ">
                Hello ,‎ {userData?.name?.split(' ')[0] || 'Guest'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />

              {user && user?.role === 'admin' ? (
                <Link href="/admin">
                  <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
                    <ShieldCheck width={15} />
                    <span className="pl-2">Admin Pannel</span>
                  </DropdownMenuItem>
                </Link>
              ) : null}
              {user ? (
                <>
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

                  <DropdownMenuSeparator className="h-[.5px]  bg-black dark:bg-white" />
                  <DropdownMenuItem
                    className="group flex cursor-pointer items-center rounded-md font-medium text-red-500 hover:text-red-600 focus:bg-red-100 focus:text-red-600 "
                    onClick={() => signOut()}
                  >
                    <LogOut width={15} className=" " />
                    <span className="pl-2  ">Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href="/register">
                    <DropdownMenuItem className="flex cursor-pointer items-center rounded-md  ">
                      <UserRoundPlus width={15} />{' '}
                      <span className="pl-2">Sign up</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/login">
                    <DropdownMenuItem className="flex cursor-pointer items-center rounded-md ">
                      <LogIn width={15} />{' '}
                      <span className="pl-2 ">Sign in</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/login">
                    <DropdownMenuItem className="flex cursor-pointer items-center rounded-md">
                      <Plus width={15} />
                      <span className="pl-2">
                        List Your Property‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
                      </span>
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      {path === '/' ? (
        <div className="w-full  pt-5">
          <CatagoryWithSort />
        </div>
      ) : null}
    </header>
  );
}
