'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Trash,
  Ban,
  Badge,
  Loader,
  BadgeCheck,
  BadgeX,
  LoaderCircle,
  RefreshCw,
  ArrowDownUp,
  ListFilter,
  CircleUserRound,
  ShieldCheck,
  CircleX,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [pageloading, setPageLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState([]);
  const [statusLoading, setStatusLoading] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const fetchUsers = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
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
    fetchUsers();
  }, []);
  const handleRefresh = async () => {
    try {
      fetchUsers();
    } catch (error) {
      setError(error.message);
    } finally {
      toast.success('Users refreshed successfully');
    }
  };

  const handleDeleteUser = async (id) => {
    setDeleteLoading((prev) => [...prev, id]);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        toast.success(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteLoading((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };

  const updateStatus = async (id) => {
    setStatusLoading((prev) => [...prev, id]);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        toast.success(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setStatusLoading((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };

  return (
    <div className="mx-auto flex w-full items-center  justify-center py-10 sm:px-2 lg:px-8 lg:py-14">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
            <div className="w-min overflow-hidden  rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900  ">
              <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-2 py-4 dark:border-gray-700 md:px-5">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Users
                </h2>

                <div className="flex items-center space-x-2">
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
                <div className="flex h-56 min-w-[70vw] flex-col">
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
                  {!Array.isArray(users) || users.length === 0 ? (
                    <div className="col-span-4 flex   h-56 flex-1 items-center justify-center py-8 lg:py-16  ">
                      <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
                        <p className=" mt-4 text-gray-500">No Users found.</p>
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
                                    Image
                                  </span>
                                </div>
                              </TableHead>
                              <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                    Name
                                  </span>
                                </div>
                              </TableHead>
                              <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                    Email
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
                              {/* <TableHead
                                scope="col"
                                className="px-2 py-1 text-start"
                              >
                                <div className="flex items-center gap-x-2 ps-6">
                                  <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                    Price
                                  </span>
                                </div>
                              </TableHead> */}
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
                            {users &&
                              users.map((user) => (
                                <TableRow key={user.id}>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <Avatar>
                                      <AvatarImage
                                        src={user.image.replace(
                                          '/upload/',
                                          '/upload/w_200,h_200,c_fill,g_auto/q_auto/f_auto/',
                                        )}
                                        alt="User Image"
                                      />
                                      <AvatarFallback>
                                        {user.name.charAt(0).toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                  </TableCell>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1 ">
                                      <span className="pl-2 text-sm">
                                        {user.name}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1 ">
                                      <span className="pl-2 text-sm">
                                        {user.email}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="px-2 py-1">
                                      {/* <span className="inline-flex items-center gap-x-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 capitalize ">
                                        
                                       { user.role}
                                      </span> */}
                                      {user.role === 'admin' ? (
                                        <span class="inline-flex  items-center gap-x-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 ">
                                          Admin
                                        </span>
                                      ) : user.role === 'user' ? (
                                        <span class="inline-flex  items-center gap-x-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 ">
                                          User
                                        </span>
                                      ) : null}
                                    </div>
                                  </TableCell>
                                  <TableCell className="size-px whitespace-nowrap">
                                    <div className="flex items-center space-x-2 px-2 py-1">
                                      <Dialog>
                                        <DialogTrigger>
                                          <button
                                            disabled={
                                              statusLoading.includes(user.id) ||
                                              deleteLoading.includes(user.id)
                                            }
                                            className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50"
                                          >
                                            <Trash width={20} />
                                            Delete
                                          </button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>
                                              Are you absolutely sure?
                                            </DialogTitle>
                                            <DialogDescription>
                                              This action cannot be undone. This
                                              will permanently delete your
                                              account and remove all data from
                                              the servers.
                                            </DialogDescription>
                                          </DialogHeader>
                                          <DialogFooter>
                                            <div className="flex items-center space-x-3">
                                              <button
                                                disabled={
                                                  statusLoading.includes(
                                                    user.id,
                                                  ) ||
                                                  deleteLoading.includes(
                                                    user.id,
                                                  )
                                                }
                                                className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50"
                                                onClick={() =>
                                                  handleDeleteUser(user.id)
                                                }
                                              >
                                                {deleteLoading.includes(
                                                  user.id,
                                                ) ? (
                                                  <LoaderCircle
                                                    width={20}
                                                    className="animate-spin"
                                                  />
                                                ) : (
                                                  <Trash width={20} />
                                                )}
                                                Delete
                                              </button>

                                              <DialogClose>
                                                <button
                                                  disabled={statusLoading.includes(
                                                    user.id,
                                                  )}
                                                  className="inline-flex items-center gap-x-2 rounded-lg border-2 border-blue-500 bg-white px-3 py-2 text-sm text-blue-600 shadow-sm hover:bg-blue-50 disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                  <CircleX
                                                    width={20}
                                                    
                                                  />
                                                
                                                  Naver mind
                                                </button>
                                              </DialogClose>
                                            </div>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>

                                      {user.role === 'admin' ? (
                                        <button
                                          disabled={
                                            statusLoading.includes(user.id) ||
                                            deleteLoading.includes(user.id)
                                          }
                                          className="inline-flex items-center gap-x-2 rounded-lg border-2 border-green-500 bg-white px-3 py-2 text-sm text-green-600 shadow-sm hover:bg-blue-50 disabled:pointer-events-none disabled:opacity-50"
                                          onClick={() => updateStatus(user.id)}
                                        >
                                          {statusLoading.includes(user.id) ? (
                                            <LoaderCircle
                                              width={20}
                                              className="animate-spin"
                                            />
                                          ) : (
                                            <ShieldCheck width={20} />
                                          )}
                                          Demote to User
                                        </button>
                                      ) : (
                                        <button
                                          disabled={
                                            statusLoading.includes(user.id) ||
                                            deleteLoading.includes(user.id)
                                          }
                                          className="inline-flex items-center gap-x-2 rounded-lg border-2 border-blue-500 bg-white px-3 py-2 text-sm text-blue-600 shadow-sm hover:bg-blue-50 disabled:pointer-events-none disabled:opacity-50"
                                          onClick={() => updateStatus(user.id)}
                                        >
                                          {statusLoading.includes(user.id) ? (
                                            <LoaderCircle
                                              width={20}
                                              className="animate-spin"
                                            />
                                          ) : (
                                            <BadgeCheck width={20} />
                                          )}
                                          Promote to Admin
                                        </button>
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

    // <>
    //   {pageloading ? (
    //     <div className="flex min-h-[90vh] flex-col">
    //       <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
    //         <div className="flex justify-center">
    //           <div
    //             className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
    //             role="status"
    //             aria-label="loading"
    //           >
    //             <span className="sr-only">Loading...</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <>
    //       <div className="mx-auto w-full py-10 sm:px-6 lg:px-8 lg:py-14">
    //         <div className="flex flex-col">
    //           <div className="-m-1.5 overflow-x-auto">
    //             <div className="inline-block min-w-96 p-1.5 align-middle">
    //               <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900">
    //                 <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
    //                   <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
    //                     Users
    //                   </h2>
    //                 </div>
    //                 {!Array.isArray(users) || users.length === 0 ? (
    //                   <div className="col-span-4 flex flex-1 items-center justify-center py-8 lg:py-16 ">
    //                     <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
    //                       <p className="mt-4 text-gray-500 ">No user found.</p>
    //                     </div>
    //                   </div>
    //                 ) : (
    //                   <ScrollArea className="w-auto max-w-[92vw] whitespace-nowrap  md:max-w-[81.5vw]">
    //                     <div className="flex w-max">
    //                       <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    //                         <TableHeader>
    //                           <TableRow>
    //                             <TableHead
    //                               scope="col"
    //                               className="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0"
    //                             >
    //                               <div className="flex items-center gap-x-2 ps-6">
    //                                 <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
    //                                   Image
    //                                 </span>
    //                               </div>
    //                             </TableHead>
    //                             <TableHead
    //                               scope="col"
    //                               className="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0"
    //                             >
    //                               <div className="flex items-center gap-x-2 ps-6">
    //                                 <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
    //                                   Name
    //                                 </span>
    //                               </div>
    //                             </TableHead>
    //                             <TableHead
    //                               scope="col"
    //                               className="px-6 py-3 text-start"
    //                             >
    //                               <div className="flex items-center gap-x-2 ps-6">
    //                                 <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
    //                                   Email
    //                                 </span>
    //                               </div>
    //                             </TableHead>

    //                             <TableHead
    //                               scope="col"
    //                               className="px-6 py-3 text-start"
    //                             >
    //                               <div className="flex items-center gap-x-2 ps-6">
    //                                 <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
    //                                   Role
    //                                 </span>
    //                               </div>
    //                             </TableHead>
    //                           </TableRow>
    //                         </TableHeader>
    //                         <TableBody>
    //                           {users &&
    //                             users.map((user) => (
    //                               <TableRow key={user.id}>
    //                                 <TableCell className="size-px whitespace-nowrap">
    //                                   <Avatar>
    //                                     <AvatarImage
    //                                       src={user.image}
    //                                       alt="User Image"
    //                                     />
    //                                     <AvatarFallback>
    //                                       {user.name}
    //                                     </AvatarFallback>
    //                                   </Avatar>
    //                                 </TableCell>
    //                                 <TableCell className="size-px whitespace-nowrap">
    //                                   <div className="text-left">
    //                                     <span className="text-sm font-medium">
    //                                       {user.name}
    //                                     </span>
    //                                   </div>
    //                                 </TableCell>
    //                                 <TableCell className="size-px whitespace-nowrap">
    //                                   <div className="px-6 py-3 ">
    //                                     <span className="pl-2 text-sm">
    //                                       {user.email}
    //                                     </span>
    //                                   </div>
    //                                 </TableCell>
    //                                 <TableCell className="size-px whitespace-nowrap">
    //                                   <div className="px-6 py-3 ">
    //                                     {user.role === 'user' ? (
    //                                       <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
    //                                         {user.role}
    //                                       </span>
    //                                     ) : (
    //                                       <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
    //                                         {user.role}
    //                                       </span>
    //                                     )}
    //                                   </div>
    //                                 </TableCell>
    //                                 <TableCell className="size-px whitespace-nowrap">
    //                                   <div className="px-6 py-3 ">
    //                                     <button
    //                                       className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50"
    //                                       onClick={() =>
    //                                         handleDeleteUser(user.id)
    //                                       }
    //                                     >
    //                                       {loading == user.id ? (
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
    //                         </TableBody>
    //                       </Table>
    //                     </div>
    //                     <ScrollBar orientation="horizontal" />
    //                   </ScrollArea>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </>
  );
}
