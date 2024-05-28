'use client';
import {
  Ban,
  BadgeCheck,
  BadgeX,
  LoaderCircle,
  Loader,
  RefreshCw,
  ListFilter,
  PenSquare,
  Trash,
} from 'lucide-react';
import React, { useState, useEffect , useMemo , useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearchParams, useRouter } from 'next/navigation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { format } from 'date-fns';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function AdminListing() {
  const [listings, setListings] = useState([]);
  const [pageloading, setPageLoading] = useState(true);
  const [approvedLoading, setApprovedLoading] = useState([]);
  const [rejectedLoading, setRejectedLoading] = useState([]);
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


    const fetchData = async () => {
      setRefreshing(true);
    try {
      const response = await fetch('/api/admin/listings');
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }
      setListings(data.places);
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setPageLoading(false);
      setRefreshing(false);
    }
  };

    useEffect(() => {
      fetchData();
    }, []);

    const [filteredListings, setFilteredListings] = useState([]);

    useEffect(() => {
      let filtered = listings;
      if (filter && isValidFilter(filter)) {
        filtered = listings.filter((listing) => listing.status === filter);
      }
      setFilteredListings(filtered);
    }, [listings, filter , isValidFilter]);

    const handleRefresh = async () => {
      try {
        fetchData();
        toast.success('Listings refreshed successfully');
      } catch (error) {
        setError(error.message);
      }
    };


