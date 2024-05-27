import React from 'react'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function layout({children}) {
const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <section className=" mx-auto w-full max-w-md pb-10 sm:my-10 sm:mt-0 md:p-6">
      <div className="rounded-xl border-gray-200 shadow-sm dark:border-gray-700 sm:mt-7 sm:bg-white sm:dark:bg-gray-800 md:border">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-4xl font-bold text-gray-800 dark:text-white">
              Sign up
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account? ‎
              <Link
                className="font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="/login"
              >
                ‎ Sign in
              </Link>
            </p>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
