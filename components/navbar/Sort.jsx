'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownUp } from 'lucide-react';

export default function Sort() {
  const router = useRouter();
  const handleClick = (sort, sortType = 'asc') => {
    const fullUrl = new URL(window.location.href);
    fullUrl.searchParams.set('sort', sort);
    fullUrl.searchParams.set('sortType', sortType);
    router.push(`/${fullUrl.search}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-auto items-center rounded-full sm:-mb-2 md:mb-2   lg:rounded-xl ">
        <div className="rounded-full border-2 border-gray-300 bg-gray-50 p-4 lg:hidden ">
          <ArrowDownUp strokeWidth={3} width={15} height={15} />
        </div>

        <div className="hidden items-center space-x-2 rounded-xl bg-gray-50 p-3 text-xs font-medium ring-1 ring-gray-400 lg:flex">
          <ArrowDownUp strokeWidth={3} width={15} />
          <span>Sort By</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="  rounded-xl drop-shadow-xl">
        <DropdownMenuItem
          className=" hidden cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('')}
        >
          Best Rating
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('price', 'asc')}
        >
          Price: Low to High
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('price', 'desc')}
        >
          Price: High to Low
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('maxGuests', 'asc')}
        >
          Capacity: Low to High
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-md py-3"
          onClick={() => handleClick('maxGuests', 'desc')}
        >
          Capacity: High to Low
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
