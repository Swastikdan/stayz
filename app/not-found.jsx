import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function errorpage() {
  return (
    <>
      <div className="grid h-full max-h-screen  place-content-center py-32">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-200 dark:text-gray-700">
            404
          </h1>
          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Uh-oh!
          </p>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
           {` We can't find that page.`}
          </p>
          <Link href="/">
            <Button className="mt-8 sm:mt-10">Go to Homepage</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
