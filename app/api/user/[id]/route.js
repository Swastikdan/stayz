import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
async function getUser(request, { params }) {
  const session = await getServerSession();
  const id = params.id;
  if (!session) return NextResponse.json('Unauthorized', { status: 401 });
  const user = await prisma.user.findUnique({
    where: { id: String(id) },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      bio: true,
      // hashedPassword: true,
    },
  });

  // Check if password is available and replace the password field
  // const passwordAvailable = user.hashedPassword !== null;
  // delete user.hashedPassword;

  // Add passwordAvailable to the user object
  // user.passwordAvailable = passwordAvailable;
  if (!user) return NextResponse.json('User not found', { status: 404 });
  if (user.email !== session.user.email)
    return NextResponse.json('Unauthorized', { status: 401 });
  return NextResponse.json(user, { status: 200 });
}

async function updateUser(request, { params }) {
  const session = await getServerSession();
  const id = params.id;

  if (!session) return NextResponse.json('Unauthorized', { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: String(id) } });
  if (!user) return NextResponse.json('User not found', { status: 404 });
  if (user.email !== session.user.email)
    return NextResponse.json('Unauthorized', { status: 401 });

  const { name, image, bio, accountPassword, newPassword } =
    await request.json();

  // //console.log(accountPassword, newPassword);

  if (name && (typeof name !== 'string' || name.length < 3 || name.length > 50))
    return NextResponse.json({ message: 'Invalid name' }, { status: 400 });

  if (image && typeof image !== 'string')
    return NextResponse.json({ message: 'Invalid image' }, { status: 400 });

  if (bio && typeof bio !== 'string')
    return NextResponse.json({ message: 'Invalid bio' }, { status: 400 });

  if (name === user.name && image === user.image && bio === user.bio) {
    return NextResponse.json({ message: 'No changes made' }, { status: 400 });
  }

  if (accountPassword && newPassword) {
    if (typeof accountPassword !== 'string' || typeof newPassword !== 'string')
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 400 },
      );

    const isMatch = await bcrypt.compare(accountPassword, user.hashedPassword);
    if (!isMatch)
      return NextResponse.json(
        { message: 'Old password is incorrect' },
        { status: 400 },
      );

    if (accountPassword === newPassword)
      return NextResponse.json(
        { message: 'Old and new password should not be the same' },
        {
          status: 400,
        },
      );
  }

  let data = { name, image, bio };

  if (user.hashedPassword && newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    data.hashedPassword = hashedPassword;
  }

  const updatedUser = await prisma.user.update({
    where: { id: String(id) },
    data,
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export { getUser as GET, updateUser as POST };

// // Function to handle GET requests
// async function handleGetRequest(user) {
//   return NextResponse.json(user);
// }

// async function handleGetRequest(id) {
//   const  session = await getServerSession();
//   const user = await prisma.user.findUnique({ where: { id: String(id) } });
//   if(user.email !== session.user.email)  return NextResponse.json("Unauthorized", { status: 401 });
//   return NextResponse.json(user);
// }

// Function to handle POST requests
// async function handlePostRequest(request, id) {
//   const  session = await getServerSession();
//   const user = await prisma.user.findUnique({ where: { id: String(id) } });
//   if(user.email !== session.user.email)  return NextResponse.json("Unauthorized", { status: 401 });

//   const { name, image, bio, oldPassword, newPassword } = await request.json();

//   if (!name || typeof name !== "string" || name.length < 3 || name.length > 50 || name === user.name)
//      return NextResponse.json("Invalid name", { status: 400 });

//   if (!image || typeof image !== "string")
//      return NextResponse.json("Invalid image", { status: 400 });

//   if (!oldPassword || !newPassword)
//      return NextResponse.json("Invalid password", { status: 400 });

//   const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
//   if (!isPasswordMatch)
//      return NextResponse.json("Old password is incorrect", { status: 400 });

//   const hashedPassword = await bcrypt.hash(newPassword, 12);

//   const updatedUser = await prisma.user.update({
//     where: { id: String(id) },
//     data: { name, image, password: hashedPassword , bio},
//   });

//   return NextResponse.json(updatedUser);
// }

// // Main function to handle requests
// export async function users(request, { params }) {
//   const session = await getServerSession();
//   const id = params.id;

//   if (!session || !id || String(id).length !== 24)
//      return NextResponse.json("Unauthorized or Invalid ID", { status: 401 });

//   const user = await prisma.user.findUnique({ where: { id: String(id) } });

//   if (!user)  return NextResponse.json("User not found", { status: 404 });

//   try {
//     if (request.method === 'GET') return handleGetRequest(user);
//     if (request.method === 'POST') return handlePostRequest(request, user, id, session);
//   } catch (error) {
//     console.error('Error:', error);
//      return NextResponse.json("Internal server error", { status: 500 });
//   }
// }

// export { users as GET, users as POST };

// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import bcrypt from "bcryptjs";
// export async function users(request, { params }) {
//   // Get the current session
//   const session = await getServerSession();

//   // Extract the id from the params
//   const id = params.id;

//   // Check if the session exists, if not return 401 Unauthorized
//   if (!session)  return NextResponse.json("Unauthorized", { status: 401 });

//   // Check if the id exists, if not return 404 Not Found
//   if (!id)  return NextResponse.json("No ObjectID provided", { status: 404 });

//   // Check if the id is a valid MongoDB ObjectID, if not return 404 Not Found
//   if (String(id).length !== 24)  return NextResponse.json("Malformed ObjectID", { status: 404 });

//   // Find the user with the given id
//   const user = await prisma.user.findUnique({ where: { id: String(id) } });

//   // Check if the user exists, if not return 404 Not Found
//   if (!user)  return NextResponse.json("User not found", { status: 404 });

//   // If the request method is GET, return the user
//   if (request.method === 'GET') return NextResponse.json(user);

//   // If the request method is POST, update the user
//   if (request.method === 'POST') {
//     if (id !== session.user.id)  return NextResponse.json("Unauthorized", { status: 401 });
//     // Extract the name from the request body
//     const { name, image, oldPassword, newPassword } = await request.json();

//     // Check if the name exists, if not return 400 Bad Request
//     if (!name)  return NextResponse.json("No name provided", { status: 400 });

//     // Check if the name is a string, if not return 400 Bad Request
//     if (typeof name !== "string")
//        return NextResponse.json("Name must be a string", { status: 400 });

//     // Check if the name length is valid, if not return 400 Bad Request
//     if (name.length < 3 || name.length > 50)
//        return NextResponse.json("Name must be between 3 and 50 characters long", {
//         status: 400,
//       });

//     // Check if the name is the same as the current name, if so return 400 Bad Request
//     if (name === user.name)
//        return NextResponse.json("Name is the same as the current name", {
//         status: 400,
//       });

//     // Check if the image exists, if not return 400 Bad Request
//     if (!image)  return NextResponse.json("No image provided", { status: 400 });

//     // Check if the image is a string, if not return 400 Bad Request
//     if (typeof image !== "string")
//        return NextResponse.json("Image must be a string", { status: 400 });

//     // Check if the oldPassword exists, if not return 400 Bad Request
//     if (!oldPassword)
//        return NextResponse.json("No old password provided", { status: 400 });

//     // Check if the newPassword exists, if not return 400 Bad Request
//     if (!newPassword)
//        return NextResponse.json("No new password provided", { status: 400 });

//     // Verify the old password
//     const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isPasswordMatch)
//        return NextResponse.json("Old password is incorrect", { status: 400 });

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 12);

//     // Update the user with the new name, image, and password
//     const updatedUser = await prisma.user.update({
//       where: { id: String(id) },
//       data: { name, image, password: hashedPassword },
//     });

//     // Return the updated user
//     return NextResponse.json(updatedUser);
//   }
// }

// export { users as GET, users as POST };
