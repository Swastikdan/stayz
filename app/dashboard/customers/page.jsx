'use client';
import {
  Ban,
  Badge,
  Loader,
  BadgeCheck,
  BadgeX,
  LoaderCircle,
  RefreshCw,
  ArrowDownUp,
  ListFilter,
  CircleX,
} from 'lucide-react';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearchParams, useRouter } from 'next/navigation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { format } from 'date-fns';
import Link from 'next/link';

export default function DashboardBooking() {
  const [bookings, setBookings] = useState([]);
  const [pageloading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const filter = searchParams.get('filter');

  const filters = useMemo(() => ['approved', 'processing', 'rejected'], []);

  const isValidFilter = useCallback(
    (filter) => filters.includes(filter),
    [filters],
  );
  // filter the data on client side

  const fetchBookings = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/user/bookings/customers');
      const data = await response.json();
      if (response.ok) {
        setBookings(data);
      } else {
        throw new Error('Failed to load bookings');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setPageLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    let filtered = bookings;
    if (filter && isValidFilter(filter)) {
      filtered = bookings.filter((booking) => booking.status === filter);
    }
    setFilteredBookings(filtered);
  }, [bookings, filter, isValidFilter]);

  const handleRefresh = async () => {
    try {
      fetchBookings();
      toast.success('Bookings refreshed successfully');
    } catch (error) {
      setError(error.message);
    }
  };


  //     for that booking here to fix this "payment": [
  //   {
  //     "status": "paid"
  //   }
  // ],

  const handleFilter = (filter) => {
    if (isValidFilter(filter)) {
      router.push(`/dashboard/bookings?filter=${filter}`);
    } else {
      router.push(`/dashboard/bookings`);
    }
  };

  return (
    <div className="mx-auto flex w-full items-center  justify-center py-10 sm:px-2 lg:px-8 lg:py-14">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
            <div className="w-min overflow-hidden  rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900 ">
              <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-2 py-4 dark:border-gray-700 md:px-5">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Customers Bookings
                </h2>

                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        onClick={handleFilter}
                        className="inline-flex  select-none items-center gap-x-2 rounded-lg border-2 border-gray-500 bg-white px-2 py-1 text-sm text-gray-600 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
                      >
                        <ListFilter width={20} />
                        <span className="hidden md:flex">Filter</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        className="font-semibold text-blue-800 focus:bg-blue-100 focus:text-blue-800"
                        onClick={() => handleFilter(' ')}
                      >
                        Clear
                      </DropdownMenuItem>
                      {filters &&
                        filters.map((filtername) => (
                          <DropdownMenuItem
                            key={filtername}
                            className={` capitalize  ${filter == `${filtername}` ? 'bg-gray-100' : ''} `}
                            onClick={() => handleFilter(`${filtername}`)}
                          >
                            {filtername}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <button
                    disabled={refreshing}
                    onClick={handleRefresh}
                    className="inline-flex select-none items-center gap-x-2 rounded-lg border-2 border-blue-500 bg-white px-2 py-1 text-sm text-blue-600 shadow-sm hover:bg-blue-50 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <RefreshCw
                      width={20}
                      className={refreshing ? 'animate-spin ' : ''}
                    />
                    <span className="hidden md:flex">Refresh</span>
                  </button>
                </div>
              </div>
              {pageloading ? (
                <div className="flex h-56 w-full min-w-[92vw] flex-col  md:min-w-[70vw] ">
                  <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
                    <div className="flex justify-center">
                      <div
                        className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {!Array.isArray(filteredBookings) ||
                  filteredBookings.length === 0 ? (
                    <div className="col-span-4 flex   h-56 flex-1 items-center justify-center py-8 lg:py-16  ">
                      <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
                        <p className=" mt-4 text-gray-500">
                          No bookings found.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ScrollArea className="w-auto max-w-[92vw]  md:max-w-[85vw] ">
                      <div className="flex w-max  items-center justify-center ">
                        <Table className="min-w-max divide-y divide-gray-200 dark:divide-gray-700">
                          <TableHeader>
                            <TableRow>
                              <TableHead
                                scope="col"
                                className="py-1 pe-6 ps-6 text-start lg:ps-3 xl:ps-0"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold  tracking-wide text-gray-800 dark:text-gray-200">
                                    Property
                                  </span>
                                </div>
                              </TableHead>
                              <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                    Customer
                                  </span>
                                </div>
                              </TableHead>
                              <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                    Check In - Check Out
                                  </span>
                                </div>
                              </TableHead>
                              <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                    Status
                                  </span>
                                </div>
                              </TableHead>
                              <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                    Payment
                                  </span>
                                </div>
                              </TableHead>
                              <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                    Invoice
                                  </span>
                                </div>
                              </TableHead>

                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredBookings &&
                              filteredBookings.map((booking) => (
                                <TableRow key={booking.place.id}>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                                      <Link
                                        target="_blank"
                                        href={`/place/${booking.place.id}`}
                                        className="flex items-center gap-x-3"
                                      >
                                        <Avatar className="h-10 w-12 rounded-lg md:h-12 md:w-16 xl:h-16 xl:w-20">
                                          <AvatarImage
                                            className="h-10 w-12 md:h-12 md:w-16 xl:h-16 xl:w-20 "
                                            src={booking.place.photos[0]}
                                            alt="property Image"
                                            width={100}
                                            height={80}
                                          />
                                          <AvatarFallback>
                                            <div className="h-10  w-12 animate-pulse bg-gray-400 md:h-12 md:w-16 xl:h-16 xl:w-20"></div>
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="grow">
                                          <span className="block text-sm font-semibold text-gray-800  md:text-base ">
                                            {booking.place.title}
                                          </span>
                                          <span className="block text-xs text-gray-500 md:text-sm">
                                            {booking.place.city} ,
                                            {booking.place.state}
                                          </span>
                                        </div>
                                      </Link>
                                    </div>
                                  </TableCell>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="flex items-center space-x-2 px-2 py-1 font-medium">
                                      <Avatar>
                                        <AvatarImage
                                          src={booking.user.image.replace(
                                            '/upload/',
                                            '/upload/w_200,h_200,c_fill,g_auto/q_auto/f_auto/',
                                          )}
                                          alt="User Image"
                                        />
                                        <AvatarFallback>
                                          {booking.user.name
                                            .charAt(0)
                                            .toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="pl-2 text-sm">
                                        {booking.user.name}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1 ">
                                      <span className="pl-2 text-sm">
                                        {format(
                                          new Date(booking.checkIn),
                                          'dd MMM yyyy',
                                        ) +
                                          ' - ' +
                                          format(
                                            new Date(booking.checkOut),
                                            'dd MMM yyyy',
                                          )}
                                      </span>
                                    </div>
                                  </TableCell>

                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1">
                                      {booking.status === 'approved' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
                                          <BadgeCheck width={20} />
                                          {new Date(booking.checkOut) <
                                          new Date()
                                            ? 'Completed'
                                            : 'Approved'}
                                        </span>
                                      ) : booking.status === 'processing' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500">
                                          <Loader width={20} />
                                          Processing
                                        </span>
                                      ) : booking.status === 'rejected' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                          <BadgeX width={20} />
                                          Rejected
                                        </span>
                                      ) : booking.status === 'cancelled' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                          <BadgeX width={20} />
                                          Canceled
                                        </span>
                                      ) : booking.checkOut < new Date() ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-500/10 dark:text-gray-500">
                                          <Badge width={20} />
                                          Completed
                                        </span>
                                      ) : null}
                                    </div>
                                  </TableCell>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1">
                                      {booking.payment.status === 'paid' &&
                                      booking.status === 'cancelled' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
                                          <BadgeCheck width={20} />
                                          Refunded
                                        </span>
                                      ) : booking.payment.status === 'paid' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
                                          <BadgeCheck width={20} />
                                          Paid
                                        </span>
                                      ) : booking.payment.status ===
                                        'processing' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500">
                                          <Loader width={20} />
                                          Pending
                                        </span>
                                      ) : booking.payment.status ===
                                        'failed' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                          <BadgeX width={20} />
                                          Payment Failed
                                        </span>
                                      ) : (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-500/10 dark:text-gray-500">
                                          <Badge width={20} />
                                          Unpaid
                                        </span>
                                      )}
                                    </div>
                                  </TableCell>

                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1">
                                      <span className="pl-2 text-sm">
                                        {booking.totalPrice}
                                      </span>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
