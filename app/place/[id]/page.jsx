'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams, notFound, redirect } from 'next/navigation';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import DesktopPlace from '@/components/place/DesktopPlace';
import MobilePlace from '@/components/place/MobilePlace';
import { useLikeContext } from '@/providers/LikeProvider';

import { addDays, set } from 'date-fns';

export default function PlacePage({ params }) {
  const id = params.id;
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { favorites, toggleLike } = useLikeContext();
  const [state, setState] = useState({
    place: null,
    firstbookingWindow: null,
    placeLoading: true,
    errorLoading: false,
    isFavoritePlace: false,
    adults: 1,
    childrens: 0,
    infants: 0,
    pets: 0,
    bookingdays: 1,
    date: {
      from: new Date(),
      to: addDays(new Date(), 1),
    },
    isValidDates: true,
    isValidBookingWindow: true,
    bookingLoading: false,
    isSameUser: false,
  });

  const prevDate = useRef();
  const prevId = useRef();

  // if the children , infant , pets  is more than one and the adults is less than one then the adults will be set to one

  useEffect(() => {
    if (state.adults < 1) {
      setState((prevState) => ({ ...prevState, adults: 1 }));
    }
  }, [state.adults]);

  // get the firstbookingWindow for the state  firstbookingWindow and set the dates to that with the correct formateing if needed

  //  "firstbookingWindow": {
  //   "availableFrom": "2024-05-30T18:30:00.000Z",
  //   "availableTo": "2025-05-18T14:10:30.000Z"
  // },

  useEffect(() => {
    if (state.firstbookingWindow) {
      const now = new Date();
      const availableFrom = new Date(state?.firstbookingWindow?.availableFrom);
      const availableTo = new Date(state?.firstbookingWindow?.availableTo);
      const minimumStay = Number(state?.place?.minimumStay) || 1; // assuming state.place.minimumStay holds the minimum stay duration

      if (now < availableFrom) {
        setState((prevState) => ({
          ...prevState,
          date: {
            from: availableFrom,
            to: addDays(availableFrom, minimumStay),
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          date: {
            from: now,
            to: addDays(now, minimumStay),
          },
        }));
      }

      setState((prevState) => ({ ...prevState, bookingdays: minimumStay }));
    }
  }, [state?.firstbookingWindow, state?.place?.minimumStay]);

  // Helper function to fetch place data
  const fetchPlaceData = useCallback(async () => {
    try {
      const res = await fetch(`/api/places/search?id=${id}`);
      const data = await res.json();
      if (data) {
        setState((prevState) => ({ ...prevState, place: data.place }));
        setState((prevState) => ({
          ...prevState,
          firstbookingWindow: data.firstbookingWindow,
        }));
      } else {
        console.error('No data received');
        setState((prevState) => ({ ...prevState, errorLoading: true }));
      }
    } catch (error) {
      console.error(error);
      setState((prevState) => ({ ...prevState, errorLoading: true }));
    } finally {
      setState((prevState) => ({ ...prevState, placeLoading: false }));
    }
  }, [id]);

  // Helper function to check booking availability
  const checkBookingAvailability = useCallback(async () => {
    if (
      !prevDate.current ||
      !prevId.current ||
      JSON.stringify(state.date) !== JSON.stringify(prevDate.current) ||
      id !== prevId.current
    ) {
      if (state.date && state.date.from && state.date.to && id) {
        const fromDate = new Date(state.date.from);
        const toDate = new Date(state.date.to);

        if (isNaN(fromDate) || isNaN(toDate)) {
          console.error('Invalid date');
          return;
        }

        const from = fromDate.toISOString();
        const to = toDate.toISOString();
        setState((prevState) => ({
          ...prevState,
          bookingdays: Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)),
        }));
        try {
          const res = await fetch(
            `/api/booking/check?placeid=${id}&checkin=${from}&checkout=${to}`,
          );
          const data = await res.json();
          if (data.isAvailable) {
            setState((prevState) => ({
              ...prevState,
              isValidBookingWindow: true,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              isValidBookingWindow: false,
            }));
          }
        } catch (error) {
          console.error(error);
          setState((prevState) => ({
            ...prevState,
            isValidBookingWindow: false,
          }));
        }
      }

      prevDate.current = state.date;
      prevId.current = id;
    }
  }, [state.date, id]);

  // Fetch place data on mount and when id changes
  useEffect(() => {
    fetchPlaceData();
  }, [id, fetchPlaceData]);

  // Check if place is favorite when favorites or id changes
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isFavoritePlace: favorites.some((favorite) => favorite.id === id),
    }));
  }, [favorites, id]);

  const [adults, setAdults] = useState(searchParams.get('adults') || 1);
  const [children, setChildren] = useState(searchParams.get('children') || 0);
  const [infants, setInfants] = useState(searchParams.get('infants') || 0);
  const [pets, setPets] = useState(searchParams.get('pets') || 0);
  const [checkin, setCheckin] = useState(searchParams.get('checkin'));
  const [checkout, setCheckout] = useState(searchParams.get('checkout'));

  const validateSearchParams = useCallback(async () => {
    let newAdults = adults;
    let newChildren = children;
    let newCheckin = checkin;
    let newCheckout = checkout;

    if (newAdults < 1) {
      newAdults = 1;
    }

    if (Number(newAdults) + Number(newChildren) > state.place?.maxGuests) {
      newChildren = 0;
      newAdults = 1;
    }

    // check the validation of the dates
    const checkinDate = new Date(newCheckin);
    const checkoutDate = new Date(newCheckout);
    if (checkinDate.getTime() >= checkoutDate.getTime()) {
      newCheckin = new Date();
      newCheckout = addDays(new Date(), Number(state.place?.minimumStay) || 1);
    }

    setAdults(newAdults);
    setChildren(newChildren);
    setCheckin(newCheckin);
    setCheckout(newCheckout);

    setState((prevState) => ({
      ...prevState,
      adults: parseInt(newAdults),
      childrens: parseInt(newChildren),
      infants: parseInt(infants),
      pets: parseInt(pets),
      date: {
        from: new Date(newCheckin),
        to: new Date(newCheckout),
      },
    }));
  }, [
    adults,
    children,
    infants,
    pets,
    checkin,
    checkout,
    state.place?.maxGuests,
    state.place?.minimumStay,
  ]);

  useEffect(() => {
    validateSearchParams();
  }, [
    adults,
    children,
    infants,
    pets,
    checkin,
    checkout,
    validateSearchParams,
  ]);
  // Check booking availability when date or id changes
  useEffect(() => {
    checkBookingAvailability();
  }, [state.date, id, checkBookingAvailability]);

  // Validate dates when they change
  useEffect(() => {
    if (state.date && state.date.from && state.date.to) {
      setState((prevState) => ({
        ...prevState,
        isValidDates: state.date.from < state.date.to,
      }));
    }
  }, [state.date]);

  // Handle favorite click
  const handleFavoriteClick = () => {
    if (session) {
      setState((prevState) => ({
        ...prevState,
        isFavoritePlace: !prevState.isFavoritePlace,
      }));
    }
    toggleLike(id);
  };

  // Handle booking
  // const handleBooking = async () => {
  //   setState((prevState) => ({ ...prevState, bookingLoading: true }));
  //   try {
  //     const stripe = await loadStripe(
  //       process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY,
  //     );
  //     if (!stripe) {
  //       toast.error('Something went wrong. Please try again.');
  //       throw new Error('Stripe failed to initialize.');
  //     }
  //     const order = [
  //       {
  //         price_data: {
  //           currency: 'inr',
  //           product_data: {
  //             name: state.place.title,
  //             images: state.place.photos.slice(0, 8),
  //           },
  //           unit_amount: Number(state.place.price * state.bookingdays * 100),
  //         },
  //         quantity: 1,
  //       },
  //     ];
  //     const redirecturl = `${window.location.origin}/place/${id}`;
  //     const successurl = `${window.location.origin}/place/${id}?`;
  //     const checkoutResponse = await fetch('/api/checkout_sessions', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ order, redirecturl, successurl }),
  //     });
  //     const { sessionId } = await checkoutResponse.json();
  //     const bookingData = {
  //       placeId: id,
  //       checkIn: state.date.from,
  //       checkOut: state.date.to,
  //       adults: state.adults,
  //       childrens: state.childrens,
  //       infants: state.infants,
  //       pets: state.pets,
  //       price: state.place.price * state.bookingdays,
  //       sessionId,
  //       userId: session.user.id,
  //     };
  //     try {
  //       const response = await fetch('/api/booking', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(bookingData),
  //       });
  //       const data = await response.json();
  //       if (data.code === 200) {
  //         const stripeError = await stripe.redirectToCheckout({ sessionId });
  //         if (stripeError) {
  //           toast.error(stripeError);
  //           console.error(stripeError, 'Stripe error');
  //         }
  //       } else {
  //         toast.error('Booking Error. Please try again.');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       toast.error(error);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error);
  //   }
  // };
  const handleBooking = async () => {


    if (!state.isValidDates) {
      toast.error('Invalid Dates');
      return;
    }
    if(!state.isValidBookingWindow){
      toast.error('Booking window is not available');
      return;
    }
    if (!session) {
      // toast.error('You must be logged in to make a purchase');
      router.push('/login');
      return;
    }



    try {
      setState((prevState) => ({ ...prevState, bookingLoading: true }));

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY,
      );
      if (!stripe) {
        throw new Error('Stripe failed to initialize.');
      }

      const order = [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: state.place.title,
              images: state.place.photos.slice(0, 8),
            },
            unit_amount: Number(state.place.price * state.bookingdays * 100),
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
        body: JSON.stringify({ order, redirecturl, successurl }),
      });

      const { sessionId, paymentLink } = await checkoutResponse.json();

      const bookingData = {
        placeId: id,
        checkIn: state.date.from,
        checkOut: state.date.to,
        adults: state.adults,
        childrens: state.childrens,
        infants: state.infants,
        pets: state.pets,
        price: state.place.price * state.bookingdays,
        sessionId,
        userId: session.user.id,
        paymentLink,
      };

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (data.code === 200) {
        const stripeError = await stripe.redirectToCheckout({ sessionId });
        if (stripeError) {
          throw new Error(stripeError);
        }
      } else {
        throw new Error('Booking Error. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setState((prevState) => ({ ...prevState, bookingLoading: false }));
    }
  };

  const bookingStatus = searchParams.get('bookingStatus');

  useEffect(() => {
    if (bookingStatus === 'cancel') {
      toast.error('Booking Unsuccessful');
      router.replace(`/place/${id}`);
    } else if (bookingStatus === 'success') {
      toast.success('Booking successful');
      router.replace(`/dashboard/bookings/`);
    } else if (bookingStatus === 'error') {
      toast.error('Booking failed');
    } else if (bookingStatus) {
      toast.error('Booking failed');
    }
  }, [bookingStatus, router, id]);

  // if the session.user.id is equal to the place.ownerId then the isSameUser will be set to true
  useEffect(() => {
    if (session && session.user.id === state.place?.ownerId) {
      setState((prevState) => ({ ...prevState, isSameUser: true }));
    }
  }, [session, state.place?.ownerId]);

  if (state.placeLoading) {
    return (
      <div>
        <div className="flex min-h-[90vh] flex-col">
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
      </div>
    );
  }

  if (state.errorLoading) {
    return notFound();
  }

  return (
    <>
      <div className="flex w-full sm:hidden">
        <MobilePlace
          place={state.place}
          isFavoritePlace={state.isFavoritePlace}
          onFavoriteClick={handleFavoriteClick}
          adults={state.adults}
          setAdults={(value) =>
            setState((prevState) => ({ ...prevState, adults: value }))
          }
          childrens={state.childrens}
          setChildrens={(value) =>
            setState((prevState) => ({ ...prevState, childrens: value }))
          }
          infants={state.infants}
          setInfants={(value) =>
            setState((prevState) => ({ ...prevState, infants: value }))
          }
          pets={state.pets}
          setPets={(value) =>
            setState((prevState) => ({ ...prevState, pets: value }))
          }
          date={state.date}
          setDate={(value) =>
            setState((prevState) => ({ ...prevState, date: value }))
          }
          bookingDays={state.bookingdays}
          setBookingDays={(value) =>
            setState((prevState) => ({ ...prevState, bookingdays: value }))
          }
          onBooking={handleBooking}
          isValidDates={state.isValidDates}
          isValidBookingWindow={state.isValidBookingWindow}
          isAvailable={state.isValidBookingWindow && state.isValidDates}
          bookingLoading={state.bookingLoading}
          isSameUser={state.isSameUser}
        />
      </div>
      <div className="hidden px-4 sm:flex ">
        <DesktopPlace
          place={state.place}
          isFavoritePlace={state.isFavoritePlace}
          onFavoriteClick={handleFavoriteClick}
          adults={state.adults}
          setAdults={(value) =>
            setState((prevState) => ({ ...prevState, adults: value }))
          }
          childrens={state.childrens}
          setChildrens={(value) =>
            setState((prevState) => ({ ...prevState, childrens: value }))
          }
          infants={state.infants}
          setInfants={(value) =>
            setState((prevState) => ({ ...prevState, infants: value }))
          }
          pets={state.pets}
          setPets={(value) =>
            setState((prevState) => ({ ...prevState, pets: value }))
          }
          date={state.date}
          setDate={(value) =>
            setState((prevState) => ({ ...prevState, date: value }))
          }
          bookingDays={state.bookingdays}
          setBookingDays={(value) =>
            setState((prevState) => ({ ...prevState, bookingdays: value }))
          }
          onBooking={handleBooking}
          isValidDates={state.isValidDates}
          isValidBookingWindow={state.isValidBookingWindow}
          isAvailable={state.isValidBookingWindow && state.isValidDates}
          bookingLoading={state.bookingLoading}
          isSameUser={state.isSameUser}
        />
      </div>
    </>
  );
}

