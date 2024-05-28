'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import DesktopPlace from '@/components/place/DesktopPlace';
// import PlacePageMobile from './PlacePageMobile';
import { useLikeContext } from '@/providers/LikeProvider';

import { addDays, set } from 'date-fns';


export default function PlacePage({ params }) {
  const id = params.id;
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [place, setPlace] = useState(null);
  const [placeLoading, setPlaceLoading] = useState(true);
  const [errorloading, setErrorLoading] = useState(false);
  useEffect(() => {
    fetch(`/api/places/search?id=${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPlace(data);
        } else {
          console.error('No data received');
          setErrorLoading(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorLoading(true);
      })
      .finally(() => {
        setPlaceLoading(false);
      });
  }, [id]);
  const { favorites, toggleLike } = useLikeContext();
  const [isFavoritePlace, setIsFavoritePlace] = useState(false);
  useEffect(() => {
    if (favorites.some((favorite) => favorite.id === id)) {
      setIsFavoritePlace(true);
    }
  }, [favorites, id]);
  const handleFavoriteClick = () => {
    if (session) {
      setIsFavoritePlace(!isFavoritePlace);
    }
    toggleLike(id);
  };



console.log(place)
const minimumStay = place?.minimumStay || 1;
  
  const [adults, setAdults] = useState(1);
  const [childrens, setChildrens] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [bookingdays, setBookingDays] = useState(Number(minimumStay));
  const initialFrom = new Date();
  const initialTo = addDays(new Date(), Number(minimumStay));
  let from = initialFrom;
  let to = initialTo;
  const [date, setDate] = useState({
    from: from,
    to: to,
  });

  const searchAdults = searchParams.get('adults');
  const searchChildren = searchParams.get('children');
  const searchInfants = searchParams.get('infants');
  const searchPets = searchParams.get('pets');
  const searchCheckin = searchParams.get('checkin');
  const searchCheckout = searchParams.get('checkout');

  useEffect(() => {
    if (searchAdults) setAdults(Number(searchAdults));
    if (searchChildren) setChildren(Number(searchChildren));
    if (searchInfants) setInfants(Number(searchInfants));
    if (searchPets) setPets(Number(searchPets));
    if (searchCheckin) setDate({ ...date, from: new Date(searchCheckin) });
    if (searchCheckout) setDate({ ...date, to: new Date(searchCheckout) });
  }, [
    searchAdults,
    searchChildren,
    searchInfants,
    searchPets,
    searchCheckin,
    searchCheckout,
    date,
  ]);

  const [isvalidDates , setIsValidDates] = useState(true);
  const [isvalidBookingWindow, setIsValidBookingWindow] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
useEffect(() => {
  if (date && date.from && date.to) {
    if (date.from >= date.to) {
      setIsValidDates(false);
    } else {
      setIsValidDates(true);
    }
  }
}, [date]);


const prevDate = useRef();
const prevId = useRef();

useEffect(() => {
  if (
    !prevDate.current ||
    !prevId.current ||
    JSON.stringify(date) !== JSON.stringify(prevDate.current) ||
    id !== prevId.current
  ) {
    if (date.from && date.to && id) {
      const fromDate = new Date(date.from);
      const toDate = new Date(date.to);

      if (isNaN(fromDate) || isNaN(toDate)) {
        console.error('Invalid date');
        return;
      }

      const from = fromDate.toISOString();
      const to = toDate.toISOString();
      setBookingDays(Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)));
      fetch(`/api/booking/check?placeid=${id}&checkin=${from}&checkout=${to}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.isAvailable) {
            setIsValidBookingWindow(true);
          } else {
            setIsValidBookingWindow(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    prevDate.current = date;
    prevId.current = id;
  }
}, [date, id]);
  console.log(place)
  const user = session?.user;
  const ordernname = place?.title;
 const orderedImages = place?.photos.slice(0, 8);
 const orderprice = Number(place?.price * bookingdays)
  const handleBooking = async () => {
    setBookingLoading(true);
    try{
     const stripe = await loadStripe(
       process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY,
     );

     if (!stripe){ 
      toast.error('Something went wrong. Please try again.');
      throw new Error('Stripe failed to initialize.')};
     const order = [
       {
         price_data: {
           currency: 'inr',
           product_data: {
             name: ordernname,
              images: orderedImages,
           },
           unit_amount: Number(orderprice*100), // Rs. 10
         },
         quantity: 1,
       },
     ];

      const redirecturl = `${window.location.origin}/place/${id}`;
      const successurl = `${window.location.origin}/place/${id}?`;

      const checkoutResponse = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order, redirecturl, successurl}),
      });

      const { sessionId } = await checkoutResponse.json();

      const bookingData = {
        placeId: id,
        checkIn: date.from,
        checkOut: date.to,
        adults,
        childrens,
        infants,
        pets,
        price: orderprice,
        sessionId,
      };

      try{
        const response = await fetch('/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
        const stripeError = await stripe.redirectToCheckout({ sessionId });
        if (stripeError) {
        toast.error('Booking is not done');
        console.error(stripeError, 'Stripe error');
      }

        } else {
          toast.error('Stripe error');
        }
      } 
      catch (error) {
        console.error(error);
        toast.error(error);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  }


  // const session_id = searchParams.get('session_id');
  // const [verifyBooking, setVerifyBooking] = useState(false);
  // useEffect(() => {
  //   if (session_id) {
  //     setVerifyBooking(true);

  //     fetch(`/api/booking/verify?session_id=${session_id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data) {
  //           toast.success('Booking successful');
  //           router.push(`/booking/${data.id}`);
  //         } else {
  //           toast.error('Booking failed');
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         toast.error('Booking failed');
  //       });
      





  if (placeLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="loader" />
      </div>
    );
  }

  if (errorloading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }

console.log(bookingdays);


  return (
    <div className="flex flex-col items-center justify-center w-full">
      <DesktopPlace
        place={place}
        isFavoritePlace={isFavoritePlace}
        handleFavoriteClick={handleFavoriteClick}
        adults={adults}
        setAdults={setAdults}
        childrens={childrens}
        setChildrens={setChildrens}
        infants={infants}
        setInfants={setInfants}
        pets={pets}
        setPets={setPets}
        date={date}
        setDate={setDate}
        bookingdays={bookingdays}
        setBookingDays={setBookingDays}
        handleBooking={handleBooking}
        isvalidDates={isvalidDates}

      />
    </div>
  );
}
