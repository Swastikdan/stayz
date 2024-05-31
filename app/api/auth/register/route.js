import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 401 },
      );
    } else {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
          image:
            'https://res.cloudinary.com/dp5tomvwb/image/upload/v1709293472/placeholder_guest.jpg',
        },
      });
      return NextResponse.json(user);
    }
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 400 });
  }
}
