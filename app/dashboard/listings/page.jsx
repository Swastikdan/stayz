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
  Plus,
  HelpCircle,
  PenSquare,
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

export default function UserListings() {
  const [listings, setListings] = useState([]);
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

  const fetchListings = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/user/listings');
      const data = await response.json();
      if (response.ok) {
        setListings(data);
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
    fetchListings();
  }, []);

  const [filteredListings, setFilteredListings] = useState([]);
  useEffect(() => {
    if (!filter) {
      setFilteredListings(listings);
    } else if (isValidFilter(filter)) {
      setFilteredListings(
        listings.filter((listing) => listing.status === filter),
      );
    } else {
      router.replace('/dashboard/bookings');
    }
  }, [listings, filter, isValidFilter, router]);

  const handleRefresh = async () => {
    try {
      fetchListings();
    } catch (error) {
      setError(error.message);
    } finally {
      toast.success('Listings refreshed successfully');
    }
  };

  const handleRemoveRequest = async (id) => {
    setLoading((prev) => [...prev, id]);
    try {
      const response = await fetch(`/api/user/listings`, {
        method: 'POST',
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      if (response.ok) {
        setListings(data);
        toast.success('Listing Removal reqiuest sent successfully');
      } else {
        toast.error(data.message);
        throw new Error('Something went wrong, please try again later');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading((prev) => prev.filter((listing) => listing !== id));
    }
  };

  const handleFilter = (filter) => {
    if (isValidFilter(filter)) {
      router.push(`/dashboard/listings?filter=${filter}`);
    } else {
      router.push(`/dashboard/listings`);
    }
  };

  //console.log(filteredListings)
  return (
    <div className="mx-auto flex w-full items-center  justify-center py-10 sm:px-2 lg:px-8 lg:py-14">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
            <div className="w-min overflow-hidden  rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900 ">
              <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-2 py-4 dark:border-gray-700 md:px-5">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Listings
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
                  <Link
                    href="/place/new"
                    className="inline-flex select-none items-center gap-x-2 rounded-lg border-2 border-blue-600 bg-blue-600 px-2 py-1 text-sm text-blue-50 shadow-sm hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Plus width={20} />
                    <span className="hidden md:flex">Add new</span>
                  </Link>
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
                  {!Array.isArray(filteredListings) ||
                  filteredListings.length === 0 ? (
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
                                    Price
                                  </span>
                                </div>
                              </TableHead>
                              {/* <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                    Removal Request
                                  </span>
                                </div>
                              </TableHead> */}
                              <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200"></span>
                                </div>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredListings &&
                              filteredListings.map((listing) => (
                                <TableRow key={listing.id}>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                                      <Link
                                        target="_blank"
                                        href={`/place/${listing.id}`}
                                        className="flex items-center gap-x-3"
                                      >
                                        <Avatar className="h-10 w-12 rounded-lg md:h-12 md:w-16 xl:h-16 xl:w-20">
                                          <AvatarImage
                                            className="h-10 w-12 md:h-12 md:w-16 xl:h-16 xl:w-20 "
                                            src={listing.photos[0]}
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
                                            {listing.title}
                                          </span>
                                          <span className="block text-xs text-gray-500 md:text-sm">
                                            {listing.city} ,{listing.state}
                                          </span>
                                        </div>
                                      </Link>
                                    </div>
                                  </TableCell>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1">
                                      {listing.status === 'approved' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
                                          <BadgeCheck width={20} />
                                          Approved
                                        </span>
                                      ) : listing.status === 'processing' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500">
                                          <Loader width={20} />
                                          Processing
                                        </span>
                                      ) : listing.status === 'rejected' ? (
                                        <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                          <BadgeX width={20} />
                                          Rejected
                                        </span>
                                      ) : null}
                                    </div>
                                  </TableCell>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1">
                                      <span className="pl-2 text-sm">
                                        {listing.price}
                                      </span>
                                    </div>
                                  </TableCell>
                                  {/* <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1">
                                      {listing.deleterequst == true ||
                                      listing.status === 'rejected' ? (
                                        <div
                                          disabled
                                          className="inline-flex select-none items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 opacity-50 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:cursor-none disabled:opacity-50 "
                                        >
                                          <Ban width={20} />
                                          Request Removal
                                        </div>
                                      ) : (
                                        <button
                                          disabled={loading.includes(
                                            listing.id,
                                          )}
                                          className="inline-flex select-none items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:cursor-none disabled:opacity-50"
                                          onClick={() =>
                                            handleRemoveRequest(listing.id)
                                          }
                                        >
                                          {loading.includes(listing.id) ? (
                                            <LoaderCircle
                                              width={20}
                                              className="animate-spin"
                                            />
                                          ) : (
                                            <Ban width={20} />
                                          )}
                                          Request Removal
                                        </button>
                                      )}
                                    </div>
                                  </TableCell> */}
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-6 py-3">
                                      <Link
                                        href={
                                          listing.status === 'rejected'
                                            ? '/pages/help'
                                            : `/place/edit/${listing.id}`
                                        }
                                        className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                      >
                                        {listing.status === 'rejected' ? (
                                          <>
                                            <HelpCircle width={16} />
                                            Help
                                          </>
                                        ) : (
                                          <>
                                            <PenSquare width={16} />
                                            Edit
                                          </>
                                        )}
                                      </Link>
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
