import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function userBookings() {

  const session = await getServerSession();

  const user = session?.user;
  const userEmail = user?.email;

    if (!session) {
        return NextResponse.json({ code: 401, message: 'Unauthorized' });
    }
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });
        const bookings = await prisma.booking.findMany({
            where: {
                userId: user.id
            },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                place: true
            }
        });

        if(!bookings || bookings.length === 0){
            return NextResponse.json({ code: 404, message: 'No Bookings Found' });
        }

        return NextResponse.json(bookings);
    }
    catch(error){
        console.error('Error:', error);
        return NextResponse.json({ code: 500, message: 'Internal Server Error' });
    }


}