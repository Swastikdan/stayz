'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
// import getPlaces from '@/app/server/places/getPlaces';
import { Button } from '@/components/ui/button';
// import PlacesCard from './placecard/PlacesCard';
// import PlaceLoader from './placecard/PlaceLoader';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import ImageSlider from '@/components/ImageSlider';
export default function Home() {
 const router = useRouter();
const searchParams = useSearchParams();
 const [places, setPlaces] = useState([]);
 const [loading, setLoading] = useState(true);
const logintype = searchParams.get('type');
const login = searchParams.get('login');
useEffect(() => {
  if (
    (logintype === 'google' || logintype === 'github') &&
    login === 'true'
  ) {
    toast.success('Logged in successfully');
    router.replace('/');
  }
}, [logintype, login, router]); 
 useEffect(() => {
   setLoading(true);
   const category = searchParams.get('category') || '';
   const sort = searchParams.get('sort') || '';
   const sortType = searchParams.get('sortType') || '';
   const location = searchParams.get('location') || '';
   const checkin = searchParams.get('checkin') || '';
   const checkout = searchParams.get('checkout') || '';
   const adults = searchParams.get('adults') || '';
   const children = searchParams.get('children') || '';
   let query = '';
   if (category) query += `category=${category}&`;
   if (sort) query += `sort=${sort}&`;
   if (sortType) query += `sortType=${sortType}&`;
   if (location) query += `location=${location}&`;
   if (checkin) query += `checkin=${checkin}&`;
   if (checkout) query += `checkout=${checkout}&`;
   if (adults) query += `adults=${adults}&`;
   if (children) query += `children=${children}&`;
   query = query.endsWith('&') ? query.slice(0, -1) : query;

   fetch(`/api/places?${query}`)
     .then((res) => res.json())
     .then((data) => {
       setPlaces(data);
       setLoading(false);
     })
     .catch((error) => {
       console.error(error);
       setLoading(false);
     });
 }, [searchParams]);


  if(loading) {
    return (
      <div className="mx-auto   my-5 max-w-[1440px] px-4 md:px-8  ">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {Array(12)
            .fill()
            .map((_, i) => (
              <div key={i}>
                <div className="mb-2 block h-[300px] animate-pulse overflow-hidden rounded-xl  bg-gray-200 lg:mb-3 "></div>
                <div className="flex flex-col space-y-2 px-2 ">
                  <div className="flex items-center justify-between  ">
                    <div className="h-[18px] w-4/6 animate-pulse rounded bg-gray-200 "></div>
                  </div>
                  <div className="h-[18px] w-4/6 animate-pulse rounded bg-gray-200 "></div>
                  <div className="h-[18px] w-2/6 animate-pulse rounded bg-gray-200 "></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto  my-5 max-w-[1440px]  px-4 md:px-8">
      {!Array.isArray(places) || places.length === 0 ? (
        <div className="mx-auto flex h-[70vh] w-full flex-col items-center justify-center space-y-3 text-center md:space-y-5">
          <h1 className="text-2xl font-semibold text-gray-700 md:text-3xl">
            No places found
          </h1>
          <p className="text-sm text-gray-500">
            {` Try adjusting your search or filter to find what you're looking for.`}
          </p>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 ">
              <ArrowLeft size={16} /> Go Back
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {places.map((place) => (
            <div key={place.id}>
              <div className="relative">
                <ImageSlider
                  images={place.photos}
                  customButton={place.id}
                  id={place.id}
                  isFavorite={place.isFavorite}
                />

                <Link
                  href={`/place/${place.id}`}
                  className="tex-sm flex flex-col px-2"
                >
                  <div className="flex items-center justify-between ">
                    <span className="text-base font-semibold">
                      {place.state}, {place.city}
                    </span>
                    {/* <div className="flex items-center space-x-1 ">
                  <Star width={15} height={15} fill="black" className="" />
                  <span className="text-sm">
                    {Math.floor((Math.random() * 2.9 + 2) * 100) / 100}
                  </span>
                </div> */}
                  </div>
                  <span className="  text-[15px] font-light text-gray-500">
                    {place.title.substring(0, 60)}
                  </span>
                  {/* <span className="py-0.5 text-[15px] font-light text-gray-500">
                10-12 Mar
              </span> */}

                  <span className=" text-[15px] font-medium ">
                    <span className="">₹ </span>
                    <span className="bg-white  tabular-nums">{` ${place.price}`}</span>
                    <span className="font-light"> night</span>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