const handleStatusUpdate = async (id, status) => {
  if (status === 'approved') {
    setApprovedLoading(prevState => [...prevState, id]);
  } else if (status === 'rejected') {
    setRejectedLoading(prevState => [...prevState, id]);
  }
  try {
    const response = await fetch('/api/admin/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    setListings(data.places);
    toast.success('Listing status updated successfully');
  } catch (error) {
    setError(error.message);
  } finally {
    setApprovedLoading(prevState => prevState.filter(itemId => itemId !== id));
    setRejectedLoading(prevState => prevState.filter(itemId => itemId !== id));
  }
}

const handleFilter = (filter) => {
  if (isValidFilter(filter)) {
    router.push(`/admin/listings?filter=${filter}`);
  } else {
    router.push(`/admin/listings`);
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
                  User Listings
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
                          <DropdownMenuItem key={filtername}
                            className={` capitalize  ${filter == `${filtername}` ? 'bg-gray-100' : ''} `}
                            onClick={() => handleFilter(`${filtername}`)}
                          >
                            {filtername}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* <button className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-500 bg-white px-2 py-1 text-sm text-gray-600 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50">
                    <ArrowDownUp width={20} />
                    <span className="hidden md:flex">Sort</span>
                  </button> */}
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
                  {!Array.isArray(filteredListings) ||
                  filteredListings.length === 0 ? (
                    <div className="col-span-4 flex   h-56 flex-1 items-center justify-center py-8 lg:py-16  ">
                      <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
                        <p className=" mt-4 text-gray-500">
                          No User Listings found.
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
                                    Owner
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
                                    Action
                                  </span>
                                </div>
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredListings.map((listing) => (
                              <TableRow key={listing.id} >
                                <TableCell className="size-px whitespace-nowrap">
                                  <div className="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
                                    <Link target='_blank' href={`/place/${listing.id}`} className="flex items-center gap-x-3">
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
                                        <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 md:text-base xl:text-lg">
                                          {listing.title}
                                        </span>
                                        <span className="block text-xs text-gray-500 md:text-sm">
                                          {listing.city} , {listing.state}
                                        </span>
                                      </div>
                                    </Link>
                                  </div>
                                </TableCell>
                                <TableCell className="size-px whitespace-nowrap">
                                  <div className="flex items-center space-x-2 px-2 py-1 font-medium">
                                    <Avatar>
                                      <AvatarImage
                                        src={listing.owner.image.replace(
                                          '/upload/',
                                          '/upload/w_200,h_200,c_fill,g_auto/q_auto/f_auto/',
                                        )}
                                        alt="User Image"
                                      />
                                      <AvatarFallback>
                                        {listing.owner.name
                                          .charAt(0)
                                          .toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="pl-2 text-sm">
                                      {listing.owner.name}
                                    </span>
                                  </div>
                                </TableCell>

                                <TableCell className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <span className="pl-2 text-sm">
                                      {listing.price}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
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
                                  <div className="flex items-center space-x-2 px-2 py-1">
                                    {listing.status === 'approved' ||
                                    listing.status === 'rejected' ? (
                                      <div className="flex items-center space-x-3">
                                        <button
                                          disabled="true"
                                          className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
                                        >
                                          <BadgeCheck width={20} />
                                          Approve
                                        </button>

                                        <button
                                          disabled="true"
                                          className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
                                        >
                                          <BadgeX width={20} />
                                          Reject
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center space-x-3">
                                        <button
                                          disabled={
                                            approvedLoading.includes(
                                              listing.id,
                                            ) ||
                                            rejectedLoading.includes(listing.id)
                                          }
                                          className="inline-flex items-center gap-x-2 rounded-lg border-2 border-green-500 bg-white px-3 py-2 text-sm text-green-600 shadow-sm hover:bg-green-50 disabled:pointer-events-none disabled:opacity-50"
                                          onClick={() =>
                                            handleStatusUpdate(
                                              listing.id,
                                              'approved',
                                            )
                                          }
                                        >
                                          {approvedLoading.includes(
                                            listing.id,
                                          ) ? (
                                            <LoaderCircle
                                              width={20}
                                              className="animate-spin"
                                            />
                                          ) : (
                                            <BadgeCheck width={20} />
                                          )}
                                          Approve
                                        </button>
                                        <button
                                          disabled={
                                            approvedLoading.includes(
                                              listing.id,
                                            ) ||
                                            rejectedLoading.includes(listing.id)
                                          }
                                          className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50"
                                          onClick={() =>
                                            handleStatusUpdate(
                                              listing.id,
                                              'rejected',
                                            )
                                          }
                                        >
                                          {rejectedLoading.includes(
                                            listing.id,
                                          ) ? (
                                            <LoaderCircle
                                              width={20}
                                              className="animate-spin"
                                            />
                                          ) : (
                                            <Ban width={20} />
                                          )}
                                          Reject
                                        </button>
                                      </div>
                                    )}
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

// 'use client';
// import {
//   Ban,
//   BadgeCheck,
//   BadgeX,
//   LoaderCircle,
//   Loader,
//   RefreshCw,
//   ListFilter,
//   PenSquare,
//   Trash,
// } from 'lucide-react';
// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
// import { toast } from 'sonner';
// import { format } from 'date-fns';
// import Link from 'next/link';
// import axios from 'axios';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';

// export default function Page() {
//   const [listings, setListings] = useState([]);
//   const [pageloading, setPageLoading] = useState(true);
//   const [loading, setLoading] = useState(null);
//   const [deleteloading, setDeleteLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const filter = searchParams.get('filter');

//   const filters = [
//     'approved',
//     'cancelled',
//     'processing',
//     'rejected',
//     'expired',
//   ];
//   const isValidFilter = (filter) => filters.includes(filter);

//   // listing data fetching
//   const fetchData = async () => {
//     setRefreshing(true);
//     try {
//       const response = await axios.get('/api/admin/listings');
//       if (response.status !== 200) {
//         throw new Error('Failed to fetch data');
//       }
//       setListings(response.data.places);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setPageLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const [filteredListings, setFilteredListings] = useState([]);

//   useEffect(() => {
//     let filtered = listings;
//     if (filter && isValidFilter(filter)) {
//       filtered = listings.filter((listing) => listing.status === filter);
//     }
//     setFilteredListings(filtered);
//   }, [listings, filter]);

//   const handleRefresh = async () => {
//     try {
//       fetchData();
//       toast.success('Listings refreshed successfully');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleDeletePlace = async (id) => {
//     setDeleteLoading(id);
//     try {
//       const res = await fetch(`/api/admin/listings?id=${id}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setListings(data.places);
//         toast.success("Place has been deleted successfully");
//       } else {
//         throw new Error("Failed to delete place");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const handleFilter = (filter) => {
//     if (isValidFilter(filter)) {
//       router.push(`/admin/listings?filter=${filter}`);
//     } else {
//       router.push(`/admin/listings`);
//     }
//   };

//   return (
//     <div className="mx-auto flex w-full items-center justify-center py-10 sm:px-2 lg:px-8 lg:py-14">
//       <div className="flex flex-col">
//         <div className="-m-1.5 overflow-x-auto">
//           <div className="inline-block min-w-full p-1.5 align-middle">
//             <div className="w-min overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900">
//               <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-2 py-4 dark:border-gray-700 md:px-5">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
//                   Listings
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <button className="inline-flex select-none items-center gap-x-2 rounded-lg border-2 border-gray-500 bg-white px-2 py-1 text-sm text-gray-600 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50">
//                         <ListFilter width={20} />
//                         <span className="hidden md:flex">Filter</span>
//                       </button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="start">
//                       <DropdownMenuItem
//                         className="font-semibold text-blue-800 focus:bg-blue-100 focus:text-blue-800"
//                         onClick={() => handleFilter('')}
//                       >
//                         Clear
//                       </DropdownMenuItem>
//                       {filters.map((filterName) => (
//                         <DropdownMenuItem
//                           key={filterName}
//                           className={`capitalize ${filter === filterName ? 'bg-gray-100' : ''}`}
//                           onClick={() => handleFilter(filterName)}
//                         >
//                           {filterName}
//                         </DropdownMenuItem>
//                       ))}
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                   <button
//                     disabled={refreshing}
//                     onClick={handleRefresh}
//                     className="inline-flex select-none items-center gap-x-2 rounded-lg border-2 border-blue-500 bg-white px-2 py-1 text-sm text-blue-600 shadow-sm hover:bg-blue-50 disabled:pointer-events-none disabled:opacity-50"
//                   >
//                     <RefreshCw
//                       width={20}
//                       className={refreshing ? 'animate-spin' : ''}
//                     />
//                     <span className="hidden md:flex">Refresh</span>
//                   </button>
//                 </div>
//               </div>
//               {pageloading ? (
//                 <div className="flex h-56 w-full min-w-[92vw] flex-col md:min-w-[70vw]">
//                   <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
//                     <div className="flex justify-center">
//                       <div
//                         className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
//                         role="status"
//                         aria-label="loading"
//                       >
//                         <span className="sr-only">Loading...</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   {!Array.isArray(filteredListings) ||
//                   filteredListings.length === 0 ? (
//                     <div className="col-span-4 flex h-56 flex-1 items-center justify-center py-8 lg:py-16">
//                       <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
//                         <p className="mt-4 text-gray-500">No listings found.</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <ScrollArea className="w-auto max-w-[92vw] md:max-w-[85vw]">
//                       <div className="flex w-max items-center justify-center">
//                         <Table className="min-w-max divide-y divide-gray-200 dark:divide-gray-700">
//                           <TableHeader>
//                             <TableRow>
//                               <TableHead className="text-start">
//                                 Property
//                               </TableHead>

//                               <TableHead className="px-2 py-1 text-start">
//                                 Status
//                               </TableHead>
//                               <TableHead className="px-2 py-1 text-start">
//                                 Price
//                               </TableHead>
//                               <TableHead className="px-2 py-1 text-start">
//                                 Action
//                               </TableHead>
//                             </TableRow>
//                           </TableHeader>
//                           <TableBody>
//                             {filteredListings.map((listing) => (
//                               <TableRow key={listing.id}>
//                                 <TableCell className="size-px whitespace-nowrap">
//                                   <div className="py-3 pe-6 ps-6 lg:ps-3 xl:ps-0">
//                                     <div className="flex items-center gap-x-3">
//                                       <Avatar className="h-10 w-10 rounded-lg md:h-12 md:w-12 xl:h-16 xl:w-16">
//                                         <AvatarImage
//                                           className="h-10 w-10 md:h-12 md:w-12 xl:h-16 xl:w-16 "
//                                           src={listing.photos[0]}
//                                           alt="property Image"
//                                           width={80}
//                                           height={80}
//                                         />
//                                         <AvatarFallback>
//                                           <div className="h-10 w-10 animate-pulse bg-gray-400 md:h-12 md:w-12 xl:h-16 xl:w-16"></div>
//                                         </AvatarFallback>
//                                       </Avatar>
//                                       <div className="grow">
//                                         <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 md:text-base xl:text-lg">
//                                           {listing.title}
//                                         </span>
//                                         <span className="block text-xs text-gray-500 md:text-sm">
//                                           {listing.city} , {listing.state}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </TableCell>
//                                 <TableCell className="size-px whitespace-nowrap">
//                                   <div className="">
//                                     {listing.status === 'approved' ? (
//                                       <span className="inline-flex  items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500 ">
//                                         <BadgeCheck width={20} />
//                                         Aprooved
//                                       </span>
//                                     ) : listing.status === 'processing' ? (
//                                       <span className="inline-flex items-center gap-x-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500">
//                                         <Badge width={20} />
//                                         Processing
//                                       </span>
//                                     ) : listing.status === 'rejected' ? (
//                                       <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
//                                         <BadgeX width={20} />
//                                         Rejected
//                                       </span>
//                                     ) : null}
//                                   </div>
//                                 </TableCell>
//                                 <TableCell className="size-px whitespace-nowrap">
//                                   <div className="px-6 py-3">
//                                     <span className="pl-2 text-sm">
//                                       {listing.price}
//                                     </span>
//                                   </div>
//                                 </TableCell>
//                                 {/* <TableCell className="size-px whitespace-nowrap">
//                                 <div className="px-6 py-3">
//                                   <Link
//                                     href={
//                                       listing.status === 'rejected'
//                                         ? '/pages/help'
//                                         : `/places/${listing.id}`
//                                     }
//                                     className="inline-flex items-center gap-x-2 rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                                   >
//                                     {listing.status === 'rejected' ? (
//                                       <>
//                                         <HelpCircle width={16} />
//                                         Help
//                                       </>
//                                     ) : (
//                                       <>

//                                       </>
//                                     )}
//                                   </Link>
//                                 </div>
//                               </TableCell> */}
//                                 <TableCell className="size-px whitespace-nowrap">
//                                   <div className="flex items-center space-x-2 px-2 py-1">
//                                     <button
//                                       className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50"
//                                       onClick={() =>
//                                         handleDeletePlace(listing.id)
//                                       }
//                                     >
//                                       {deleteloading == listing.id ? (
//                                         <LoaderCircle
//                                           width={20}
//                                           className="animate-spin"
//                                         />
//                                       ) : (
//                                         <Trash width={20} />
//                                       )}
//                                       Delete
//                                     </button>
//                                   </div>
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       </div>
//                       <ScrollBar orientation="horizontal" />
//                     </ScrollArea>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
