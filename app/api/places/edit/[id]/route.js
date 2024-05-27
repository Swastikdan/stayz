import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";

const updatePlaceSchema = z.object({
  ownerId: z.string(),
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

export async function editPlace(request, { params }) {
  const session = await getServerSession();
  if (!session || !session.user) return NextResponse.json({ status: 401 });
  const id = params.id;
  if (!session || !id || String(id).length !== 24)
    return new Response("Unauthorized or Invalid ID", { status: 401 });
  const data = await request.json();
  try {
    const place = await prisma.places.findUnique({ where: { id: String(id) } });
    if (!place) return new Response("Place not found", { status: 404 });
    if(place.ownerId !== data.ownerId) return new Response("Unauthorized", { status: 401 });

    // Validate data with Zod schema
    const validatedData = updatePlaceSchema.safeParse(data);
    if (!validatedData.success) {
      const error = validatedData.error.format();
      return NextResponse.json({ error }, { status: 400 });
    }
    const { ownerId, ...rest } = validatedData.data;
    const updatedPlace = await prisma.places.update({
      where: { id: String(id) },
      data: {
        ...rest,
      },
    });

    return NextResponse.json(updatedPlace);


  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { editPlace as POST };
