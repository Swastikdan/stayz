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
      guests,
      totalPrice,
      userId,
      razorpaySignature,
       razorpayOrderId , razorpayPaymentId } = data;
    if (!placeId || !checkIn || !checkOut || !guests || !totalPrice || !userId || !razorpaySignature || !razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json({
        code: 400,
        message: 'All fields are required',
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
    const newBooking = await prisma.bookings.create({
      data: {
        placeId,
        userId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        totalPrice,
      },
    });

    

    return NextResponse.json({
      code: 200,
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { placebookings as POST };
