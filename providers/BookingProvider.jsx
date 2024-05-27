'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  addDays,
  differenceInCalendarDays,
  isWithinInterval,
  parseISO,
  format,
  differenceInDays,
} from 'date-fns';

const BookingContext = createContext();

const BookingProvider = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  /* Due to this "minimumStay" the BookingContext isn't working as minimumStay is coming from "place" */
  const [bookingdays, setBookingDays] = useState(Number(minimumStay));

  // const [isvaidBookingdates, setIsVaidBookingdates] = useState();
  const [isErrorDates, setIsErrorDates] = useState(false);
  const initialFrom = new Date();
  const initialTo = addDays(new Date(), Number(minimumStay));
  let from = initialFrom;
  let to = initialTo;
  const [date, setDate] = useState({
    from: from,
    to: to,
  });

  return (
    <BookingContext.Provider
      value={{
        adults,
        setAdults,
        children,
        setChildren,
        infants,
        setInfants,
        pets,
        setPets,
        bookingdays,
        setBookingDays,
        isErrorDates,
        setIsErrorDates,
        from,
        to,
        date,
        setDate,
      }}
    ></BookingContext.Provider>
  );
};

const useBooking = () => {
  const context = useContext(BookingContext);

  if (context === undefined)
    throw new Error('This context was used outside the BookingProvider');
  return context;
};

export { BookingProvider, useBooking };
