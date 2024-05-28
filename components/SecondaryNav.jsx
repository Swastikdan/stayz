'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, redirect } from 'next/navigation';

export default function SecondaryNav({navItems , pageName}) {
  
  const pathname = usePathname();
  return (
    <div className="pb-5">
      <h1 className="py-5 text-start text-3xl  font-bold md:text-4xl  xl:text-5xl">
        {pageName}
      </h1>
      <div className="flex w-full items-center justify-center">
        <nav className="flex w-min items-start rounded-full bg-gray-100 p-1.5">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`rounded-full bg-transparent  px-6 py-1.5 text-[16px] ${pathname === item.href ? 'bg-white shadow-md' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
