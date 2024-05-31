import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createPlaceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  address: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(1),
  street: z.string().optional(),
  photos: z.array(z.string().url()).min(5),
  category: z.array(z.string()).min(1),
  necessary_amenities: z.array(z.string()).optional(),
  standout_amenities: z.array(z.string()).optional(),
  safety_amenities: z.array(z.string()).optional(),
  price: z.string(), // Changed this line
  listTillDate: z.string().optional().nullable(),
  maxGuests: z.number().gte(1),
  petsAllowed: z.boolean().optional(),
  checkInTime: z.string().nullable(), // Changed this line
  checkOutTime: z.string().nullable(), // Changed this line
  smokingNotAllowed: z.boolean().optional(),
  partiesNotAllowed: z.boolean().optional(),
  photographyNotAllowed: z.boolean().optional(),
  SelfcheckIn: z.boolean().optional(),
  additionalRules: z.string().optional(),
  numberOfRooms: z.string(), // Changed this line
});

export async function createPlace(request) {
  const session = await getServerSession();
  if (!session || !session.user) return NextResponse.json({ status: 401 });

  const data = await request.json();


  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (user.id !== data.ownerId) {
    return NextResponse.json(
      { error: 'You are not authorized to create this place' },
      { status: 403 },
    );
  }

  // // Validate data with Zod schema
  const validatedData = createPlaceSchema.safeParse(data);
  if (!validatedData.success) {
    const error = validatedData.error.format();
    return NextResponse.json({ error }, { status: 400 });
  }

  const { ownerId, ...rest } = validatedData.data; // Extract ownerId from validated data

 const place = await prisma.places.create({
   data: {
     ...rest,
     owner: {
       connect: {
         id: user.id,
       },
     },
   },
 });

 // copy the user data and copy that to the Owners 

  return NextResponse.json({ message: 'Place created successfully' , place:{
    id:place.id,
  }  });
}

export { createPlace as POST };

// const createPlaceSchema = z.object({
//     ownerId: z.string(),
//     title: z.string().min(1),
//     address: z.string().min(1),
//     state: z.string().min(1),
//     city: z.string().min(1),
//     street: z.string().optional(),
//     photos: z.array(z.string()).min(1),
//     description: z.string().min(1),
//     category: z.array(z.string()).min(1),
//     maxGuests: z.number().gte(1),
//     price: z.number().positive(),
//     status: z.string().default("processing"),
//     deleterequst: z.boolean().default(false),
//     petsAllowed: z.boolean(),
//     extraInfo: z.string().optional(),
//     numberOfRooms: z.number().optional(),
//     capacity: z.number().optional(),
// });
// const session = await getServerSession();
// if (!session || !session.user) return NextResponse.json({ status: 401 });

// const data = await request.json();

// // Validate data with Zod schema
// const validatedData = createPlaceSchema.safeParse(data);
// if (!validatedData.success) {
//     const error = validatedData.error.format();
//     return NextResponse.json({ error }, { status: 400 });
// }
// const { ownerId, ...rest } = validatedData.data; // Extract ownerId from validated data
// const place = await prisma.places.create({
//     data: {
//         ...rest,
//         owner: {
//             connect: {
//                 id: ownerId,
//             },
//         },
//     },
// });

// return NextResponse.json(place);
