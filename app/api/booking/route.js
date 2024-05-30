import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
 async function placebookings(request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ code: 401, message: 'Unauthorized' });
  }

  try {
    const data = await request.json();
 
const {
  placeId,
  checkIn,
  checkOut,
  adults,
  childrens,
  infants,
  pets,
  price,
  sessionId,
  userId,
  paymentLink,
} = data;

if (
  !placeId ||
  !userId ||
  !sessionId ||
  !checkIn ||
  !checkOut ||
  !adults ||
  !paymentLink ||
  adults < 1
) {
  return NextResponse.json({
    code: 400,
    message: 'All fields are required and adults must be more than 1',
  });
}

// Parse dates
const checkInDate = new Date(checkIn);
const checkOutDate = new Date(checkOut);

// Check that check-in is before check-out
if (checkInDate >= checkOutDate) {
  return NextResponse.json({
    code: 400,
    message: 'Check-in date must be before check-out date',
  });
}

// Create the booking
const newBooking = await prisma.Tempbookings.create({
  data: {
    placeId,
    userId: userId,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: adults + childrens,
    adults: adults,
    childrens: childrens,
    infants: infants,
    pets: pets,
    totalPrice: price,
    sessionId: sessionId,
    paymentLink: paymentLink,
  },
});

return NextResponse.json({
  code: 200,
  message: 'Booking created successfully',
  booking: newBooking,
}, { status: 200});
} catch (error) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}
 }
export { placebookings as POST };
